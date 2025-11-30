/**
 * @file Defines filter state, options, and breed lists for the AAC application.
 * @author Nik Myers <nikolas.myers@snhu.edu>
 * @version 0.9.0
 */
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

/**
 * Object defining the breed lists for specific filters.
 */
export const filterBreeds = {
	water: ["Labrador Retriever", "Newfoundland", "Golden Retriever"],
	mountain: ["German Shepherd", "Siberian Husky", "Border Collie"],
	disaster: ["Doberman Pinscher", "German Shepherd", "Golden Retriever", "Bloodhound", "Rottweiler"]
};

class FilterService {
	static filters: FilterOptions[] = filterOptions;

	static getFilters() {
		return this.filters;
	}

	active = $state(FilterService.filters[0]);

	setActiveFilter(filter: FilterOptions) {
		this.active = filter;
	}
}

export const filterService = new FilterService();