<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import { Button } from "$lib/components/ui/button";
</script>

<Dialog.Root>
  <Dialog.Trigger>
    {#if $$slots.trigger}
      <slot name="trigger" />
    {:else}
      <Button>Open</Button>
    {/if}
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Tambah Data</Dialog.Title>
      <!--<Dialog.Description>-</Dialog.Description> !-->
      <slot />
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
