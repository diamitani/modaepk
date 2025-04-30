"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getArtworkBySeries } from "@/data/artwork-data"
import { enforceUniqueImages } from "@/utils/enforce-unique-images"
import type { ArtworkItem } from "@/utils/pdf-extractor"

export default function SeriesPage({ params }: { params: { name: string } }) {
  const [selectedItem, setSelectedItem] = useState<ArtworkItem | null>(null)
  const [artworks, setArtworks] = useState<ArtworkItem[]>([])
  const [seriesName, setSeriesName] = useState("")

  useEffect(() => {
    // Decode the series name from the URL
    const decodedName = decodeURIComponent(params.name.replace(/-/g, " "))
    setSeriesName(decodedName)

    // Get artworks for this series and enforce unique images
    const seriesArtworks = getArtworkBySeries(decodedName)

    // Sort by installment number if possible
    const sortedArtworks = [...seriesArtworks].sort((a, b) => {
      // Extract installment numbers from descriptions
      const getInstallmentNumber = (desc: string) => {
        const match = desc.match(/(\d+)(st|nd|rd|th) Installment/i)
        return match ? Number.parseInt(match[1]) : 999 // Default high number if not found
      }

      const aNum = getInstallmentNumber(a.description)
      const bNum = getInstallmentNumber(b.description)

      return aNum - bNum
    })

    setArtworks(enforceUniqueImages(sortedArtworks))
  }, [params.name])

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container px-4">
        <div className="flex items-center mb-8">
          <Button variant="ghost" asChild className="mr-4">
            <Link href="/portfolio">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold">{seriesName}</h1>
        </div>

        <div className="mb-12">
          <p className="text-lg text-gray-600 mb-6">
            Mr. Moda's acclaimed "{seriesName}" series explores themes of mental health, environmental challenges, and
            personal growth. Each piece in this collection features authentic materials and symbolic collectables
            carefully infused into the design.
          </p>
          <p className="text-lg text-gray-600">
            The series represents Mr. Moda's interpretation of the modern 'Blueprint' to convey emotions, impressions,
            and experiences. Each artwork is a one-of-a-kind piece, crafted over a three-year period with meticulous
            attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork) => (
            <div
              key={artwork.id}
              className="overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105"
              onClick={() => setSelectedItem(artwork)}
            >
              <div className="relative h-80 w-full">
                <Image
                  src={artwork.image || "/placeholder.svg"}
                  alt={artwork.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="font-bold text-xl mb-1">{artwork.title}</h3>
                <p className="text-gray-500 mb-3">{artwork.year}</p>
                <p className="text-gray-700 line-clamp-3">{artwork.description.split(".")[0]}.</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        {selectedItem && (
          <DialogContent className="max-w-5xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedItem.title} ({selectedItem.year})
              </DialogTitle>
              <DialogDescription>
                <div className="mt-2 space-y-2">
                  <p>{selectedItem.description}</p>
                  {selectedItem.medium && (
                    <p>
                      <span className="font-medium">Medium:</span> {selectedItem.medium}
                    </p>
                  )}
                  {selectedItem.dimensions && (
                    <p>
                      <span className="font-medium">Dimensions:</span> {selectedItem.dimensions}
                    </p>
                  )}
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="relative h-[70vh] w-full">
              <Image
                src={selectedItem.image || "/placeholder.svg"}
                alt={selectedItem.title}
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg"
              />
            </div>
          </DialogContent>
        )}
      </Dialog>
    </main>
  )
}
