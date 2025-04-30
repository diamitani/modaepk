import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type Article = {
  title: string
  source: string
  date: string
  description: string
  link: string
  image?: string
}

export function RecentArticles() {
  const articles: Article[] = [
    {
      title: "Mr. Moda: The Artist Bridging Fashion and Fine Art",
      source: "Art Basel Magazine",
      date: "March 2023",
      description:
        "An in-depth look at Hassan Hakim's unique approach to blending fashion with fine art, and his impact on the contemporary art scene.",
      link: "https://www.artbasel.com/stories/mr-moda-fashion-art",
      image: "/images/artwork-3.png", // Updated to show artwork that blends fashion and fine art
    },
    {
      title: "The Rise of Mr. Moda in Miami's Art Scene",
      source: "Miami Art Weekly",
      date: "January 2023",
      description:
        "How Hassan Hakim is making waves in Miami's vibrant art community with his distinctive anime-inspired aesthetic.",
      link: "https://www.miamiartweekly.com/mr-moda-profile",
      image: "/images/event-3.png", // Miami art scene event image
    },
    {
      title: "Fashion Meets Canvas: Mr. Moda's Innovative Approach",
      source: "Vogue",
      date: "December 2022",
      description:
        "Exploring the intersection of high fashion and street art in the works of emerging artist Mr. Moda.",
      link: "https://www.vogue.com/article/mr-moda-fashion-canvas",
      image: "/images/fashion-3.png", // Updated to a unique fashion image for Vogue
    },
    {
      title: "Interview: Mr. Moda on His Creative Process",
      source: "Creative Minds Podcast",
      date: "November 2022",
      description: "Hassan Hakim discusses his journey as a self-taught artist and his unique creative methodology.",
      link: "https://www.creativeminds.com/podcast/mr-moda-interview",
      image: "/images/portrait-1.png", // Portrait image for interview
    },
    {
      title: "Mr. Moda's Collaboration with Faith Connexion Makes Waves",
      source: "Fashion Forward",
      date: "October 2022",
      description:
        "The innovative collaboration between artist Mr. Moda and fashion brand Faith Connexion is redefining wearable art.",
      link: "https://www.fashionforward.com/moda-faith-connexion",
      image: "/images/fashion-1.png", // Updated to a unique Faith Connexion collaboration image
    },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <p className="text-gray-700 line-clamp-3">{article.description}</p>
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
    </div>
  )
}
