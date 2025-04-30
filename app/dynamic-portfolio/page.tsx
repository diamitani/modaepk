import { ArtworkExtractor } from "@/components/artwork-extractor"
import { ExhibitionPhotos } from "@/components/exhibition-photos"
import { EventPhotos } from "@/components/event-photos"
import { ProcessPhotos } from "@/components/process-photos"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DynamicPortfolioPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container px-4">
        <div className="flex items-center mb-8">
          <Button variant="ghost" asChild className="mr-4">
            <Link href="/">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold">Complete Portfolio</h1>
        </div>

        <p className="text-lg text-gray-600 mb-12 max-w-3xl">
          Explore Mr. Moda's complete portfolio, including his artwork, exhibitions, events, and creative process. Each
          section provides insight into his unique artistic vision and career.
        </p>

        <Tabs defaultValue="artwork" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-12">
            <TabsTrigger value="artwork">Artwork</TabsTrigger>
            <TabsTrigger value="exhibitions">Exhibitions</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="process">Creative Process</TabsTrigger>
          </TabsList>

          <TabsContent value="artwork">
            <ArtworkExtractor />
          </TabsContent>

          <TabsContent value="exhibitions">
            <ExhibitionPhotos />
          </TabsContent>

          <TabsContent value="events">
            <EventPhotos />
          </TabsContent>

          <TabsContent value="process">
            <ProcessPhotos />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
