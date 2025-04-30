"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, Upload, FileUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function PortfolioExtractor() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [pdfUrl, setPdfUrl] = useState(
    "https://drive.google.com/file/d/1vqqJZa0YUh3jqyCb1kcuW2SoAW8LQbo2/view?usp=drivesdk",
  )
  const [file, setFile] = useState<File | null>(null)
  const [extractedImages, setExtractedImages] = useState<string[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleExtractFromUrl = async () => {
    if (!pdfUrl) {
      toast({
        title: "Error",
        description: "Please enter a PDF URL",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/extract-portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pdfUrl }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: data.message,
        })
        setExtractedImages(data.extractedImagePaths)
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
        description: "Failed to extract images from the PDF",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleExtractFromFile = async () => {
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

      const response = await fetch("/api/extract-portfolio-file", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: data.message,
        })
        setExtractedImages(data.extractedImagePaths)
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
        description: "Failed to extract images from the PDF",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Extract Images from Portfolio PDF</CardTitle>
        <CardDescription>Extract images from your portfolio PDF to add them to the artwork section.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Option 1: Extract from URL</h3>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter PDF URL"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              disabled={isLoading}
            />
            <Button onClick={handleExtractFromUrl} disabled={isLoading || !pdfUrl}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Extracting...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Extract
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Option 2: Upload PDF</h3>
          <div className="flex space-x-2">
            <Input type="file" accept=".pdf" onChange={handleFileChange} disabled={isLoading} />
            <Button onClick={handleExtractFromFile} disabled={isLoading || !file}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Extracting...
                </>
              ) : (
                <>
                  <FileUp className="mr-2 h-4 w-4" />
                  Upload & Extract
                </>
              )}
            </Button>
          </div>
        </div>

        {extractedImages.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Extracted Images ({extractedImages.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {extractedImages.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Extracted image ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        The extracted images will be automatically added to the artwork section with unique titles.
      </CardFooter>
    </Card>
  )
}
