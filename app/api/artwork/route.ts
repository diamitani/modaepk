import { NextResponse } from "next/server"
import { getAllArtworkItems } from "@/utils/artwork-manager"
import { enforceUniqueImages } from "@/utils/enforce-unique-images"

export async function GET() {
  try {
    // Get all artwork items
    const items = await getAllArtworkItems()

    // Enforce unique images for each artwork
    const uniqueItems = enforceUniqueImages(items)

    return NextResponse.json({
      success: true,
      items: uniqueItems,
    })
  } catch (error) {
    console.error("Error in artwork API:", error)
    return NextResponse.json({ success: false, error: "Failed to get artwork items" }, { status: 500 })
  }
}
