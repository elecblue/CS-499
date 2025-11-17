<script lang="ts">
    import { onMount } from "svelte";
    import * as Table from "$lib/components/ui/table/index"
    
    let animals: any[] | null | undefined = [];
    let total = 0, page = 1, size = 10;
    let species = "", outcome = "", location = "";
    let columnWidth = "40px";

    async function load() {
        const params = new URLSearchParams({ page: String(page), size: String(size) });
        if (species) params.set("species", species);
        if (outcome) params.set("outcome", outcome);
        if (location) params.set("location", location);
        const res = await fetch(`/api/animals?` + params.toString());
        const data = await res.json();
        animals = data.items; total = data.total;
    }

    function next(){ if (page * size < total) { page++; load(); } }
    function prev(){ if (page > 1) { page--; load(); } }
    onMount(load);
</script>

<!-- Please note: This is an incredibly simple draft implementation. It will look nicer as I
  continue to develop the application. -->

<h1>Grazioso Salvare | Rescue-Mate</h1>

<!-- Search Filters -->
<div style="display:flex; gap:0.5rem; align-items:end;">
    <div><label>Species<br/><input bind:value={species} placeholder="Species (Dog/Cat)"/></label></div>
    <div><label>Outcome<br/><input bind:value={outcome} placeholder="Adopted"/></label></div>
    <div><label>Location<br/><input bind:value={location} placeholder="Austin"/></label></div>
    <button on:click={load}>Search</button>
</div>

<!-- Results Table -->
<Table.Root width="100%">
    <Table.Header>
        <Table.Row style="text-align: left;">
            <Table.Head style="max-width: {columnWidth};">Record #</Table.Head>
            <Table.Head>Animal ID</Table.Head>
            <Table.Head>Name</Table.Head>
            <Table.Head>Species</Table.Head>
            <Table.Head>Outcome</Table.Head>
            <Table.Head>Location</Table.Head>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {#each animals as a}
        <Table.Row>
            <Table.Cell style="max-width: {columnWidth};">{a.recNum}</Table.Cell>
            <Table.Cell>{a.animalId}</Table.Cell>
            <Table.Cell>{a.name ?? "(Not Specified)"}</Table.Cell>
            <Table.Cell>{a.animalType}</Table.Cell>
            <Table.Cell>{a.outcomeType ?? "(Not Specified)"}</Table.Cell>
            <Table.Cell>{a.locationLat ?? "(Not Specified)"}</Table.Cell>
        </Table.Row>
        {/each}
    </Table.Body>
    <Table.Caption>{total} results</Table.Caption>
</Table.Root>

<!-- Pagination Controls -->
<div style="display:flex; gap:0.5rem; margin-top:0.5rem;">
    <button on:click={prev} disabled={page===1}>Prev</button>
    <span>Page {page}</span>
    <button on:click={next} disabled={page*size>=total}>Next</button>
</div>

<style>
    .narrow-column {
        max-width: 100px;
    }
</style>