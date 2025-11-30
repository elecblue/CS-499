/**
 * @file Exports contexts required to manage shared state across the app's components.
 * @author Nik Myers <nikolas.myers@snhu.edu>
 * @version 0.9.0
 */
import type { Animal } from "$lib/models";
import { getContext, setContext, createContext } from "svelte";

/**
 * Unique symbol key for the map context.
 * @constant
 */
const MAP_CONTEXT_KEY = Symbol("map_context");

/**
 * MapContext class to manage selected animal state in the map context.
 * Provides methods to get the name and location of the selected animal,
 * and to update the selected animal.
 * 
 * @property {Animal} selected - The currently selected animal.
 * @method name - Returns the name of the selected animal.
 * @method location - Returns the location (latitude and longitude) of the selected animal.
 * @method update - Updates the selected animal.
 */
export class MapContext {
    /** 
     * The currently selected animal. 
     * @type {Animal}
     */
    selected = $state<Animal>({
        recNum: 0,
        ageUponOutcome: "1 years",
        animalId: "A000000",
        animalType: "Humanoid",
        breed: "Romulan",
        color: "Gray",
        dateOfBirth: "2024-11-29",
        datetime: "2024-11-29 12:00:00Z",
        monthyear: "2024-11-29T12:00:00Z",
        name: "Zarlock",
        outcomeSubtype: "",
        outcomeType: "Return to Planet",
        sexUponOutcome: "Male",
        locationLat: 30.6586627849508,
        locationLong: -97.5814399775041,
        ageUponOutcomeInWeeks: 52,
    });

    /** 
     * Return the name of the currently selected animal. 
     * @returns {string} The name of the selected animal.
     */
    get name() {
        return this.selected.name ?? "Unknown";
    } 

    /** 
     * Return the location of the currently selected animal.
     * @returns { {number} } The longitude and latitude of the selected animal.
     */
    get location() {
        return {
            lon: this.selected.locationLong ?? 0,
            lat: this.selected.locationLat ?? 0,
        };
    }

    /** 
     * Update the selected animal. 
     * @param {Animal} animal - The new animal to select.
     * @this MapContext
     */
    update(animal: Animal) {
        this.selected = animal;
    }
}

/**
 * "Sets" the map context for sharing selection state across components.
 * This should be called from a "high-level" component, usually `+layout.svelte`.
 * 
 * @returns {MapContext} The shared `MapContext` object to components to subscribe to and manage state
 */
export function setMapContext() {
    const context = new MapContext();
    setContext(MAP_CONTEXT_KEY, context);
    return context;
}

/**
 * "Gets" the map context for sharing selection state across components.
 * This should be called from any component needing access to the shared map state, including
 * the component sending the state and any receiving it.
 * 
 * Currently called in `DataTable.svelte` and `Location.svelte`.
 * 
 * @returns {MapContext} The shared `MapContext` object for managing state
 */
export function getMapContext() {
    const context = getContext<MapContext>(MAP_CONTEXT_KEY);

    if (!context) {
        throw new Error("MapContext has not been set");
    }

    return context;
}