"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { ArtworkItem } from "@/utils/pdf-extractor"
import { ImageWithFallback } from "./image-error-handler"

interface ArtworkDisplayProps {
  artwork: ArtworkItem
  onClick?: () => void
  className?: string
}

export function ArtworkDisplayFixed({ artwork, onClick, className = "" }: ArtworkDisplayProps) {
  return (
    <Card
      className={`overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105 ${className}`}
      onClick={onClick}
    >
      <div className="relative h-64 w-full">
        <ImageWithFallback
          src={artwork.image || "/placeholder.svg"}
          alt={artwork.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <CardContent className="p-4 bg-white">
        <h3 className="font-bold text-lg">{artwork.title}</h3>
        <p className="text-sm text-gray-500">{artwork.year}</p>
        {artwork.series && <p className="text-xs text-primary mt-1">{artwork.series}</p>}
      </CardContent>
      {artwork.medium && (
        <CardFooter className="px-4 pb-4 pt-0 bg-white">
          <p className="text-xs text-gray-500">{artwork.medium}</p>
        </CardFooter>
      )}
    </Card>
  )
}
