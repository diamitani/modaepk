"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { artworkData } from "@/data/artwork-data"
import { verifyAllArtworkImages } from "@/utils/image-title-matcher"
import type { ArtworkItem } from "@/utils/pdf-extractor"

export function ImageTitleMatcher() {
  const [verificationResults, setVerificationResults] = useState<{
    valid: ArtworkItem[]
    invalid: Array<{ artwork: ArtworkItem; suggestedImage: string | null }>
  } | null>(null)

  const [selectedFixes, setSelectedFixes] = useState<Record<string, string>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  // Verify all artwork on component mount
  useEffect(() => {
    const results = verifyAllArtworkImages(artworkData)
    setVerificationResults(results)
  }, [])

  // Handle image selection for an artwork
  const handleImageSelection = (artworkId: string, imagePath: string) => {
    setSelectedFixes((prev) => ({
      ...prev,
      [artworkId]: imagePath,
    }))
  }

  // Save the fixed image-title matches
  const saveFixedMatches = async () => {
    setIsSaving(true)
    setSaveMessage("")

    try {
      // In a real implementation, this would update a database or file
      // For now, we'll just simulate a successful save
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSaveMessage("Successfully updated image-title matches!")

      // Refresh verification results
      const results = verifyAllArtworkImages(artworkData)
      setVerificationResults(results)
      setSelectedFixes({})
    } catch (error) {
      setSaveMessage("Error saving changes. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  // Get all available images
  const allImages = artworkData.map((artwork) => artwork.image)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image-Title Matcher</CardTitle>
        <CardDescription>Verify and fix mismatches between artwork titles and their associated images.</CardDescription>
      </CardHeader>
      <CardContent>
        {verificationResults ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Verification Results</h3>
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-medium">{verificationResults.valid.length} Valid</span>
                <span className="text-gray-400">|</span>
                <span className="text-amber-600 font-medium">{verificationResults.invalid.length} Mismatched</span>
              </div>
            </div>

            {verificationResults.invalid.length > 0 ? (
              <div className="space-y-4">
                <h4 className="font-medium">Mismatched Artwork</h4>
                {verificationResults.invalid.map(({ artwork, suggestedImage }) => (
                  <div key={artwork.id} className="border rounded-md p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-1/3">
                        <h5 className="font-medium mb-1">{artwork.title}</h5>
                        <p className="text-sm text-gray-500 mb-2">{artwork.year}</p>
                        <div className="relative h-40 w-full rounded overflow-hidden">
                          <Image
                            src={artwork.image || "/placeholder.svg"}
                            alt={artwork.title}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1 truncate">Current: {artwork.image}</p>
                      </div>

                      <div className="w-full md:w-2/3">
                        <h5 className="font-medium mb-2">Select Correct Image</h5>
                        <Select
                          value={selectedFixes[artwork.id] || artwork.image}
                          onValueChange={(value) => handleImageSelection(artwork.id, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select an image" />
                          </SelectTrigger>
                          <SelectContent>
                            {allImages.map((image) => (
                              <SelectItem key={image} value={image}>
                                {image.split("/").pop()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {suggestedImage && (
                          <div className="mt-4">
                            <p className="text-sm font-medium mb-2">Suggested Match:</p>
                            <div className="flex items-center gap-2">
                              <div className="relative h-20 w-20 rounded overflow-hidden">
                                <Image
                                  src={suggestedImage || "/placeholder.svg"}
                                  alt="Suggested image"
                                  fill
                                  style={{ objectFit: "cover" }}
                                />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 truncate">{suggestedImage}</p>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mt-1"
                                  onClick={() => handleImageSelection(artwork.id, suggestedImage)}
                                >
                                  Use Suggested
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-green-50 text-green-700 p-4 rounded-md">
                All artwork images correctly match their titles!
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center h-40">
            <p>Verifying artwork images...</p>
          </div>
        )}
      </CardContent>
      {verificationResults?.invalid.length ? (
        <CardFooter className="flex justify-between">
          <p className="text-sm text-gray-500">{Object.keys(selectedFixes).length} changes selected</p>
          <div className="flex items-center gap-4">
            {saveMessage && (
              <p className={saveMessage.includes("Error") ? "text-red-500" : "text-green-500"}>{saveMessage}</p>
            )}
            <Button onClick={saveFixedMatches} disabled={isSaving || Object.keys(selectedFixes).length === 0}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardFooter>
      ) : null}
    </Card>
  )
}
