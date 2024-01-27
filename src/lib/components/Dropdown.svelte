<script lang="ts">
  import { Check, ChevronsUpDown } from "lucide-svelte";
  import * as Command from "$lib/components/ui/command";
  import * as Popover from "$lib/components/ui/popover";
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";
  import { tick } from "svelte";

  export let name: string | null = null;
  export let value: string | null = null;
  export let none: boolean = false;

  export let data: {
    label: string;
    value: string;
  }[];

  $: rows = data;
  let open = false;
  let noneView = "--";

  $: selectedValue = data.find((f) => f.value === value)?.label ?? noneView;

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the rest of the form with the keyboard.
  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }
</script>

<Popover.Root bind:open let:ids>
  <Popover.Trigger asChild let:builder>
    <Button
      builders={[builder]}
      variant="outline"
      role="combobox"
      aria-expanded={open}
      class="w-full justify-between"
      type="button"
    >
      <input bind:value {name} type="hidden" />
      {selectedValue}
      <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </Popover.Trigger>
  <Popover.Content class="p-1 w-[80%]">
    <Command.Root>
      <Command.Input />
      <Command.Empty>No Data</Command.Empty>
      <Command.Group class="max-h-80 overflow-scroll">
        {#if none}
          <Command.Item
            onSelect={() => {
              value = null;
              closeAndFocusTrigger(ids.trigger);
            }}
          >
            <Check
              class={cn("mr-2 h-4 w-4", value !== null && "text-transparent")}
            />
            {noneView}</Command.Item
          >
        {/if}
        {#each rows as row}
          <Command.Item
            onSelect={() => {
              value = row.value.length > 0 ? row.value : null;
              closeAndFocusTrigger(ids.trigger);
            }}
          >
            <Check
              class={cn(
                "mr-2 h-4 w-4",
                value !== row.value && "text-transparent",
              )}
            />
            {row.label}
          </Command.Item>
        {/each}
      </Command.Group>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
