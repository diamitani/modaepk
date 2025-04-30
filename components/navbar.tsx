"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Settings } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    // Check if user is admin (in a real app, this would be based on authentication)
    setIsAdmin(true) // For demo purposes, everyone is an admin

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update the navLinks array to include the portfolio link
  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Artwork", href: "/artwork" },
    { name: "Press", href: "/press" },
    { name: "Exhibitions", href: "/exhibitions" },
    { name: "Collaborations", href: "/collaborations" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-sm shadow-sm" : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className={`text-2xl font-bold ${isScrolled ? "text-black" : "text-white"}`}>
            MR. MODA
          </Link>

          <nav className="hidden md:flex items-center space-x-5">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-gray-700" : "text-white"}`}
              >
                {link.name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                className={`text-sm font-medium hover:text-primary transition-colors flex items-center ${isScrolled ? "text-gray-700" : "text-white"}`}
              >
                <Settings className="h-4 w-4 mr-1" />
                Admin
              </Link>
            )}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${isScrolled ? "text-black" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
          <div className="flex justify-end p-4">
            <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-1 space-y-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-xl font-medium text-white hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                className="text-xl font-medium text-white hover:text-primary transition-colors flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Settings className="h-5 w-5 mr-2" />
                Admin
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
