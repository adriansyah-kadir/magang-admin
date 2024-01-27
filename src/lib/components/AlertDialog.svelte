<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { Button } from "$lib/components/ui/button";

  export let title: string | null = null;
  export let desc: string | null = null;
  export let open: boolean = false;
  export let error = false;
</script>

<AlertDialog.Root {open}>
  <AlertDialog.Trigger>
    <slot name="trigger" />
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      {#if title != null}
        <AlertDialog.Title>{title}</AlertDialog.Title>
      {/if}
      {#if desc != null}
        <AlertDialog.Description>
          {desc}
        </AlertDialog.Description>
      {/if}
    </AlertDialog.Header>
    <slot />
    <AlertDialog.Footer>
      <Button variant={error ? "destructive" : "default"} on:click={() => open = false}>OK</Button>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
