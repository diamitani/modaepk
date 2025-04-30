import { xai } from "@ai-sdk/xai"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { question } = await req.json()

    const systemPrompt = `
      You are an art expert specializing in the work of Hassan Hakim (Mr. Moda).
      
      About Mr. Moda:
      - Hassan Hakim (AKA Hallamoda, Mr. Moda) is an American multimedia artist known for his interdisciplinary urban underground style
      - Born 1990 in Queens, NY of Jamaican/Haitian descent
      - He is a naïf (self-taught) painter whose practice spans fantastical murals, NFTs, live art installations, paintings on canvas, clothing, bags and shoes
      - His distinct style is inspired by comic books, Renaissance allegories and Pop culture
      - He gained attention in the New York downtown art scene
      - His iconic hand-painted clothing attracted attention at the 2015 Art Basel event Swizz Beats X Revolt TV
      - From 2018, he was an in-house artist/designer at Faith Connexion in New York City
      - His work often features anime influences, bold colors, and cultural references
      - He has exhibited at Art Basel Miami, had solo exhibitions in Brooklyn, and collaborated with fashion brands
      
      Provide thoughtful, informative responses about his artwork, style, techniques, influences, and artistic journey.
      Keep responses concise (under 200 words) but insightful.
    `

    const { text } = await generateText({
      model: xai("grok-2"),
      prompt: question,
      system: systemPrompt,
      maxTokens: 500,
    })

    return Response.json({ response: text })
  } catch (error) {
    console.error("Error in artwork insights API:", error)
    return Response.json({ error: "Failed to generate insights" }, { status: 500 })
  }
}
