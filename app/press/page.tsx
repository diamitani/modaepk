import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Article = {
  title: string
  source: string
  date: string
  description: string
  link: string
  image?: string
  category: "feature" | "interview" | "review" | "news"
}

export default function PressPage() {
  const articles: Article[] = [
    {
      title: "Mr. Moda: The Artist Bridging Fashion and Fine Art",
      source: "Art Basel Magazine",
      date: "March 2023",
      description:
        "An in-depth look at Hassan Hakim's unique approach to blending fashion with fine art, and his impact on the contemporary art scene.",
      link: "https://www.artbasel.com/stories/mr-moda-fashion-art",
      image: "/images/artwork-3.png", // Updated to show artwork that blends fashion and fine art
      category: "feature",
    },
    {
      title: "The Rise of Mr. Moda in Miami's Art Scene",
      source: "Miami Art Weekly",
      date: "January 2023",
      description:
        "How Hassan Hakim is making waves in Miami's vibrant art community with his distinctive anime-inspired aesthetic.",
      link: "https://www.miamiartweekly.com/mr-moda-profile",
      image: "/images/event-3.png", // Miami art scene event image
      category: "feature",
    },
    {
      title: "Fashion Meets Canvas: Mr. Moda's Innovative Approach",
      source: "Vogue",
      date: "December 2022",
      description:
        "Exploring the intersection of high fashion and street art in the works of emerging artist Mr. Moda.",
      link: "https://www.vogue.com/article/mr-moda-fashion-canvas",
      image: "/images/fashion-3.png", // Updated to a unique fashion image for Vogue
      category: "review",
    },
    {
      title: "Interview: Mr. Moda on His Creative Process",
      source: "Creative Minds Podcast",
      date: "November 2022",
      description: "Hassan Hakim discusses his journey as a self-taught artist and his unique creative methodology.",
      link: "https://www.creativeminds.com/podcast/mr-moda-interview",
      image: "/images/portrait-1.png", // Portrait image for interview
      category: "interview",
    },
    {
      title: "Mr. Moda's Collaboration with Faith Connexion Makes Waves",
      source: "Fashion Forward",
      date: "October 2022",
      description:
        "The innovative collaboration between artist Mr. Moda and fashion brand Faith Connexion is redefining wearable art.",
      link: "https://www.fashionforward.com/moda-faith-connexion",
      image: "/images/fashion-1.png", // Updated to a unique Faith Connexion collaboration image
      category: "news",
    },
    {
      title: "The Anime Influence in Contemporary Art: Mr. Moda's Vision",
      source: "Art Critique",
      date: "September 2022",
      description:
        "A critical analysis of how Mr. Moda incorporates anime aesthetics into his work and its significance in contemporary art.",
      link: "https://www.artcritique.com/anime-influence-moda",
      image: "/images/anime-1.png", // Anime-inspired artwork
      category: "review",
    },
    {
      title: "Mr. Moda Featured at Miami Art Week",
      source: "Art News Daily",
      date: "August 2022",
      description:
        "Coverage of Mr. Moda's participation and showcase at Miami Art Week, highlighting his standout pieces.",
      link: "https://www.artnewsdaily.com/miami-art-week-moda",
      image: "/images/event-1.png", // Miami Art Week event
      category: "news",
    },
    {
      title: "In Conversation: Mr. Moda and Contemporary Fashion",
      source: "Style Magazine",
      date: "July 2022",
      description:
        "An exclusive interview where Mr. Moda discusses his views on contemporary fashion and his contributions to the field.",
      link: "https://www.stylemagazine.com/conversation-moda",
      image: "/images/fashion-2.png", // Different fashion image for Style Magazine
      category: "interview",
    },
    {
      title: "The Evolution of Mr. Moda: From Street Art to High Fashion",
      source: "Urban Culture Review",
      date: "June 2022",
      description:
        "Tracing the artistic journey of Hassan Hakim from his early street art days to his current status in high fashion.",
      link: "https://www.urbanculture.com/evolution-moda",
      image: "/images/studio-1.png", // Studio image showing evolution
      category: "feature",
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
          <h1 className="text-3xl md:text-4xl font-bold">Press & Media</h1>
        </div>

        <p className="text-lg text-gray-600 mb-12 max-w-3xl">
          Browse the latest press coverage, interviews, and features about Mr. Moda's work, exhibitions, and
          collaborations.
        </p>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-12">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="feature">Features</TabsTrigger>
            <TabsTrigger value="interview">Interviews</TabsTrigger>
            <TabsTrigger value="review">Reviews</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <Card key={index} className="overflow-hidden h-full flex flex-col">
                  {article.image && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                    <CardDescription>
                      {article.source} • {article.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-700">{article.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary flex items-center hover:underline"
                    >
                      Read Article <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {["feature", "interview", "review", "news"].map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles
                  .filter((article) => article.category === category)
                  .map((article, index) => (
                    <Card key={index} className="overflow-hidden h-full flex flex-col">
                      {article.image && (
                        <div className="relative h-48 w-full">
                          <Image
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                        <CardDescription>
                          {article.source} • {article.date}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-gray-700">{article.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Link
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary flex items-center hover:underline"
                        >
                          Read Article <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 bg-gray-100 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Press Inquiries</h2>
          <p className="text-gray-700 mb-4">
            For press inquiries, interview requests, or media opportunities, please contact:
          </p>
          <div className="space-y-2">
            <p className="flex items-center text-gray-700">
              <span className="font-semibold mr-2">Email:</span> press@hallamoda.com
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
