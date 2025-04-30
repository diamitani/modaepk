"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { ArtworkItem } from "@/utils/pdf-extractor"

export function PdfExtractor() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [extractedArtwork, setExtractedArtwork] = useState<ArtworkItem[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleExtract = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("pdf", file)

      const response = await fetch("/api/extract-pdf", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: data.message,
        })
        setExtractedArtwork(data.artworkData)
      } else {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to extract data from the PDF",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Extract Artwork from PDF</CardTitle>
        <CardDescription>Upload a PDF file to extract artwork information and images.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Input id="pdf-file" type="file" accept=".pdf" onChange={handleFileChange} disabled={isLoading} />
        </div>
        <Button onClick={handleExtract} disabled={isLoading || !file}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Extracting...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Extract Artwork
            </>
          )}
        </Button>

        {extractedArtwork.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Extracted Artwork ({extractedArtwork.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {extractedArtwork.map((artwork, index) => (
                <div key={index} className="border rounded-md p-2">
                  <div className="aspect-square bg-gray-100 rounded-md mb-2 flex items-center justify-center text-xs text-gray-500">
                    {artwork.title}
                  </div>
                  <p className="text-xs font-medium truncate">{artwork.title}</p>
                  <p className="text-xs text-gray-500">{artwork.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        The extracted artwork will be automatically added to the portfolio.
      </CardFooter>
    </Card>
  )
}
