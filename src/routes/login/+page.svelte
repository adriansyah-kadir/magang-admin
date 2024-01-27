<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { formSchema } from "./schema";
  import type { ActionData, PageData } from "./$types";
  import * as AlertDialog from "$lib/components/ui/alert-dialog";

  export let data: PageData;
  export let form: ActionData;

  function handleSuccess(){
    let params = new URLSearchParams(location.search)
    location.assign(params.get('next') ?? '/')
  }
</script>

<AlertDialog.Root open={!!form}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>{form?.success ? "Sukses" : "Gagal"}</AlertDialog.Title
      >
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      {#if !form?.success}
        <AlertDialog.Cancel>Lupa Password</AlertDialog.Cancel>
        <div class="w-full"></div>
        <AlertDialog.Action>OK</AlertDialog.Action>
      {:else}
        <AlertDialog.Cancel>Kembali</AlertDialog.Cancel>
        <div class="w-full"></div>
        <AlertDialog.Action on:click={handleSuccess}>OK</AlertDialog.Action>
      {/if}
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>

<div
  class="w-[50%] border m-auto mt-10 rounded-md shadow-md flex overflow-clip bg-white"
>
  <div class="w-full bg-black bg-no-repeat bg-center hidden md:block "></div>
  <Form.Root
    class="p-12 md:px-20 md:py-40 flex flex-col gap-5 w-full"
    method="POST"
    form={data.form}
    schema={formSchema}
    let:config
    action="?/login"
  >
    <h3 class="text-3xl font-bold mb-2">Login</h3>
    <p class="text-gray-600">Selamat Pagi!</p>
    <Form.Field {config} name="username">
      <Form.Item class="relative">
        <i
          class="fas fa-user absolute top-[50%] -left-3 -translate-x-full -translate-y-1/2"
        ></i>
        <Form.Input placeholder="username" />
      </Form.Item>
    </Form.Field>
    <Form.Field {config} name="password">
      <Form.Item class="relative">
        <i
          class="fas fa-lock absolute top-[50%] -left-3 -translate-x-full -translate-y-1/2"
        ></i>
        <Form.Input placeholder="password" />
      </Form.Item>
    </Form.Field>
    <Form.Field {config} name="save">
      <Form.Item class="flex items-center">
        <Form.Checkbox id="save"/>
        <p class="ml-2 text-sm flex-shrink-0" style="margin-top: 0;">Stay Logged In</p>
        <div class="w-full"></div>
        <a href="/" class="text-blue-600 flex-shrink-0 text-sm" style="margin-top: 0;">lupa password?</a>
      </Form.Item>
    </Form.Field>
    <Form.Button type="submit">Login</Form.Button>
  </Form.Root>
</div>
