"use client"

import { useEffect } from "react"

export function ScrollToSection() {
  useEffect(() => {
    // Function to handle smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest("a")

      if (anchor && anchor.hash && anchor.hash.startsWith("#")) {
        e.preventDefault()

        const targetId = anchor.hash.substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          // Adjust for fixed header
          const headerOffset = 80
          const elementPosition = targetElement.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })

          // Update URL without scrolling
          history.pushState(null, "", anchor.hash)
        }
      }
    }

    // Add event listener to the document
    document.addEventListener("click", handleAnchorClick)

    // Handle initial hash on page load
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.substring(1)
        const element = document.getElementById(id)

        if (element) {
          const headerOffset = 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }
      }, 100)
    }

    return () => {
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])

  return null
}
