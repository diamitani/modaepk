"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle, RefreshCw } from "lucide-react"
import Image from "next/image"
import { artworkData } from "@/data/artwork-data"
import { checkForDuplicateImages } from "@/utils/enforce-unique-images"

export function ImageMatchStatus() {
  const [status, setStatus] = useState<{
    hasDuplicates: boolean
    duplicates: Record<string, string[]>
  } | null>(null)

  const [isFixing, setIsFixing] = useState(false)

  useEffect(() => {
    // Check for duplicate images on component mount
    const result = checkForDuplicateImages(artworkData)
    setStatus(result)
  }, [])

  const handleFixImages = async () => {
    setIsFixing(true)

    try {
      // Call API to fix duplicate images
      const response = await fetch("/api/fix-duplicate-images", {
        method: "POST",
      })

      if (response.ok) {
        // Refresh status after fixing
        const result = checkForDuplicateImages(artworkData)
        setStatus(result)
      }
    } catch (error) {
      console.error("Error fixing duplicate images:", error)
    } finally {
      setIsFixing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Match Status</CardTitle>
        <CardDescription>Check if artwork titles are matched with unique images</CardDescription>
      </CardHeader>
      <CardContent>
        {status === null ? (
          <div className="flex justify-center py-4">
            <p>Checking image matches...</p>
          </div>
        ) : status.hasDuplicates ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Duplicate Images Detected</AlertTitle>
            <AlertDescription>
              Found {Object.keys(status.duplicates).length} images used by multiple artworks.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert variant="default" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>All Images Unique</AlertTitle>
            <AlertDescription>Each artwork has its own unique image.</AlertDescription>
          </Alert>
        )}

        {status?.hasDuplicates && (
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-medium">Duplicate Images</h3>
            {Object.entries(status.duplicates).map(([image, titles], index) => (
              <div key={index} className="border rounded-md p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/3">
                    <div className="relative h-40 w-full rounded overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt="Duplicate image"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 truncate">{image}</p>
                  </div>
                  <div className="w-full md:w-2/3">
                    <h4 className="font-medium mb-2">Used by {titles.length} artworks:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {titles.map((title, titleIndex) => (
                        <li key={titleIndex}>{title}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {status?.hasDuplicates && (
        <CardFooter>
          <Button onClick={handleFixImages} disabled={isFixing}>
            {isFixing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Fixing...
              </>
            ) : (
              "Fix Duplicate Images"
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
