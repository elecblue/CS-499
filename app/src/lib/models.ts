import { z } from 'zod';

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

export const SearchQuery = z.object({
  species: z.string().optional(),
  breed: z.string().optional(),
  outcome: z.string().optional(),
  location: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  size: z.coerce.number().int().min(1).max(200).default(25)
});
export type SearchQuery = z.infer<typeof SearchQuery>;

export const PagedResult = <T extends z.ZodTypeAny>(item: T) =>
    z.object({
        items: z.array(item),
        total: z.number().int().min(0),
        page: z.number().int().min(1),
        size: z.number().int().min(1).max(200)
    });
export type PagedResult<T> = z.infer<ReturnType<typeof PagedResult<z.ZodTypeAny>>>;