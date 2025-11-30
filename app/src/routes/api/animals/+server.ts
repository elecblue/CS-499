/**
 * @file API endpoint for AAC animal data.
 * @author Nik Myers <nikolas.myers@snhu.edu>
 * @version 0.9.0
 */
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { listAAC } from "$lib/services/aacService";
import { countAAC, searchAAC } from "$lib/repository/aacRepo";

export const GET: RequestHandler = async ({ url }) => {
    // supports ?filter=&species=&breed=&outcome=&location=lat,lng,radiusKm&page=&size=
    const data = await listAAC({
        filter: url.searchParams.get("filter") ?? undefined,
        species: url.searchParams.get("species") ?? undefined,
        breed: url.searchParams.get("breed") ?? undefined,
        outcome: url.searchParams.get("outcome") ?? undefined,
        location: url.searchParams.get("location") ?? undefined,
        page: url.searchParams.get("page") ?? undefined,
        size: url.searchParams.get("size") ?? undefined,
    });
    return json(data);
};
