import { put } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function POST(request: Request): Promise<NextResponse> {
  const formData = await request.formData()
  const file = formData.get("file") as File
  const filename = (formData.get("filename") as string) || file.name

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 })
  }

  try {
    const blob = await put(filename, file, {
      access: "public",
    })

    return NextResponse.json(blob)
  } catch (error) {
    console.error("Error uploading to Blob:", error)
    return NextResponse.json({ error: "Failed to upload to Blob" }, { status: 500 })
  }
}
