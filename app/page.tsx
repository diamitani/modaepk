import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { MasonryGallery } from "@/components/masonry-gallery"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Mr. Moda</h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
            Contemporary artist blending anime influences, street art aesthetics, and Renaissance allegories
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/portfolio">View Portfolio</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white bg-opacity-20 hover:bg-opacity-30">
              <Link href="/gallery">Explore Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Gallery Section */}
      <section className="py-20 bg-gray-50" id="featured">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Works</h2>
            <Button asChild variant="outline">
              <Link href="/gallery">View All</Link>
            </Button>
          </div>

          <MasonryGallery columns={3} className="mb-12" />
        </div>
      </section>

      {/* About Section */}
      <section className="py-20" id="about">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About Mr. Moda</h2>
              <p className="text-lg text-gray-700 mb-6">
                Mr. Moda is a contemporary artist whose work blends anime influences, street art aesthetics, and
                Renaissance allegories. His signature "How To: Be An Artist" series has gained critical acclaim for its
                innovative approach to exploring mental health and environmental challenges.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Each piece features authentic materials and symbolic collectables crafted from scratch, creating a
                unique visual language that resonates with collectors and critics alike.
              </p>
              <Button asChild>
                <Link href="/contact">Contact the Artist</Link>
              </Button>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <img
                src="/images/artist-portrait.jpg"
                alt="Mr. Moda in his studio"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience the Complete Collection</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore Mr. Moda's diverse portfolio spanning fine art, murals, commissions, and his acclaimed series.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="outline" className="border-white hover:bg-white hover:text-black">
              <Link href="/gallery">View Gallery</Link>
            </Button>
            <Button asChild size="lg">
              <Link href="/portfolio">Explore Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
