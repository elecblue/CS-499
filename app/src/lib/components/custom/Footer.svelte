<script lang="ts">
    import { setMode, mode, systemPrefersMode } from "mode-watcher";

    import { Sun, Moon, SunMoon, Rabbit } from "@lucide/svelte";
    import { Button, buttonVariants } from "$lib/components/ui/button/index";
    import * as ToggleGroup from "$lib/components/ui/toggle-group/index";
    import * as Drawer from "$lib/components/ui/drawer/index";

    import { techStack } from "$lib/tools";

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
                <Drawer.Root open={ true }>
                    <Drawer.Trigger class="hover:underline hover:text-primary cursor-pointer">Credits</Drawer.Trigger>
                    <Drawer.Content>
                        <div class="mx-auto w-full max-w-sm">
                            <Drawer.Header>
                                <Drawer.Title>About This Project</Drawer.Title>
                                <Drawer.Description>
                                    Rescue-Mate is a project developed by Nik Myers for Southern New Hampshire University's Computer Science capstone (CS-499). Derived
                                    from CS-340's major project, it serves as an animal data explorer for rescue operations, allowing users to analyze and visualize animal rescue data.<br />
                                    <br />
                                    More information can be found in the repository.
                                </Drawer.Description>
                            </Drawer.Header>
                            <div class="px-4">
                                <div class="flex flex-col gap-y-1.5 items-start justify-center">
                                    <span class="font-semibold">Technologies Used</span>
                                    <ul class="font-normal list-none list-outside text-muted-foreground text-sm">
                                        {#each Object.values(techStack) as tech}
                                        {@const Icon = tech.icon}
                                            <li class="leading-7 hover:text-nowrap">
                                                <a href={tech.url} target="_blank" 
                                                    class="inline-block {tech.textColor ?? "text-amber-500"} transition-all hover:translate-x-2">
                                                    <Icon class="inline size-4 mr-1 {tech.iconColor ?? "text-amber-500"}" />
                                                    {tech.text}
                                                </a>
                                                <span class="ml-3">{tech.description}</span>
                                            </li>
                                        {/each}
                                    </ul>
                                    <span class="font-semibold">Data Sources</span>
                                    <div class="font-normal text-muted-foreground text-sm">
                                        The data source used is a cleaned-up snapshot of 
                                        <a href="https://data.austintexas.gov/Health-and-Community-Services/Austin-Animal-Center-Outcomes-10-01-2013-to-05-05-/9t4d-g238/about_data" target="_blank" class="text-amber-500 hover:underline">open data</a> 
                                        provided by the City of Austin, Texas. This dataset contains records from the <a href="https://www.austintexas.gov/department/animal-services" target="_blank" class="text-amber-500 hover:underline">Austin Animal Center</a>, 
                                        the largest no-kill shelter in the United States. The AAC provides shelter to more than 18,000 animals each year.
                                    </div>
                                </div>
                            </div>
                            <Drawer.Footer>
                                <Drawer.Close class="{buttonVariants({ variant: "outline" })} cursor-pointer">Close</Drawer.Close>
                            </Drawer.Footer>
                        </div>
                    </Drawer.Content>
                </Drawer.Root>
                <span class="max-sm:hidden">•</span>
                <a href="https://github.com/elecblue/CS-499/tree/main/app" target="_blank" class="hover:underline">GitHub</a>
            </div>
        </div>
    </div>
</footer>