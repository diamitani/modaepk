import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Timeline } from "@/components/timeline"
import { Card, CardContent } from "@/components/ui/card"

type Exhibition = {
  title: string
  location: string
  date: string
  description: string
  image: string
}

export default function ExhibitionsPage() {
  const upcomingExhibitions: Exhibition[] = [
    {
      title: "Solo Exhibition: Anime Allegories",
      location: "Brooklyn, NYC",
      date: "June 15-30, 2024",
      description:
        "A comprehensive solo exhibition featuring Mr. Moda's latest works exploring the intersection of anime aesthetics and classical allegories.",
      image: "/images/artwork-1.png",
    },
    {
      title: "CEYCAMODA Gallery Exhibition",
      location: "Miami Design District",
      date: "August 5-20, 2024",
      description:
        "Group exhibition alongside renowned artists Cey Adams and Craig Anthony Miller, showcasing collaborative and individual works.",
      image: "/images/gallery-1.png",
    },
  ]

  const pastExhibitions: Exhibition[] = [
    {
      title: "Art Basel Live Solo Exhibition",
      location: "Joia Beach, Miami",
      date: "December 2022",
      description:
        "Solo exhibition with Modern Monarchie featuring Mr. Moda's most celebrated works and live painting demonstrations.",
      image: "/images/event-1.png",
    },
    {
      title: "Group Exhibition Art Basel Miami",
      location: "Blonde House Group, Miami",
      date: "December 2022",
      description:
        "Participation in a curated group exhibition showcasing emerging artists during Art Basel Miami week.",
      image: "/images/event-3.png",
    },
    {
      title: "NFT NYC Mural Installations",
      location: "Various Locations, NYC",
      date: "June 2022",
      description:
        "Series of mural installations throughout New York City in collaboration with Sleepy Sloth Society during NFT NYC event.",
      image: "/images/collaboration-1.png",
    },
    {
      title: "Faith Connexion Showcase",
      location: "Faena Hotel, Miami",
      date: "December 2021",
      description:
        "Curated art performance and exhibition in collaboration with Faith Connexion during Art Basel Miami.",
      image: "/images/fashion-1.png",
    },
    {
      title: "Group Exhibition with Artist 'Miskeen'",
      location: "Lavista Gallery, Atlanta, GA",
      date: "March 2021",
      description:
        "Collaborative exhibition exploring urban aesthetics and contemporary fashion influences in fine art.",
      image: "/images/artwork-2.png",
    },
  ]

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
          <h1 className="text-3xl md:text-4xl font-bold">Exhibitions</h1>
        </div>

        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Upcoming Exhibitions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingExhibitions.map((exhibition, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    src={exhibition.image || "/placeholder.svg"}
                    alt={exhibition.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white px-4 py-1 rounded-full">Upcoming</div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{exhibition.title}</h3>
                  <div className="flex flex-col space-y-1 mb-4">
                    <p className="text-gray-700">{exhibition.location}</p>
                    <p className="text-gray-700 font-medium">{exhibition.date}</p>
                  </div>
                  <p className="text-gray-600">{exhibition.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Past Exhibitions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastExhibitions.map((exhibition, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={exhibition.image || "/placeholder.svg"}
                    alt={exhibition.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1">{exhibition.title}</h3>
                  <div className="flex flex-col space-y-1 mb-3">
                    <p className="text-sm text-gray-700">{exhibition.location}</p>
                    <p className="text-sm text-gray-700">{exhibition.date}</p>
                  </div>
                  <p className="text-sm text-gray-600">{exhibition.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Exhibition History</h2>
          <Timeline />
        </section>
      </div>
    </main>
  )
}
