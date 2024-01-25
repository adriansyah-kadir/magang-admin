<script>
  import { cn } from "@/utils";
  import {Separator} from "$lib/components/ui/separator"
</script>

<nav class={cn("flex items-center space-x-4 lg:space-x-6 border-b h-16 shadow-sm px-6")}>
  <a href="/" class="text-lg transition-colors font-medium ml-3">PramuBakti</a>
  <Separator orientation="vertical" class="h-10"/>
  <a
    href="/examples/dashboard"
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
</nav>
