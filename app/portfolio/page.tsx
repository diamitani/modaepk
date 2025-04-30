"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getAllCategories, getArtworkByCategory, artworkData } from "@/data/artwork-data"
import { enforceUniqueImages } from "@/utils/enforce-unique-images"
import { ArtworkDisplay } from "@/components/artwork-display"
import type { ArtworkItem } from "@/utils/pdf-extractor"

export default function PortfolioPage() {
  const [selectedItem, setSelectedItem] = useState<ArtworkItem | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [artworkByCategory, setArtworkByCategory] = useState<Record<string, ArtworkItem[]>>({})

  useEffect(() => {
    // Get all categories
    const allCategories = getAllCategories()
    setCategories(allCategories)

    // Get artwork for each category and enforce unique images
    const artworkMap: Record<string, ArtworkItem[]> = {}
    allCategories.forEach((category) => {
      const artworks = getArtworkByCategory(category)
      artworkMap[category] = enforceUniqueImages(artworks)
    })

    setArtworkByCategory(artworkMap)
    setIsLoading(false)
  }, [])

  // Format category names for display
  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  // Special section for the "How To: Be An Artist" series
  const howToBeAnArtistSeries = enforceUniqueImages(
    artworkData.filter((item) => item.series === "How To: Be An Artist"),
  )

  if (isLoading) {
    return (
      <main className="min-h-screen pt-24 pb-20">
        <div className="container px-4 flex justify-center items-center">
          <p>Loading portfolio...</p>
        </div>
      </main>
    )
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
          <h1 className="text-3xl md:text-4xl font-bold">Complete Portfolio</h1>
        </div>

        <p className="text-lg text-gray-600 mb-12 max-w-3xl">
          Explore Mr. Moda's diverse portfolio spanning fine art, murals, commissions, and his acclaimed "How To: Be An
          Artist" series. Each piece showcases his unique blend of anime influences, street art aesthetics, and
          Renaissance allegories.
        </p>

        {/* Featured Series Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">HOW TO : BE AN ARTIST Series</h2>
            <Button variant="outline" asChild>
              <Link href="/series/How-To-Be-An-Artist">View Full Series</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uxGCLnrq9fEjNc4vHL9md8RLkLqGf8.png"
                alt="HOW TO : LOSE YOUR F* MIND 2021"
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-4">Mr. Moda's Signature Collection</h3>
              <p className="text-gray-700 mb-4">
                The artist creates an interpretation of the modern 'Blue print' to convey emotions, impressions, and
                experiences throughout the set. This series focuses on mental health and environmental challenges.
              </p>
              <p className="text-gray-700">
                Each installment features 100% authentic materials and symbolic collectables from scratch: real bullets,
                a power outlet, Pokemon cards, and other hand-made materials. Upon purchase each piece will be fitted
                with a custom one of a kind frame as the finishing touch.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {howToBeAnArtistSeries.slice(0, 8).map((artwork) => (
              <div
                key={artwork.id}
                className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
                onClick={() => setSelectedItem(artwork)}
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={artwork.image || "/placeholder.svg"}
                    alt={artwork.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-3 bg-white">
                  <h3 className="font-bold text-sm truncate">{artwork.title}</h3>
                  <p className="text-xs text-gray-500">{artwork.year}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Categories */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex flex-wrap mb-12">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="mb-2">
                {formatCategoryName(category)}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {artworkByCategory[category]?.map((item) => (
                  <ArtworkDisplay key={item.id} artwork={item} onClick={() => setSelectedItem(item)} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Image Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        {selectedItem && (
          <DialogContent className="max-w-4xl">
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
                  {selectedItem.series && (
                    <p>
                      <span className="font-medium">Series:</span> {selectedItem.series}
                    </p>
                  )}
                  <p>
                    <span className="font-medium">Category:</span> {formatCategoryName(selectedItem.category)}
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="relative h-[60vh] w-full">
              <Image
                src={selectedItem.image || "/placeholder.svg"}
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
