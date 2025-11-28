import { dev } from "$app/environment";
import { query } from "$app/server";
import { db } from "$lib/server/db";
import { aac } from "$lib/server/db/schema";
import type { SearchQuery, PagedResult, Animal } from "$lib/models";
import { PagedResult as PagedResultSchema } from "$lib/models";
import { and, arrayOverlaps, between, eq, ilike, like, or, SQL, sql } from "drizzle-orm";
import z from "zod";

const filterBreeds = {
	water: ["Labrador Retriever", "Newfoundland", "Golden Retriever"],
	mountain: ["German Shepherd", "Siberian Husky", "Border Collie"],
	disaster: ["Doberman Pinscher", "German Shepherd", "Golden Retriever", "Bloodhound", "Rottweiler"]
};

export const getDistribution = query(z.string(), async (filter = "all") => {
    const whereClauses: SQL[] = [];

    if (filter && filter.toLowerCase() !== "all") {
        let breedList = filterBreeds[filter.toLowerCase() as keyof typeof filterBreeds];

        breedList.forEach((breed) => {
            whereClauses.push(like(aac.breed, `%${breed}%`));
            if (dev) console.log(`Adding filter for breed like %${breed}%`);
        })
    }

    // Order newest first, then by primary key to keep result stable
    const rows = await db
        .select({
            breed: aac.breed,
            count: sql<number>`COUNT(*)`.as("count")
        })
        .from(aac)
        .where(whereClauses.length ? or(...whereClauses) : undefined)
        .groupBy(aac.breed)
        .orderBy(sql`count(*) DESC`);
        // .orderBy(aac.recNum);
        // .limit(limit)
        // .offset(skip);

    return { 
        filter, 
        series: rows.map(r => ({ label: r.breed ?? "Unknown", value: r.count })) 
    };
});