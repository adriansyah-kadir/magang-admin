<script lang="ts">
  import type { Absen, AbsenMasuk, AbsenPulang } from "@prisma/client";
  import {
    Render,
    Subscribe,
    createRender,
    createTable,
  } from "svelte-headless-table";
  import { addColumnFilters } from "svelte-headless-table/plugins";
  import { readable } from "svelte/store";
  import * as Table from "$lib/components/ui/table";
  import CekLokasiActions from "./data-table-actions.svelte";
  import SatkerFilter from "./SatkerFilter.svelte";

  interface AbsenType extends Absen {
    anggota: {
      username: String;
      profilePict: String | null;
      satkerId: String;
    };
    absenMasuk: AbsenMasuk | null;
    absenPulang: AbsenPulang | null;
  }

  function satKerFilter({ filterValue, value }: any) {
    return String(value)
      .toLowerCase()
      .startsWith(String(filterValue).toLowerCase());
  }

  export let data: AbsenType[] = [];

  const table = createTable(readable(data), {
    filter: addColumnFilters({}),
  });

  const columns = table.createColumns([
    table.column({
      accessor: "id",
      header: "ID",
    }),
    table.column({
      accessor: (e) =>
        `${e.tanggal.getFullYear()}-${e.tanggal.getMonth()}-${e.tanggal.getDate()}`,
      header: "Tanggal",
    }),
    table.column({
      accessor: (e) => e.anggota.username,
      header: "Nama",
    }),
    table.column({
      accessor: (e) => e.anggota.satkerId,
      header: "Satker",
      plugins: {
        filter: {
          fn: satKerFilter,
          initialFilterValue: "",
          render(props) {
            return createRender(SatkerFilter, { props });
          },
        },
      },
    }),
    table.column({
      accessor: (e) => e.absenMasuk?.time.toLocaleTimeString("id") ?? "-",
      header: "Check In",
    }),
    table.column({
      accessor: (e) => e.absenMasuk,
      header: "Lokasi CheckIn",
      cell: ({ value }) => {
        return createRender(CekLokasiActions, { dataAbsen: value });
      },
    }),
    table.column({
      accessor: (e) => e.absenMasuk?.foto ?? "-",
      header: "Foto CheckIn",
    }),
    table.column({
      accessor: (e) => e.absenPulang?.time.toLocaleTimeString("id") ?? "-",
      header: "Check Out",
    }),
    table.column({
      accessor: (e) => e.absenPulang,
      header: "Lokasi CheckOut",
      cell: ({ value }) => {
        return createRender(CekLokasiActions, { dataAbsen: value });
      },
    }),
    table.column({
      accessor: (e) => e.absenPulang?.foto ?? "-",
      header: "Foto CheckOut",
    }),
    table.column({
      accessor: (e) => e.noteId,
      header: "Note",
    }),
    table.column({
      accessor: (e) => e.ket ?? "-",
      header: "Ket",
    }),
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs } =
    table.createViewModel(columns);
</script>

<div>
  <div class="flex items-center py-4 gap-3">
    <div class="w-full"></div>
    <slot name="actions" />
  </div>
  <div class="rounded-md border">
    <Table.Root {...$tableAttrs}>
      <Table.Header>
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()}>
            <Table.Row>
              {#each headerRow.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                  <Table.Head {...attrs} class="text-center">
                    <Render of={cell.render()} />
                  </Table.Head>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Header>
      <Table.Body {...$tableBodyAttrs}>
        {#each $pageRows as row (row.id)}
          <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
            <Table.Row {...rowAttrs}>
              {#each row.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs>
                  <Table.Cell {...attrs} class="text-center">
                    <Render of={cell.render()} />
                  </Table.Cell>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
</div>
