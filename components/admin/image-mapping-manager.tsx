"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { artworkImageMapping } from "@/data/artwork-image-mapping"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ImageMappingManager() {
  const [selectedTab, setSelectedTab] = useState<string>("artwork")
  const [saveStatus, setSaveStatus] = useState<string>("")

  // Group images by category
  const categories = {
    artwork: [
      "HOW TO : LOSE YOUR F* MIND",
      "HOW TO : BUILD THE PERFECT WOMBMAN",
      "HOW TO : LOSE CONTROL",
      "HOW TO : BE AN ARTIST",
      "HOW TO : MAKE LOVE",
      "HOW TO : KEEP A RELATIONSHIP",
      "HOW TO : MOVE ON",
      "HOW TO : BE YOUR, SELF.",
      "MODANNA",
    ],
    events: ["BFA ART BASEL", "MIAMI ART WEEK", "GALLERY EXHIBITION", "MEDIA FEATURE"],
    collaborations: ["FASHION COLLABORATION", "COLLABORATION PROJECT", "SLEEPY SLOTH", "SLEEPY SLOTH NFT NYC"],
    process: ["STUDIO WORK", "CREATIVE PROCESS", "HOW TO : WEAR A MASK (AGAIN)"],
  }

  const handleSaveMapping = async () => {
    setSaveStatus("Saving...")

    try {
      // In a real implementation, this would save to a database or file
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSaveStatus("Mapping saved successfully!")
    } catch (error) {
      setSaveStatus("Error saving mapping")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Artwork Image Mapping</CardTitle>
        <CardDescription>Manage which images are assigned to each artwork title</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="artwork">Artwork</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
          </TabsList>

          {Object.entries(categories).map(([category, titles]) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {titles.map((title) => (
                  <div key={title} className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">{title}</h3>
                    <div className="relative h-48 w-full mb-2 bg-gray-100 rounded overflow-hidden">
                      <Image
                        src={artworkImageMapping[title] || "/placeholder.svg"}
                        alt={title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 truncate">{artworkImageMapping[title]}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-gray-500">{saveStatus}</p>
        <Button onClick={handleSaveMapping}>Save Mapping</Button>
      </CardFooter>
    </Card>
  )
}
