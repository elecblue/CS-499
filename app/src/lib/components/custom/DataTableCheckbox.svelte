<script lang="ts">
    import type { ComponentProps } from "svelte";
    import { Checkbox } from "$lib/components/ui/checkbox/index";

    let {
        checked = false,
        onCheckedChange = (v) => (checked = v),
        ...restProps
    }: ComponentProps<typeof Checkbox> = $props();

    function selectChecker() {
        console.log("Checkbox clicked");
        onCheckedChange(!checked);
    }
</script>

<Checkbox bind:checked={ () => checked, onCheckedChange } 
    { ...restProps } class="cursor-pointer" />