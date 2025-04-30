import { v4 as uuidv4 } from "uuid"
import path from "path"
import fs from "fs/promises"
import { existsSync } from "fs"

// Define types for our artwork items
export type ArtworkItem = {
  id: string
  title: string
  year: string
  description: string
  image: string
  medium?: string
  dimensions?: string
  category: string
}

// Path to the artwork data file
const ARTWORK_DATA_PATH = path.join(process.cwd(), "data/artwork-data.json")

// Function to get all artwork items
export async function getAllArtworkItems(): Promise<ArtworkItem[]> {
  try {
    // Check if the data file exists
    if (!existsSync(ARTWORK_DATA_PATH)) {
      // Create the directory if it doesn't exist
      const dataDir = path.dirname(ARTWORK_DATA_PATH)
      if (!existsSync(dataDir)) {
        await fs.mkdir(dataDir, { recursive: true })
      }

      // Create an empty data file
      await fs.writeFile(ARTWORK_DATA_PATH, JSON.stringify([]))
      return []
    }

    // Read the data file
    const data = await fs.readFile(ARTWORK_DATA_PATH, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error getting artwork items:", error)
    return []
  }
}

// Function to save artwork items
export async function saveArtworkItems(items: ArtworkItem[]): Promise<void> {
  try {
    // Create the directory if it doesn't exist
    const dataDir = path.dirname(ARTWORK_DATA_PATH)
    if (!existsSync(dataDir)) {
      await fs.mkdir(dataDir, { recursive: true })
    }

    // Write the data file
    await fs.writeFile(ARTWORK_DATA_PATH, JSON.stringify(items, null, 2))
  } catch (error) {
    console.error("Error saving artwork items:", error)
    throw error
  }
}

// Function to add new artwork items from extracted images
export async function addArtworkFromExtractedImages(imagePaths: string[]): Promise<ArtworkItem[]> {
  try {
    // Get existing artwork items
    const existingItems = await getAllArtworkItems()

    // Create new artwork items
    const newItems: ArtworkItem[] = imagePaths.map((imagePath) => {
      // Generate a unique ID
      const id = uuidv4()

      // Extract the filename without extension
      const filename = path.basename(imagePath, path.extname(imagePath))

      // Create a title from the filename
      const title = filename
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      return {
        id,
        title,
        year: new Date().getFullYear().toString(),
        description: `Artwork extracted from portfolio PDF.`,
        image: imagePath,
        category: "artwork",
      }
    })

    // Add the new items to the existing items
    const updatedItems = [...existingItems, ...newItems]

    // Save the updated items
    await saveArtworkItems(updatedItems)

    return newItems
  } catch (error) {
    console.error("Error adding artwork from extracted images:", error)
    throw error
  }
}

// Function to check for duplicate images
export async function findDuplicateImages(): Promise<Record<string, string[]>> {
  try {
    // Get all artwork items
    const items = await getAllArtworkItems()

    // Create a map of image paths to item IDs
    const imageMap: Record<string, string[]> = {}

    // Populate the map
    items.forEach((item) => {
      if (!imageMap[item.image]) {
        imageMap[item.image] = []
      }
      imageMap[item.image].push(item.id)
    })

    // Filter out images with only one item
    const duplicates: Record<string, string[]> = {}
    Object.entries(imageMap).forEach(([image, ids]) => {
      if (ids.length > 1) {
        duplicates[image] = ids
      }
    })

    return duplicates
  } catch (error) {
    console.error("Error finding duplicate images:", error)
    throw error
  }
}

// Function to ensure all artwork items have unique images
export async function ensureUniqueImages(): Promise<void> {
  try {
    // Get all artwork items
    const items = await getAllArtworkItems()

    // Create a map of image paths to item IDs
    const imageMap: Record<string, string[]> = {}

    // Populate the map
    items.forEach((item) => {
      if (!imageMap[item.image]) {
        imageMap[item.image] = []
      }
      imageMap[item.image].push(item.id)
    })

    // Find items with duplicate images
    const itemsToUpdate: ArtworkItem[] = []

    Object.entries(imageMap).forEach(([image, ids]) => {
      if (ids.length > 1) {
        // Keep the first item with this image
        const itemsWithDuplicateImage = items.filter((item) => ids.slice(1).includes(item.id))

        // Update these items with a placeholder image
        itemsWithDuplicateImage.forEach((item) => {
          item.image = `/placeholder.svg?text=${encodeURIComponent(item.title)}&width=400&height=300`
          itemsToUpdate.push(item)
        })
      }
    })

    // Save the updated items
    if (itemsToUpdate.length > 0) {
      const updatedItems = items.map((item) => {
        const updatedItem = itemsToUpdate.find((updatedItem) => updatedItem.id === item.id)
        return updatedItem || item
      })

      await saveArtworkItems(updatedItems)
    }
  } catch (error) {
    console.error("Error ensuring unique images:", error)
    throw error
  }
}
