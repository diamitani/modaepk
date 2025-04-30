"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PdfExtractor } from "@/components/pdf-extractor"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { artworkData, getAllCategories, getArtworkByCategory } from "@/data/artwork-data"
import { ImageMatchStatus } from "@/components/admin/image-match-status"
import { ImageMappingManager } from "@/components/admin/image-mapping-manager"
import Image from "next/image"

export default function AdminPortfolioPage() {
  const [selectedTab, setSelectedTab] = useState("extract")
  const categories = getAllCategories()

  // Format category names for display
  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container px-4">
        <div className="flex items-center mb-8">
          <Button variant="ghost" asChild className="mr-4">
            <Link href="/admin">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Admin
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold">Portfolio Management</h1>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="extract">Extract from PDF</TabsTrigger>
            <TabsTrigger value="image-match">Image Matching</TabsTrigger>
            <TabsTrigger value="image-mapping">Image Mapping</TabsTrigger>
            <TabsTrigger value="manage">Manage Artwork</TabsTrigger>
            <TabsTrigger value="preview">Preview Portfolio</TabsTrigger>
          </TabsList>

          <TabsContent value="extract">
            <PdfExtractor />
          </TabsContent>

          <TabsContent value="image-match">
            <ImageMatchStatus />
          </TabsContent>

          <TabsContent value="image-mapping">
            <ImageMappingManager />
          </TabsContent>

          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle>Manage Artwork</CardTitle>
                <CardDescription>View, edit, and organize your artwork collection.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="flex flex-wrap mb-6">
                    {categories.map((category) => (
                      <TabsTrigger key={category} value={category} className="mb-2">
                        {formatCategoryName(category)}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {categories.map((category) => (
                    <TabsContent key={category} value={category}>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {getArtworkByCategory(category).map((item) => (
                          <div key={item.id} className="border rounded-md overflow-hidden">
                            <div className="relative h-40 w-full">
                              <Image
                                src={item.image || "/placeholder.svg?height=200&width=300"}
                                alt={item.title}
                                fill
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                            <div className="p-3">
                              <h3 className="font-medium text-sm truncate">{item.title}</h3>
                              <p className="text-xs text-gray-500">{item.year}</p>
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                  {formatCategoryName(item.category)}
                                </span>
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Preview</CardTitle>
                <CardDescription>Preview how your portfolio will appear to visitors.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4">
                  <h2 className="text-xl font-bold mb-4">Complete Portfolio</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {artworkData.slice(0, 6).map((item) => (
                      <div key={item.id} className="border rounded-md overflow-hidden">
                        <div className="relative h-40 w-full">
                          <Image
                            src={item.image || "/placeholder.svg?height=200&width=300"}
                            alt={item.title}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-sm truncate">{item.title}</h3>
                          <p className="text-xs text-gray-500">{item.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button asChild>
                      <Link href="/portfolio">View Full Portfolio</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
