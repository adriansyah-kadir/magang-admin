<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Button } from "$lib/components/ui/button";
  import type { AbsenMasuk, AbsenPulang } from "@prisma/client";

  export let dataAbsen: AbsenMasuk|AbsenPulang|null;
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button variant={dataAbsen == null ? "ghost" : "outline"} builders={[builder]}>
    {dataAbsen ==  null ? "-" : "Cek"}
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>Actions</DropdownMenu.Label>
      <DropdownMenu.Item>Check Location</DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
