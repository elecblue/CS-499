<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from "mode-watcher";
	import { setMapContext } from '$lib/services/context.svelte';
	
	let { children } = $props();

	const selected = setMapContext();
</script>

<svelte:head>
	<link rel="icon" href="favicon.png" sizes="94x94" />
</svelte:head>

<ModeWatcher />

{@render children()}
