"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { ArtworkItem } from "@/utils/pdf-extractor"
import { getImageFragment } from "@/utils/image-fragment"

interface ArtworkGridProps {
  artworks: ArtworkItem[]
  columns?: number
}

export function ArtworkGrid({ artworks, columns = 3 }: ArtworkGridProps) {
  const [selectedItem, setSelectedItem] = useState<ArtworkItem | null>(null)

  // Format category names for display
  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
        {artworks.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedItem(item)}
          >
            <div className="relative h-64 w-full">
              <Image
                src={getImageFragment(item.image) || "/placeholder.svg"}
                alt={item.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="p-4 bg-white">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.year}</p>
              {item.series && <p className="text-xs text-primary mt-1">{item.series}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Image Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        {selectedItem && (
          <DialogContent className="max-w-4xl">
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
                  {selectedItem.series && (
                    <p>
                      <span className="font-medium">Series:</span> {selectedItem.series}
                    </p>
                  )}
                  <p>
                    <span className="font-medium">Category:</span> {formatCategoryName(selectedItem.category)}
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="relative h-[60vh] w-full">
              <Image
                src={getImageFragment(selectedItem.image) || "/placeholder.svg"}
                alt={selectedItem.title}
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg"
              />
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
