import { ChartPie, CodeXml, Component, Database, Dessert, MapPinned, Table, Variable, Wind, type Icon as IconType } from "@lucide/svelte";


/**
 * Generate an arithmetic sequence of numbers.
 *
 * Returns an array of numbers starting at `start` and incremented by `step`
 * until (but not including) `stop`. The sequence length is computed using
 * Math.ceil((stop - start) / step), so the returned values will never include
 * `stop` unless the sequence exactly lands on it.
 *
 * Examples:
 * - range(0, 5) -> [0, 1, 2, 3, 4]
 * - range(0, 6, 2) -> [0, 2, 4]
 * - range(5, 0, -1) -> [5, 4, 3, 2, 1]
 *
 * Remarks:
 * - `step` must be a non-zero finite number. Passing 0 will lead to an invalid
 *   array length (runtime error). If `step` has the wrong sign for the given
 *   `start`/`stop` (e.g. positive step when stop <= start), an empty array is returned.
 * - If `start === stop` the result is an empty array.
 *
 * @param start - The first value in the sequence.
 * @param stop - The exclusive upper (or lower, if step < 0) bound of the sequence.
 * @param step - The increment between successive values (defaults to 1). Must be non-zero.
 * @returns An array of numbers from `start` up to, but not including, `stop`, stepping by `step`.
 */
export const range = function _range(start: number, stop: number, step: number = 1) { 
    return Array.from(
        { length: Math.ceil((stop - start) / step) },
        (_, i) => start + i * step
    );
};

/**
 * Holds object of websites, link text, their URLs, and descriptions.
 */
type TechStack = {
    [key: string]: { 
        text: string;
        textColor?: string;
        url: string; 
        description: string; 
        icon?: typeof IconType;
        iconColor?: string;
    };
};

export const techStack: TechStack = {
    bun: {
        text: "Bun",
        textColor: "text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-pink-600",
        url: "https://bun.sh/",
        description: "Performant JavaScript/TypeScript runtime",
        icon: Dessert,
        iconColor: "text-pink-600",
    },
    svelte: {
        text: "Svelte + SvelteKit",
        textColor: "text-transparent bg-clip-text bg-linear-to-r from-red-400 to-red-700",
        url: "https://svelte.dev/",
        description: "Reactive web framework",
        icon: CodeXml,
        iconColor: "text-red-600",
    },
    tailwindcss: {
        text: "Tailwind CSS",
        textColor: "text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-sky-700",
        url: "https://tailwindcss.com/",
        description: "Utility-first CSS framework",
        icon: Wind,
        iconColor: "text-sky-400",
    },
    shadcn: {
        text: "ShadCN-Svelte",
        textColor: "text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-orange-700",
        url: "https://shadcn-svelte.com/",
        description: "Component library for Svelte",
        icon: Component,
        iconColor: "text-orange-600",
    },
    drizzle: {
        text: "Drizzle ORM",
        textColor: "text-transparent bg-clip-text bg-linear-to-r from-slate-500 to-sky-700",
        url: "https://orm.drizzle.team/",
        description: "TypeScript ORM for SQL databases",
        icon: Database,
        iconColor: "text-cyan-600",
    },
    table: {
        text: "TanStack Table",
        textColor: "text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-blue-500",
        url: "https://tanstack.com/table/v8",
        description: "Table & data grid library",
        icon: Table,
        iconColor: "text-blue-500",
    },
    layerchart: {
        text: "LayerChart",
        textColor: "text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-violet-500",
        url: "https://layerstack.com/layerchart",
        description: "Flexible charting library for Svelte",
        icon: ChartPie,
        iconColor: "text-pink-600",
    },
    d3js: {
        text: "D3.js",
        textColor: "text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-700",
        url: "https://d3js.org/",
        description: "Data visualization & manipulation library",
        icon: Variable,
        iconColor: "text-orange-500",
    },
    maplibre: {
        text: "Svelte MapLibre GL",
        textColor: "text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-700",
        url: "https://svelte-maplibre-gl.mierune.dev/",
        description: "Map rendering for Svelte",
        icon: MapPinned,
        iconColor: "text-teal-500",
    },
};  