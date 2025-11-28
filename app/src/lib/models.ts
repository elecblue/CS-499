import { z } from 'zod';
import type { ColumnDef, FilterFn } from '@tanstack/table-core';
import { createColumnHelper } from '@tanstack/table-core';
import { renderComponent } from './components/ui/data-table';
import DataTableCheckbox from "$lib/components/custom/DataTableCheckbox.svelte";

// Zod schemas
/** 
 * Animal Zod schema representing the structure of an animal record.
*/
export const Animal = z.object({
  recNum: z.number().int(),
  ageUponOutcome: z.string().nullable(),
  animalId: z.string(),
  animalType: z.string().nullable(),
  breed: z.string().nullable(),
  color: z.string().nullable(),
  dateOfBirth: z.string().nullable(),
  datetime: z.string().nullable(),
  monthyear: z.string().nullable(),
  name: z.string().nullable(),
  outcomeSubtype: z.string().nullable(),
  outcomeType: z.string().nullable(),
  sexUponOutcome: z.string().nullable(),
  locationLat: z.number().nullable(),
  locationLong: z.number().nullable(),
  ageUponOutcomeInWeeks: z.number().nullable(),
});
export type Animal = z.infer<typeof Animal>;

/**
 * SearchQuery Zod schema representing the structure of search query parameters.
 */
export const SearchQuery = z.object({
  filter: z.string().optional(),
  species: z.string().optional(),
  breed: z.string().optional(),
  outcome: z.string().optional(),
  location: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  size: z.coerce.number().int().min(1).default(25)
});
export type SearchQuery = z.infer<typeof SearchQuery>;

/**
 * PagedResult Zod schema representing a paginated result set.
 */
export const PagedResult = <T extends z.ZodTypeAny>(item: T) =>
    z.object({
        items: z.array(item),
        total: z.number().int().min(0),
        page: z.number().int().min(1),
        size: z.number().int().min(1)//.max(200)
    });
export type PagedResult<T> = z.infer<ReturnType<typeof PagedResult<z.ZodTypeAny>>>;

export const FilterValue = z.enum(["All", "Disaster", "Mountain", "Water"]).default("All");
export type FilterValue = z.infer<typeof FilterValue>;

export const FilterOptions = z.strictObject({
  value: z.enum(["All", "Disaster", "Mountain", "Water"]).default("All"),
  label: z.string()
});
export type FilterOptions = z.infer<typeof FilterOptions>;

// Tanstack Table column definitions

export const columnHelper = createColumnHelper<Animal>();
export const animalColumn = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => renderComponent(DataTableCheckbox, {
      checked: table.getIsAllPageRowsSelected(),
      indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
      onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
      "aria-label": "Select all rows",
    }),
    cell: ({ row }) => renderComponent(DataTableCheckbox, {
      checked: row.getIsSelected(),
      onCheckedChange: (value) => row.toggleSelected(!!value),
      "aria-label": `Select row ${row.index + 1}`,
    }),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.display({
    id: 'recordNumber',
    header: 'Record #',
    footer: props => props.column.id,
    cell: info => info.row.original.recNum
  }),
  columnHelper.group({
    header: 'Identification',
    footer: props => props.column.id,
    columns: [
      columnHelper.accessor('animalId', {
        cell: info => info.getValue(),
        footer: props => props.column.id,
      }),
      columnHelper.accessor('name', {
        cell: info => info.getValue(),
        footer: props => props.column.id,
      }),
    ]
  }),
  columnHelper.accessor('animalType', {
    header: 'Species',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('breed', {
    header: 'Breed',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('dateOfBirth', {
    header: 'Date of Birth',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('ageUponOutcome', {
    header: 'Age at Outcome',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('ageUponOutcomeInWeeks', {
    header: 'Age in Weeks',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('color', {
    header: 'Color',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('datetime', {
    header: 'Datetime',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('monthyear', {
    header: 'Date',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('outcomeType', {
    header: 'Outcome',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('outcomeSubtype', {
    header: 'Outcome Subtype',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('sexUponOutcome', {
    header: 'Sex',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('locationLong', {
    header: 'Longitude',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('locationLat', {
    header: 'Latitude',
    cell: info => info.getValue(),
  }),
];

const filterBreeds: FilterFn<Animal> = (row, columnId, value, addMeta) => {
  const rowValue = row.getValue(columnId);

  if (Array.isArray(value)) {
      return value.includes(rowValue) || value.includes(rowValue + " Mix");
  } else {
      return false;
  }
}

export const animalColumns: ColumnDef<Animal>[] = [
  {
    id: 'select',
    header: ({ table }) => renderComponent(DataTableCheckbox, {
      checked: table.getIsAllPageRowsSelected(),
      indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
      onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
      "aria-label": "Select all rows",
    }),
    cell: ({ row }) => renderComponent(DataTableCheckbox, {
      checked: row.getIsSelected(),
      onCheckedChange: (value) => row.toggleSelected(!!value),
      "aria-label": `Select row ${row.index + 1}`,
    }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'recNum',
    header: 'Record #',
    cell: ({ row }) => row.original.recNum
  },
  {
    accessorKey: 'animalId',
    header: 'Animal ID',
    cell: ({ row }) => row.original.animalId
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => row.original.name
  },
  {
    accessorKey: 'animalType',
    header: 'Species',
    cell: ({ row }) => row.original.animalType
  },
  {
    accessorKey: 'breed',
    header: 'Breed',
    cell: ({ row }) => row.original.breed,
    filterFn: filterBreeds
  },
  {
    accessorKey: 'dateOfBirth',
    header: 'Date of Birth',
    cell: ({ row }) => row.original.dateOfBirth
  },
  {
    accessorKey: 'ageUponOutcome',
    header: 'Age at Outcome',
    cell: ({ row }) => row.original.ageUponOutcome
  },
  {
    accessorKey: 'ageUponOutcomeInWeeks',
    header: 'Age in Weeks',
    cell: ({ row }) => row.original.ageUponOutcomeInWeeks
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => row.original.color
  },
  {
    accessorKey: 'datetime',
    header: 'Datetime',
    cell: ({ row }) => row.original.datetime
  },
  {
    accessorKey: 'monthyear',
    header: 'Date',
    cell: ({ row }) => row.original.monthyear
  },
  {
    accessorKey: 'outcomeType',
    header: 'Outcome',
    cell: ({ row }) => row.original.outcomeType
  },
  {
    accessorKey: 'outcomeSubtype',
    header: 'Outcome Subtype',
    cell: ({ row }) => row.original.outcomeSubtype
  },
  {
    accessorKey: 'sexUponOutcome',
    header: 'Sex',
    cell: ({ row }) => row.original.sexUponOutcome
  },
  {
    accessorKey: 'locationLong',
    header: 'Longitude',
    cell: ({ row }) => row.original.locationLong
  },
  {
    accessorKey: 'locationLat',
    header: 'Latitude',
    cell: ({ row }) => row.original.locationLat,
  }
];