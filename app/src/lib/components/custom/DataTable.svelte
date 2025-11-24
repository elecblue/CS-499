<script lang="ts" generics="TData, TValue">
    import { 
        type CoreOptions,
        type ColumnDef,
        type TableOptions,
        type PaginationState, 
        getCoreRowModel, 
        getPaginationRowModel, 
        type ColumnHelper,

        type RowSelectionState

    } from "@tanstack/table-core";
    //import { createSvelteTable } from "@tanstack/svelte-table";

    import { ChevronLeftIcon, ChevronRightIcon } from "@lucide/svelte";

    import { createSvelteTable as cST, FlexRender } from "$lib/components/ui/data-table";
    import { ScrollArea } from "$lib/components/ui/scroll-area/index";
    import * as Card from "$lib/components/ui/card/index";
    import * as Table from "$lib/components/ui/table/index";
    import * as Pagination from "$lib/components/ui/pagination/index";

    import { filterState } from '$lib/filters.svelte';

    type DataTableProps<TData, TValue> = {
        columns: ColumnDef<any, any>[];
        data: TData[];
    };

    let { data, columns }: DataTableProps<TData, TValue> = $props();
    let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 20 });
    let rowSelection = $state<RowSelectionState>({});

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
        enableRowPinning: true,
        enableRowSelection: true,
    });

    let { species, outcome, location, page, size, total } = filterState;

    const range = (start: number, stop: number, step: number = 1) => 
        Array.from({ length: Math.ceil((stop - start) / step) },
            (_, i) => start + i * step
        );

    function logTableState() {
        let tableLength = data.length
        console.log("DataTable mounted with data:", tableLength);
        console.log("Can go to next page? ", table.getCanNextPage());
        console.log($state.snapshot(pagination));
        console.log(data);
    };
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
                        {#each table.getRowModel().rows as row (row.id)}
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
        <Pagination.Root count={ table.getRowCount() } perPage = { table.getState().pagination.pageSize } class="mt-4">
            {#snippet children({ pages, currentPage = table.getState().pagination.pageIndex + 1 })}
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
                            <Pagination.Link { page } onclick={ () => table.setPageIndex(page.value - 1) } isActive={ currentPage === page.value } class="cursor-pointer" >
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
