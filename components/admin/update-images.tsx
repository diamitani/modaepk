"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, RefreshCw } from "lucide-react"

export function UpdateImages() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleUpdateImages = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/update-images")
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error updating images:", error)
      setResult({ success: false, error: "Failed to update images" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Images</CardTitle>
        <CardDescription>
          Scan the images directory and update the artwork and portfolio data with new images.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleUpdateImages} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Update Images
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
        This will scan the public/images directory and add any new images to the artwork and portfolio data.
      </CardFooter>
    </Card>
  )
}
