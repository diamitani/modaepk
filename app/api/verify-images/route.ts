import { NextResponse } from "next/server"
import { verifyUniqueImages } from "@/utils/verify-unique-images"

export async function GET() {
  try {
    const result = verifyUniqueImages()

    return NextResponse.json({
      success: true,
      ...result,
    })
  } catch (error) {
    console.error("Error verifying images:", error)
    return NextResponse.json({ success: false, error: "Failed to verify images" }, { status: 500 })
  }
}
