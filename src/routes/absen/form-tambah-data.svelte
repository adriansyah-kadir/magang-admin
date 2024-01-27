<script lang="ts">
  //import type { SuperValidated } from "sveltekit-superforms";
  //import { type FormSchema } from "./schema";
  import type { Anggota } from "@prisma/client";
  import { Label } from "@/components/ui/label";
  import Dropdown from "@/components/Dropdown.svelte";
  import DatePicker from "@/components/DatePicker.svelte";
  import { Input } from "@/components/ui/input";
    import { Button } from "@/components/ui/button";
    import { enhance } from "$app/forms";

  //export let form: SuperValidated<FormSchema>;
  export let anggota: Anggota[] = [];
  export let notes: string[] = [];
</script>

<form
  use:enhance
  enctype="multipart/form-data"
  action="?/tambah"
  class="flex flex-col gap-3 pt-2"
  method="post"
>
  <div>
    <Label>Anggota</Label>
    <div>
      <Dropdown
        name="anggota"
        data={anggota.map((e) => ({
          label: e.username,
          value: e.id.toString(),
        }))}
      />
    </div>
  </div>
  <div>
    <Label>Tanggal</Label>
    <DatePicker name="tanggal" />
  </div>
  <div>
    <Label>Note</Label>
    <div>
      <Dropdown
        name="note"
        data={[...notes].map((e) => ({
          label: e,
          value: e,
        }))}
      />
    </div>
  </div>
  <div>
    <Label>Attachments</Label>
    <Input type="file" multiple name="attachments" />
  </div>
  <Button type="submit">Submit</Button>
</form>
<!--  <Form.Root
    method="POST"
    {form}
    schema={formSchemaAbsen}
    let:config
    action="?/tambah"
    enctype="multipart/form-data"
  >
    <Form.Field {config} name="anggota">
      <Form.Item>
        <Form.Label>Anggota</Form.Label>
        <Form.Select>
          <Form.SelectTrigger placeholder="-" />
          <Form.SelectContent class="max-h-80 overflow-scroll">
            {#each anggota as person}
              <Form.SelectItem value={person.id}
                >{person.username}</Form.SelectItem
              >
            {/each}
          </Form.SelectContent>
        </Form.Select>
        <Form.Validation />
      </Form.Item>
    </Form.Field>
    <Form.Field {config} name="tanggal">
      <Form.Item>
        <Form.Label>Tanggal</Form.Label>
        <DatePicker/>
        <Form.Validation />
      </Form.Item>
    </Form.Field>
    <Form.Field {config} name="note">
      <Form.Item>
        <Form.Label>Note</Form.Label>
        <Form.Select>
          <Form.SelectTrigger placeholder="-" />
          <Form.SelectContent class="max-h-80 overflow-scroll">
            {#each notes as note}
              <Form.SelectItem value={note}
                >{note}</Form.SelectItem
              >
            {/each}
          </Form.SelectContent>
        </Form.Select>
        <Form.Validation />
      </Form.Item>
    </Form.Field>
    <div>
      <Input name="attachments" type="file" multiple/>
    </div>
    <Form.Button type="submit">Submit</Form.Button>
  </Form.Root> !-->
