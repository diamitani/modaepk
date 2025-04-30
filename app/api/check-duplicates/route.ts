import { NextResponse } from "next/server"
import { artworkItems, portfolioItems } from "@/data/artwork-data"

export async function GET() {
  try {
    // Create a map to track images and their items
    const imageMap = new Map<string, Array<{ id: number; title: string; collection: "artwork" | "portfolio" }>>()

    // Add artwork items to the map
    artworkItems.forEach((item) => {
      const items = imageMap.get(item.image) || []
      items.push({ id: item.id, title: item.title, collection: "artwork" })
      imageMap.set(item.image, items)
    })

    // Add portfolio items to the map
    portfolioItems.forEach((item) => {
      const items = imageMap.get(item.image) || []
      items.push({ id: item.id, title: item.title, collection: "portfolio" })
      imageMap.set(item.image, items)
    })

    // Find images with multiple items (duplicates)
    const duplicates: Array<Array<{ id: number; title: string; image: string; collection: "artwork" | "portfolio" }>> =
      []

    imageMap.forEach((items, image) => {
      if (items.length > 1) {
        duplicates.push(items.map((item) => ({ ...item, image })))
      }
    })

    return NextResponse.json({
      success: true,
      duplicates,
      totalDuplicates: duplicates.length,
    })
  } catch (error) {
    console.error("Error checking for duplicates:", error)
    return NextResponse.json({ success: false, error: "Failed to check for duplicates" }, { status: 500 })
  }
}
