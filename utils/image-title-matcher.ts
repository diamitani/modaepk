import type { ArtworkItem } from "@/utils/pdf-extractor"

// Function to verify if an image matches a title based on naming conventions
export function verifyImageTitleMatch(image: string, title: string): boolean {
  // Convert title to lowercase and remove special characters for comparison
  const normalizedTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")

  // Extract the filename from the image path
  const filename = image.split("/").pop() || ""

  // Check if the filename contains the normalized title
  return filename.toLowerCase().includes(normalizedTitle)
}

// Function to suggest a better image for a title
export function suggestImageForTitle(title: string, availableImages: string[]): string | null {
  // Convert title to lowercase and remove special characters for comparison
  const normalizedTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")

  // Find images that might match the title
  const potentialMatches = availableImages.filter((image) => {
    const filename = image.split("/").pop() || ""
    return filename.toLowerCase().includes(normalizedTitle)
  })

  // Return the first potential match, or null if none found
  return potentialMatches.length > 0 ? potentialMatches[0] : null
}

// Function to verify all artwork has matching images
export function verifyAllArtworkImages(artworks: ArtworkItem[]): {
  valid: ArtworkItem[]
  invalid: Array<{ artwork: ArtworkItem; suggestedImage: string | null }>
} {
  const valid: ArtworkItem[] = []
  const invalid: Array<{ artwork: ArtworkItem; suggestedImage: string | null }> = []

  // Get all available images
  const allImages = artworks.map((artwork) => artwork.image)

  for (const artwork of artworks) {
    if (verifyImageTitleMatch(artwork.image, artwork.title)) {
      valid.push(artwork)
    } else {
      const suggestedImage = suggestImageForTitle(artwork.title, allImages)
      invalid.push({ artwork, suggestedImage })
    }
  }

  return { valid, invalid }
}
