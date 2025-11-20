import { z } from 'zod';
import type { ColumnDef } from '@tanstack/table-core';

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
  species: z.string().optional(),
  breed: z.string().optional(),
  outcome: z.string().optional(),
  location: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  size: z.coerce.number().int().min(1).max(200).default(25)
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
        size: z.number().int().min(1).max(200)
    });
export type PagedResult<T> = z.infer<ReturnType<typeof PagedResult<z.ZodTypeAny>>>;

// Tanstack Table column definitions

export const animalColumns: ColumnDef<Animal>[] = [
  {
    accessorKey: 'recNum',
    header: 'Record #'
  },
  {
    accessorKey: 'animalId',
    header: 'Animal ID'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'animalType',
    header: 'Species'
  },
  {
    accessorKey: 'breed',
    header: 'Breed'
  },
  {
    accessorKey: 'dateOfBirth',
    header: 'Date of Birth'
  },
  {
    accessorKey: 'ageUponOutcome',
    header: 'Age at Outcome'
  },
  {
    accessorKey: 'ageUponOutcomeInWeeks',
    header: 'Age in Weeks'
  },
  {
    accessorKey: 'color',
    header: 'Color'
  },
  {
    accessorKey: 'datetime',
    header: 'Datetime'
  },
  {
    accessorKey: 'monthyear',
    header: 'Date'
  },
  {
    accessorKey: 'outcomeType',
    header: 'Outcome'
  },
  {
    accessorKey: 'outcomeSubtype',
    header: 'Outcome Subtype'
  },
  {
    accessorKey: 'sexUponOutcome',
    header: 'Sex'
  },
  {
    accessorKey: 'locationLong',
    header: 'Longitude'
  },
  {
    accessorKey: 'locationLat',
    header: 'Latitude'
  }
]