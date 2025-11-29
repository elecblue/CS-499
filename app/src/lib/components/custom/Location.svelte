<script lang="ts">
    import { page } from "$app/state";
    import { dev } from "$app/environment";
    import { getMapContext } from "$lib/services/context.svelte";

    import * as Card from "$lib/components/ui/card/index";
    import { MapLibre, Marker, Popup } from 'svelte-maplibre-gl';

    let { selected = $bindable() } = $props();
    // let animal = $derived(selected);
    const context = getMapContext();
    let popupOpen = $state(true);
    let offset = $state(24);

    // let exampleCoord = $state({ 
    //     lon: -97.3408780722188,
    //     lat: 30.5066578739455,
    // });

    // let coordText = $derived(`(${exampleCoord.lat.toFixed(4)}, ${exampleCoord.lon.toFixed(4)})`);
    // let centerCoord = $derived.by(() => [context.location.lon, context.location.lat]);

    let offsets: maplibregl.Offset = $derived({
        top: [0, offset],
        bottom: [0, -offset],
        left: [offset + 12, 0],
        right: [-offset - 12, 0],
        center: [0, 0],
        'top-left': [offset, offset],
        'top-right': [-offset, offset],
        'bottom-left': [offset, -offset],
        'bottom-right': [-offset, -offset],
    })
</script>

<Card.Root class="flex-auto grow bg-card rounded-lg">
    <Card.Header>
        <Card.Title>Rescue Location</Card.Title>
        <Card.Description>View the rescue location of the selected animal on a map.</Card.Description>
    </Card.Header>
    <Card.Content>
        <MapLibre zoom={ 7 } center={[-97.3, 30.5]} class="h-[400px]" 
            minZoom={ 6 } maxZoom={ 9 }
            style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json">
            <Marker bind:lnglat={ context.location }>
                {#snippet content()}
                <div class="text-center leading-none">
                    <div class="text-3xl">📍</div>
                    <div class="font-base text-accent-foreground/80 drop-shadow-sm/20">({ context.location.lat.toFixed(4) }, { context.location.lon.toFixed(4) })</div>
                </div>
                {/snippet}
                <Popup class="rounded-lg text-black [&_button]:mr-2" bind:open={ popupOpen } offset={ offsets }>
                    <div class="font-medium">{context.name || "Unknown"}</div>
                    <div class="font-normal text-xs">{context.selected.animalId || "Unknown ID"}</div>
                    <div>Lat/Long: { context.location.lat.toFixed(4) }, { context.location.lon.toFixed(4) }</div>
                </Popup>
            </Marker>
        </MapLibre>
    </Card.Content>
</Card.Root>