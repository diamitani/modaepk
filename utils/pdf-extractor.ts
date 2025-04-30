import { v4 as uuidv4 } from "uuid"
import path from "path"
import fs from "fs/promises"
import { existsSync, mkdirSync } from "fs"

// Define artwork item type
export type ArtworkItem = {
  id: string
  title: string
  year: string
  description: string
  medium?: string
  dimensions?: string
  image: string
  series?: string
  category: string
}

// Function to save an image from a data URL
export async function saveImageFromDataUrl(dataUrl: string, category = "artwork"): Promise<string> {
  try {
    // Create the images directory if it doesn't exist
    const imagesDir = path.join(process.cwd(), "public/images", category)
    if (!existsSync(imagesDir)) {
      mkdirSync(imagesDir, { recursive: true })
    }

    // Extract the base64 data
    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, "")
    const buffer = Buffer.from(base64Data, "base64")

    // Generate a unique filename
    const filename = `${category}_${uuidv4()}.png`
    const filePath = path.join(imagesDir, filename)

    // Save the image
    await fs.writeFile(filePath, buffer)

    // Return the path to the saved image
    return `/images/${category}/${filename}`
  } catch (error) {
    console.error("Error saving image from data URL:", error)
    throw error
  }
}

// Function to extract text content from a PDF page
export function extractTextContent(textContent: any): string {
  // This is a simplified version - in a real implementation,
  // you would use a PDF.js or similar library to extract text
  return textContent.items.map((item: any) => item.str).join(" ")
}

// Function to match artwork descriptions with images
export function matchArtworkWithDescription(images: string[], textContent: string): ArtworkItem[] {
  // This is a simplified version - in a real implementation,
  // you would use more sophisticated text analysis

  // Example patterns to extract artwork information
  const artworkPattern = /MR MODA, ([^,]+), (\d{4});?\s*([^,]+(?:, [^,]+)*)/g

  const artworks: ArtworkItem[] = []
  let match
  let index = 0

  while ((match = artworkPattern.exec(textContent)) !== null && index < images.length) {
    const title = match[1].trim()
    const year = match[2].trim()
    const mediumAndDimensions = match[3].trim()

    // Extract medium and dimensions if available
    let medium = ""
    let dimensions = ""

    if (mediumAndDimensions.includes('"')) {
      const parts = mediumAndDimensions.split('"')
      medium = parts[0].trim()
      dimensions = parts.length > 1 ? `${parts[1].trim()}"` : ""
    } else {
      medium = mediumAndDimensions
    }

    // Find the description before this artwork mention
    const beforeMatch = textContent.substring(0, match.index)
    const descriptionMatch = beforeMatch.match(/([^.]+(?:\.[^.]+){1,3})(?=\s*MR MODA)/)
    const description = descriptionMatch ? descriptionMatch[0].trim() : "No description available"

    // Determine series and category
    let series = ""
    let category = "artwork"

    if (title.includes("HOW TO")) {
      series = "How To: Be An Artist"
      category = "series"
    } else if (title.includes("MURAL")) {
      category = "mural"
    } else if (title.includes("COMMISSION")) {
      category = "commission"
    }

    artworks.push({
      id: uuidv4(),
      title,
      year,
      description,
      medium,
      dimensions,
      image: images[index],
      series,
      category,
    })

    index++
  }

  return artworks
}

// Function to extract artwork data from the PDF content
export function extractArtworkData(pdfContent: string): ArtworkItem[] {
  // This is a simplified version - in a real implementation,
  // you would parse the PDF content more thoroughly

  const artworks: ArtworkItem[] = []

  // Example data extraction based on the PDF content
  const sections = pdfContent.split(/HOW TO :|MR MODA,/)

  sections.forEach((section, index) => {
    if (index === 0) return // Skip the first section

    const lines = section.trim().split("\n")
    if (lines.length < 3) return

    let title = ""
    let year = ""
    let description = ""
    let medium = ""
    let dimensions = ""

    // Extract title and year
    const titleYearMatch = lines[0].match(/([^,]+), (\d{4});?/)
    if (titleYearMatch) {
      title = titleYearMatch[1].trim()
      year = titleYearMatch[2].trim()
    } else {
      title = lines[0].trim()
      year = new Date().getFullYear().toString()
    }

    // Extract medium and dimensions
    const mediumDimensionsMatch = lines.find((line) => line.includes('"'))
    if (mediumDimensionsMatch) {
      const parts = mediumDimensionsMatch.split('"')
      medium = parts[0].trim()
      dimensions = parts.length > 1 ? `${parts[1].trim()}"` : ""
    }

    // Extract description
    description = lines.slice(1, -1).join(" ").trim()

    // Determine category
    let category = "artwork"
    let series = ""

    if (title.includes("HOW TO")) {
      series = "How To: Be An Artist"
      category = "series"
    } else if (title.includes("MURAL")) {
      category = "mural"
    } else if (title.includes("COMMISSION")) {
      category = "commission"
    }

    artworks.push({
      id: uuidv4(),
      title: title.startsWith("HOW TO :") ? title : `HOW TO : ${title}`,
      year,
      description,
      medium,
      dimensions,
      image: `/placeholder.svg?text=${encodeURIComponent(title)}&width=600&height=800`,
      series,
      category,
    })
  })

  return artworks
}

// Function to parse the PDF content and extract artwork data
export async function parsePdfContent(pdfContent: string): Promise<ArtworkItem[]> {
  // In a real implementation, you would use a PDF parsing library
  // For now, we'll use the extracted text from the PDF

  // Define the artwork data based on the PDF content
  const artworkData: ArtworkItem[] = [
    {
      id: uuidv4(),
      title: "HOW TO : LOSE YOUR F* MIND",
      year: "2018",
      description:
        "The 1st installment from Mr. Moda's Debut series \"How to: Be An Artist\" Collection. In which the artist creates an interpretation of the modern 'Blue print' to convey emotions, impressions, and experiences throughout the set. This series focuses on mental health and environmental challenges. This original one of a kind piece, features 100% authentic materials and symbolic collectables from scratch: real bullets, a power outlet, Pokemon card, hand-made cross chain. Upon purchase the piece will be fitted with a custom acrylic frame with built in UV lighting.",
      medium: "Acrylic and UV paint with mixed media on heavy block",
      dimensions: '36" X 36"',
      image: "/images/artwork/how-to-lose-your-mind-2018.png",
      series: "How To: Be An Artist",
      category: "series",
    },
    {
      id: uuidv4(),
      title: "HOW TO : LOSE YOUR F* MIND",
      year: "2021",
      description:
        "The Marquee piece from Mr. Moda's Debut series \"How to: Be An Artist\" Collection. In which the artist creates an interpretation of the modern 'Blueprint' to convey emotions, impressions, and experiences throughout the set. This series focuses on mental health and environmental challenges. This original one of a kind piece, features 100% authentic materials and symbolic collectables from scratch: real bullets, a power outlet, Pokemon card, hand-made cross chain. Upon purchase the piece will be fitted with a custom acrylic frame with built in UV lighting.",
      medium: "Acrylic and UV paint with mixed media on canvas",
      dimensions: '60" X 60"',
      image: "/images/artwork/how-to-lose-your-mind-2021.png",
      series: "How To: Be An Artist",
      category: "series",
    },
    {
      id: uuidv4(),
      title: "HOW TO : BUILD THE PERFECT WOMBMAN",
      year: "2018",
      description:
        'The 2nd installment of the "How to: Be an Artist" Collection. This is a one of a kind piece. The materials used within this series of paintings were collected and crafted from scratch and carefully infused into the design over a three year time period. Upon purchase the piece will be fitted with a custom acrylic frame with built in UV lighting.',
      medium: "Acrylic and UV paint with mixed media on wood",
      dimensions: '60" x 60"',
      image: "/images/artwork/how-to-build-the-perfect-wombman-v1-2018.png",
      series: "How To: Be An Artist",
      category: "series",
    },
    {
      id: uuidv4(),
      title: "HOW TO : BUILD THE PERFECT WOMBMAN V.2",
      year: "2021",
      description:
        'The 2nd installment of the "How to: Be an Artist" Collection. This is a one of a kind piece. The materials used within this series of paintings were collected and crafted from scratch and carefully infused into the design over a three year time period. Upon purchase the piece will be fitted with a custom acrylic frame with built in UV lighting.',
      medium: "Acrylic and UV paint with mixed media on canvas",
      dimensions: '60" x 60"',
      image: "/images/artwork/how-to-build-the-perfect-wombman-v2-2021.png",
      series: "How To: Be An Artist",
      category: "series",
    },
    {
      id: uuidv4(),
      title: "HOW TO : BUILD THE PERFECT WOMBMAN V.3",
      year: "2021",
      description:
        'The 2nd installment of the "How to: Be an Artist" Collection. This is a one of a kind piece. The materials used within this series of paintings were collected and crafted from scratch and carefully infused into the design over a three year time period. Upon purchase the piece will be fitted with a custom acrylic frame with built in UV lighting.',
      medium: "Acrylic and UV paint with mixed media on canvas",
      dimensions: '60" x 60"',
      image: "/images/artwork/how-to-build-the-perfect-wombman-v3-2021.png",
      series: "How To: Be An Artist",
      category: "series",
    },
    {
      id: uuidv4(),
      title: "HOW TO : LOSE CONTROL",
      year: "2018",
      description:
        'The 3rd installment of the "How to: Be an Artist" Collection. Each material used within this series of paintings was collected and crafted from scratch to be carefully infused into the design over a three year time period. Upon purchase the piece will be fitted with a custom acrylic frame with built in UV lighting.',
      medium: "Acrylic and UV paint with mixed media on aluminum",
      dimensions: '32" x 48"',
      image: "/images/artwork/how-to-lose-control-2018.png",
      series: "How To: Be An Artist",
      category: "series",
    },
    {
      id: uuidv4(),
      title: "HOW TO : BE AN ARTIST",
      year: "2021",
      description:
        'The 4th Installment of the series "How to: Be an Artist" Collection. Each material used within this series of paintings was collected and crafted from scratch to be carefully infused into the design over a three year time period. This piece includes: a real jammed pistol, rare Yu-Gi-Oh Cards, and precious stones. Upon purchase the piece will be fitted with a custom acrylic frame with built in UV lighting.',
      medium: "Acrylic and UV paint with mixed media on canvas",
      dimensions: '60" x 60"',
      image: "/images/artwork/how-to-be-an-artist-2021.png",
      series: "How To: Be An Artist",
      category: "series",
    },
    {
      id: uuidv4(),
      title: "HOW TO : MAKE LOVE",
      year: "2021",
      description:
        'The 5th Installment of the series "How to: Be an Artist" Collection. Each material used within this series of paintings was collected and crafted from scratch to be carefully infused into the design over a three year time period. This piece includes: an ultrasound photo. Upon purchase the piece will be fitted with a custom acrylic frame with built in UV lighting.',
      medium: "Acrylic and UV paint with mixed media on canvas",
      dimensions: '80" x 60"',
      image: "/images/artwork/how-to-make-love-2021.png",
      series: "How To: Be An Artist",
      category: "series",
    },
    {
      id: uuidv4(),
      title: "HOW TO : KEEP A RELATIONSHIP",
      year: "2021",
      description:
        'The 8th Installment of the series "How to: Be an Artist" Collection. Each material used within this series of paintings was collected and crafted from scratch to be carefully infused into the design over a three year time period. Upon purchase the piece will be fitted with a custom acrylic frame with built in UV lighting.',
      medium: "Acrylic, UV and embossed paint with mixed media on canvas",
      dimensions: '48" x 60"',
      image: "/images/artwork/how-to-keep-a-relationship-2021.png",
      series: "How To: Be An Artist",
      category: "series",
    },
    {
      id: uuidv4(),
      title: "HOW TO : MOVE ON",
      year: "2021",
      description:
        'The 9th Installment of the series "How to: Be an Artist" Collection. Each material used within this series of paintings was collected and crafted from scratch to be carefully infused into the design over a three year time period. Upon purchase the piece will be fitted with a custom acrylic frame with built in UV lighting.',
      medium: "Acrylic, UV and mixed media on wood",
      dimensions: '48" x 36"',
      image: "/images/artwork/how-to-move-on-2021.png",
      series: "How To: Be An Artist",
      category: "series",
    },
    {
      id: uuidv4(),
      title: "HOW TO : BE YOUR, SELF.",
      year: "2021",
      description:
        'The 10th Installment of the series "How to: Be an Artist" Collection. Each material used within this series of paintings was collected and crafted from scratch to be carefully infused into the design over a three year time period. Upon purchase the piece will be fitted with a custom acrylic frame with built in UV lighting.',
      medium: "Acrylic, UV and embossed paint with mixed media on canvas",
      dimensions: '60" x 60"',
      image: "/images/artwork/how-to-be-yourself-2021.png",
      series: "How To: Be An Artist",
      category: "series",
    },
    {
      id: uuidv4(),
      title: "MODANNA",
      year: "2022",
      description: "Commission artwork by Mr. Moda featuring a modern interpretation of Madonna.",
      medium: "Acrylic, UV paint with mixed media on metal",
      dimensions: '44" x 72"',
      image: "/images/artwork/modanna-2022.png",
      category: "commission",
    },
    {
      id: uuidv4(),
      title: "HOW TO : WEAR A MASK (AGAIN)",
      year: "2022",
      description: "Commission artwork by Mr. Moda exploring themes of identity and masks.",
      medium: "Acrylic, UV paint with mixed media on canvas",
      dimensions: '48" x 36"',
      image: "/images/artwork/how-to-wear-a-mask-2022.png",
      category: "commission",
    },
    {
      id: uuidv4(),
      title: "MURAL INSTALLATION MIAMI",
      year: "2022",
      description: "Large-scale mural installation in Miami featuring Mr. Moda's distinctive style.",
      medium: "Acrylic, UV paint with mixed media with wooden frame",
      dimensions: '180" x 60"',
      image: "/images/artwork/mural-installation-miami-2022.png",
      category: "mural",
    },
    {
      id: uuidv4(),
      title: "LEGENDS OF SOCCER",
      year: "2019",
      description: "Mural celebrating soccer legends with Mr. Moda's unique artistic vision.",
      medium: "Acrylic, UV paint with mixed media",
      dimensions: '180" x 74"',
      image: "/images/artwork/legends-of-soccer-2019.png",
      category: "mural",
    },
    {
      id: uuidv4(),
      title: "SLEEPY SLOTH",
      year: "2022",
      description: "Artwork created for the Sleepy Sloth Society featuring Mr. Moda's distinctive style.",
      medium: "Acrylic, UV paint with mixed media on metal",
      dimensions: '44" x 72"',
      image: "/images/artwork/sleepy-sloth-2022.png",
      category: "commission",
    },
    {
      id: uuidv4(),
      title: "SLEEPY SLOTH NFT NYC",
      year: "2022",
      description: "Mural installation for NFT NYC in collaboration with Sleepy Sloth Society.",
      medium: "Acrylic, UV paint with mixed media",
      dimensions: '120" x 60"',
      image: "/images/artwork/sleepy-sloth-nft-nyc-2022.png",
      category: "mural",
    },
    {
      id: uuidv4(),
      title: "FEVVER",
      year: "2019",
      description: "One of Mr. Moda's first major art sales during Art Basel Miami via Art Gal Ori Gallery.",
      medium: "Acrylic, UV paint with mixed media on canvas with custom acrylic light box",
      dimensions: '72" x 48"',
      image: "/images/artwork/fevver-2019.png",
      category: "artwork",
    },
    {
      id: uuidv4(),
      title: "WILL",
      year: "2021",
      description: "Significant artwork sold in a private sale at Younity Studios Miami.",
      medium: "Acrylic, UV paint with mixed media on canvas with custom hand-painted metal frame",
      dimensions: '72" x 48"',
      image: "/images/artwork/will-2021.png",
      category: "artwork",
    },
  ]

  return artworkData
}

// Function to download a PDF from a URL
export async function downloadPDFFromURL(url: string): Promise<ArrayBuffer> {
  try {
    // Fetch the PDF from the URL
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to download PDF: ${response.statusText}`)
    }

    // Convert the response to an ArrayBuffer
    const pdfBuffer = await response.arrayBuffer()

    return pdfBuffer
  } catch (error) {
    console.error("Error downloading PDF:", error)
    throw error
  }
}

// Function to extract images from a PDF
export async function extractImagesFromPDF(pdfBuffer: ArrayBuffer): Promise<string[]> {
  try {
    // In a real implementation, you would use a PDF parsing library
    // For now, we'll simulate the extraction process

    // Create a directory for extracted images if it doesn't exist
    const extractedImagePaths: string[] = []

    // Simulate extracting 3 images with unique names
    const timestamp = Date.now()

    // These would be actual extracted images in a real implementation
    const simulatedImagePaths = [
      `/images/extracted_${timestamp}_1.png`,
      `/images/extracted_${timestamp}_2.png`,
      `/images/extracted_${timestamp}_3.png`,
    ]

    return simulatedImagePaths
  } catch (error) {
    console.error("Error extracting images from PDF:", error)
    throw error
  }
}
