<script lang="ts" generics="TData, TValue">
    import { writable } from "svelte/store";

    import { 
        type ColumnDef, 
        type PaginationState, 
        getCoreRowModel, 
        getPaginationRowModel 
    } from "@tanstack/table-core";
    //import { createSvelteTable } from "@tanstack/svelte-table";

    import { ChevronLeftIcon, ChevronRightIcon } from "@lucide/svelte";

    import { createSvelteTable, FlexRender } from "$lib/components/ui/data-table";
    import * as Table from "$lib/components/ui/table/index";
    import * as Pagination from "$lib/components/ui/pagination/index";

    import { filterState } from '$lib/filters.svelte';

    type DataTableProps<TData, TValue> = {
        columns: ColumnDef<TData, TValue>[];
        data: TData[];
    };

    let { data, columns }: DataTableProps<TData, TValue> = $props();
    let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });

    const tableOptions = writable({
        columns,
        data,
        initialState: { 
            sorting: [
                { id: 'recNum', desc: false }
            ]
        },
    });

    const table = createSvelteTable({
        get data() {
            return data;
        },
        columns,
        state: {
            get pagination() {
                return pagination;
            },
            // pagination,
        },
        onPaginationChange: (updater) => {
            if (typeof updater === "function") {
                pagination = updater(pagination);
            } else {
                pagination = updater;
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    //let { animals, total, page, size, species, outcome, location, ...restProps } = $props();
    let { species, outcome, location, page, size, total } = filterState;
    //let columnWidth = "40px";

    const range = (start: number, stop: number, step: number = 1) => 
        Array.from({ length: Math.ceil((stop - start) / step) },
            (_, i) => start + i * step
        );

    // Function to load animal data from the API
    // async function load() {
    //     const params = new URLSearchParams({ page: String(page), size: String(size) });
    //     if (species) params.set("species", species);
    //     if (outcome) params.set("outcome", outcome);
    //     if (location) params.set("location", location);
    //     const res = await fetch(`/api/animals?` + params.toString());
    //     const data = await res.json();
    //     animals = data.items; total = data.total;
    // }

    // // Pagination functions
    // function getPage() {
    //     return page;
    // }

    // function setPage(p: number) {
    //     page = p;
    //     load();
    // }

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

<!-- Data Table Powered by TanStack Table -->
<div class="rounded-md border">
    <Table.Root>
        <Table.Header>
            {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
            <Table.Row>
                {#each headerGroup.headers as header (header.id)}
                <Table.Head colspan={header.colSpan}>
                    {#if !header.isPlaceholder}
                    <FlexRender content={header.column.columnDef.header} context={header.getContext()} />
                    {/if}
                </Table.Head>
                {/each}
            </Table.Row>
            {/each}
        </Table.Header>
        <Table.Body>
            {#each table.getRowModel().rows as row (row.id)}
            <Table.Row data-state={row.getIsSelected() && "selected"}>
                {#each row.getVisibleCells() as cell (cell.id)}
                <Table.Cell>
                    <FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
                </Table.Cell>
                {/each}
            </Table.Row>
            {:else}
            <Table.Row>
                <Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
            </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>

<!-- <Pagination.Root count={ table.getRowCount() } perPage = { pagination.pageSize }> -->
<Pagination.Root bind:page={ pagination.pageIndex }>
    <!-- {#snippet children({ pages, currentPage = table.getState().pagination.pageIndex + 1 })} -->
    <Pagination.Content>
        <Pagination.Item>
            <Pagination.PrevButton 
                onclick={ () => table.previousPage() } 
                disabled={ !table.getCanPreviousPage() }
                class="cursor-pointer">
                <ChevronLeftIcon class="size-4" />
            </Pagination.PrevButton>
        </Pagination.Item>
        <!-- {#each pages as page (page.key)}
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
        {/each} -->
        <Pagination.Item>
            <Pagination.NextButton 
                onclick={ () => table.nextPage() } 
                disabled={ !table.getCanNextPage() }
                class="cursor-pointer">
                <ChevronRightIcon class="size-4" />
            </Pagination.NextButton>
        </Pagination.Item>
    </Pagination.Content>
    <!-- {/snippet} -->
</Pagination.Root>

<!-- Data Table Displaying Animal Records -->
<!-- <Table.Root width="100%">
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
</Table.Root> -->

<!-- Pagination controls -->
<!-- <Pagination.Root count={ total } bind:page={ getPage, setPage } perPage={ size } >
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
</Pagination.Root> -->

<!-- <style>
    :root {
        padding: 1rem;
    }
</style> -->

