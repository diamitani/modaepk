import { type NextRequest, NextResponse } from "next/server"
import { extractImagesFromPDF } from "@/utils/pdf-extractor"
import { addArtworkFromExtractedImages } from "@/utils/artwork-manager"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const pdfFile = formData.get("pdf") as File

    if (!pdfFile) {
      return NextResponse.json({ success: false, error: "No PDF file provided" }, { status: 400 })
    }

    // Convert the file to an ArrayBuffer
    const pdfBuffer = await pdfFile.arrayBuffer()

    // Extract images from the PDF
    const extractedImagePaths = await extractImagesFromPDF(pdfBuffer)

    // Add the extracted images to the artwork collection
    const newArtworkItems = await addArtworkFromExtractedImages(extractedImagePaths)

    return NextResponse.json({
      success: true,
      message: `Successfully extracted ${extractedImagePaths.length} images from the PDF`,
      extractedImagePaths,
      newArtworkItems,
    })
  } catch (error) {
    console.error("Error in extract-portfolio-file API:", error)
    return NextResponse.json({ success: false, error: "Failed to extract images from the PDF" }, { status: 500 })
  }
}
