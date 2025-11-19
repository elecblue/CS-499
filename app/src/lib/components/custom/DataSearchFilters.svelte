<script lang="ts">
    // Svelte/SvelteKit imports
    import { onMount } from "svelte";

    // Icon imports
    import { Search } from "@lucide/svelte";

    // Component imports
    import * as Field from "$lib/components/ui/field/index"
    import { Input } from "$lib/components/ui/input/index";
    import { Button } from "$lib/components/ui/button/index";
    
    // State props
    let { animals = $bindable(), total = $bindable(), page = $bindable(), size = $bindable(), species = $bindable(), outcome = $bindable(), location = $bindable(), ...restProps } = $props();

    //let updatedResponses: any[] | null | undefined = $derived(animals);

    // Function to load animal data from the API
    async function loadData() {
        const params = new URLSearchParams({ page: String(page), size: String(size) });

        if (species) params.set("species", species);
        if (outcome) params.set("outcome", outcome);
        if (location) params.set("location", location);

        const res = await fetch(`/api/animals?` + params.toString());
        const data = await res.json();

        animals = data.items; 
        total = data.total;
    }
</script>

<!-- Search Filters -->
<Field.Set>
    <Field.Legend>Search Filters</Field.Legend>
    <Field.Group>
        <div class="flex w-full gap-4 filters-group">
            <Field.Field class="flex-auto">
                <Field.Label for="species">Species</Field.Label>
                <Input id="species" bind:value={ species } onkeydown={ (e) => { if (e.key === "Enter") loadData(); } } placeholder="Such as dog, cat, bird, etc..."/>
            </Field.Field>
            <Field.Field class="flex-auto">
                <Field.Label for="outcome">Outcome</Field.Label>
                <Input id="outcome" bind:value={ outcome } onkeydown={ (e) => { if (e.key === "Enter") loadData(); } } placeholder="Such as adoption, transfer, etc..."/>
            </Field.Field>
            <Field.Field class="flex-auto">
                <Field.Label for="location">Location</Field.Label>
                <Input disabled id="location" bind:value={ location } placeholder="(This doesn't work yet.)"/>
            </Field.Field>
            <Field.Field class="flex-1 self-end">
                <Button onclick={ loadData } class="cursor-pointer" variant="ghost">
                    <Search />
                    Search
                </Button>
            </Field.Field>
        </div>
    </Field.Group>
</Field.Set>