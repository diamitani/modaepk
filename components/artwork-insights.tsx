"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

export function ArtworkInsights() {
  const [question, setQuestion] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    setIsLoading(true)
    setResponse("")

    try {
      const res = await fetch("/api/artwork-insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      })

      if (!res.ok) {
        throw new Error("Failed to get insights")
      }

      const data = await res.json()
      setResponse(data.response)
    } catch (error) {
      console.error("Error getting insights:", error)
      setResponse("Sorry, there was an error processing your request. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ask About Mr. Moda's Art</CardTitle>
        <CardDescription>
          Get AI-powered insights about Mr. Moda's artwork, style, techniques, and influences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Ask a question about Mr. Moda's artwork, style, or creative process..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            className="resize-none"
          />
          <Button type="submit" disabled={isLoading || !question.trim()}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting insights...
              </>
            ) : (
              "Get Insights"
            )}
          </Button>
        </form>

        {response && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium mb-2">Insights:</h3>
            <div className="text-gray-700 whitespace-pre-line">{response}</div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        Powered by AI. Insights are generated based on available information about Mr. Moda's work.
      </CardFooter>
    </Card>
  )
}
