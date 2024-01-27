<script lang="ts">
  import { Calendar as CalendarIcon } from "lucide-svelte";
  import {
    DateFormatter,
    getLocalTimeZone,
    parseDate,
    type DateValue,
  } from "@internationalized/date";
  import { cn } from "$lib/utils";
  import { Button } from "$lib/components/ui/button";
  import { Calendar } from "$lib/components/ui/calendar";
  import * as Popover from "$lib/components/ui/popover";

  const df = new DateFormatter("id-ID", {
    dateStyle: "long",
  });

  export let name: string | null = null;
  export let dateValue: DateValue|undefined = parseDate(new Date().toISOString().split('T')[0]);
</script>

<Popover.Root openFocus>
  <Popover.Trigger asChild let:builder>
    <Button
      type="button"
      variant="outline"
      class={cn(
        "w-full justify-start text-left font-normal",
        !dateValue && "text-muted-foreground",
      )}
      builders={[builder]}
    >
      <input type="date" class="hidden" value={dateValue} {name} />
      <CalendarIcon class="mr-2 h-4 w-4" />
      {dateValue
        ? df.format(dateValue.toDate(getLocalTimeZone()))
        : "Select a date"}
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-auto p-0">
    <Calendar
      bind:value={dateValue}
      initialFocus
    />
  </Popover.Content>
</Popover.Root>
