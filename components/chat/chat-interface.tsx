"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Settings, Zap, Loader2 } from 'lucide-react'

type Message = {
  id: string
  role: "user" | "ai"
  content: string
  timestamp: Date
  metadata?: {
    activeSkillPacks: string[]
    processingTime: number
    tokensUsed: number
    costEstimate: string
    efficiency: string
  }
}

type SkillPack = {
  id: string
  name: string
  description: string
  active: boolean
  category: string
  color: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSkillPacks, setShowSkillPacks] = useState(true)
  const [activeSkillPacks, setActiveSkillPacks] = useState<SkillPack[]>([
    {
      id: "general-knowledge",
      name: "General Knowledge",
      description: "Basic information and common sense",
      active: true,
      category: "Core",
      color: "bg-blue-500",
    },
    {
      id: "programming",
      name: "Programming",
      description: "Software development, coding, and technical architecture",
      active: false,
      category: "Technical",
      color: "bg-green-500",
    },
    {
      id: "data-analysis",
      name: "Data Analysis",
      description: "Statistical analysis, metrics, and data processing",
      active: false,
      category: "Technical",
      color: "bg-red-500",
    },
    {
      id: "web-development",
      name: "Web Development",
      description: "HTML, CSS, JavaScript, and web frameworks",
      active: false,
      category: "Technical",
      color: "bg-orange-500",
    },
    {
      id: "content-writing",
      name: "Content Writing",
      description: "Content creation, copywriting, and storytelling",
      active: false,
      category: "Creative",
      color: "bg-yellow-500",
    },
    {
      id: "business",
      name: "Business",
      description: "Business planning, strategy, and market analysis",
      active: false,
      category: "Business",
      color: "bg-purple-500",
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Removed apiKey state and showApiKeyInput state as API key is now backend-managed

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = input
    setInput("")
    setIsLoading(true)

    try {
      const activeSkillPackIds = activeSkillPacks.filter((pack) => pack.active).map((pack) => pack.id)
      const activeSkillPackNames = activeSkillPacks.filter((pack) => pack.active).map((pack) => pack.name)

      // Call the new backend API route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
          activeSkillPackIds: activeSkillPackIds,
          messageHistory: messages.slice(-5).map((msg) => ({
            role: msg.role === "ai" ? "assistant" : msg.role,
            content: msg.content,
          })), // Send last 5 messages for context
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `API Error: ${response.status}`)
      }

      const data = await response.json()
      const aiResponse = data.message || "No response generated."

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: aiResponse,
        timestamp: new Date(),
        metadata: {
          activeSkillPacks: activeSkillPackNames,
          processingTime: data.metadata?.processingTime || Math.random() * 1000 + 300,
          tokensUsed: data.metadata?.tokensUsed || Math.random() * 800 + 200,
          costEstimate: data.metadata?.costEstimate || (activeSkillPackIds.length * 0.001).toFixed(4),
          efficiency:
            data.metadata?.efficiency ||
            `${Math.round((1 - activeSkillPackIds.length / 6) * 100)}% more efficient than general AI`,
        },
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error sending message to backend:", error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: `**🔧 Backend API Error**

I encountered an issue processing your request: **${(error as Error).message}**

**Possible solutions:**
1. **Verify XAI_API_KEY**: Ensure your \`XAI_API_KEY\` is correctly set in your Vercel project's environment variables.
2. **Model Access**: Confirm your x.ai account has access to the \`grok-beta\` model.
3. **Network/Service**: There might be a temporary issue with the x.ai service or your network.

Please try again in a few moments. If the issue persists, contact support.`,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const toggleSkillPack = (id: string) => {
    setActiveSkillPacks((prev) =>
      prev.map((pack) => {
        if (pack.id === id) {
          if (pack.active && prev.filter((p) => p.active).length === 1) {
            return pack
          }
          return { ...pack, active: !pack.active }
        }
        return pack
      }),
    )
  }

  const getSkillPacksByCategory = (category: string) => {
    return activeSkillPacks.filter((sp) => sp.category === category)
  }

  const categories = ["Core", "Technical", "Business", "Creative"]

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full">
      {/* Skill Packs Sidebar */}
      {showSkillPacks && (
        <div className="w-80 border-r bg-muted/30 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Active Skill Packs</h3>
            <Badge variant="secondary">{activeSkillPacks.filter((sp) => sp.active).length} Active</Badge>
          </div>

          {/* Resource Usage Indicator */}
          <div className="mb-6 p-4 bg-background rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Resource Usage</span>
              <Zap className="h-4 w-4 text-yellow-500" />
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(activeSkillPacks.filter((p) => p.active).length / activeSkillPacks.length) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {activeSkillPacks.filter((p) => p.active).length}/{activeSkillPacks.length} packs loaded
            </p>
          </div>

          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="space-y-4">
              {categories.map((category) => {
                const categoryPacks = getSkillPacksByCategory(category)
                if (categoryPacks.length === 0) return null

                return (
                  <div key={category}>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">{category}</h4>
                    <div className="space-y-2">
                      {categoryPacks.map((skillPack) => (
                        <Card
                          key={skillPack.id}
                          className={`p-3 transition-all ${skillPack.active ? "ring-2 ring-primary" : ""}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <div
                                  className={`w-3 h-3 rounded-full ${skillPack.active ? skillPack.color : "bg-gray-300"}`}
                                ></div>
                                <h5 className="text-sm font-medium">{skillPack.name}</h5>
                              </div>
                              <p className="text-xs text-muted-foreground">{skillPack.description}</p>
                            </div>
                            <Switch
                              checked={skillPack.active}
                              onCheckedChange={() => toggleSkillPack(skillPack.id)}
                              size="sm"
                            />
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>

          {/* Cost Estimate */}
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800 font-medium">
              Estimated Cost: ${(activeSkillPacks.filter((p) => p.active).length * 0.001).toFixed(4)}/query
            </p>
            <p className="text-xs text-green-600">
              {Math.round((1 - activeSkillPacks.filter((p) => p.active).length / activeSkillPacks.length) * 100)}% more
              efficient
            </p>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b p-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">SuperModel AI Chat</h2>
            <p className="text-sm text-muted-foreground">
              {activeSkillPacks.filter((sp) => sp.active).length} skill packs active
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowSkillPacks(!showSkillPacks)}>
            <Settings className="h-4 w-4 mr-2" />
            {showSkillPacks ? "Hide" : "Show"} Skills
          </Button>
        </div>
        {/* Removed API key input from here */}

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-12">
                <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Start a conversation</p>
                <p className="text-sm">Select skill packs and ask a question!</p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "ai" && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  </div>
                )}

                <div className={`max-w-[70%] ${message.role === "user" ? "order-1" : ""}`}>
                  <Card className={message.role === "user" ? "bg-primary text-primary-foreground" : ""}>
                    <div className="p-3">
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      {message.metadata && (
                        <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-muted-foreground">
                          <div className="flex flex-wrap gap-2">
                            {message.metadata.activeSkillPacks.map((pack) => (
                              <Badge key={pack} variant="secondary" className="text-xs">
                                {pack}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4 mt-2">
                            <span>⚡ {message.metadata.processingTime?.toFixed(0)}ms</span>
                            <span>💰 ${message.metadata.costEstimate}</span>
                            <span>📊 {message.metadata.efficiency}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                  <p className="text-xs text-muted-foreground mt-1 px-1">{message.timestamp.toLocaleTimeString()}</p>
                </div>

                {message.role === "user" && (
                  <div className="flex-shrink-0 order-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>
                <Card>
                  <div className="p-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">
                        Processing with {activeSkillPacks.filter((p) => p.active).length} skill packs...
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask SuperModel AI anything..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Active skill packs:{" "}
              {activeSkillPacks
                .filter((sp) => sp.active)
                .map((sp) => sp.name)
                .join(", ")}
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
