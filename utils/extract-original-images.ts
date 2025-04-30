// Utility function to extract original images from the PDF presentation

import { artworkImageMapping } from "@/data/artwork-image-mapping"

// Function to get the original image URL for a specific artwork
export function getOriginalImageUrl(artworkTitle: string): string | null {
  // Check if we have a mapping for this artwork
  if (artworkTitle in artworkImageMapping) {
    return artworkImageMapping[artworkTitle]
  }

  return null
}

// Function to find similar images (without text overlays) for a given artwork
export function findSimilarImage(artworkTitle: string): string | null {
  // This is where we would implement image similarity detection
  // For now, we'll use a manual mapping for the specific case mentioned

  const similarImageMap: Record<string, string> = {
    "HOW TO : MAKE LOVE":
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dzd60C72xuW5Smxipbr8EzcKpjeP1q.png",
    // Add more mappings as needed
  }

  return similarImageMap[artworkTitle] || null
}

// Function to extract all original images from the PDF
export function extractAllOriginalImages(): Record<string, string> {
  // In a real implementation, this would analyze the PDF and extract images
  // For now, we'll return a static mapping

  return {
    "HOW TO : MAKE LOVE":
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dzd60C72xuW5Smxipbr8EzcKpjeP1q.png",
    // Add more mappings as needed
  }
}
