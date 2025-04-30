import type { ArtworkItem } from "@/utils/pdf-extractor"
import { artworkImageMapping } from "@/data/artwork-image-mapping"

// Function to ensure each artwork has its correct image
export function enforceUniqueImages(artworks: ArtworkItem[]): ArtworkItem[] {
  return artworks.map((artwork) => {
    // Get the correct image for this artwork title
    const correctImage = artworkImageMapping[artwork.title]

    if (correctImage) {
      // Use the mapped image
      return {
        ...artwork,
        image: correctImage,
      }
    }

    // If no mapping exists, keep the original image
    return artwork
  })
}

// Function to check if any artworks have incorrect images
export function checkImageMatches(artworks: ArtworkItem[]): {
  allCorrect: boolean
  mismatches: Array<{ title: string; currentImage: string; correctImage: string }>
} {
  const mismatches: Array<{ title: string; currentImage: string; correctImage: string }> = []

  artworks.forEach((artwork) => {
    const correctImage = artworkImageMapping[artwork.title]

    if (correctImage && artwork.image !== correctImage) {
      mismatches.push({
        title: artwork.title,
        currentImage: artwork.image,
        correctImage: correctImage,
      })
    }
  })

  return {
    allCorrect: mismatches.length === 0,
    mismatches,
  }
}

// Function to check for duplicate images
export function checkForDuplicateImages(artworks: ArtworkItem[]): {
  hasDuplicates: boolean
  duplicates: Record<string, string[]>
} {
  const imageMap = new Map<string, string[]>()

  // Track which images are used by which artworks
  artworks.forEach((artwork) => {
    const titles = imageMap.get(artwork.image) || []
    titles.push(artwork.title)
    imageMap.set(artwork.image, titles)
  })

  // Find images with multiple titles (duplicates)
  const duplicates: Record<string, string[]> = {}
  imageMap.forEach((titles, image) => {
    if (titles.length > 1) {
      duplicates[image] = titles
    }
  })

  return {
    hasDuplicates: Object.keys(duplicates).length > 0,
    duplicates,
  }
}
