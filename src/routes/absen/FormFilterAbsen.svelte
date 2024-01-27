<script lang="ts">
  import { enhance } from "$app/forms";
  import { Label } from "@/components/ui/label";
  import type { ActionData } from "./$types";
  import Dropdown from "@/components/Dropdown.svelte";
  import { Button } from "@/components/ui/button";
  import DatePicker from "@/components/DatePicker.svelte";
  import { onMount } from "svelte";
  import { CalendarDate } from "@internationalized/date";

  export let form: ActionData;

  $: listAnggota = form?.data?.anggota?.map(e => ({label: e.username, value: e.id.toString()})) ?? []
  $: filter = form?.data?.filter;
  let formEl: HTMLFormElement | null;
  $: dateValue = filter?.tanggal
    ? new CalendarDate(
        filter.tanggal.getFullYear(),
        filter.tanggal.getMonth(),
        filter.tanggal.getDate(),
      )
    : undefined;
  $: satkerEnums =
    form?.data?.anggota?.map((e) => ({
      label: e.satkerId,
      value: e.satkerId,
    })) ?? [];
  $: noteEnums = [...(form?.data?.notes ?? [])].map((e) => ({
    label: e.nama,
    value: e.nama,
  }));

  onMount(() => {
    formEl?.requestSubmit();
  });
</script>

<form
  bind:this={formEl}
  class="px-4 max-w-lg flex flex-col gap-5"
  action="?/data"
  method="POST"
  use:enhance
>
  <table>
    <tr>
      <td>
        <Label>Tipe Satker</Label>
      </td>
      <td>
        <Dropdown
          data={satkerEnums}
          name="satker"
          value={form?.data?.filter?.satker}
          none
        />
      </td>
    </tr>
    <tr>
      <td>
        <Label>Note</Label>
      </td>
      <td>
        <Dropdown
          data={noteEnums}
          name="note"
          value={form?.data?.filter?.note}
          none
        />
      </td>
    </tr>
    <tr>
      <td>
        <Label>Anggota</Label>
      </td>
      <td>
        <Dropdown
          data={listAnggota}
          name="anggota"
          none
        />
      </td>
    </tr>
    <tr>
      <td>
        <Label>Tanggal</Label>
      </td>
      <td>
        <DatePicker name="tanggal" {dateValue} />
      </td>
    </tr>
  </table>
  <div class="flex items-center justify-end gap-2">
    <Button type="submit">Cari</Button>
    <Button
      type="reset"
      variant="destructive"
      on:click={() => {
        if (form?.data?.filter) {
          form.data.filter = null;
        }
      }}>Reset Filter</Button
    >
  </div>
</form>
