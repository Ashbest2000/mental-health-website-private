"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Menu, X, Shield } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navigation({ isLoggedIn = false, isAdmin = false }: { isLoggedIn?: boolean; isAdmin?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">MindCare Dhaka</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link href="/assessments" className="text-sm font-medium hover:text-primary transition-colors">
                  Assessments
                </Link>
                <Link href="/chat" className="text-sm font-medium hover:text-primary transition-colors">
                  AI Support
                </Link>
                <Link href="/journal" className="text-sm font-medium hover:text-primary transition-colors">
                  Journal
                </Link>
                <Link href="/resources" className="text-sm font-medium hover:text-primary transition-colors">
                  Resources
                </Link>
                <Link href="/institutions" className="text-sm font-medium hover:text-primary transition-colors">
                  Find Help
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <Shield className="h-4 w-4" />
                    Admin
                  </Link>
                )}
                <ThemeToggle />
                <form action="/auth/logout" method="POST">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    Logout
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Link href="/resources" className="text-sm font-medium hover:text-primary transition-colors">
                  Resources
                </Link>
                <Link href="/institutions" className="text-sm font-medium hover:text-primary transition-colors">
                  Find Help
                </Link>
                <Link href="/volunteer" className="text-sm font-medium hover:text-primary transition-colors">
                  Volunteer
                </Link>
                <ThemeToggle />
                <Link href="/auth/login">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="block text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/assessments"
                  className="block text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Assessments
                </Link>
                <Link
                  href="/chat"
                  className="block text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  AI Support
                </Link>
                <Link
                  href="/journal"
                  className="block text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Journal
                </Link>
                <Link
                  href="/resources"
                  className="block text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Resources
                </Link>
                <Link
                  href="/institutions"
                  className="block text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Find Help
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="block text-sm font-medium hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="flex items-center gap-1">
                      <Shield className="h-4 w-4" />
                      Admin Panel
                    </span>
                  </Link>
                )}
                <div className="py-2">
                  <ThemeToggle />
                </div>
                <form action="/auth/logout" method="POST">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Logout
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/resources"
                  className="block text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Resources
                </Link>
                <Link
                  href="/institutions"
                  className="block text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Find Help
                </Link>
                <Link
                  href="/volunteer"
                  className="block text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Volunteer
                </Link>
                <div className="py-2">
                  <ThemeToggle />
                </div>
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
