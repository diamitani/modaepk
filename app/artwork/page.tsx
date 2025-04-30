"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArtworkInsights } from "@/components/artwork-insights"
import type { ArtworkItem } from "@/utils/artwork-manager"
import { Skeleton } from "@/components/ui/skeleton"

export default function ArtworkPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [artworkItems, setArtworkItems] = useState<ArtworkItem[]>([])
  const [selectedItem, setSelectedItem] = useState<ArtworkItem | null>(null)
  const [categories, setCategories] = useState<string[]>(["all"])

  useEffect(() => {
    const fetchArtworkItems = async () => {
      try {
        const response = await fetch("/api/artwork")
        const data = await response.json()

        if (data.success) {
          setArtworkItems(data.items)

          // Extract unique categories
          const uniqueCategories = new Set<string>()
          data.items.forEach((item: ArtworkItem) => {
            uniqueCategories.add(item.category)
          })

          setCategories(["all", ...Array.from(uniqueCategories)])
        }
      } catch (error) {
        console.error("Error fetching artwork items:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArtworkItems()
  }, [])

  // Format category names for display
  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  // Get artwork items by category
  const getArtworkByCategory = (category: string): ArtworkItem[] => {
    if (category === "all") {
      return artworkItems
    }
    return artworkItems.filter((item) => item.category === category)
  }

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container px-4">
        <div className="flex items-center mb-8">
          <Button variant="ghost" asChild className="mr-4">
            <Link href="/">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold">Artwork Collection</h1>
        </div>

        <p className="text-lg text-gray-600 mb-12 max-w-3xl">
          Mr. Moda's artwork blends anime influences, street art aesthetics, and Renaissance allegories into a unique
          visual language. His paintings explore themes of identity, transformation, and cultural fusion.
        </p>

        <Tabs defaultValue="all" className="w-full mb-12">
          <TabsList className="flex flex-wrap mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="mb-2">
                {formatCategoryName(category)}
              </TabsTrigger>
            ))}
          </TabsList>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <Skeleton className="h-80 w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ))}
            </div>
          ) : (
            categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {getArtworkByCategory(category).map((item) => (
                    <div
                      key={item.id}
                      className="overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105"
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="relative h-80 w-full">
                        <Image
                          src={item.image || "/placeholder.svg?height=400&width=600"}
                          alt={item.title}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="p-6 bg-white">
                        <h3 className="font-bold text-xl mb-1">{item.title}</h3>
                        <p className="text-gray-500 mb-3">{item.year}</p>
                        <p className="text-gray-700">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))
          )}
        </Tabs>

        <div className="mt-16">
          <ArtworkInsights />
        </div>
      </div>

      {/* Image Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        {selectedItem && (
          <DialogContent className="max-w-5xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedItem.title} ({selectedItem.year})
              </DialogTitle>
              <DialogDescription>
                <div className="mt-2 space-y-2">
                  <p>{selectedItem.description}</p>
                  {selectedItem.medium && (
                    <p>
                      <span className="font-medium">Medium:</span> {selectedItem.medium}
                    </p>
                  )}
                  {selectedItem.dimensions && (
                    <p>
                      <span className="font-medium">Dimensions:</span> {selectedItem.dimensions}
                    </p>
                  )}
                  <p>
                    <span className="font-medium">Category:</span> {formatCategoryName(selectedItem.category)}
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="relative h-[70vh] w-full">
              <Image
                src={selectedItem.image || "/placeholder.svg?height=600&width=800"}
                alt={selectedItem.title}
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg"
              />
            </div>
          </DialogContent>
        )}
      </Dialog>
    </main>
  )
}
