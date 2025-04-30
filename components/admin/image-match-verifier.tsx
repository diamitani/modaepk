"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertTriangle } from "lucide-react"
import { artworkData } from "@/data/artwork-data"
import { checkImageMatches } from "@/utils/enforce-unique-images"

export function ImageMatchVerifier() {
  const [status, setStatus] = useState<{
    allCorrect: boolean
    mismatches: Array<{ title: string; currentImage: string; correctImage: string }>
  } | null>(null)

  useEffect(() => {
    // Check for image matches on component mount
    const result = checkImageMatches(artworkData)
    setStatus(result)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Match Verification</CardTitle>
        <CardDescription>Verify that artwork titles are matched with their correct images</CardDescription>
      </CardHeader>
      <CardContent>
        {status === null ? (
          <div className="flex justify-center py-4">
            <p>Checking image matches...</p>
          </div>
        ) : status.allCorrect ? (
          <Alert variant="default" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>All Images Correctly Matched</AlertTitle>
            <AlertDescription>Each artwork is matched with its correct image.</AlertDescription>
          </Alert>
        ) : (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Image Mismatches Detected</AlertTitle>
            <AlertDescription>Found {status.mismatches.length} artworks with incorrect image matches.</AlertDescription>
          </Alert>
        )}

        {status?.mismatches && status.mismatches.length > 0 && (
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-medium">Mismatched Images</h3>
            {status.mismatches.map((mismatch, index) => (
              <div key={index} className="border rounded-md p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/2">
                    <h4 className="font-medium mb-2">{mismatch.title}</h4>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-1/2">
                        <p className="text-sm font-medium mb-1">Current Image:</p>
                        <div className="relative h-40 w-full rounded overflow-hidden">
                          <Image
                            src={mismatch.currentImage || "/placeholder.svg"}
                            alt={`Current image for ${mismatch.title}`}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      </div>
                      <div className="w-full md:w-1/2">
                        <p className="text-sm font-medium mb-1">Correct Image:</p>
                        <div className="relative h-40 w-full rounded overflow-hidden">
                          <Image
                            src={mismatch.correctImage || "/placeholder.svg"}
                            alt={`Correct image for ${mismatch.title}`}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        This tool helps verify that each artwork is matched with its correct image based on the PDF documentation.
      </CardFooter>
    </Card>
  )
}
