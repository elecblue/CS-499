<script lang="ts" generics="TData, TValue">
    import { 
        type CoreOptions,
        type ColumnDef,
        type TableOptions,
        type PaginationState, 
        type ColumnFiltersState,
        type ColumnHelper,
        type RowSelectionState,
        type FilterFn,
        type GlobalFilterTableState,
        type GlobalFilterInstance,
        getCoreRowModel, 
        getPaginationRowModel, 
        getFilteredRowModel,
    } from "@tanstack/table-core";

    // Icon imports
    import { ChevronLeftIcon, ChevronRightIcon } from "@lucide/svelte";

    // UI component imports
    import { createSvelteTable as cST, FlexRender } from "$lib/components/ui/data-table";
    import { ScrollArea } from "$lib/components/ui/scroll-area/index";
    import * as Card from "$lib/components/ui/card/index";
    import * as Table from "$lib/components/ui/table/index";
    import * as Pagination from "$lib/components/ui/pagination/index";
    import * as Field from "$lib/components/ui/field/index";
    import * as Select from "$lib/components/ui/select/index";
    import { Input } from "$lib/components/ui/input/index";
    import { Button } from "$lib/components/ui/button/index";

    // Logic and custom object imports
    import { filterState, filterBreeds, filterOptions } from '$lib/filters.svelte';
    import type { FilterValue } from "$lib/models";
    import { dev } from "$app/environment";
    import { goto } from "$app/navigation";

    type DataTableProps<TData, TValue> = {
        columns: ColumnDef<any, any>[];
        data: TData[];
    };

    let { data, columns }: DataTableProps<TData, TValue> = $props();
    let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 25 });
    let rowSelection = $state<RowSelectionState>({});
    //let columnFilters = $state<ColumnFiltersState>([]);
    let filterValue = $state("All");

    const table = cST({
        get data() {
            return data;
        },
        columns,
        state: {
            get pagination() {
                return pagination;
            },
            get rowSelection() {
                return rowSelection;
            },
            // get columnFilters() {
            //     return columnFilters;
            // },
        },
        onPaginationChange: (updater) => {
            if (typeof updater === "function") {
                pagination = updater(pagination);
            } else {
                pagination = updater;
            }
        },
        onRowSelectionChange: (updater) => {
            if (typeof updater === "function") {
                rowSelection = updater(rowSelection);
            } else {
                rowSelection = updater;
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        //getFilteredRowModel: getFilteredRowModel(),
        enableRowPinning: true,
        enableRowSelection: true,
        debugAll: false,
        debugTable: false,
        debugHeaders: false,
        debugColumns: false,
    });

    function getFilterLabel(value: FilterValue) {
        const option = filterOptions.find(opt => opt.value === value);
        if (dev) console.log("Getting label for filter value: ", value, option);
        return option ? option.label : "All Animals";
    }

    /**
     * Update the filter and modify the URL query parameters accordingly.
     * @param selection
     */
    function updateFilter(selection: FilterValue) {
        // Logic to update filters based on selected options
        if (selection === "All") {
            goto(`?`);  // Clear filter param
        } else {
            goto(`?filter=${selection.toLowerCase()}`);  // Update filter param with selection
        }

        filterValue = selection;
        if (dev) console.log("Filter updated to: ", filterValue);
    }

    // function logTableState() {
    //     let tableLength = data.length
    //     console.log("DataTable mounted with data:", tableLength);
    //     console.log("Can go to next page? ", table.getCanNextPage());
    //     console.log($state.snapshot(pagination));
    //     console.log(data);
    // };

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

<!-- <DataSearchFilters bind:value={ filterValue } /> -->

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
                        <Select.Root type="single" bind:value={ filterValue } onValueChange={ () => updateFilter(filterValue as FilterValue) }>
                            <Select.Trigger class="w-fit cursor-pointer" aria-label="Select Dataset">
                                <span>{ getFilterLabel(filterValue as FilterValue) }</span>
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

<!-- Data Table Powered by TanStack Table -->
 <Card.Root class="max-w-full m-4 bg-card">
    <Card.Header>
        <Card.Title>Rescue Animal Data</Card.Title>
        <Card.Description>Browse database of { table.getRowCount() } animals.</Card.Description>
    </Card.Header>
    <Card.Content>
        <ScrollArea orientation="both" class="w-full max-w-full h-100 rounded-md border">
            <div class="box-border rounded-md">
                <Table.Root>
                    <Table.Header>
                        {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
                        <Table.Row>
                            {#each headerGroup.headers as header (header.id)}
                            <Table.Head colspan={header.colSpan} class="p-3">
                                {#if !header.isPlaceholder}
                                    {#if header.column.getIsFirstColumn()}
                                    <div class="pr-4">
                                        <FlexRender content={header.column.columnDef.header} context={header.getContext()} />
                                    </div>
                                    {:else}
                                    <FlexRender content={header.column.columnDef.header} context={header.getContext()} />
                                    {/if}
                                {/if}
                            </Table.Head>
                            {/each}
                        </Table.Row>
                        {/each}
                    </Table.Header>
                    <Table.Body>
                        {#each table.getPaginationRowModel().rows as row (row.id)}
                        <Table.Row data-state={row.getIsSelected() && "selected"}>
                            {#each row.getVisibleCells() as cell (cell.id)}
                            <Table.Cell class="p-3">
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
        </ScrollArea>
        <Pagination.Root 
            count={ table.getRowCount() } 
            perPage = { table.getState().pagination.pageSize } 
            class="mt-4">
            {#snippet children({ pages, currentPage })}
            <Pagination.Content>
                <Pagination.Item>
                    <Pagination.PrevButton 
                        onclick={ () => table.previousPage() } 
                        disabled={ !table.getCanPreviousPage() }
                        class="cursor-pointer">
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
                            <Pagination.Link { page } 
                                onclick={ () => table.setPageIndex( (page.value) ? (page.value - 1) : 0 ) } 
                                isActive={ (table.getState().pagination.pageIndex + 1) === page.value } class="cursor-pointer" >
                                { page.value }
                            </Pagination.Link>
                        </Pagination.Item>
                    {/if}
                {/each}
                <Pagination.Item>
                    <Pagination.NextButton 
                        onclick={ () => table.nextPage() } 
                        disabled={ !table.getCanNextPage() }
                        class="cursor-pointer">
                        <ChevronRightIcon class="size-4" />
                    </Pagination.NextButton>
                </Pagination.Item>
            </Pagination.Content>
            {/snippet}
        </Pagination.Root>
    </Card.Content>
</Card.Root>
