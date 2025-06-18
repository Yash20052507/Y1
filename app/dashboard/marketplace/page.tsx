import type { Metadata } from "next"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import MarketplaceList from "@/components/marketplace/marketplace-list"

export const metadata: Metadata = {
  title: "Marketplace - SuperModel AI",
  description: "Discover and acquire new skill packs for SuperModel AI",
}

export default function MarketplacePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-col overflow-hidden p-4 md:py-8">
          <MarketplaceList />
        </main>
      </div>
    </div>
  )
}
