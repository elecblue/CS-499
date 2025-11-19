<script lang="ts">
    import { onMount } from "svelte";
    import { on } from 'svelte/events';

    import { ArrowLeft, ArrowRight, FileSpreadsheet, ChevronLeftIcon, ChevronRightIcon } from "@lucide/svelte";

    import * as Table from "$lib/components/ui/table/index";
    import * as Pagination from "$lib/components/ui/pagination/index";
    import * as ButtonGroup from "$lib/components/ui/button-group/index";
    import { Button } from "$lib/components/ui/button/index";
    
    // State variables
    // let animals: any[] | null | undefined = $state([]);
    // let total = $state(0);
    // let page = $state(1);
    // let size = 10;
    // let species = "", outcome = "", location = "";
    let columnWidth = "40px";

    let { animals, total, page, size, species, outcome, location, ...restProps } = $props();

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

    // Pagination functions
    function getPage() {
        return page;
    }

    function setPage(p: number) {
        page = p;
        load();
    }

    // Initial data load on component mount
    // onMount(load);
</script>

<!--
@component
## \<DataTable\>
A component that provides a paginated datatable. By default, the table displays 10 items per page.

*This component will eventually support basic customization via props, as well as integrated 
sorting and filtering capabilities.*

### Usage
`<DataTable />`
-->

<!-- Data Table Displaying Animal Records -->
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

<!-- Pagination controls -->
<Pagination.Root count={ total } bind:page={ getPage, setPage } perPage={ size } >
    {#snippet children({ pages, currentPage })}
    <Pagination.Content>
        <Pagination.Item>
            <Pagination.PrevButton class="cursor-pointer">
                <ChevronLeftIcon class="size-4" />
            </Pagination.PrevButton>
        </Pagination.Item>
        {#each pages as page (page.key)}
            {#if page.type === 'ellipsis'}
                <Pagination.Item>
                    <Pagination.Ellipsis />
                </Pagination.Item>
            {:else}
                <Pagination.Item>
                    <Pagination.Link {page} isActive={ currentPage === page.value } class="cursor-pointer" >
                        {page.value}
                    </Pagination.Link>
                </Pagination.Item>
            {/if}
        {/each}
        <Pagination.Item>
            <Pagination.NextButton class="cursor-pointer">
                <ChevronRightIcon class="size-4" />
            </Pagination.NextButton>
        </Pagination.Item>
    </Pagination.Content>
    {/snippet}
</Pagination.Root>

<style>
    :root {
        padding: 1rem;
    }
</style>

