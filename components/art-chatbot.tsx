"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Send, X, Minimize, Maximize } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
}

export function ArtChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm Mr. Moda's AI assistant. How can I help you learn about his artwork, exhibitions, or creative process?",
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.response,
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I'm sorry, I encountered an error. Please try again later.",
          },
        ])
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <Button className="fixed bottom-4 right-4 rounded-full w-14 h-14 p-0 shadow-lg" onClick={() => setIsOpen(true)}>
        <Avatar className="h-12 w-12">
          <AvatarImage src="/images/artist-portrait.png" alt="Mr. Moda" />
          <AvatarFallback>MM</AvatarFallback>
        </Avatar>
      </Button>
    )
  }

  return (
    <Card
      className={`fixed bottom-4 right-4 w-80 md:w-96 shadow-lg transition-all duration-300 ${isMinimized ? "h-16" : "h-[500px]"}`}
    >
      <CardHeader className="p-3 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/images/artist-portrait.png" alt="Mr. Moda" />
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>
          <CardTitle className="text-sm">Mr. Moda Assistant</CardTitle>
        </div>
        <div className="flex space-x-1">
          {isMinimized ? (
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsMinimized(false)}>
              <Maximize className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsMinimized(true)}>
              <Minimize className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <>
          <CardContent className="p-0">
            <ScrollArea className="h-[380px] p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-3 pt-0">
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Ask about Mr. Moda's art..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <Button size="icon" disabled={isLoading || !input.trim()} onClick={handleSendMessage}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  )
}
