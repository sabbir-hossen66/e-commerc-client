import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"


export default function ProductsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Page Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-sidebar-border" />
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
        </header>
        <main className="flex-1 p-4">
         <h3>hello kire</h3>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
