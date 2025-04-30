"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"

export function EventPhotos() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const events = [
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-067.jpg-pNY84yA7sdo5FY4bdDamqX7KJqeSAL.jpeg",
      title: "BFA Art Event",
      description: "Mr. Moda with guest at BFA art event",
      year: "2022",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-068.jpg-wLqMNwVwWqlarveW82cCOFnHacHE0r.jpeg",
      title: "Time to Change the World",
      description: "Mr. Moda with Andrew Yang at a political event",
      year: "2022",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-069.jpg-xBDTJjbfSaFUM0RHT9CzmvjLJv21tL.jpeg",
      title: "Miami Social Event",
      description: "Mr. Moda with guests at a Miami social gathering",
      year: "2022",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-066.jpg-9xH8tywr9ydeQ0mqyC5GOh6yhHtvmo.jpeg",
      title: "Masked Appearance",
      description: "Mr. Moda wearing his signature crystal skull mask with a guest",
      year: "2021",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-065.jpg-DiYz2RkXO3bS6wlXGA9TtOM2bmdX6x.jpeg",
      title: "Miami Boat Tour",
      description: "Mr. Moda on a boat with the Miami skyline in the background",
      year: "2021",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-070.jpg-VQjgmCk5Gp8foTZRwk0wvajiCGEUma.jpeg",
      title: "New York Weekly Feature",
      description: "Mr. Moda featured in New York Weekly with collaborators",
      year: "2021",
      publication: "New York Weekly",
    },
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">Events & Appearances</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <Card
            key={index}
            className="overflow-hidden cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedImage(event.url)}
          >
            <div className="relative h-64 w-full">
              <Image src={event.url || "/placeholder.svg"} alt={event.title} fill style={{ objectFit: "cover" }} />
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.year}</p>
              <p className="text-sm text-gray-700 mt-2">{event.description}</p>
              {event.publication && <p className="text-xs text-primary mt-1">Featured in: {event.publication}</p>}
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
                alt="Event photo"
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
