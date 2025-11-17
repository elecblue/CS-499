<script lang="ts">
    import { onMount } from "svelte";
    
    let animals: any[] | null | undefined = [];
    let total = 0, page = 1, size = 10;
    let species = "", outcome = "", location = "";

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
<p>{total} results</p>
<table border="1" cellpadding="5" cellspacing="0" style="table-layout: auto; border-collapse:collapse; width:100%;">
    <thead>
        <tr>
            <th>Record Number</th>
            <th>Animal ID</th>
            <th>Name</th>
            <th>Species</th>
            <th>Outcome</th>
            <th>Location</th>
        </tr>
    </thead>
    <tbody>
        {#each animals as a}
        <tr>
            <td>{a.recNum}</td>
            <td>{a.animalId}</td>
            <td>{a.name ?? "(Not Specified)"}</td>
            <td>{a.animalType}</td>
            <td>{a.outcomeType ?? "(Not Specified)"}</td>
            <td>{a.locationLat ?? "(Not Specified)"}</td>
        </tr>
        {/each}
    </tbody>
</table>

<!-- Pagination Controls -->
<div style="display:flex; gap:0.5rem; margin-top:0.5rem;">
    <button on:click={prev} disabled={page===1}>Prev</button>
    <span>Page {page}</span>
    <button on:click={next} disabled={page*size>=total}>Next</button>
</div>
