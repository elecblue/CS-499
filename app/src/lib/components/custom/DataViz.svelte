<script lang="ts">
    // Svelte/SvelteKit imports
    import { page } from "$app/state";
    import { dev } from "$app/environment";
    import { onMount } from "svelte";
    import { getDistribution } from "$lib/services/aac.remote";

    // Icon imports

    // Component imports
    import * as Card from "$lib/components/ui/card/index";
    import * as Chart from "$lib/components/ui/chart/index";
    import { Skeleton } from "$lib/components/ui/skeleton/index";
    import { group, sum } from "d3-array";
    import { ArcChart, PieChart, Text } from "layerchart";
    import { format } from "@layerstack/utils";

    // State variables
    const filter = $derived(page.url.searchParams.get("filter") || "all");

    // Chart configuration
    let container: HTMLDivElement;
    const charConfig = {
        desktop: {
            label: "Breed Distribution",
            color: "var(--primary)",
        }
    } satisfies Chart.ChartConfig;

    onMount(() => {
        if (dev) console.log("DataViz component mounted");
    })
</script>

<Card.Root class="flex-auto grow-0 bg-card rounded-lg">
    <Card.Header>
        <Card.Title>{charConfig.desktop.label}</Card.Title>
        <Card.Description>Visualize breed distribution for your selected rescue type.</Card.Description>
    </Card.Header>
    <Card.Content class="flex flex-col justify-center items-center self-center">
        <Chart.Container config={ charConfig } class="min-h-64 h-full self-center">
        {#await getDistribution(filter)}
            <Skeleton class="w-full h-64 rounded-full" />
        {:then chartData}
            <PieChart 
                data={ chartData.series } 
                key="label" 
                value="value" 
                innerRadius={-40}
                cornerRadius={5}
                padAngle={0.01}
                cRange={[
                    "var(--chart-1)",
                    "var(--chart-2)",
                    "var(--chart-3)",
                    "var(--chart-4)",
                    "var(--chart-5)",
                ]}
            >
                {#snippet aboveMarks()}
                    <Text
                        value={ format(sum(chartData.series, (d) => d.value)) }
                        textAnchor="middle"
                        verticalAnchor="middle"
                        class="text-4xl"
                        dy={4}
                    />
                    <Text
                        value="total"
                        textAnchor="middle"
                        verticalAnchor="middle"
                        class="text-xl text-muted-foreground"
                        dy={26}
                    />
                {/snippet}
            </PieChart>
        {:catch error}
            <p>Error loading chart data: {error.message}</p>
        {/await}
        </Chart.Container>
    </Card.Content>
</Card.Root>