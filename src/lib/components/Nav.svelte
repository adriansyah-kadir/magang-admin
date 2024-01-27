<script lang="ts">
  import { cn } from "@/utils";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Button } from "$lib/components/ui/button";

  export let info: {
    username: String;
    profilePict: String | null;
  } | null = null;

  function logout() {
    let logoutUrl = `/logout?next=${location.pathname}`;
    location.replace(logoutUrl);
  }
</script>

<nav
  class={cn(
    "flex items-center space-x-4 lg:space-x-6 border-b h-16 shadow-sm px-6 backdrop-blur-sm sticky top-0 left-0",
  )}
>
  <a href="/" class="flex items-center gap-3 w-fit flex-shrink-0 mr-3">
    <img
      src="/logo.png"
      alt=""
      class="image max-w-full object-cover aspect-square w-10"
    />
    <p class="text-lg transition-colors font-medium">PramuBakti</p>
  </a>
  <a
    href="/absen"
    class="text-sm font-medium transition-colors hover:text-primary"
  >
    Absen
  </a>

  <a
    href="/examples/dashboard"
    class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
  >
    Admin
  </a>
  <a
    href="/examples/dashboard"
    class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
  >
    Anggota
  </a>
  <a
    href="/examples/dashboard"
    class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
  >
    Pengaturan
  </a>
  <div class="w-full"></div>
  {#if info != null}
    <div class="aspect-square h-[60%] bg-black rounded-full shadow-md"></div>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline">Hi {info.username} <i class="fas fa-chevron-down ml-3 text-xs"></i></Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <DropdownMenu.Label>My Account</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item on:click={logout}>Log Out</DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  {/if}
</nav>
