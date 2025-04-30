import { NextResponse } from "next/server"
import { parsePdfContent } from "@/utils/pdf-extractor"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const pdfFile = formData.get("pdf") as File

    if (!pdfFile) {
      return NextResponse.json({ success: false, error: "No PDF file provided" }, { status: 400 })
    }

    // Read the PDF file as text (in a real implementation, you would use a PDF parsing library)
    const pdfText = await pdfFile.text()

    // Parse the PDF content to extract artwork data
    const artworkData = await parsePdfContent(pdfText)

    return NextResponse.json({
      success: true,
      message: `Successfully extracted ${artworkData.length} artwork items from the PDF`,
      artworkData,
    })
  } catch (error) {
    console.error("Error extracting PDF:", error)
    return NextResponse.json({ success: false, error: "Failed to extract data from the PDF" }, { status: 500 })
  }
}
