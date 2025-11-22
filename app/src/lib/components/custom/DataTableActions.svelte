<script lang="ts">
    import { EllipsisIcon } from "@lucide/svelte";
    import { Button } from "$lib/components/ui/button/index";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index";

    let { id }: { id: string } = $props();
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger>
        {#snippet child({ props })}
        <Button {...props} variant="ghost" class="relative p-0 size-8 rounded-full">
            <span class="sr-only">Row actions</span>
            <EllipsisIcon class="size-5" />
        </Button>
        {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
        <DropdownMenu.Group>
            <DropdownMenu.Label>Actions</DropdownMenu.Label>
            <DropdownMenu.Item onclick={ () => navigator.clipboard.writeText(id) }>
                Placeholder action
            </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Placeholder two</DropdownMenu.Item>
        <DropdownMenu.Item>Placeholder three</DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>