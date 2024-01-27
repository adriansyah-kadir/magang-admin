<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import { Button } from "@/components/ui/button";
  import type { ActionData } from "./$types";
  import DataTable from "./data-table.svelte";
  import FormTambahData from "./form-tambah-data.svelte";
  import AlertDialog from "@/components/AlertDialog.svelte";
  import Dialog from "@/components/Dialog.svelte";
  import FormFilterAbsen from "./FormFilterAbsen.svelte";

  export let form: ActionData;

  let error = false;
  $: error = (form?.tambah?.error ?? []).length > 0;
</script>

<AlertDialog
  open={!!form?.tambah}
  title={`Tambah Absen ${error ? "Gagal" : "Sukses"}`}
  {error}
>
  {#each form?.tambah?.error ?? [] as err}
    <p class="text-red-600">{err.path}: {err.message}</p>
  {/each}
</AlertDialog>

<div class="p-10">
  <Card.Root class="bg-white rounded-md shadow-md">
    <Card.Header>
      <Card.Title class="text-3xl">Data Absensi</Card.Title>
    </Card.Header>
    <Card.Content>
      <FormFilterAbsen {form} />
      {#key form}
        <DataTable data={form?.data?.absensi}>
          <svelte:fragment slot="actions">
            <Button color="green" variant="outline">Download Report</Button>
            <Dialog>
              <svelte:fragment slot="trigger">
                <Button>Tambah Data</Button>
              </svelte:fragment>
              <FormTambahData
                anggota={form?.data?.anggota}
                notes={form?.data?.notes.map(e => e.nama)}
              />
            </Dialog>
          </svelte:fragment>
        </DataTable>
      {/key}
    </Card.Content>
  </Card.Root>
</div>
