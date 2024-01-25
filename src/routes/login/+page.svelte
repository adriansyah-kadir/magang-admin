<script>
  import { Input } from "$lib/components/ui/input";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { Label } from "$lib/components/ui/label";
  import {Button} from "$lib/components/ui/button"
</script>

<div class="w-[50%] border m-auto mt-32 rounded-md shadow-md flex overflow-clip">
  <div class="w-full bg-black"></div>
  <div class="px-20 py-40 flex flex-col gap-5 w-full">
    <h3 class="text-3xl font-bold mb-2">Login</h3>
    <p class="text-gray-600">Selamat Pagi!</p>
    <div class="relative">
      <i
        class="fas fa-user absolute top-[50%] -left-3 -translate-x-full -translate-y-1/2"
      ></i>
      <Input placeholder="username"></Input>
    </div>
    <div class="relative">
      <i
        class="fas fa-lock absolute top-[50%] -left-3 -translate-x-full -translate-y-1/2"
      ></i>
      <Input placeholder="password"></Input>
    </div>
    <div class="flex items-center gap-5">
      <Checkbox id="save" />
      <Label for="save" class="w-max text-nowrap flex-shrink-0">simpan login</Label>
      <div class="w-full"></div>
      <a href="/" class="flex-shrink-0 text-xs text-blue-500 font-semibold">Forgot Password?</a>
    </div>
    <Button>Log In</Button>
  </div>
</div>
