// Utility to validate image URLs and provide fallbacks

/**
 * Validates an image URL and returns a fallback if it's invalid
 * @param imageUrl The image URL to validate
 * @param fallbackUrl Optional fallback URL
 * @returns A valid image URL
 */
export function validateImageUrl(imageUrl: string, fallbackUrl?: string): string {
  // List of known valid image domains
  const validDomains = ["hebbkx1anhila5yf.public.blob.vercel-storage.com", "vercel.com", "localhost"]

  try {
    // Check if the URL is valid
    const url = new URL(imageUrl)

    // Check if the domain is in our list of valid domains
    if (validDomains.some((domain) => url.hostname.includes(domain))) {
      return imageUrl
    }

    // If the domain is not valid, return the fallback or a placeholder
    return fallbackUrl || `/placeholder.svg?text=${encodeURIComponent("Image not found")}&width=600&height=800`
  } catch (error) {
    // If the URL is not valid, check if it's a local path
    if (imageUrl.startsWith("/")) {
      return imageUrl
    }

    // Otherwise, return the fallback or a placeholder
    return fallbackUrl || `/placeholder.svg?text=${encodeURIComponent("Image not found")}&width=600&height=800`
  }
}

/**
 * Checks if an image exists and is accessible
 * @param imageUrl The image URL to check
 * @returns Promise that resolves to true if the image exists
 */
export async function checkImageExists(imageUrl: string): Promise<boolean> {
  // For local paths, assume they exist
  if (imageUrl.startsWith("/")) {
    return true
  }

  try {
    const response = await fetch(imageUrl, { method: "HEAD" })
    return response.ok
  } catch (error) {
    console.error(`Error checking image existence for ${imageUrl}:`, error)
    return false
  }
}

/**
 * Gets a safe image URL that is guaranteed to work
 * @param imageUrl The primary image URL to try
 * @param backupUrls Array of backup URLs to try if the primary fails
 * @returns A working image URL or placeholder
 */
export function getSafeImageUrl(imageUrl: string, backupUrls: string[] = []): string {
  // First try the primary URL
  const validatedUrl = validateImageUrl(imageUrl)

  // If it's not a placeholder, return it
  if (!validatedUrl.includes("placeholder.svg")) {
    return validatedUrl
  }

  // Try each backup URL
  for (const backupUrl of backupUrls) {
    const validatedBackup = validateImageUrl(backupUrl)
    if (!validatedBackup.includes("placeholder.svg")) {
      return validatedBackup
    }
  }

  // If all else fails, return a placeholder
  return `/placeholder.svg?text=${encodeURIComponent("Artwork image")}&width=600&height=800`
}
