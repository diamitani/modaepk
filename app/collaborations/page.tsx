import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Collaborator = {
  name: string
  type: "brand" | "artist" | "organization"
  description: string
  image: string
  year: string
  link?: string
}

export default function CollaborationsPage() {
  const collaborators: Collaborator[] = [
    {
      name: "Faith Connexion",
      type: "brand",
      description:
        "Long-term collaboration with the Parisian fashion brand, creating custom artwork for clothing and installations.",
      image: "/images/fashion-1.png",
      year: "2018-Present",
      link: "https://www.faithconnexion.com",
    },
    {
      name: "Chris Habana",
      type: "brand",
      description:
        "Collaboration on bespoke performance pieces for artists including Doja Cat and Lil Nas X for the American Music Awards.",
      image: "/images/fashion-2.png",
      year: "2020",
      link: "https://chrishabana.com",
    },
    {
      name: "Dreamville",
      type: "organization",
      description: "Created bespoke garments and styling for Dreamville artists, featured in XXL Magazine cover.",
      image: "/images/press-1.png",
      year: "2019",
      link: "https://www.dreamville.com",
    },
    {
      name: "Swizz Beatz",
      type: "artist",
      description:
        "Sustainable mural installation at Istituto Marangoni in Miami in collaboration with Faith Connexion and Swizz Beatz.",
      image: "/images/collaboration-1.png",
      year: "2019",
      link: "https://www.instagram.com/therealswizzz",
    },
    {
      name: "Sleepy Sloth Society",
      type: "organization",
      description: "NFT NYC Mural Installations in collaboration with the digital art collective.",
      image: "/images/collaboration-2.png",
      year: "2022",
      link: "https://www.sleepyslothsociety.com",
    },
    {
      name: "Carolina Sarria",
      type: "brand",
      description: "Collaborative fashion pieces combining Mr. Moda's artwork with Carolina Sarria's designs.",
      image: "/images/fashion-3.png",
      year: "2021",
      link: "https://www.carolinasarria.com",
    },
    {
      name: "RDNMKS",
      type: "brand",
      description: "Created one-of-a-kind artworks on clothing for the innovative fashion brand.",
      image: "/images/design-1.png",
      year: "2021",
      link: "https://www.rdnmks.com",
    },
    {
      name: "Istituto Marangoni",
      type: "organization",
      description: "Led bespoke clothing workshop at the prestigious fashion school in Miami.",
      image: "/images/workshop-1.png",
      year: "2021",
      link: "https://www.istitutomarangoni.com",
    },
    {
      name: "Miskeen",
      type: "artist",
      description: "Group exhibition with artist Miskeen at Lavista Gallery in Atlanta, GA.",
      image: "/images/gallery-1.png",
      year: "2021",
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
          <h1 className="text-3xl md:text-4xl font-bold">Collaborations</h1>
        </div>

        <p className="text-lg text-gray-600 mb-12 max-w-3xl">
          Mr. Moda's collaborative approach brings together diverse communities and creates conversations that transcend
          differences. Explore his work with various artists, brands, and organizations.
        </p>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-12">
            <TabsTrigger value="all">All Collaborations</TabsTrigger>
            <TabsTrigger value="brand">Fashion Brands</TabsTrigger>
            <TabsTrigger value="artist">Artists</TabsTrigger>
            <TabsTrigger value="organization">Organizations</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collaborators.map((collaborator, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-64 w-full">
                    <Image
                      src={collaborator.image || "/placeholder.svg"}
                      alt={`Collaboration with ${collaborator.name}`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-xl">{collaborator.name}</h3>
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded">{collaborator.year}</span>
                    </div>
                    <p className="text-gray-700 mb-4">{collaborator.description}</p>
                    {collaborator.link && (
                      <Link
                        href={collaborator.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-sm hover:underline"
                      >
                        Visit Website
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {["brand", "artist", "organization"].map((type) => (
            <TabsContent key={type} value={type}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {collaborators
                  .filter((collaborator) => collaborator.type === type)
                  .map((collaborator, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative h-64 w-full">
                        <Image
                          src={collaborator.image || "/placeholder.svg"}
                          alt={`Collaboration with ${collaborator.name}`}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-xl">{collaborator.name}</h3>
                          <span className="text-sm bg-gray-100 px-2 py-1 rounded">{collaborator.year}</span>
                        </div>
                        <p className="text-gray-700 mb-4">{collaborator.description}</p>
                        {collaborator.link && (
                          <Link
                            href={collaborator.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary text-sm hover:underline"
                          >
                            Visit Website
                          </Link>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 bg-gray-100 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Collaboration Inquiries</h2>
          <p className="text-gray-700 mb-4">
            Mr. Moda is open to new collaborative opportunities with brands, artists, and organizations. For
            collaboration inquiries, please contact:
          </p>
          <div className="space-y-2">
            <p className="flex items-center text-gray-700">
              <span className="font-semibold mr-2">Email:</span> collaborations@hallamoda.com
            </p>
            <p className="flex items-center text-gray-700">
              <span className="font-semibold mr-2">Phone:</span> 786.843.1305
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
