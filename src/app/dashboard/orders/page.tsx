import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

import { Orders } from "@/lib/menuData"
import SidePanel from "@/components/sidePanel"

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

        {/* Main Content with SidePanel */}
        <div className="flex flex-1 gap-4 p-4 pt-0">
          {/* Sub-navigation panel */}
          <SidePanel title="Orders" menuItems={Orders} />

          {/* Main content area */}
          <div className="flex-1 rounded-xl bg-muted/50 p-6">
            <p>Select an option from the sidebar.</p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
