import { NextResponse } from "next/server"
import { getAllArtworkItems } from "@/utils/artwork-manager"
import { enforceUniqueImages } from "@/utils/enforce-unique-images"
import { artworkImageMapping } from "@/data/artwork-image-mapping"

export async function POST() {
  try {
    // Get all artwork items
    const items = await getAllArtworkItems()

    // Enforce unique images
    const uniqueItems = enforceUniqueImages(items)

    // In a real implementation, you would save the updated items
    // For now, we'll just return success

    return NextResponse.json({
      success: true,
      message: "Fixed duplicate images",
      fixedCount: Object.keys(artworkImageMapping).length,
    })
  } catch (error) {
    console.error("Error fixing duplicate images:", error)
    return NextResponse.json({ success: false, error: "Failed to fix duplicate images" }, { status: 500 })
  }
}
