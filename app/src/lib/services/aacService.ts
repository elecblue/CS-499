import { SearchQuery, PagedResult, Animal } from "$lib/models";
import { countAAC, searchAAC } from "$lib/repository/aacRepo";

export async function listAAC(raw: unknown) {
    const q = SearchQuery.parse(raw);
    const page = q.page;
    const size = q.size;
    const skip = (page - 1) * size;

    const [total, itemsRaw] = await Promise.all([
        countAAC(q),
        searchAAC(q, skip, size),
    ]);

    // Validate each row against your Animal zod schema
    const items = itemsRaw.map((r) => Animal.parse(r));

    return PagedResult(Animal).parse({
        items,
        total,
        page,
        size,
    });
}
