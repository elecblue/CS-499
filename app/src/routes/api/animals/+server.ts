import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { listAAC } from "$lib/services/aacService";

export const GET: RequestHandler = async ({ url }) => {
    // supports ?species=&breed=&outcome=&location=lat,lng,radiusKm&page=&size=
    const data = await listAAC({
        species: url.searchParams.get("species") ?? undefined,
        breed: url.searchParams.get("breed") ?? undefined,
        outcome: url.searchParams.get("outcome") ?? undefined,
        location: url.searchParams.get("location") ?? undefined,
        page: url.searchParams.get("page") ?? undefined,
        size: url.searchParams.get("size") ?? undefined,
    });
    return json(data);
};
