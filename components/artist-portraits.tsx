"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"

export function ArtistPortraits() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const portraits = [
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-000.jpg-C1Zhc5koUdPZbMshCanaORYOkf7TdY.jpeg",
      title: "Mr. Moda in Studio",
      description: "Mr. Moda wearing decorative glasses in front of his anatomical artwork",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-001.jpg-Jf7L3r64dUd5GVmXAzsDqKhUcaCUaf.jpeg",
      title: "Mr. Moda with Artworks",
      description: "Mr. Moda sitting with his dog in his studio with multiple artworks visible",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-003.jpg-1JB5QDXjDSGZGHFVxB2o2U8eoucyln.jpeg",
      title: "Mr. Moda with Client",
      description: "Mr. Moda presenting his 'TO BE MANIFESTED' artwork to a client",
    },
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">Artist Portraits & Studio</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portraits.map((portrait, index) => (
          <Card
            key={index}
            className="overflow-hidden cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedImage(portrait.url)}
          >
            <div className="relative h-64 w-full">
              <Image
                src={portrait.url || "/placeholder.svg"}
                alt={portrait.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg">{portrait.title}</h3>
              <p className="text-sm text-gray-500">{portrait.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        {selectedImage && (
          <DialogContent className="max-w-4xl p-1">
            <div className="relative h-[80vh] w-full">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Artist portrait"
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
