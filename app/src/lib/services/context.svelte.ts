import type { Animal } from "$lib/models";
import { getContext, setContext, createContext } from "svelte";

const CONTEXT_KEY = "map_context";

// export function setMapContext(animal: Animal) {
//     return setContext<Animal>(CONTEXT_KEY, animal);
// }

// export function getMapContext() {
//     return getContext<Animal>(CONTEXT_KEY);
// }

// export const [getMapContext, setMapContext] = createContext<Animal>();

const MAP_CONTEXT_KEY = Symbol("map_context");

export class MapContext {
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

    get name() {
        return this.selected.name ?? "Unknown";
    }

    get location() {
        return {
            lon: this.selected.locationLong ?? 0,
            lat: this.selected.locationLat ?? 0,
        };
    }

    update(animal: Animal) {
        this.selected = animal;
    }
}

export function setMapContext() {
    const context = new MapContext();
    setContext(MAP_CONTEXT_KEY, context);
    return context;
}

export function getMapContext() {
    const context = getContext<MapContext>(MAP_CONTEXT_KEY);
    if (!context) {
        throw new Error("MapContext has not been set");
    }
    return context;
}