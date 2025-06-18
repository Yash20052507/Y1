"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Bell, Menu, User, X } from "lucide-react"

export default function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">SuperModel AI</span>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <ModeToggle />
          <Button asChild variant="ghost" size="icon">
            <Link href="/dashboard/profile">
              <User className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col gap-2 pb-4">
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/dashboard" ? "text-primary" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/chat"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/dashboard/chat" ? "text-primary" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Chat
            </Link>
            <Link
              href="/dashboard/skill-packs"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/dashboard/skill-packs" ? "text-primary" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              My Skill Packs
            </Link>
            <Link
              href="/dashboard/marketplace"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/dashboard/marketplace" ? "text-primary" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link
              href="/dashboard/profile"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/dashboard/profile" ? "text-primary" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
