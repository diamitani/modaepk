"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Loader2 } from "lucide-react"

type DuplicateItem = {
  id: number
  title: string
  image: string
  collection: "artwork" | "portfolio"
}

export function CheckDuplicates() {
  const [isLoading, setIsLoading] = useState(false)
  const [duplicates, setDuplicates] = useState<DuplicateItem[][]>([])

  const handleCheckDuplicates = async () => {
    setIsLoading(true)
    setDuplicates([])

    try {
      const response = await fetch("/api/check-duplicates")
      const data = await response.json()

      if (data.success) {
        setDuplicates(data.duplicates)
      }
    } catch (error) {
      console.error("Error checking duplicates:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Check for Duplicate Images</CardTitle>
        <CardDescription>Scan the artwork and portfolio data to find items using the same image.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleCheckDuplicates} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Check for Duplicates
            </>
          )}
        </Button>

        {duplicates.length > 0 ? (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Found {duplicates.length} duplicate groups:</h3>
            <div className="space-y-4">
              {duplicates.map((group, groupIndex) => (
                <div key={groupIndex} className="p-4 bg-gray-50 rounded-md">
                  <h4 className="font-medium mb-2">
                    Duplicate Group {groupIndex + 1} - Image: {group[0].image}
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {group.map((item) => (
                      <li key={`${item.collection}-${item.id}`}>
                        {item.title} (ID: {item.id}, Collection: {item.collection})
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : duplicates.length === 0 && !isLoading ? (
          <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
            No duplicate images found! All images are unique.
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        This tool helps identify and fix duplicate images in your artwork and portfolio collections.
      </CardFooter>
    </Card>
  )
}
