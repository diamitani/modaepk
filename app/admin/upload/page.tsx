"use client"

import { useState } from "react"
import { BlobUploader } from "@/components/blob-uploader"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

export default function UploadPage() {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({})

  const handleUploadComplete = (url: string) => {
    setUploadedUrls((prev) => [...prev, url])
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopied({ ...copied, [url]: true })
    setTimeout(() => {
      setCopied({ ...copied, [url]: false })
    }, 2000)
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Upload Artwork Images</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <BlobUploader onUploadComplete={handleUploadComplete} />
        </div>

        <div>
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Uploaded Images</h2>

              {uploadedUrls.length === 0 ? (
                <p className="text-gray-500">No images uploaded yet</p>
              ) : (
                <div className="space-y-4">
                  {uploadedUrls.map((url, index) => (
                    <div key={index} className="border rounded-md p-4">
                      <div className="relative h-40 mb-2">
                        <img
                          src={url || "/placeholder.svg"}
                          alt={`Uploaded image ${index + 1}`}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500 truncate max-w-[70%]">{url}</div>
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(url)}>
                          {copied[url] ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">How to use uploaded images</h2>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="mb-2">Replace the GitHub URLs in your code with the Blob URLs:</p>
          <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm">
            {`<Image
  src="YOUR_BLOB_URL_HERE"
  alt="Artwork by Mr. Moda"
  fill
  style={{ objectFit: "cover" }}
/>`}
          </pre>
        </div>
      </div>
    </div>
  )
}
