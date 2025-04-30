"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollToSection } from "@/components/scroll-to-section"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Mr. Moda
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <ScrollToSection section="about" label="About" />
            <Link href="/portfolio" className="text-gray-700 hover:text-black">
              Portfolio
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-black">
              Gallery
            </Link>
            <Link href="/exhibitions" className="text-gray-700 hover:text-black">
              Exhibitions
            </Link>
            <Link href="/press" className="text-gray-700 hover:text-black">
              Press
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-black">
              Contact
            </Link>
            <Button asChild>
              <Link href="/admin">Admin</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <ScrollToSection section="about" label="About" onClick={() => setIsOpen(false)} />
            <Link href="/portfolio" className="text-gray-700 hover:text-black" onClick={() => setIsOpen(false)}>
              Portfolio
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-black" onClick={() => setIsOpen(false)}>
              Gallery
            </Link>
            <Link href="/exhibitions" className="text-gray-700 hover:text-black" onClick={() => setIsOpen(false)}>
              Exhibitions
            </Link>
            <Link href="/press" className="text-gray-700 hover:text-black" onClick={() => setIsOpen(false)}>
              Press
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-black" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <Button asChild>
              <Link href="/admin" onClick={() => setIsOpen(false)}>
                Admin
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
