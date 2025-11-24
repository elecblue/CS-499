<script lang="ts">
    // Svelte/SvelteKit imports
    import { dev } from "$app/environment";
    import { setContext } from "svelte";

    // Icon imports
    import { Search } from "@lucide/svelte";

    // Component imports
    import * as Card from "$lib/components/ui/card/index";
    import * as Field from "$lib/components/ui/field/index";
    import * as Select from "$lib/components/ui/select/index";
    import { Input } from "$lib/components/ui/input/index";
    import { Button } from "$lib/components/ui/button/index";

    // Custom imports
    import { FilterValue } from "$lib/models";
    import { filterOptions, setFilterContext, getFilterContext } from '$lib/filters.svelte';
    
    // State props
    // let { animals = $bindable(), total = $bindable(), page = $bindable(), size = $bindable(), species = $bindable(), outcome = $bindable(), location = $bindable(), ...restProps } = $props();
    let { filterValue = $bindable() } = $props();
    let filterSelection = $state(filterValue);
    // let filterSelection = $state(getFilterContext());
    // setFilterContext( returnStateValue(filterSelection) );

    function getFilterLabel(value: FilterValue) {
        const option = filterOptions.find(opt => opt.value === value);
        console.log("Getting label for filter value: ", value, option);
        return option ? option.label : "All Animals";
    }

    function updateFilter(selection: FilterValue) {
        // Logic to update filters based on selected options
        filterValue = selection;
        if (dev) console.log("Filter updated to: ", filterValue);
    }

    //let updatedResponses: any[] | null | undefined = $derived(animals);

    // Function to load animal data from the API
    // async function loadData() {
    //     const params = new URLSearchParams({ page: String(page), size: String(size) });

    //     if (species) params.set("species", species);
    //     if (outcome) params.set("outcome", outcome);
    //     if (location) params.set("location", location);

    //     const res = await fetch(`/api/animals?` + params.toString());
    //     const data = await res.json();

    //     animals = data.items; 
    //     total = data.total;
    // }
</script>
<!--
@component
## \<DataSearchFilters\>
A component that provides search filters for animal rescue data.

*This component will eventually support basic customization via props, as well as integrated 
sorting and filtering capabilities.*

### Usage
`<DataSearchFilters />`
-->

<!-- Search Filters -->
<div class="search-filters">
    <Card.Root class="max-w-full mx-4">
        <Card.Header>
            <Card.Title>Search Filters</Card.Title>
            <Card.Description>Refine your search criteria to find specific animal rescue data.</Card.Description>
        </Card.Header>
        <Card.Content>
            <Field.Group>
                <div class="flex gap-4 filters-group">
                    <Field.Field class="flex-auto">
                        <Field.Label for="filter">Filter by Rescue Type</Field.Label>
                        <Select.Root type="single" bind:value={ filterSelection } onValueChange={ () => updateFilter(filterSelection) }>
                            <Select.Trigger class="w-fit cursor-pointer" aria-label="Select Dataset">
                                <span>{getFilterLabel(filterSelection)}</span>
                            </Select.Trigger>
                            <Select.Content>
                                {#each filterOptions as option, i}
                                    <Select.Item value={ option.value } label={ option.label } class="cursor-pointer" />
                                {/each}
                            </Select.Content>
                        </Select.Root>
                        <!-- <Field.Label for="species">Species</Field.Label>
                        <Input id="species" bind:value={ species } onkeydown={ (e) => { if (e.key === "Enter") loadData(); } } placeholder="Such as dog, cat, bird, etc..."/> -->
                    </Field.Field>
                </div>
            </Field.Group>
        </Card.Content>
    </Card.Root>
</div>