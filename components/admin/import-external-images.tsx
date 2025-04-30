"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Download } from "lucide-react"
import Image from "next/image"

export function ImportExternalImages() {
  const [isImporting, setIsImporting] = useState(false)
  const [importedImages, setImportedImages] = useState<string[]>([])
  const [category, setCategory] = useState("events")
  const [imageUrls, setImageUrls] = useState("")

  const handleImport = async () => {
    setIsImporting(true)

    try {
      const urls = imageUrls.split("\n").filter((url) => url.trim() !== "")

      if (urls.length === 0) {
        return
      }

      // In a real implementation, this would call an API to download and save the images
      // For now, we'll just simulate the import
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setImportedImages(urls)
      setImageUrls("")
    } catch (error) {
      console.error("Error importing images:", error)
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import External Images</CardTitle>
        <CardDescription>Import images from external URLs into your portfolio</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="category">Image Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="events">Events</SelectItem>
              <SelectItem value="artwork">Artwork</SelectItem>
              <SelectItem value="collaborations">Collaborations</SelectItem>
              <SelectItem value="process">Process</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image-urls">Image URLs (one per line)</Label>
          <textarea
            id="image-urls"
            className="w-full min-h-[100px] p-2 border rounded-md"
            value={imageUrls}
            onChange={(e) => setImageUrls(e.target.value)}
            placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
          />
        </div>

        <Button onClick={handleImport} disabled={isImporting || !imageUrls.trim()}>
          {isImporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Importing...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Import Images
            </>
          )}
        </Button>

        {importedImages.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Imported Images</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {importedImages.map((url, index) => (
                <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                  <Image
                    src={url || "/placeholder.svg"}
                    alt={`Imported image ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        Imported images will be saved to your project and can be assigned to artwork titles.
      </CardFooter>
    </Card>
  )
}
