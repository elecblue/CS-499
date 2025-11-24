<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from "mode-watcher";
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="favicon.png" sizes="94x94" />
</svelte:head>

<ModeWatcher />

{@render children()}
