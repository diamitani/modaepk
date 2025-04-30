import { NextResponse } from "next/server"
import { downloadPDFFromURL, extractImagesFromPDF } from "@/utils/pdf-extractor"
import { addArtworkFromExtractedImages } from "@/utils/artwork-manager"

export async function POST(request: Request) {
  try {
    const { pdfUrl } = await request.json()

    if (!pdfUrl) {
      return NextResponse.json({ success: false, error: "No PDF URL provided" }, { status: 400 })
    }

    // Download the PDF
    const pdfBuffer = await downloadPDFFromURL(pdfUrl)

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
    console.error("Error in extract-portfolio API:", error)
    return NextResponse.json({ success: false, error: "Failed to extract images from the PDF" }, { status: 500 })
  }
}
