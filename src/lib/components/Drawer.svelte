<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer";
  import { Button } from "./ui/button";
</script>

<Drawer.Root>
  <Drawer.Trigger>
    {#if $$slots.trigger}
      <slot name="trigger" />
    {:else}
      <Button>Open</Button>
    {/if}
  </Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Are you sure absolutely sure?</Drawer.Title>
      <Drawer.Description>This action cannot be undone.</Drawer.Description>
    </Drawer.Header>
    <slot/>
    <Drawer.Footer>
      <Button>Submit</Button>
      <Drawer.Close>Cancel</Drawer.Close>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>
