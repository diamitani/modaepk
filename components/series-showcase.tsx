"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { artworkData } from "@/data/artwork-data"
import type { ArtworkItem } from "@/utils/pdf-extractor"

export function SeriesShowcase() {
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkItem | null>(null)

  // Filter for the "How To: Be An Artist" series and sort by installment number
  const seriesArtworks = artworkData
    .filter((artwork) => artwork.series === "How To: Be An Artist")
    .sort((a, b) => {
      // Extract installment numbers from descriptions
      const getInstallmentNumber = (desc: string) => {
        const match = desc.match(/(\d+)(st|nd|rd|th) Installment/i)
        return match ? Number.parseInt(match[1]) : 999 // Default high number if not found
      }

      const aNum = getInstallmentNumber(a.description)
      const bNum = getInstallmentNumber(b.description)

      return aNum - bNum
    })

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seriesArtworks.map((artwork) => (
          <Card
            key={artwork.id}
            className="overflow-hidden cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedArtwork(artwork)}
          >
            <div className="relative h-64 w-full">
              <Image
                src={artwork.image || "/placeholder.svg"}
                alt={artwork.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg">{artwork.title}</h3>
              <p className="text-sm text-gray-500">{artwork.year}</p>
              <p className="text-xs text-gray-500 mt-2">{artwork.description.split(".")[0]}.</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedArtwork} onOpenChange={(open) => !open && setSelectedArtwork(null)}>
        {selectedArtwork && (
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedArtwork.title} ({selectedArtwork.year})
              </DialogTitle>
              <DialogDescription>
                <div className="mt-2 space-y-2">
                  <p>{selectedArtwork.description}</p>
                  {selectedArtwork.medium && (
                    <p>
                      <span className="font-medium">Medium:</span> {selectedArtwork.medium}
                    </p>
                  )}
                  {selectedArtwork.dimensions && (
                    <p>
                      <span className="font-medium">Dimensions:</span> {selectedArtwork.dimensions}
                    </p>
                  )}
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="relative h-[60vh] w-full">
              <Image
                src={selectedArtwork.image || "/placeholder.svg"}
                alt={selectedArtwork.title}
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg"
              />
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
