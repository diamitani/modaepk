import { NextResponse } from "next/server"
import { findDuplicateImages, getAllArtworkItems } from "@/utils/artwork-manager"

export async function GET() {
  try {
    // Find duplicate images
    const duplicates = await findDuplicateImages()

    // Get all artwork items
    const items = await getAllArtworkItems()

    return NextResponse.json({
      success: true,
      allUnique: Object.keys(duplicates).length === 0,
      duplicates,
      duplicateCount: Object.keys(duplicates).length,
      totalItems: items.length,
    })
  } catch (error) {
    console.error("Error in check-unique-images API:", error)
    return NextResponse.json({ success: false, error: "Failed to check for unique images" }, { status: 500 })
  }
}
