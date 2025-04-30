import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EnhancedGallery } from "@/components/enhanced-gallery"

export const metadata: Metadata = {
  title: "Complete Gallery | Mr. Moda",
  description: "Explore the complete collection of Mr. Moda's artwork in a beautiful gallery format.",
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container px-4">
        <div className="flex items-center mb-8">
          <Button variant="ghost" asChild className="mr-4">
            <Link href="/">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold">Complete Gallery</h1>
        </div>

        <p className="text-lg text-gray-600 mb-12 max-w-3xl">
          Explore Mr. Moda's complete collection of artwork, featuring his diverse portfolio spanning fine art, murals,
          commissions, and his acclaimed series. Each piece showcases his unique blend of anime influences, street art
          aesthetics, and contemporary vision.
        </p>

        <EnhancedGallery />
      </div>
    </main>
  )
}
