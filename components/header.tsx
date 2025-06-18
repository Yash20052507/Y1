"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X, MessageSquare } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isHome = pathname === "/"
  const isAuthenticated = false // This would be replaced with actual auth state

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">SuperModel AI</span>
          </Link>
          <nav className="hidden md:flex gap-6 ml-6">
            <Link href="/demo" className="text-sm font-medium transition-colors hover:text-primary">
              Demo
            </Link>
            <Link href="/chat" className="text-sm font-medium transition-colors hover:text-primary">
              Chat
            </Link>
            <Link
              href="/#features"
              className={`text-sm font-medium transition-colors hover:text-primary ${isHome ? "" : "hidden"}`}
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className={`text-sm font-medium transition-colors hover:text-primary ${isHome ? "" : "hidden"}`}
            >
              How It Works
            </Link>
            <Link
              href="/#pricing"
              className={`text-sm font-medium transition-colors hover:text-primary ${isHome ? "" : "hidden"}`}
            >
              Pricing
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
            <Link href="/chat">
              <MessageSquare className="h-4 w-4 mr-2" />
              Try Chat
            </Link>
          </Button>
          <ModeToggle />
          {isAuthenticated ? (
            <Button asChild variant="default" size="sm">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild variant="default" size="sm" className="hidden md:inline-flex">
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col gap-2 pb-4">
            <Link
              href="/demo"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Demo
            </Link>
            <Link
              href="/chat"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Chat
            </Link>
            {isHome && (
              <>
                <Link
                  href="/#features"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="/#how-it-works"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  href="/#pricing"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/#faq"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
