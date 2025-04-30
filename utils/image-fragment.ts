// This utility helps extract specific parts of an image using the fragment identifier

export function getImageFragment(imageUrl: string): string {
  // If the URL doesn't have a fragment, return it as is
  if (!imageUrl.includes("#")) {
    return imageUrl
  }

  // For now, we'll just return the full image URL without the fragment
  // In a production environment, you would implement server-side image cropping
  // based on the fragment parameters
  return imageUrl.split("#")[0]
}
