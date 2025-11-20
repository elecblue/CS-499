<script lang="ts">
    // Svelte/SvelteKit imports
    import { onMount } from "svelte";
    import { animalColumns } from "$lib/models"; 

    // Icon imports
    

    // Component imports
    import Header from '$lib/components/custom/Header.svelte';
    import DataSearchFilters from '$lib/components/custom/DataSearchFilters.svelte';
    import DataTable from '$lib/components/custom/DataTable.svelte';
    
    // State variables
    // let animals: any[] | null | undefined = $state([]);
    // let total = $state(0);
    // let page = $state(1);
    // let size = $state(10);
    // let species = $state("");
    // let outcome = $state("");
    // let location = $state("");
    let { data } = $props();
    import { filterState } from '$lib/filters.svelte';

    // // Function to load animal data from the API
    // async function load() {
    //     const params = new URLSearchParams({ page: String(filterState.page), size: String(filterState.size) });
        
    //     if (filterState.species) params.set("species", filterState.species);
    //     if (filterState.outcome) params.set("outcome", filterState.outcome);
    //     if (filterState.location) params.set("location", filterState.location);
        
    //     const res = await fetch(`/api/animals?` + params.toString());
    //     const data = await res.json();
        
    //     animals = data.items; 
    //     filterState.total = data.total;
    // }

    // // Initial data load on component mount
    // onMount(load);
</script>

<!-- Please note: This is an incredibly simple draft implementation. It will look nicer as I
  continue to develop the application. -->

<svelte:head>
    <title>Rescue-Mate | Rescue Operations Animal Data Explorer</title>
    <meta name="description" content="Explore and analyze animal rescue data with Rescue-Mate." />
</svelte:head>

<Header />

<!-- Search Filters -->
<DataSearchFilters animals={data.animals} total={filterState.total} page={filterState.page} size={filterState.size} species={filterState.species} outcome={filterState.outcome} location={filterState.location} />

<!-- Results Table -->
<!-- <DataTable animals={animals} total={filterState.total} page={filterState.page} size={filterState.size} species={filterState.species} outcome={filterState.outcome} location={filterState.location} /> -->
<DataTable data={data.animals} columns={animalColumns} />