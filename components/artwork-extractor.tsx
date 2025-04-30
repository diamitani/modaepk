"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { artworkImageMapping } from "@/data/artwork-image-mapping"

// Define the structure for extracted artwork info
interface ExtractedArtworkInfo {
  title: string
  year: string
  medium?: string
  dimensions?: string
  description?: string
  imageUrl: string
}

export function ArtworkExtractor() {
  const [artworks, setArtworks] = useState<ExtractedArtworkInfo[]>([])
  const [selectedArtwork, setSelectedArtwork] = useState<ExtractedArtworkInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Function to extract artwork info from image URL
  const extractArtworkInfo = (imageUrl: string, title: string): ExtractedArtworkInfo => {
    // Default info
    let info: ExtractedArtworkInfo = {
      title,
      year: "2021", // Default year
      imageUrl,
    }

    // Extract info based on image URL
    if (
      imageUrl ===
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-007.jpg-WghxSPplDl0cZPhWS2bTqUtJ3zuElV.jpeg"
    ) {
      info = {
        ...info,
        title: "FUTURE PLANS OF WORLD DOMINATION",
        year: "2018",
        medium: "Acrylic and UV paint with mixed media on canvas",
        dimensions: '60" x 60"',
        description:
          'Part of the "How to: Be an Artist" Collection. Features a blonde woman with half her face showing a skull/mechanical structure on a blue background.',
      }
    } else if (
      imageUrl ===
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-006.jpg-NLnwMM8BHnIPhZvag7cYXW1LEnpNy2.jpeg"
    ) {
      info = {
        ...info,
        title: "HOW TO : BE MANIFESTED",
        year: "2021",
        medium: "Acrylic and UV paint with mixed media on canvas",
        dimensions: '60" x 60"',
        description:
          'Part of the "How to: Be an Artist" Collection. Features a skull on a blue background with technical drawings and the text "TO BE MANIFESTED" in orange/red.',
      }
    } else if (
      imageUrl ===
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-009.jpg-jDHYbXYveqe70PgE30Pu6d4HxRX4A9.jpeg"
    ) {
      info = {
        ...info,
        title: "#NOT TRENDING",
        year: "2021",
        medium: "Acrylic and UV paint with mixed media on canvas",
        dimensions: '60" x 60"',
        description:
          "Features a blonde woman with half her face as a skull/cyborg on a blue background with technical elements and colorful accents.",
      }
    } else if (
      imageUrl ===
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-008.jpg-FtvLwOSUhuoxgxMxKWKes7K42XLxiY.jpeg"
    ) {
      info = {
        ...info,
        title: "NOW MADE WITH 100% REAL LOVE!!!",
        year: "2021",
        medium: "Acrylic and UV paint with mixed media on canvas",
        dimensions: '60" x 60"',
        description: "Features a half-human, half-skeletal figure with a world map in the bottom left corner.",
      }
    } else if (
      imageUrl ===
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-004.jpg-PjgkN9v7UUFgIrcgKy2705bhOZMHl0.jpeg"
    ) {
      info = {
        ...info,
        title: "WILL",
        year: "2021",
        medium: "Acrylic, UV paint with mixed media on canvas with custom hand-painted metal frame",
        dimensions: '72" x 48"',
        description:
          "Dragon Ball Z inspired artwork featuring Vegeta with a green border. Significant artwork sold in a private sale at Younity Studios Miami.",
      }
    } else if (
      imageUrl ===
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-002.jpg-iNABO4QkPlXC9YnRY8ddo4yggbgOuP.jpeg"
    ) {
      info = {
        ...info,
        title: "FEVVER",
        year: "2019",
        medium: "Acrylic, UV paint with mixed media on canvas with custom acrylic light box",
        dimensions: '72" x 48"',
        description:
          "Sailor Moon inspired artwork in a light-up frame with neon green edges. One of Mr. Moda's first major art sales during Art Basel Miami via Art Gal Ori Gallery.",
      }
    } else if (
      imageUrl ===
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-005.jpg-9XXceR5e4RDUkNNdBvX9Bdf3vDJe3B.jpeg"
    ) {
      info = {
        ...info,
        title: "HOW TO : LOSE YOUR F* MIND",
        year: "2018",
        medium: "Acrylic and UV paint with mixed media on heavy block",
        dimensions: '36" X 36"',
        description:
          'The 1st installment from Mr. Moda\'s Debut series "How to: Be An Artist" Collection. Features a skull and yellow vertical line, with a Pokemon card visible.',
      }
    } else if (
      imageUrl === "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dzd60C72xuW5Smxipbr8EzcKpjeP1q.png"
    ) {
      info = {
        ...info,
        title: "HOW TO : MAKE LOVE",
        year: "2021",
        medium: "Acrylic and UV paint with mixed media on canvas",
        dimensions: '80" x 60"',
        description:
          'The 5th Installment of the series "How to: Be an Artist" Collection. Features four anatomical figures showing different body systems. This piece includes an ultrasound photo.',
      }
    }

    return info
  }

  useEffect(() => {
    // Extract artwork info from all images in the mapping
    const extractedArtworks = Object.entries(artworkImageMapping).map(([title, imageUrl]) => {
      return extractArtworkInfo(imageUrl, title)
    })

    // Remove duplicates based on image URL
    const uniqueArtworks = extractedArtworks.filter(
      (artwork, index, self) => index === self.findIndex((a) => a.imageUrl === artwork.imageUrl),
    )

    setArtworks(uniqueArtworks)
    setIsLoading(false)
  }, [])

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">Mr. Moda's Artwork Collection</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p>Loading artwork collection...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork, index) => (
            <Card
              key={index}
              className="overflow-hidden cursor-pointer transition-transform hover:scale-105"
              onClick={() => setSelectedArtwork(artwork)}
            >
              <div className="relative h-64 w-full">
                <Image
                  src={artwork.imageUrl || "/placeholder.svg"}
                  alt={artwork.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg">{artwork.title}</h3>
                <p className="text-sm text-gray-500">{artwork.year}</p>
                {artwork.medium && <p className="text-xs text-gray-500 mt-2">{artwork.medium}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedArtwork} onOpenChange={(open) => !open && setSelectedArtwork(null)}>
        {selectedArtwork && (
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedArtwork.title} ({selectedArtwork.year})
              </DialogTitle>
              <DialogDescription>
                <div className="mt-2 space-y-2">
                  {selectedArtwork.description && <p>{selectedArtwork.description}</p>}
                  {selectedArtwork.medium && (
                    <p>
                      <span className="font-medium">Medium:</span> {selectedArtwork.medium}
                    </p>
                  )}
                  {selectedArtwork.dimensions && (
                    <p>
                      <span className="font-medium">Dimensions:</span> {selectedArtwork.dimensions}
                    </p>
                  )}
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="relative h-[60vh] w-full">
              <Image
                src={selectedArtwork.imageUrl || "/placeholder.svg"}
                alt={selectedArtwork.title}
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg"
              />
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
