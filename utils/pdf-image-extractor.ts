import type { ArtworkItem } from "@/utils/pdf-extractor"

// Function to extract images from PDF and match them with titles
export async function extractAndMatchImages(
  pdfBuffer: ArrayBuffer,
  artworkData: ArtworkItem[],
): Promise<ArtworkItem[]> {
  try {
    // In a real implementation, you would use a PDF parsing library
    // For now, we'll simulate the extraction process

    // Create a mapping of titles to artwork items
    const titleToArtwork = new Map<string, ArtworkItem>()
    artworkData.forEach((artwork) => {
      // Normalize the title for matching
      const normalizedTitle = artwork.title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")

      titleToArtwork.set(normalizedTitle, artwork)
    })

    // Simulate extracting images and their associated titles from the PDF
    // In a real implementation, this would analyze the PDF content
    const extractedImages = [
      { title: "how-to-lose-your-f-mind", image: "/images/artwork-1.png" },
      { title: "how-to-build-the-perfect-wombman", image: "/images/artwork-3.png" },
      { title: "how-to-lose-control", image: "/images/artwork-4.png" },
      { title: "how-to-be-an-artist", image: "/images/artwork-5.png" },
      { title: "how-to-make-love", image: "/images/artwork-6.png" },
      { title: "how-to-keep-a-relationship", image: "/images/artwork-7.png" },
      { title: "how-to-move-on", image: "/images/artwork-8.png" },
      { title: "how-to-be-your-self", image: "/images/artwork-9.png" },
      { title: "modanna", image: "/images/artwork-10.png" },
      { title: "sleepy-sloth", image: "/images/mural-3.png" },
      { title: "fevver", image: "/images/collaboration-1.png" },
      { title: "will", image: "/images/collaboration-2.png" },
    ]

    // Update artwork items with matched images
    const updatedArtwork = artworkData.map((artwork) => {
      // Normalize the title for matching
      const normalizedTitle = artwork.title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")

      // Find a matching extracted image
      const match = extractedImages.find(
        (item) => normalizedTitle.includes(item.title) || item.title.includes(normalizedTitle),
      )

      if (match) {
        return { ...artwork, image: match.image }
      }

      return artwork
    })

    return updatedArtwork
  } catch (error) {
    console.error("Error extracting and matching images:", error)
    throw error
  }
}
