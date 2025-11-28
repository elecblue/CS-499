<script lang="ts">
    import { setMode, mode, systemPrefersMode } from "mode-watcher";

    import { Sun, Moon, SunMoon } from "@lucide/svelte";
    import * as ToggleGroup from "$lib/components/ui/toggle-group/index";

    let toggleStore = $state(mode.current);

    function checkToggleState() {
        if (systemPrefersMode.current === mode.current) {
            setMode("system");
        } else {
            toggleStore = mode.current;
        }
        console.log("Current mode:", mode.current);
    }
</script>

<footer class="row-start-5 grid lg:col-start-3">
    <div class="px-2 pt-10 pb-24">
        <div class="mx-auto flex w-full flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 max-w-2xl lg:max-w-5xl">
            <ToggleGroup.Root bind:value={toggleStore} onValueChange={checkToggleState}
                type="single" variant="outline" 
                class="relative z-0 inline-grid grid-cols-2 gap-0.5 rounded-lg bg-gray-200/70 p-0.75 text-gray-950 dark:bg-white/10 dark:text-white">
                <!-- <ToggleGroup.Item value="system" class="cursor-pointer" onclick={ () => setMode("system") }>
                    <SunMoon class="size-4" />
                </ToggleGroup.Item> -->
                <ToggleGroup.Item value="light" class="cursor-pointer" onclick={ () => setMode("light") }>
                    <Sun class="size-4" />
                </ToggleGroup.Item>
                <ToggleGroup.Item value="dark" class="cursor-pointer" onclick={ () => setMode("dark") }>
                    <Moon class="size-4" />
                </ToggleGroup.Item>
            </ToggleGroup.Root>
            <div class="flex flex-col gap-4 text-sm/6 text-gray-700 sm:flex-row sm:gap-2 sm:pr-4 dark:text-gray-400">
                <span>Built by Nik Myers at SNHU</span>
                <span class="max-sm:hidden">•</span>
                <a href="https://github.com/elecblue/CS-499/tree/main/app" target="_blank" class="hover:underline">GitHub</a>
            </div>
        </div>
    </div>
</footer>