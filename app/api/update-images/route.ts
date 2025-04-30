import { NextResponse } from "next/server"
import { scanImagesDirectory, addNewImagesToData } from "@/utils/image-utils"

export async function GET() {
  try {
    // Scan the images directory
    const imageFiles = await scanImagesDirectory()

    // Add new images to our data
    const { newArtworkItems, newPortfolioItems } = addNewImagesToData(imageFiles)

    // In a real application, you would update your database here
    // For this example, we'll just return the new items

    return NextResponse.json({
      success: true,
      newImages: imageFiles.length,
      newArtworkItems,
      newPortfolioItems,
    })
  } catch (error) {
    console.error("Error updating images:", error)
    return NextResponse.json({ success: false, error: "Failed to update images" }, { status: 500 })
  }
}
