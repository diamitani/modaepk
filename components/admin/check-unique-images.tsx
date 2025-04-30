"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Check, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CheckUniqueImages() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleCheckUniqueImages = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/check-unique-images")
      const data = await response.json()

      if (data.success) {
        setResult(data)

        if (data.allUnique) {
          toast({
            title: "Success",
            description: "All artwork images are unique!",
          })
        } else {
          toast({
            title: "Duplicates Found",
            description: `Found ${data.duplicateCount} images with duplicates.`,
            variant: "destructive",
          })
        }
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
        description: "Failed to check for unique images",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFixDuplicates = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/fix-duplicate-images", {
        method: "POST",
      })

      const data = await response.json()

      if (data.success) {
        setResult(null)

        toast({
          title: "Success",
          description: `Fixed ${data.fixedCount} duplicate images.`,
        })

        // Refresh the check
        await handleCheckUniqueImages()
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
        description: "Failed to fix duplicate images",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Check for Unique Artwork Images</CardTitle>
        <CardDescription>
          Ensure all artwork items have unique images to avoid duplicates in the gallery.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleCheckUniqueImages} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Check Unique Images
            </>
          )}
        </Button>

        {result && (
          <div className="mt-4">
            {result.allUnique ? (
              <div className="p-4 bg-green-50 text-green-700 rounded-md flex items-center">
                <Check className="h-5 w-5 mr-2" />
                <span>All artwork images are unique! ({result.totalItems} items with unique images)</span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 text-amber-700 rounded-md flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <span>Found {result.duplicateCount} images with duplicates.</span>
                </div>

                <Button onClick={handleFixDuplicates} disabled={isLoading} variant="outline">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Fixing...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Fix Duplicate Images
                    </>
                  )}
                </Button>

                <div className="mt-2">
                  <h4 className="font-medium mb-2">Duplicate Images:</h4>
                  <div className="max-h-60 overflow-y-auto p-4 bg-gray-50 rounded-md text-sm">
                    {Object.entries(result.duplicates).map(([image, ids]: [string, string[]]) => (
                      <div key={image} className="mb-2 pb-2 border-b border-gray-200">
                        <p className="font-medium">Image: {image}</p>
                        <p>Used by {ids.length} items:</p>
                        <ul className="list-disc pl-5">
                          {ids.map((id) => (
                            <li key={id}>{id}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        This tool helps ensure that each artwork item has a unique image, improving the visual variety in the gallery.
      </CardFooter>
    </Card>
  )
}
