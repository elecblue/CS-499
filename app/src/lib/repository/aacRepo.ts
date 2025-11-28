import { and, arrayOverlaps, between, eq, ilike, like, or, sql } from "drizzle-orm";
import { db } from "$lib/server/db";
import { aac } from "$lib/server/db/schema";
import type { SearchQuery } from "$lib/models";
import { dev } from "$app/environment";

const filterBreeds = {
	water: ["Labrador Retriever", "Newfoundland", "Golden Retriever"],
	mountain: ["German Shepherd", "Siberian Husky", "Border Collie"],
	disaster: ["Doberman Pinscher", "German Shepherd", "Golden Retriever", "Bloodhound", "Rottweiler"]
};

// Try to parse "lat,long,radiusKm" into a [minLat,maxLat,minLng,maxLng] bounding box.
// If parsing fails, return undefined so callers can ignore.
function toBoundingBox(input?: string) {
    if (!input) return undefined;
    const parts = input.split(",").map((p) => p.trim());
    if (parts.length !== 3) return undefined;
    const [latS, lngS, rS] = parts;
    const lat = Number(latS), lng = Number(lngS), rKm = Number(rS);
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || !Number.isFinite(rKm) || rKm <= 0) return undefined;

    // very rough degree-to-km (works fine around Austin; if you want haversine later, we can add it)
    const latDeg = rKm / 111;           // 1° lat ≈ 111 km
    const lngDeg = rKm / (111 * Math.cos((lat * Math.PI) / 180) || 1);

    return {
        minLat: lat - latDeg,
        maxLat: lat + latDeg,
        minLng: lng - lngDeg,
        maxLng: lng + lngDeg,
    };
}

export async function countAAC(filters: Partial<SearchQuery>): Promise<number> {
    const whereClauses = [];

    if (filters.filter && filters.filter.toLowerCase() !== "all") {
        let breedList = filterBreeds[filters.filter.toLowerCase() as keyof typeof filterBreeds];

        breedList.forEach((breed) => {
            whereClauses.push(like(aac.breed, `%${breed}%`));
            if (dev) console.log(`Adding filter for breed like %${breed}%`);
        })
    }

    if (filters.species) whereClauses.push(eq(aac.animalType, filters.species));
    if (filters.breed)   whereClauses.push(like(aac.breed, `%${filters.breed}%`));
    if (filters.outcome) whereClauses.push(eq(aac.outcomeType, filters.outcome));

    const box = toBoundingBox(filters.location);
    if (box) {
        whereClauses.push(between(aac.locationLat, box.minLat, box.maxLat));
        whereClauses.push(between(aac.locationLong, box.minLng, box.maxLng));
    }

    const [{ c }] = await db
        .select({ c: sql<number>`count(*)` })
        .from(aac)
        .where(whereClauses.length ? and(...whereClauses) : undefined);

    return c ?? 0;
}

export async function searchAAC(filters: Partial<SearchQuery>, skip: number, limit: number) {
    const whereClauses = [];

    if (filters.filter && filters.filter.toLowerCase() !== "all") {
        let breedList = filterBreeds[filters.filter.toLowerCase() as keyof typeof filterBreeds];

        breedList.forEach((breed) => {
            whereClauses.push(like(aac.breed, `%${breed}%`));
            if (dev) console.log(`Adding filter for breed like %${breed}%`);
        })
    }

    if (filters.species) whereClauses.push(eq(aac.animalType, filters.species));
    if (filters.breed)   whereClauses.push(like(aac.breed, `%${filters.breed}%`));
    if (filters.outcome) whereClauses.push(eq(aac.outcomeType, filters.outcome));

    const box = toBoundingBox(filters.location);
    if (box) {
        whereClauses.push(between(aac.locationLat, box.minLat, box.maxLat));
        whereClauses.push(between(aac.locationLong, box.minLng, box.maxLng));
    }

    // console.log(`${whereClauses.length} where clauses for filter ${filters.filter}`);

    // Order newest first, then by primary key to keep result stable
    const rows = await db
        .select({
            recNum: aac.recNum,
            ageUponOutcome: aac.ageUponOutcome,
            animalId: aac.animalId,
            animalType: aac.animalType,
            breed: aac.breed,
            color: aac.color,
            dateOfBirth: aac.dateOfBirth,
            datetime: aac.datetime,
            monthyear: aac.monthyear,
            name: aac.name,
            outcomeSubtype: aac.outcomeSubtype,
            outcomeType: aac.outcomeType,
            sexUponOutcome: aac.sexUponOutcome,
            locationLat: aac.locationLat,
            locationLong: aac.locationLong,
            ageUponOutcomeInWeeks: aac.ageUponOutcomeInWeeks,
        })
        .from(aac)
        .where(whereClauses.length ? or(...whereClauses) : undefined)
        // .where(whereClauses.length ? and(...whereClauses) : undefined)
        // .where(like(aac.breed, `%Labrador Retriever%`))
        //.orderBy(sql`datetime(aac.datetime) DESC`, aac.recNum)
        .orderBy(aac.recNum)
        .limit(limit)
        .offset(skip);

    return rows; // Service layer will zod-validate as Animal[]
}
