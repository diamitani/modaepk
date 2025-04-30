"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"

export function ProcessPhotos() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const processPhotos = [
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-063.jpg-kXC7KQKCqkzowpqOYZvG5M7Nsu2trm.jpeg",
      title: "Painting in Miami",
      description: "Mr. Moda working on a Sailor Moon inspired piece with ocean view",
      year: "2022",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-064.jpg-YZm3qvYzHjuUL8TIpPOwlMUJyGbywL.jpeg",
      title: "Fashion Collaboration",
      description: "Mr. Moda with fashion collaborator in a modern architectural setting",
      year: "2021",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-000.jpg-C1Zhc5koUdPZbMshCanaORYOkf7TdY.jpeg",
      title: "Studio Portrait",
      description: "Mr. Moda in his studio with anatomical artwork in the background",
      year: "2021",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-001.jpg-Jf7L3r64dUd5GVmXAzsDqKhUcaCUaf.jpeg",
      title: "Studio with Artwork",
      description: "Mr. Moda in his studio with multiple artworks and his dog",
      year: "2021",
    },
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">Creative Process</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {processPhotos.map((photo, index) => (
          <Card
            key={index}
            className="overflow-hidden cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedImage(photo.url)}
          >
            <div className="relative h-64 w-full">
              <Image src={photo.url || "/placeholder.svg"} alt={photo.title} fill style={{ objectFit: "cover" }} />
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg">{photo.title}</h3>
              <p className="text-sm text-gray-500">{photo.year}</p>
              <p className="text-sm text-gray-700 mt-2">{photo.description}</p>
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
                alt="Process photo"
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
