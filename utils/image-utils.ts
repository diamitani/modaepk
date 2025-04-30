import fs from "fs"
import path from "path"
import { artworkItems, portfolioItems } from "@/data/artwork-data"

// Function to scan the images directory and get all image files
export async function scanImagesDirectory() {
  const imagesDir = path.join(process.cwd(), "public/images")

  try {
    const files = await fs.promises.readdir(imagesDir)
    return files.filter((file) => {
      const ext = path.extname(file).toLowerCase()
      return [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext)
    })
  } catch (error) {
    console.error("Error scanning images directory:", error)
    return []
  }
}

// Function to check if an image is already in our data
export function isImageInData(imagePath: string) {
  const normalizedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`

  return (
    artworkItems.some((item) => item.image === normalizedPath) ||
    portfolioItems.some((item) => item.image === normalizedPath)
  )
}

// Function to add new images to our data with placeholder information
export function addNewImagesToData(newImages: string[]) {
  const newArtworkItems = []
  const newPortfolioItems = []

  // Get all existing image paths to ensure uniqueness
  const existingArtworkImages = new Set(artworkItems.map((item) => item.image))
  const existingPortfolioImages = new Set(portfolioItems.map((item) => item.image))

  for (const image of newImages) {
    const imagePath = `/images/${image}`

    // Only add if the image is not already in our data
    if (!isImageInData(imagePath)) {
      // Create a new artwork item
      const newArtworkItem = {
        id: artworkItems.length + newArtworkItems.length + 1,
        title: `Artwork ${artworkItems.length + newArtworkItems.length + 1}`,
        year: new Date().getFullYear().toString(),
        description: "New artwork piece by Mr. Moda.",
        image: imagePath,
        medium: "Mixed media",
        dimensions: '36" x 48"',
        category: "new",
      }

      // Ensure the image is unique before adding
      if (!existingArtworkImages.has(imagePath)) {
        newArtworkItems.push(newArtworkItem)
        existingArtworkImages.add(imagePath)
      }

      // Create a new portfolio item
      const newPortfolioItem = {
        id: portfolioItems.length + newPortfolioItems.length + 1,
        title: `Artwork ${portfolioItems.length + newPortfolioItems.length + 1}`,
        year: new Date().getFullYear().toString(),
        description: "New artwork piece by Mr. Moda.",
        image: imagePath,
        category: "artwork",
      }

      // Ensure the image is unique before adding
      if (!existingPortfolioImages.has(imagePath)) {
        newPortfolioItems.push(newPortfolioItem)
        existingPortfolioImages.add(imagePath)
      }
    }
  }

  return {
    newArtworkItems,
    newPortfolioItems,
  }
}
