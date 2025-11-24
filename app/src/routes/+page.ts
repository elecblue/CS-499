import { filterState } from '$lib/filters.svelte';
import type { PageLoad } from './$types';

const filterParams = () => {
    const params = new URLSearchParams({ page: String(filterState.page), size: String(filterState.size) });

    if (filterState.species) params.set("species", filterState.species);
    if (filterState.outcome) params.set("outcome", filterState.outcome);
    if (filterState.location) params.set("location", filterState.location);

    return params;
};

export const load: PageLoad = async ({ fetch, url }) => {
    // const params = 0;
    const params = filterParams();
    const res = await fetch(`/api/animals?` + params.toString());
    const data = await res.json();
    const animals = data.items;

    filterState.total = data.total;

    return { animals };
};