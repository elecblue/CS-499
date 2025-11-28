<script lang="ts" generics="TData, TValue">
    // Svelte/SvelteKit imports
    import { dev } from "$app/environment";
    import { getContext, setContext } from "svelte";
    import { animalColumns } from "$lib/models";
    import { getFilterContext, setFilterContext } from "$lib/filters.svelte";
    import { mode } from "mode-watcher";

    // Icon imports
    import { Construction, MapPinned } from "@lucide/svelte";

    // Component imports
    import Header from '$lib/components/custom/Header.svelte';
    import DataSearchFilters from '$lib/components/custom/DataSearchFilters.svelte';
    import DataTable from '$lib/components/custom/DataTable.svelte';
    import Footer from '$lib/components/custom/Footer.svelte';
    import * as Empty from '$lib/components/ui/empty/index';
    
    // State variables
    let { data } = $props();
    let filterSelection = $state("All");
    setFilterContext("All");
    const currentFilter = $state(() => filterSelection);
    //$inspect("filterValue", currentFilter);

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

{#if dev}
<div class="absolute right-20 mx-4 mt-2 px-4 bg-muted dark:bg-muted font-mono text-xs text-muted-foreground dark:text-muted-foreground">
    <div class="text-sm font-bold">Global State</div>
    <div><span class="font-semibold">Selected Filter</span>: { filterSelection }</div>
    <div><span class="font-semibold">Current Mode</span>: { mode.current }</div>
</div>
{/if}

<!-- Header -->
<Header />

<!-- Search Filters -->
<!-- <DataSearchFilters bind:filterValue={ filterSelection } /> -->

<!-- Results Table -->
<DataTable data={ data.animals } columns={ animalColumns } />

<!-- Split Panel -->
<div class="flex max-w-full gap-4 mx-4">
    <div class="flex-auto grow bg-card rounded-lg">
        <Empty.Root class="border border-dashed border-primary/50 from-muted/30 to-background h-full bg-linear-to-b from-10%">
            <Empty.Header>
                <Empty.Media variant="default">
                    <Construction class="stroke-primary size-16" />
                </Empty.Media>
                <Empty.Title>[Insert Data Visualization Here]</Empty.Title>
                <Empty.Description>I'm still trying to decide on a charting tool to use with SvelteKit.</Empty.Description>
            </Empty.Header>
            <Empty.Content>
                This panel will contain a visualization of the breed distribution for the rescue category selected.
            </Empty.Content>
        </Empty.Root>
    </div>
    <div class="flex-auto bg-card rounded-lg">
        <Empty.Root class="border border-dashed border-primary/50 h-full from-muted/30 to-background bg-linear-to-b from-10%">
            <Empty.Header>
                <Empty.Media variant="default">
                    <MapPinned class="stroke-primary size-16" />
                </Empty.Media>
                <Empty.Title>[Insert Location Component Here]</Empty.Title>
                <Empty.Description>Google Maps or something else?</Empty.Description>
            </Empty.Header>
            <Empty.Content>
                This panel will contain the map that reflects the location a selected animal was found.
            </Empty.Content>
        </Empty.Root>
    </div>
</div>

<!-- Footer -->
<Footer />