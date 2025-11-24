import { createContext } from "svelte";
import { FilterOptions, FilterValue } from "./models";

export const [getFilterContext, setFilterContext] = createContext<FilterValue>();

export const filterState = $state({
	species: "",
	outcome: "",
	location: "",
	page: 1,
	size: 1000,
	total: 0
});

export const filterOptions: FilterOptions[] = [
	{ value: "All", label: "All Animals" },
	{ value: "Disaster", label: "Disaster Rescue" },
	{ value: "Mountain", label: "Mountain & Wilderness Rescue" },
	{ value: "Water", label: "Water Rescue" }
];