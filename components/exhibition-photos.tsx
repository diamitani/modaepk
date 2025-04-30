"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"

export function ExhibitionPhotos() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const exhibitions = [
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-071.jpg-rq0FHAHexWzSzk6JRAINHmaN1sxoko.jpeg",
      title: "Gallery Exhibition",
      description: "Exhibition featuring Sailor Moon and Pinocchio inspired artworks",
      year: "2022",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-062.jpg-QB20PSXAjY5Grx5JFh8rPggV2uY0MP.jpeg",
      title: "FEVVER Exhibition",
      description: "Mr. Moda with gallery visitor in front of the FEVVER Sailor Moon artwork",
      year: "2021",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-004.jpg-PjgkN9v7UUFgIrcgKy2705bhOZMHl0.jpeg",
      title: "WILL Artwork Delivery",
      description: "Mr. Moda with clients and the WILL Dragon Ball Z inspired artwork",
      year: "2021",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-002.jpg-iNABO4QkPlXC9YnRY8ddo4yggbgOuP.jpeg",
      title: "FEVVER Artwork",
      description: "The FEVVER Sailor Moon inspired artwork in custom light-up frame",
      year: "2019",
    },
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">Exhibition Highlights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exhibitions.map((exhibition, index) => (
          <Card
            key={index}
            className="overflow-hidden cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedImage(exhibition.url)}
          >
            <div className="relative h-64 w-full">
              <Image
                src={exhibition.url || "/placeholder.svg"}
                alt={exhibition.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg">{exhibition.title}</h3>
              <p className="text-sm text-gray-500">{exhibition.year}</p>
              <p className="text-sm text-gray-700 mt-2">{exhibition.description}</p>
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
                alt="Exhibition photo"
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
