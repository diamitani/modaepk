import { updatedPortfolioItems } from "@/data/updated-portfolio"

export function verifyUniqueImages() {
  const imageMap = new Map<string, string[]>()

  // Check portfolio items
  updatedPortfolioItems.forEach((item) => {
    const titles = imageMap.get(item.image) || []
    titles.push(item.title)
    imageMap.set(item.image, titles)
  })

  // Find duplicates
  const duplicates: Record<string, string[]> = {}

  imageMap.forEach((titles, image) => {
    if (titles.length > 1) {
      duplicates[image] = titles
    }
  })

  return {
    allUnique: Object.keys(duplicates).length === 0,
    duplicates,
    totalUniqueImages: imageMap.size,
    totalItems: updatedPortfolioItems.length,
  }
}
