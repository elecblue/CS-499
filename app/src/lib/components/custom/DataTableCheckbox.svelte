<script lang="ts">
    import type { ComponentProps } from "svelte";
    import { Checkbox } from "$lib/components/ui/checkbox/index";

    let {
        checked = false,
        onCheckedChange = (v) => (checked = v),
        ...restProps
    }: ComponentProps<typeof Checkbox> = $props();

    function selectChecker(checked: boolean) {
        console.log("Checkbox clicked", checked);
        onCheckedChange(!!checked);
    }
</script>

<Checkbox bind:checked={ () => checked, selectChecker } 
    { ...restProps } class="cursor-pointer" />