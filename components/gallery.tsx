"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"

type GalleryItem = {
  title: string
  year: string
  description: string
  image: string
}

interface GalleryProps {
  category: "artwork" | "fashion" | "mural"
  items: GalleryItem[]
}

export function Gallery({ category, items }: GalleryProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <Card
            key={index}
            className={`overflow-hidden cursor-pointer hover:shadow-lg transition-shadow ${
              category === "artwork" ? "bg-blue-600" : category === "fashion" ? "bg-pink-600" : "bg-green-600"
            }`}
            onClick={() => setSelectedItem(item)}
          >
            <div className="relative h-64 w-full">
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center p-4">
                  <p className="font-medium text-xl">{item.title}</p>
                  <p>{item.year}</p>
                </div>
              </div>
            </div>
            <CardContent className="p-4 text-white">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm text-white/80">{item.year}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        {selectedItem && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {selectedItem.title} ({selectedItem.year})
              </DialogTitle>
              <DialogDescription>{selectedItem.description}</DialogDescription>
            </DialogHeader>
            <div className="relative h-[60vh] w-full flex items-center justify-center bg-gray-100">
              <div className="text-center p-8">
                <h3 className="text-2xl font-bold mb-2">{selectedItem.title}</h3>
                <p className="text-lg text-gray-600">{selectedItem.year}</p>
                <p className="mt-4 text-gray-700">{selectedItem.description}</p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
