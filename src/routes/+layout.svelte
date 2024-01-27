<script lang="ts">
  import "../app.pcss";
  import Nav from "@/components/Nav.svelte";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
</script>

<div>
  <Nav info={data.info} />
  <slot />
</div>
