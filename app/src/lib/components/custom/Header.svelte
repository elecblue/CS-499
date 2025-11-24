<script lang="ts">
    import { GithubIcon, PawPrintIcon } from "@lucide/svelte";
    // No script logic needed for this header component
</script>
<div class="inset-x-0 bg-muted header">
    <div class="flex h-14 items-center justify-between gap-8 px-4 sm:px-6">
        <div class="flex items-center gap-4">
            <a class="shrink-0" aria-label="Home" href="/">
                <PawPrintIcon strokeWidth={ 1.4 } class="size-8 fill-primary-background stroke-primary dark:fill-primary-background dark:stroke-primary" />
            </a>
            <a href="/" class="text-2xl font-semibold text-primary dark:text-primary header-text-border text-shadow-(--header-shadow)">Rescue-Mate</a>
        </div>
        <div class="flex items-center gap-6 max-md:hidden">
            <a href="https://github.com/elecblue/CS-499/tree/main/app" target="_blank" rel="noopener noreferrer">
                <GithubIcon strokeWidth={ 1.4 } class="size-6 fill-background dark:fill-background stroke-primary dark:stroke-primary" />
            </a>
        </div>
    </div>
</div>

<style>
    :root {
        .header-text-border {
            /* text-shadow: var(--header-text-border-setup); */
            -webkit-text-stroke: calc(var(--text-border-width) * 0) var(--shadow-primary);
        }
    }
</style>