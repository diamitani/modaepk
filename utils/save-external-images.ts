import fs from "fs"
import path from "path"
import { promises as fsPromises } from "fs"

// Function to download and save an external image to the project
export async function saveExternalImage(imageUrl: string, category = "events"): Promise<string> {
  try {
    // Create directory if it doesn't exist
    const dirPath = path.join(process.cwd(), "public/images", category)
    if (!fs.existsSync(dirPath)) {
      await fsPromises.mkdir(dirPath, { recursive: true })
    }

    // Generate a filename based on the URL
    const filename = `${category}-${Date.now()}-${Math.floor(Math.random() * 1000)}.jpg`
    const filePath = path.join(dirPath, filename)

    // Fetch the image
    const response = await fetch(imageUrl)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Save the image
    await fsPromises.writeFile(filePath, buffer)

    // Return the path to use in the application
    return `/images/${category}/${filename}`
  } catch (error) {
    console.error("Error saving external image:", error)
    return imageUrl // Return the original URL if there's an error
  }
}
