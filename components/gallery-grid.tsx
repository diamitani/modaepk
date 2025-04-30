"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ImageWithFallback } from "./image-error-handler"
import { validateImageUrl } from "@/utils/image-validator"
import { artworkData } from "@/data/artwork-data"
import { portfolioImages } from "@/data/portfolio-images"

// Combine all image sources
const allImageSources = [
  ...artworkData.map((item) => ({
    id: item.id,
    title: item.title || "Untitled Artwork",
    image: item.image,
    year: item.year || "Unknown",
    category: item.category || "artwork",
  })),
  ...portfolioImages.map((item, index) => ({
    id: `portfolio-${index}`,
    title: item.title || `Artwork ${index + 1}`,
    image: item.url,
    year: item.year || "Unknown",
    category: item.category || "portfolio",
  })),
]

// Remove duplicates by image URL
const uniqueImages = Array.from(new Map(allImageSources.map((item) => [item.image, item])).values())

interface GalleryGridProps {
  columns?: number
  limit?: number
  className?: string
}

export function GalleryGrid({ columns = 4, limit, className = "" }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<(typeof uniqueImages)[0] | null>(null)

  // Limit the number of images if specified
  const displayImages = limit ? uniqueImages.slice(0, limit) : uniqueImages

  return (
    <div className={className}>
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${columns} gap-4`}>
        {displayImages.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl"
            onClick={() => setSelectedImage(item)}
          >
            <ImageWithFallback
              src={validateImageUrl(item.image) || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-bold text-sm truncate">{item.title}</h3>
              <p className="text-xs opacity-80">{item.year}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Image Detail Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        {selectedImage && (
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedImage.title} ({selectedImage.year})
              </DialogTitle>
            </DialogHeader>
            <div className="relative h-[70vh] w-full">
              <ImageWithFallback
                src={validateImageUrl(selectedImage.image) || "/placeholder.svg"}
                alt={selectedImage.title}
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
