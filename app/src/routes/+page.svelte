<script lang="ts">
    // Svelte/SvelteKit imports
    import { onMount } from "svelte";
    import { on } from 'svelte/events';

    // Icon imports
    import { ArrowLeft, ArrowRight, FileSpreadsheet, Search } from "@lucide/svelte";

    // Component imports
    import DataSearchFilters from '$lib/components/custom/DataSearchFilters.svelte';
    import DataTable from '$lib/components/custom/DataTable.svelte';
    
    // State variables
    let animals: any[] | null | undefined = $state([]);
    let total = $state(0);
    let page = $state(1);
    let size = $state(10);
    let species = $state("");
    let outcome = $state("");
    let location = $state("");

    // Function to load animal data from the API
    async function load() {
        const params = new URLSearchParams({ page: String(page), size: String(size) });
        if (species) params.set("species", species);
        if (outcome) params.set("outcome", outcome);
        if (location) params.set("location", location);
        const res = await fetch(`/api/animals?` + params.toString());
        const data = await res.json();
        animals = data.items; total = data.total;
    }

    // Initial data load on component mount
    onMount(load);
</script>

<!-- Please note: This is an incredibly simple draft implementation. It will look nicer as I
  continue to develop the application. -->

<h1>Grazioso Salvare | Rescue-Mate</h1>

<!-- Search Filters -->
<DataSearchFilters bind:animals={animals} total={total} page={page} size={size} species={species} outcome={outcome} location={location} />

<!-- Results Table -->
<DataTable animals={animals} total={total} page={page} size={size} species={species} outcome={outcome} location={location} />

<style>
    :root {
        padding: 1rem;
    }
</style>