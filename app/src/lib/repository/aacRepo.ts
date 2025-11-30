/**
 * @file Repository functions to query the AAC database.
 * @author Nik Myers <nikolas.myers@snhu.edu>
 * @version 0.9.0
 */
import { and, arrayOverlaps, between, eq, ilike, like, or, sql } from "drizzle-orm";
import { db } from "$lib/server/db";
import { aac } from "$lib/server/db/schema";
import type { SearchQuery } from "$lib/models";
import { dev } from "$app/environment";
import { filterBreeds } from "$lib/filters.svelte";

// const filterBreeds = {
// 	water: ["Labrador Retriever", "Newfoundland", "Golden Retriever"],
// 	mountain: ["German Shepherd", "Siberian Husky", "Border Collie"],
// 	disaster: ["Doberman Pinscher", "German Shepherd", "Golden Retriever", "Bloodhound", "Rottweiler"]
// };

/**
 * Convert a location string into a bounding box for filtering.
 * 
 * *Not yet implemented into application logic* 
 * @param {string?} input Comma-separated latitude, longitude, radius in km
 * @returns 
 */
function toBoundingBox(input?: string) {
    // Return undefined if no input
    if (!input) return undefined;
    // Split input into parts and trim whitespace
    const parts = input.split(",").map((p) => p.trim());

    // Must have exactly 3 parts: lat, lng, radius (in km)
    if (parts.length !== 3) return undefined;
    const [latS, lngS, rS] = parts;

    // Parse parts into numbers
    const lat = Number(latS), lng = Number(lngS), rKm = Number(rS);

    // Validate parsed numbers
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || !Number.isFinite(rKm) || rKm <= 0) return undefined;

    // Rough conversion from km to degrees
    const latDeg = rKm / 111;   // 1° lat is about 111 km
    const lngDeg = rKm / (111 * Math.cos((lat * Math.PI) / 180) || 1);

    // Return bounding box
    return {
        minLat: lat - latDeg,
        maxLat: lat + latDeg,
        minLng: lng - lngDeg,
        maxLng: lng + lngDeg,
    };
}

/**
 * Count AAC animals based on search filters.
 * 
 * @param {Partial<SearchQuery>} filters The search filters to apply.
 * @returns {Promise<number>} The count of animals matching the filters.
 */
export async function countAAC(filters: Partial<SearchQuery>): Promise<number> {
    // Empty array to hold WHERE clauses
    const whereClauses = [];

    // Add breed filters based on predefined filter categories
    if (filters.filter && filters.filter.toLowerCase() !== "all") {
        let breedList = filterBreeds[filters.filter.toLowerCase() as keyof typeof filterBreeds];

        breedList.forEach((breed) => {
            whereClauses.push(like(aac.breed, `%${breed}%`));
            if (dev) console.log(`Adding filter for breed like %${breed}%`);
        })
    }

    // Add species, breed, and outcome filters
    if (filters.species) whereClauses.push(eq(aac.animalType, filters.species));
    if (filters.breed)   whereClauses.push(like(aac.breed, `%${filters.breed}%`));
    if (filters.outcome) whereClauses.push(eq(aac.outcomeType, filters.outcome));

    // Add location bounding box filter if provided
    const box = toBoundingBox(filters.location);
    if (box) {
        whereClauses.push(between(aac.locationLat, box.minLat, box.maxLat));
        whereClauses.push(between(aac.locationLong, box.minLng, box.maxLng));
    }

    // Execute count query with constructed WHERE clauses
    const [{ c }] = await db
        .select({ c: sql<number>`count(*)` })
        .from(aac)
        .where(whereClauses.length ? and(...whereClauses) : undefined);

    return c ?? 0;
}

/**
 * Search AAC animals based on search filters.
 * 
 * @param {Partial<SearchQuery>} filters The search filters to apply.
 * @param {number} skip The number of records to skip (for pagination).
 * @param {number} limit The maximum number of records to return.
 * @returns {Promise<Animal[]>} The list of animals matching the filters.
 */
export async function searchAAC(filters: Partial<SearchQuery>, skip: number, limit: number) {
    // Empty array to hold WHERE clauses
    const whereClauses = [];

    // Add breed filters based on predefined filter categories
    if (filters.filter && filters.filter.toLowerCase() !== "all") {
        let breedList = filterBreeds[filters.filter.toLowerCase() as keyof typeof filterBreeds];

        breedList.forEach((breed) => {
            whereClauses.push(like(aac.breed, `%${breed}%`));
            if (dev) console.log(`Adding filter for breed like %${breed}%`);
        })
    }

    // Add species, breed, and outcome filters
    if (filters.species) whereClauses.push(eq(aac.animalType, filters.species));
    if (filters.breed)   whereClauses.push(like(aac.breed, `%${filters.breed}%`));
    if (filters.outcome) whereClauses.push(eq(aac.outcomeType, filters.outcome));

    // Add location bounding box filter if provided
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
