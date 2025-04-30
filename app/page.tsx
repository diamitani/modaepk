"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContactForm } from "@/components/contact-form"
import { SocialLinks } from "@/components/social-links"
import Image from "next/image"
import { ArtChatbot } from "@/components/art-chatbot"
import { ArtworkExtractor } from "@/components/artwork-extractor"
import { ExhibitionPhotos } from "@/components/exhibition-photos"
import { EventPhotos } from "@/components/event-photos"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-005.jpg-9XXceR5e4RDUkNNdBvX9Bdf3vDJe3B.jpeg"
            alt="Mr. Moda Artwork"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="container relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">MR. MODA</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">Naïf Artist / Creative Director</p>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-white text-white bg-black/30 hover:bg-white hover:text-black transition-colors"
            asChild
          >
            <Link href="#about">
              Explore
              <ChevronDown className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About the Artist</h2>
              <p className="text-gray-700 mb-4">
                Hassan Hakim (AKA Hallamoda, Mr. Moda) is an American multimedia artist known for his interdisciplinary
                urban underground style. Born 1990 in Queens, NY of Jamaican/Haitian descent, Moda is a naïf
                (self-taught) painter whose practice spans fantastical murals, NFTs, live art installations, paintings
                on canvas, clothing, bags and shoes.
              </p>
              <p className="text-gray-700 mb-4">
                His distinct style, inspired by comic books, Renaissance allegories and Pop culture has garnered him
                attention and notoriety firstly in the New York downtown art scene.
              </p>
              <p className="text-gray-700">
                Mr. Moda's iconic hand painted clothing attracted the attention of wardrobe stylist Anaya Hayes who
                featured his pieces in the 2015 Art Basel event Swizz Beats X Revolt TV. From 2018, Moda was an in-house
                artist/designer at Faith Connexion, a specialty boutique in New York City.
              </p>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MR.%20MODA%20-%20COMPLETE%20ARTIST%20PRESENTATION%202022-Compressed.pdf-image-000.jpg-C1Zhc5koUdPZbMshCanaORYOkf7TdY.jpeg"
                alt="Mr. Moda with artwork"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Portfolio</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            A selection of Mr. Moda's diverse body of work spanning fine art, fashion, and live events. Explore his
            unique style and creative vision.
          </p>

          <Tabs defaultValue="artwork" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="artwork">Artwork Collection</TabsTrigger>
              <TabsTrigger value="exhibitions">Exhibitions</TabsTrigger>
              <TabsTrigger value="events">Events & Appearances</TabsTrigger>
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
          </Tabs>

          <div className="mt-12 text-center space-y-4">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/dynamic-portfolio">View Complete Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact</h2>
              <p className="text-gray-700 mb-8">
                For inquiries about commissions, exhibitions, or collaborations, please get in touch.
              </p>
              <div className="space-y-4 mb-8">
                <p className="flex items-center text-gray-700">
                  <span className="font-semibold mr-2">Email:</span> thefashion@hallamoda.com
                </p>
                <p className="flex items-center text-gray-700">
                  <span className="font-semibold mr-2">Phone:</span> 786.843.1305
                </p>
                <p className="flex items-center text-gray-700">
                  <span className="font-semibold mr-2">Address:</span> 36 NE 1st Street Suite 365, Miami, FL 33132
                </p>
              </div>
              <SocialLinks />
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Chatbot */}
      <ArtChatbot />
    </main>
  )
}
