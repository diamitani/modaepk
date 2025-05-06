"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Timeline } from "@/components/timeline"
import { ContactForm } from "@/components/contact-form"
import { SocialLinks } from "@/components/social-links"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/images/fashion-1.png"
            alt="Mr. Moda Fashion Design"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="container relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">MR. MODA</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Award-Winning Naïf Artist / Creative Director
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="rounded-full bg-white/90 text-black hover:bg-white border-0"
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
                Hassan Hakim (AKA Hallamoda, Mr. Moda) is an award-winning American multimedia artist known for his
                interdisciplinary urban underground style. Born 1990 in Queens, NY of Jamaican/Haitian descent, Moda is
                a naïf (self-taught) painter whose practice spans fantastical murals, NFTs, live art installations,
                paintings on canvas, clothing, bags and shoes.
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
                src="/images/painting-1.png"
                alt="Mr. Moda working on art"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Studio Process Section */}
      <section className="py-20 bg-gray-100">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Studio Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/studio-1.png"
                alt="Mr. Moda in studio"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold">Workshop Environment</h3>
                  <p className="text-sm text-white/80">Whatever It Takes</p>
                </div>
              </div>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/studio-2.png"
                alt="Mr. Moda with mask"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold">Artistic Identity</h3>
                  <p className="text-sm text-white/80">Distinctive Style</p>
                </div>
              </div>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/workshop-1.png"
                alt="Mr. Moda teaching"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold">Knowledge Sharing</h3>
                  <p className="text-sm text-white/80">Teaching & Collaboration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Portfolio</h2>

          <Tabs defaultValue="artwork" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="artwork">Artwork</TabsTrigger>
              <TabsTrigger value="fashion">Fashion</TabsTrigger>
              <TabsTrigger value="events">Events & Exhibitions</TabsTrigger>
            </TabsList>
            <TabsContent value="artwork">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <div className="relative h-64 w-full">
                    <Image
                      src="/images/how-to-lose-mind-new.jpg"
                      alt="HOW TO: LOSE YOUR F*CKING MIND artwork by Mr. Moda"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-lg">HOW TO: LOSE YOUR F*CKING MIND</h3>
                    <p className="text-sm text-gray-500">2021</p>
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <div className="relative h-64 w-full">
                    <Image
                      src="/images/how-to-perfect-wombman.jpg"
                      alt="HOW TO BUILD THE PERFECT WOMBMAN artwork by Mr. Moda"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-lg">HOW TO BUILD THE PERFECT WOMBMAN V.1</h3>
                    <p className="text-sm text-gray-500">2018</p>
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <div className="relative h-64 w-full">
                    <Image
                      src="/images/how-to-be-artist.jpg"
                      alt="HOW TO: BE AN ARTIST artwork by Mr. Moda"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-lg">HOW TO: BE AN ARTIST</h3>
                    <p className="text-sm text-gray-500">2021</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Button asChild className="rounded-full">
                  <Link
                    href="https://hallamoda.softr.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    View Complete Portfolio
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="fashion">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <div className="relative h-64 w-full">
                    <Image
                      src="/images/fashion-1.png"
                      alt="Fashion collaboration by Mr. Moda"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-lg">Fashion Collaboration</h3>
                    <p className="text-sm text-gray-500">2021</p>
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <div className="relative h-64 w-full">
                    <Image
                      src="/images/fashion-2.png"
                      alt="Custom fashion pieces by Mr. Moda"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-lg">Custom Fashion Pieces</h3>
                    <p className="text-sm text-gray-500">2022</p>
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <div className="relative h-64 w-full">
                    <Image
                      src="/images/design-1.png"
                      alt="T-shirt design by Mr. Moda"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-lg">Apparel Design</h3>
                    <p className="text-sm text-gray-500">2020</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg my-8">
                <h3 className="text-xl font-bold mb-4 text-center">HIGH QUALITY MANUFACTURING</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-700 mb-2">• Capable of producing 1/1 garments to short RTW capsules</p>
                    <p className="text-gray-700 mb-2">• From basics in all printing services to specialty embroidery</p>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2">• Expert patchwork techniques and pattern making</p>
                    <p className="text-gray-700 mb-2">• Custom design and production solutions</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Button asChild className="rounded-full">
                  <Link
                    href="https://new.express.adobe.com/page/mM6Q6a5MMc3JX/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    View Fashion Lookbook
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="events">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <div className="relative h-64 w-full">
                    <Image
                      src="/images/gallery-1.png"
                      alt="Mr. Moda at gallery event"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-lg">Gallery Opening</h3>
                    <p className="text-sm text-gray-500">2022</p>
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <div className="relative h-64 w-full">
                    <Image
                      src="/images/event-2.png"
                      alt="Mr. Moda at fashion event"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-lg">Fashion Week Collaboration</h3>
                    <p className="text-sm text-gray-500">2021</p>
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <div className="relative h-64 w-full">
                    <Image src="/images/event-3.png" alt="Mr. Moda at BFA event" fill style={{ objectFit: "cover" }} />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-lg">BFA Art Basel</h3>
                    <p className="text-sm text-gray-500">2022</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Press Section */}
      <section id="press" className="py-20 bg-gray-900 text-white">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Press & Media</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/press-1.png"
                alt="XXL Magazine featuring Dreamville"
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Featured in Major Publications</h3>
              <p className="text-gray-300 mb-6">
                Mr. Moda's work has been featured in prominent publications including XXL Magazine, where his custom
                designs for Dreamville artists gained significant attention. His unique artistic vision and fashion
                sensibilities have made him a sought-after creative force in both the art and music industries.
              </p>
              <p className="text-gray-300">
                His collaborations with musicians and fashion brands have been documented in various media outlets,
                showcasing his ability to bridge different creative worlds through his distinctive artistic style.
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Print Media</h3>
              <p className="text-gray-300">
                Featured in magazines including XXL, Vogue, and various art publications that have highlighted his
                unique approach to blending fashion and fine art.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Digital Coverage</h3>
              <p className="text-gray-300">
                Extensive online coverage through art blogs, fashion websites, and music platforms that showcase his
                collaborations and artistic development.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Documentary Features</h3>
              <p className="text-gray-300">
                Participated in documentary projects that explore the intersection of street art, fashion, and music
                culture in contemporary urban settings.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-center">Press Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="https://www.artrkl.com/post/featureartist-moda"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <h4 className="text-lg font-bold mb-2">ArtRKL: Featured Artist - Moda</h4>
                <p className="text-gray-300 mb-2">
                  An in-depth look at Mr. Moda's artistic journey and creative process.
                </p>
                <span className="text-blue-400 flex items-center">
                  Read Article <ExternalLink className="ml-1 h-4 w-4" />
                </span>
              </Link>

              <Link
                href="https://digidame.com/tag/miami/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <h4 className="text-lg font-bold mb-2">DigiDame: Miami Art Scene</h4>
                <p className="text-gray-300 mb-2">
                  Coverage of Mr. Moda's contributions to Miami's vibrant art community.
                </p>
                <span className="text-blue-400 flex items-center">
                  Read Article <ExternalLink className="ml-1 h-4 w-4" />
                </span>
              </Link>

              <Link
                href="https://lawire.com/younity-studios-believes-personal-success-doesnt-have-to-come-at-the-expense-of-others/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <h4 className="text-lg font-bold mb-2">LA Wire: Younity Studios Feature</h4>
                <p className="text-gray-300 mb-2">
                  How Younity Studios and Mr. Moda are redefining collaborative success in the art world.
                </p>
                <span className="text-blue-400 flex items-center">
                  Read Article <ExternalLink className="ml-1 h-4 w-4" />
                </span>
              </Link>

              <Link
                href="https://nyweekly.com/business/how-younity-studios-is-helping-artists-achieve-collective-success/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <h4 className="text-lg font-bold mb-2">NY Weekly: Collective Success</h4>
                <p className="text-gray-300 mb-2">
                  Exploring how Younity Studios is creating new opportunities for artists like Mr. Moda.
                </p>
                <span className="text-blue-400 flex items-center">
                  Read Article <ExternalLink className="ml-1 h-4 w-4" />
                </span>
              </Link>

              <Link
                href="https://artistweekly.com/younity-studios-and-how-it-furthers-the-concept-of-art-and-fashion-as-portrayed-by-renowned-artist-hallamoda-the-fashion/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors col-span-1 md:col-span-2"
              >
                <h4 className="text-lg font-bold mb-2">Artist Weekly: Art & Fashion Fusion</h4>
                <p className="text-gray-300 mb-2">
                  A comprehensive look at how Hallamoda (Mr. Moda) is revolutionizing the intersection of art and
                  fashion through Younity Studios.
                </p>
                <span className="text-blue-400 flex items-center">
                  Read Article <ExternalLink className="ml-1 h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Exhibitions & Achievements */}
      <section id="exhibitions" className="py-20 bg-white">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Exhibitions & Achievements</h2>
          <Timeline />
        </div>
      </section>

      {/* Collaborations */}
      <section id="collaborations" className="py-20 bg-gray-100">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Collaborations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/collaboration-2.png"
                alt="Mr. Moda collaboration"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">"Our ART brings PEOPLE together"</h3>
              <p className="text-gray-700 mb-4">
                Mr. Moda's collaborative approach to art brings together diverse communities and creates conversations
                that transcend differences. His work with various artists, brands, and organizations demonstrates the
                power of art to unite people.
              </p>
              <p className="text-gray-700">
                Through adaptability and acceptance, Mr. Moda's collaborations aim to overcome barriers and achieve
                harmony through creative expression.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Fashion Brands</h3>
              <p className="text-gray-700 mb-4">
                Worked with high fashion brands and designers including Chris Habana, Carolina Sarria, Faith Connexion &
                RDNMKS to create one-of-a-kind artworks on clothing and performance pieces.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Music Industry</h3>
              <p className="text-gray-700 mb-4">
                Collaborated with independent organizations in the music industry, developing unique tour merchandise,
                events and experiences with live painting and custom atelier.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Art Curation</h3>
              <p className="text-gray-700 mb-4">
                Assisted Maria Buccellatti in curating events, artists, and photographers during Art Basel in Miami and
                New York. Hosted numerous pop-up events and exhibitions.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative h-40 rounded-lg overflow-hidden">
              <Image
                src="/images/event-4.png"
                alt="Mr. Moda with Andrew Yang"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
            <div className="relative h-40 rounded-lg overflow-hidden">
              <Image
                src="/images/portrait-1.png"
                alt="Mr. Moda portrait"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
            <div className="relative h-40 rounded-lg overflow-hidden">
              <Image
                src="/images/event-2.png"
                alt="Mr. Moda at fashion event"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
            <div className="relative h-40 rounded-lg overflow-hidden">
              <Image
                src="/images/event-1.png"
                alt="Mr. Moda at Miami event"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Button asChild className="rounded-full">
            <Link
              href="https://drive.google.com/drive/folders/1--zFO__5aD7NICQq37cs3BvfDhGQAZi7?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              Watch Workshop Videos
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Contact</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
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

          {/* Standard Rates - Now full width and below contact info and form */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Standard Rates</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h4 className="font-bold text-lg mb-2 text-primary">In-Studio</h4>
                <p className="text-gray-700">$250 + $80 per hour</p>
                <p className="text-gray-700">$1000 Per Day</p>
                <p className="text-gray-700">$500 Per 1/2 Day</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h4 className="font-bold text-lg mb-2 text-primary">Residential</h4>
                <p className="text-gray-700">$500 + $250 Per Day</p>
                <p className="text-gray-700">$150+ for high detailed work</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h4 className="font-bold text-lg mb-2 text-primary">Garments</h4>
                <p className="text-gray-700">$1500 + $250 per hr</p>
                <p className="text-gray-700 italic">Contact For Details</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h4 className="font-bold text-lg mb-2 text-primary">Painting</h4>
                <p className="text-gray-700">$2000 + $1000 week</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h4 className="font-bold text-lg mb-2 text-primary">Installation</h4>
                <p className="text-gray-700">$4000 + $1000 week</p>
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>* Rates may vary based on project complexity and requirements</p>
              <p>* Contact for custom quotes and detailed pricing</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
