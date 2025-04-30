"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageWithFallback } from "./image-error-handler"
import { validateImageUrl } from "@/utils/image-validator"
import { artworkData } from "@/data/artwork-data"
import { portfolioImages } from "@/data/portfolio-images"

// Combine all image sources to ensure we have a comprehensive collection
const allImageSources = [
  ...artworkData.map((item) => ({
    id: item.id,
    title: item.title || "Untitled Artwork",
    image: item.image,
    year: item.year || "Unknown",
    category: item.category || "artwork",
  })),
  ...portfolioImages.map((item, index) => ({
    id: `portfolio-${index}`,
    title: item.title || `Artwork ${index + 1}`,
    image: item.url,
    year: item.year || "Unknown",
    category: item.category || "portfolio",
  })),
]

// Remove duplicates by image URL
const uniqueImages = Array.from(new Map(allImageSources.map((item) => [item.image, item])).values())

// Group images by category
const getImagesByCategory = () => {
  const categories = new Set(uniqueImages.map((item) => item.category))
  const result: Record<string, typeof uniqueImages> = {}

  Array.from(categories).forEach((category) => {
    result[category] = uniqueImages.filter((item) => item.category === category)
  })

  return result
}

export function EnhancedGallery() {
  const [selectedImage, setSelectedImage] = useState<(typeof uniqueImages)[0] | null>(null)
  const [imagesByCategory, setImagesByCategory] = useState<Record<string, typeof uniqueImages>>({})
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const categorizedImages = getImagesByCategory()
    setImagesByCategory(categorizedImages)
    setCategories(["all", ...Object.keys(categorizedImages)])
    setIsLoading(false)
  }, [])

  // Format category names for display
  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  // Get all images or filtered by category
  const getImages = (category: string) => {
    if (category === "all") {
      return uniqueImages
    }
    return imagesByCategory[category] || []
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg">Loading gallery...</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex flex-wrap mb-8">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="mb-2">
              {formatCategoryName(category)}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {getImages(category).map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <ImageWithFallback
                      src={validateImageUrl(item.image) || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-sm truncate">{item.title}</h3>
                    <p className="text-xs opacity-80">{item.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Image Detail Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        {selectedImage && (
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedImage.title} ({selectedImage.year})
              </DialogTitle>
            </DialogHeader>
            <div className="relative h-[70vh] w-full">
              <ImageWithFallback
                src={validateImageUrl(selectedImage.image) || "/placeholder.svg"}
                alt={selectedImage.title}
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg"
              />
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
