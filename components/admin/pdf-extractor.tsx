"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"

export function PdfExtractor() {
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<any>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleExtractImages = async () => {
    if (!file) return

    setIsLoading(true)
    setResult(null)

    const formData = new FormData()
    formData.append("pdf", file)

    try {
      const response = await fetch("/api/extract-pdf-images", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error extracting images:", error)
      setResult({ success: false, error: "Failed to extract images" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Extract Images from PDF</CardTitle>
        <CardDescription>
          Upload a PDF file to extract images and add them to the artwork and portfolio pages.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Input id="pdf-file" type="file" accept=".pdf" onChange={handleFileChange} disabled={isLoading} />
        </div>
        <Button onClick={handleExtractImages} disabled={isLoading || !file}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Extracting...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Extract Images
            </>
          )}
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium mb-2">Result:</h3>
            <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        The extracted images will be saved to the public/images directory and automatically added to the artwork and
        portfolio data.
      </CardFooter>
    </Card>
  )
}
