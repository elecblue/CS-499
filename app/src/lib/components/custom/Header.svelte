<script lang="ts">
    import { GithubIcon } from "@lucide/svelte";
    // No script logic needed for this header component
</script>
<div class="inset-x-0 header">
    <div class="flex h-14 items-center justify-between gap-8 px-4 sm:px-6">
        <div class="flex items-center gap-4">
            <a class="shrink-0" aria-label="Home" href="/">
                Rescue-Mate
            </a>
        </div>
        <div class="flex items-center gap-6 max-md:hidden">
            <a href="https://github.com/elecblue/CS-499/tree/main/app" target="_blank" rel="noopener noreferrer">
                <GithubIcon strokeWidth={ 1 } class="size-5 fill-black/20 dark:fill-gray-400" />
            </a>
        </div>
    </div>
</div>