import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { listAAC } from "$lib/services/aacService";
import { countAAC, searchAAC } from "$lib/repository/aacRepo";

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

// export const GET: RequestHandler = async ({ url }) => {
//     const q = {};
//     const skip = 0;
//     const size = 1000;
    
//     const [total, itemsRaw] = await Promise.all([
//         countAAC(q),
//         searchAAC(q, skip, size),
//     ]);

//     console.log("Count: ", total);

//     return json(itemsRaw);
// };
