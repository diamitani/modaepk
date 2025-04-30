// This file maps each artwork title to its correct unique image

export const artworkImageMapping: Record<string, string> = {
  // HOW TO : BE AN ARTIST series with direct image URLs
  "HOW TO : LOSE YOUR F* MIND":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-005.jpg-9XXceR5e4RDUkNNdBvX9Bdf3vDJe3B.jpeg", // Blue artwork with skull and yellow line
  "HOW TO : LOSE YOUR F* MIND 2021":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-005.jpg-9XXceR5e4RDUkNNdBvX9Bdf3vDJe3B.jpeg", // Same image for 2021 version until specific one provided
  "HOW TO : BUILD THE PERFECT WOMBMAN":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-008.jpg-FtvLwOSUhuoxgxMxKWKes7K42XLxiY.jpeg", // "NOW MADE WITH 100% REAL LOVE!!!" artwork
  "HOW TO : LOSE CONTROL":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-007.jpg-WghxSPplDl0cZPhWS2bTqUtJ3zuElV.jpeg", // "FUTURE PLANS OF WORLD DOMINATION" artwork
  "HOW TO : BE AN ARTIST":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-006.jpg-NLnwMM8BHnIPhZvag7cYXW1LEnpNy2.jpeg", // "TO BE MANIFESTED" artwork
  "HOW TO : MAKE LOVE":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dzd60C72xuW5Smxipbr8EzcKpjeP1q.png", // Anatomical figures artwork
  "HOW TO : KEEP A RELATIONSHIP":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TvvteOEy2QcDXe3Lr7x3grVqv2S9mi.png", // Two embracing skeletal figures
  "HOW TO : MOVE ON":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AQFS7Xes8ORvIdrAkiDl2xmIZ0AYRh.png", // Multiple figures with blue deity
  "HOW TO : BE YOUR, SELF.":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SD1f2Ew5Tv6TuER1gjdeH5JBpaa2b0.png", // Blue artwork with colorful skeleton and shoe
  "HOW TO : BE MANIFESTED":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-003.jpg-1JB5QDXjDSGZGHFVxB2o2U8eoucyln.jpeg", // Mr. Moda with client showing artwork
  "#NOT TRENDING":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-009.jpg-jDHYbXYveqe70PgE30Pu6d4HxRX4A9.jpeg", // Blonde woman half-cyborg artwork
  "FUTURE PLANS OF WORLD DOMINATION":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-007.jpg-WghxSPplDl0cZPhWS2bTqUtJ3zuElV.jpeg", // Blonde woman half-cyborg with orange text

  // Sold Artworks
  FEVVER:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-002.jpg-iNABO4QkPlXC9YnRY8ddo4yggbgOuP.jpeg", // Sailor Moon artwork in neon frame
  WILL: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-004.jpg-PjgkN9v7UUFgIrcgKy2705bhOZMHl0.jpeg", // Dragon Ball Z Vegeta artwork with green border

  // Artist portraits and studio
  "ARTIST PORTRAIT":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-000.jpg-C1Zhc5koUdPZbMshCanaORYOkf7TdY.jpeg", // Mr. Moda with decorative glasses
  "ARTIST STUDIO":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-001.jpg-Jf7L3r64dUd5GVmXAzsDqKhUcaCUaf.jpeg", // Mr. Moda with dog and artworks
}

// Function to get the correct image for a title
export function getImageForTitle(title: string): string {
  return artworkImageMapping[title] || "/placeholder.svg?text=Image+Not+Found"
}

// Function to get all available images
export function getAllAvailableImages(): string[] {
  return Object.values(artworkImageMapping)
}

// Function to find artwork title by image URL
export function findTitleByImage(imageUrl: string): string | null {
  for (const [title, url] of Object.entries(artworkImageMapping)) {
    if (url === imageUrl) {
      return title
    }
  }
  return null
}
