"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ImageWithFallback } from "./image-error-handler"
import { validateImageUrl } from "@/utils/image-validator"
import { artworkData } from "@/data/artwork-data"
import { portfolioImages } from "@/data/portfolio-images"

// Convert portfolioImages object to array format
const portfolioImagesArray = Object.entries(portfolioImages).map(([key, url]) => ({
  id: `portfolio-${key}`,
  title: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()), // Convert camelCase to Title Case
  image: url,
  year: "Unknown",
  category: "portfolio",
}))

// Combine all image sources
const allImageSources = [
  ...artworkData.map((item) => ({
    id: item.id,
    title: item.title || "Untitled Artwork",
    image: item.image,
    year: item.year || "Unknown",
    category: item.category || "artwork",
  })),
  ...portfolioImagesArray,
]

// Remove duplicates by image URL
const uniqueImages = Array.from(new Map(allImageSources.map((item) => [item.image, item])).values())

interface MasonryGalleryProps {
  columns?: number
  gap?: number
  className?: string
}

export function MasonryGallery({ columns = 3, gap = 16, className = "" }: MasonryGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<(typeof uniqueImages)[0] | null>(null)
  const [columnHeights, setColumnHeights] = useState<number[]>([])
  const [imagePositions, setImagePositions] = useState<{ top: number; left: number; height: number; width: number }[]>(
    [],
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  // Calculate layout on mount and window resize
  useEffect(() => {
    const calculateLayout = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      setContainerWidth(containerWidth)

      // Adjust columns based on screen size
      let actualColumns = columns
      if (containerWidth < 640) actualColumns = 2
      if (containerWidth < 480) actualColumns = 1

      const columnWidth = (containerWidth - (actualColumns - 1) * gap) / actualColumns
      const heights = Array(actualColumns).fill(0)
      const positions: { top: number; left: number; height: number; width: number }[] = []

      // Calculate position for each image
      uniqueImages.forEach((_, index) => {
        // Simulate different heights (in a real app, you'd use actual image dimensions)
        const height = 200 + Math.floor(Math.random() * 200)

        // Find the shortest column
        const shortestColumn = heights.indexOf(Math.min(...heights))

        // Calculate position
        const left = shortestColumn * (columnWidth + gap)
        const top = heights[shortestColumn]

        // Update column height
        heights[shortestColumn] += height + gap

        // Store position
        positions[index] = { top, left, height, width: columnWidth }
      })

      setColumnHeights(heights)
      setImagePositions(positions)
    }

    calculateLayout()

    window.addEventListener("resize", calculateLayout)
    return () => window.removeEventListener("resize", calculateLayout)
  }, [columns, gap])

  // Calculate container height
  const containerHeight = columnHeights.length ? Math.max(...columnHeights) - gap : 0

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div className="relative" style={{ height: `${containerHeight}px` }}>
        {uniqueImages.map((item, index) => {
          const position = imagePositions[index]
          if (!position) return null

          return (
            <div
              key={item.id}
              className="absolute transition-all duration-500 ease-in-out"
              style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
                width: `${position.width}px`,
                height: `${position.height}px`,
              }}
            >
              <div
                className="group relative h-full w-full overflow-hidden rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl"
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
            </div>
          )
        })}
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
