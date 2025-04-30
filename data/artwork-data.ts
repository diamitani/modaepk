import type { ArtworkItem } from "@/utils/pdf-extractor"
import { artworkImageMapping } from "./artwork-image-mapping"

// This would typically be loaded from a database or API
export const artworkData: ArtworkItem[] = [
  {
    id: "1",
    title: "HOW TO : LOSE YOUR F* MIND",
    year: "2018",
    description:
      "The 1st installment from Mr. Moda's Debut series \"How to: Be An Artist\" Collection. In which the artist creates an interpretation of the modern 'Blue print' to convey emotions, impressions, and experiences throughout the set. This series focuses on mental health and environmental challenges. This original one of a kind piece, features 100% authentic materials and symbolic collectables from scratch: real bullets, a power outlet, Pokemon card, hand-made cross chain. Upon purchase the piece will be fitted with a custom acrylic frame with built in UV lighting.",
    medium: "Acrylic and UV paint with mixed media on heavy block",
    dimensions: '36" X 36"',
    image: artworkImageMapping["HOW TO : LOSE YOUR F* MIND"],
    series: "How To: Be An Artist",
    category: "series",
  },
  {
    id: "2",
    title: "HOW TO : BUILD THE PERFECT WOMBMAN",
    year: "2018",
    description:
      'The 2nd installment of the "How to: Be an Artist" Collection. This is a one of a kind piece. The materials used within this series of paintings were collected and crafted from scratch and carefully infused into the design over a three year time period. Upon purchase the piece will be fitted with a custom acrylic frame with built in UV lighting.',
    medium: "Acrylic and UV paint with mixed media on wood",
    dimensions: '60" X 60"',
    image: artworkImageMapping["HOW TO : BUILD THE PERFECT WOMBMAN"],
    series: "How To: Be An Artist",
    category: "series",
  },
  {
    id: "3",
    title: "HOW TO : LOSE CONTROL",
    year: "2018",
    description:
      'The 3rd installment of the "How to: Be an Artist" Collection. Each material used within this series of paintings was collected and crafted from scratch to be carefully infused into the design over a three year time period. Upon purchase the piece will be fitted with a custom acrylic frame with built in UV lighting.',
    medium: "Acrylic and UV paint with mixed media on aluminum",
    dimensions: '32" x 48"',
    image: artworkImageMapping["HOW TO : LOSE CONTROL"],
    series: "How To: Be An Artist",
    category: "series",
  },
  {
    id: "4",
    title: "HOW TO : BE AN ARTIST",
    year: "2021",
    description:
      'The 4th Installment of the series "How to: Be an Artist" Collection. Each material used within this series of paintings was collected and crafted from scratch to be carefully infused into the design over a three year time period. This piece includes: a real jammed pistol, rare Yu-Gi-Oh Cards, and precious stones. Upon purchase the piece will be fitted with a custom acrylic frame with built in UV lighting.',
    medium: "Acrylic and UV paint with mixed media on canvas",
    dimensions: '60" x 60"',
    image: artworkImageMapping["HOW TO : BE AN ARTIST"],
    series: "How To: Be An Artist",
    category: "series",
  },
  {
    id: "5",
    title: "HOW TO : MAKE LOVE",
    year: "2021",
    description:
      'The 5th Installment of the series "How to: Be an Artist" Collection. Each material used within this series of paintings was collected and crafted from scratch to be carefully infused into the design over a three year time period. This piece includes: an ultrasound photo. Upon purchase the piece will be fitted with a custom acrylic frame with built in UV lighting.',
    medium: "Acrylic and UV paint with mixed media on canvas",
    dimensions: '80" x 60"',
    image: artworkImageMapping["HOW TO : MAKE LOVE"],
    series: "How To: Be An Artist",
    category: "series",
  },
  {
    id: "6",
    title: "HOW TO : BUILD THE PERFECT WOMBMAN V.2",
    year: "2021",
    description:
      'Another installment in the "How to: Be an Artist" Collection. This is a one of a kind piece. The materials used within this series of paintings were collected and crafted from scratch and carefully infused into the design over a three year time period. Upon purchase the piece will be fitted with a custom acrylic frame with built in UV lighting.',
    medium: "Acrylic and UV paint with mixed media on canvas",
    dimensions: '60" X 60"',
    image: artworkImageMapping["HOW TO : BUILD THE PERFECT WOMBMAN V.2"],
    series: "How To: Be An Artist",
    category: "series",
  },
  {
    id: "7",
    title: "HOW TO : BUILD THE PERFECT WOMBMAN V.3",
    year: "2021",
    description:
      'A continuation of the "How to: Be an Artist" Collection. This is a one of a kind piece. The materials used within this series of paintings were collected and crafted from scratch and carefully infused into the design over a three year time period. Upon purchase the piece will be fitted with a custom acrylic frame with built in UV lighting.',
    medium: "Acrylic and UV paint with mixed media on canvas",
    dimensions: '60" X 60"',
    image: artworkImageMapping["HOW TO : BUILD THE PERFECT WOMBMAN V.3"],
    series: "How To: Be An Artist",
    category: "series",
  },
  {
    id: "8",
    title: "HOW TO : LOSE YOUR F* MIND 2021",
    year: "2021",
    description:
      "The Marquee piece from Mr. Moda's Debut series \"How to: Be An Artist\" Collection. In which the artist creates an interpretation of the modern 'Blueprint' to convey emotions, impressions, and experiences throughout the set. This series focuses on mental health and environmental challenges. This original one of a kind piece, features 100% authentic materials and symbolic collectables from scratch: real bullets, a power outlet, Pokemon card, hand-made cross chain. Upon purchase the piece will be fitted with a custom acrylic frame with built in UV lighting.",
    medium: "Acrylic and UV paint with mixed media on canvas",
    dimensions: '60" X 60"',
    image: artworkImageMapping["HOW TO : LOSE YOUR F* MIND 2021"],
    series: "How To: Be An Artist",
    category: "series",
  },
  {
    id: "9",
    title: "HOW TO : KEEP A RELATIONSHIP",
    year: "2021",
    description:
      'The 8th Installment of the series "How to: Be an Artist" Collection. Each material used within this series of paintings was collected and crafted from scratch to be carefully infused into the design over a three year time period. Upon purchase the piece will be fitted with a custom acrylic frame with built in UV lighting.',
    medium: "Acrylic, UV and embossed paint with mixed media on canvas",
    dimensions: '48" x 60"',
    image: artworkImageMapping["HOW TO : KEEP A RELATIONSHIP"],
    series: "How To: Be An Artist",
    category: "series",
  },
  {
    id: "10",
    title: "HOW TO : MOVE ON",
    year: "2021",
    description:
      'The 9th Installment of the series "How to: Be an Artist" Collection. Each material used within this series of paintings was collected and crafted from scratch to be carefully infused into the design over a three year time period. Upon purchase the piece will be fitted with a custom acrylic frame with built in UV lighting.',
    medium: "Acrylic, UV and mixed media on wood",
    dimensions: '48" x 36"',
    image: artworkImageMapping["HOW TO : MOVE ON"],
    series: "How To: Be An Artist",
    category: "series",
  },
  {
    id: "11",
    title: "HOW TO : BE YOUR, SELF.",
    year: "2021",
    description:
      'The 10th Installment of the series "How to: Be an Artist" Collection. Each material used within this series of paintings was collected and crafted from scratch to be carefully infused into the design over a three year time period. Upon purchase the piece will be fitted with a custom acrylic frame with built in UV lighting.',
    medium: "Acrylic, UV and embossed paint with mixed media on canvas",
    dimensions: '60" x 60"',
    image: artworkImageMapping["HOW TO : BE YOUR, SELF."],
    series: "How To: Be An Artist",
    category: "series",
  },
  {
    id: "12",
    title: "FEVVER",
    year: "2019",
    description:
      "A vibrant tribute to the iconic anime character Sailor Moon, reimagined through Mr. Moda's distinctive artistic style. This piece blends anime influences with street art aesthetics and fine art techniques. Sold during Art Basel Miami via Art Gal Ori Gallery.",
    medium: "Acrylic, UV paint with mixed media on canvas with custom acrylic light box",
    dimensions: '72" x 48"',
    image: artworkImageMapping["FEVVER"],
    category: "sold",
  },
  {
    id: "13",
    title: "WILL",
    year: "2021",
    description:
      "Dragon Ball Z inspired artwork by Mr. Moda featuring vibrant colors and dynamic composition. Private sale at Younity Studios Miami.",
    medium: "Acrylic, UV paint with mixed media on canvas with custom hand-painted metal frame",
    dimensions: '72" x 48"',
    image: artworkImageMapping["WILL"],
    category: "sold",
  },
  {
    id: "14",
    title: "MODANNA",
    year: "2022",
    description:
      "Commission artwork by Mr. Moda featuring a modern interpretation of Madonna with vibrant green hair and street art elements.",
    medium: "Acrylic, UV paint with mixed media on metal",
    dimensions: '44" x 72"',
    image: artworkImageMapping["MODANNA"],
    category: "commission",
  },
  {
    id: "15",
    title: "MODANNA UV",
    year: "2022",
    description:
      "A UV-reactive version of the MODANNA commission, showing the artwork's special features under ultraviolet lighting.",
    medium: "Acrylic, UV paint with mixed media on metal",
    dimensions: '44" x 72"',
    image: artworkImageMapping["MODANNA UV"],
    category: "commission",
  },
  {
    id: "16",
    title: "HOW TO : WEAR A MASK (AGAIN)",
    year: "2022",
    description:
      "Commission artwork by Mr. Moda exploring themes of identity and masks, featuring Darth Vader-inspired imagery with street art elements.",
    medium: "Acrylic, UV paint with mixed media on canvas",
    dimensions: '48" x 36"',
    image: artworkImageMapping["HOW TO : WEAR A MASK (AGAIN)"],
    category: "commission",
  },
  {
    id: "17",
    title: "MURAL INSTALLATION MIAMI",
    year: "2022",
    description:
      "Large-scale mural installation in Miami featuring Mr. Moda's distinctive style in an unexpected location.",
    medium: "Acrylic, UV paint with mixed media with wooden frame",
    dimensions: '180" x 60"',
    image: artworkImageMapping["MURAL INSTALLATION MIAMI"],
    category: "mural",
  },
  {
    id: "18",
    title: "SLEEPY SLOTH NFT NYC",
    year: "2022",
    description:
      "Mural installation for NFT NYC in collaboration with Sleepy Sloth Society, featuring vibrant colors and street art aesthetics.",
    medium: "Acrylic, UV paint with mixed media",
    dimensions: '120" x 60"',
    image: artworkImageMapping["SLEEPY SLOTH NFT NYC"],
    category: "mural",
  },
  {
    id: "19",
    title: "SLEEPY SLOTH",
    year: "2022",
    description:
      "Mural artwork created for the Sleepy Sloth Society featuring Mr. Moda's distinctive style with playful, cartoon-like elements.",
    medium: "Acrylic, UV paint with mixed media on metal",
    dimensions: '44" x 72"',
    image: artworkImageMapping["SLEEPY SLOTH"],
    category: "mural",
  },
  {
    id: "20",
    title: "LEGENDS OF SOCCER",
    year: "2019",
    description:
      "Mural celebrating soccer legends with Mr. Moda's unique artistic vision, featuring portraits of famous players.",
    medium: "Acrylic, UV paint with mixed media",
    dimensions: '180" x 74"',
    image: artworkImageMapping["LEGENDS OF SOCCER"],
    category: "mural",
  },
]

// Create portfolio items from artwork data
export const portfolioItems: PortfolioItem[] = artworkData.map((item) => ({
  id: item.id,
  title: item.title,
  year: item.year,
  description: item.description,
  image: item.image,
  category: item.category,
}))

// For backward compatibility
export const artworkItems = artworkData

// Define the PortfolioItem type
export type PortfolioItem = {
  id: string
  title: string
  year: string
  description: string
  image: string
  category: string
}

// Helper functions to filter artwork by category
export function getArtworkByCategory(category: string): ArtworkItem[] {
  if (category === "all") {
    return artworkData
  }
  return artworkData.filter((item) => item.category === category)
}

// Helper function to get artwork by series
export function getArtworkBySeries(series: string): ArtworkItem[] {
  return artworkData.filter((item) => item.series === series)
}

// Helper function to get artwork by ID
export function getArtworkById(id: string): ArtworkItem | undefined {
  return artworkData.find((item) => item.id === id)
}

// Get all unique categories
export function getAllCategories(): string[] {
  const categories = new Set(artworkData.map((item) => item.category))
  return ["all", ...Array.from(categories)]
}

// Get all unique series
export function getAllSeries(): string[] {
  const series = new Set(artworkData.filter((item) => item.series).map((item) => item.series as string))
  return Array.from(series)
}
