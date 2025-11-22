// import { query } from '$app/server';
// import type { PageLoad } from '../../$types';
// import { countAAC, searchAAC } from '$lib/repository/aacRepo';

// export const load: PageLoad = async ({ fetch, url }) => {
//     const q = {};
//     const skip = 0;
//     const size = 5000;
    
//     const [total, itemsRaw] = await Promise.all([
//         countAAC(q),
//         searchAAC(q, skip, size),
//     ]);

//     return { total, itemsRaw };
// };