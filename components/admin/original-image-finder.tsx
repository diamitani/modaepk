"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { artworkData } from "@/data/artwork-data"
import { artworkImageMapping } from "@/data/artwork-image-mapping"

export function OriginalImageFinder() {
  const [selectedArtwork, setSelectedArtwork] = useState<string | null>(null)
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Function to find the original image for a selected artwork
  const findOriginalImage = async (artworkTitle: string) => {
    setIsLoading(true)

    try {
      // In a real implementation, this would call an API to search for similar images
      // For now, we'll use our static mapping
      const originalUrl = artworkImageMapping[artworkTitle]

      if (originalUrl) {
        setOriginalImage(originalUrl)
      } else {
        setOriginalImage(null)
      }
    } catch (error) {
      console.error("Error finding original image:", error)
      setOriginalImage(null)
    } finally {
      setIsLoading(false)
    }
  }

  // Get all artwork titles
  const artworkTitles = artworkData.map((artwork) => artwork.title)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Original Image Finder</CardTitle>
        <CardDescription>Find original versions of artwork images without text overlays</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Artwork</label>
          <select
            className="w-full p-2 border rounded-md"
            value={selectedArtwork || ""}
            onChange={(e) => {
              const title = e.target.value
              setSelectedArtwork(title)
              if (title) {
                findOriginalImage(title)
              } else {
                setOriginalImage(null)
              }
            }}
          >
            <option value="">Select an artwork</option>
            {artworkTitles.map((title, index) => (
              <option key={index} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        {isLoading && (
          <div className="flex justify-center py-8">
            <p>Searching for original image...</p>
          </div>
        )}

        {!isLoading && selectedArtwork && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Selected Artwork</h3>
              <div className="relative h-64 w-full rounded-md overflow-hidden">
                {artworkData.find((a) => a.title === selectedArtwork)?.image && (
                  <Image
                    src={artworkData.find((a) => a.title === selectedArtwork)?.image || ""}
                    alt={selectedArtwork}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                )}
              </div>
            </div>

            {originalImage && (
              <div>
                <h3 className="text-lg font-medium mb-2">Original Image</h3>
                <div className="relative h-64 w-full rounded-md overflow-hidden">
                  <Image
                    src={originalImage || "/placeholder.svg"}
                    alt={`Original image for ${selectedArtwork}`}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
            )}

            {!originalImage && selectedArtwork && (
              <div className="p-4 bg-amber-50 text-amber-700 rounded-md">No original image found for this artwork.</div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        This tool helps find original versions of artwork images without text overlays or additional elements.
      </CardFooter>
    </Card>
  )
}
