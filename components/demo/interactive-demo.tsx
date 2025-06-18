"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Cpu, DollarSign, Zap, Clock, Target, Send, Bot, User, TrendingDown, Activity, Loader2 } from "lucide-react"

interface SkillPack {
  id: string
  name: string
  description: string
  memoryUsage: number
  costPerQuery: number
  isActive: boolean
  category: string
  expertise: string[]
}

interface ChatMessage {
  id: string
  role: "user" | "traditional" | "supermodel"
  content: string
  timestamp: Date
  metrics?: {
    responseTime: number
    resourceUsage: number
    relevanceScore: number
    cost: number
  }
}

const SKILL_PACKS: SkillPack[] = [
  {
    id: "general-knowledge",
    name: "General Knowledge",
    description: "Basic information across multiple domains",
    memoryUsage: 30,
    costPerQuery: 0.002,
    isActive: true,
    category: "Core",
    expertise: ["General Information", "Common Knowledge", "Basic Facts"],
  },
  {
    id: "web-development",
    name: "Web Development",
    description: "HTML, CSS, React, Node.js, and modern web frameworks",
    memoryUsage: 45,
    costPerQuery: 0.003,
    isActive: false,
    category: "Technical",
    expertise: ["React", "Node.js", "TypeScript", "Next.js", "CSS"],
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    description: "Python, Pandas, NumPy, data visualization, and statistics",
    memoryUsage: 38,
    costPerQuery: 0.0025,
    isActive: false,
    category: "Technical",
    expertise: ["Python", "Pandas", "Matplotlib", "Statistics", "SQL"],
  },
  {
    id: "content-writing",
    name: "Content Writing",
    description: "SEO, copywriting, technical documentation, and content strategy",
    memoryUsage: 25,
    costPerQuery: 0.002,
    isActive: false,
    category: "Creative",
    expertise: ["SEO", "Copywriting", "Technical Writing", "Content Strategy"],
  },
  {
    id: "programming",
    name: "Programming",
    description: "Software development, coding, and best practices",
    memoryUsage: 42,
    costPerQuery: 0.0035,
    isActive: false,
    category: "Technical",
    expertise: ["JavaScript", "Python", "Algorithms", "Data Structures"],
  },
  {
    id: "business",
    name: "Business",
    description: "Business strategy, market analysis, and planning",
    memoryUsage: 30,
    costPerQuery: 0.0022,
    isActive: false,
    category: "Business",
    expertise: ["Strategy", "Market Analysis", "Business Planning", "Growth"],
  },
]

export default function InteractiveDemo() {
  const [skillPacks, setSkillPacks] = useState<SkillPack[]>(SKILL_PACKS)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [totalMemoryUsage, setTotalMemoryUsage] = useState(0)
  const [totalCostPerQuery, setTotalCostPerQuery] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const activeSkillPacks = skillPacks.filter((pack) => pack.isActive)
    const memory = activeSkillPacks.reduce((sum, pack) => sum + pack.memoryUsage, 0)
    const cost = activeSkillPacks.reduce((sum, pack) => sum + pack.costPerQuery, 0)

    setTotalMemoryUsage(memory)
    setTotalCostPerQuery(cost)
  }, [skillPacks])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const toggleSkillPack = (id: string) => {
    setSkillPacks((prev) => prev.map((pack) => (pack.id === id ? { ...pack, isActive: !pack.isActive } : pack)))
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = {
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
      // Get active skill pack IDs
      const activeSkillPackIds = skillPacks.filter((pack) => pack.isActive).map((pack) => pack.id)

      // Prepare message history for the backend
      // Map frontend roles ("traditional", "supermodel") to "assistant" for the backend
      const messageHistoryForBackend = messages.slice(-10).map((msg) => ({
        // Send last 10 messages for context
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content,
      }))

      console.log("Sending request with skill packs:", activeSkillPackIds)

      // Call the real API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
          activeSkillPackIds: activeSkillPackIds,
          messageHistory: messageHistoryForBackend, // Pass message history
        }),
      })

      console.log("API Response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("API Error:", errorText)
        throw new Error(`API request failed: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      console.log("API Response data:", data)

      // Generate traditional AI response (simulated)
      const traditionalResponse = {
        content: `I can help you with that. Here's a general approach to your question about "${currentInput}". This response draws from my broad knowledge base covering multiple domains, which may include some irrelevant information but ensures comprehensive coverage.`,
        metrics: {
          responseTime: Math.random() * 2000 + 1500, // 1.5-3.5s
          resourceUsage: 180 + Math.random() * 50, // 180-230MB
          relevanceScore: 65 + Math.random() * 20, // 65-85%
          cost: 0.015 + Math.random() * 0.01, // $0.015-0.025
        },
      }

      const traditionalMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "traditional",
        content: traditionalResponse.content,
        timestamp: new Date(),
        metrics: traditionalResponse.metrics,
      }

      // Create SuperModel AI response from API data
      const supermodelMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        role: "supermodel",
        content: data.message || "I received your message and processed it with the selected skill packs.",
        timestamp: new Date(),
        metrics: {
          responseTime: data.metadata?.processingTime || 500,
          resourceUsage: totalMemoryUsage + Math.random() * 20,
          relevanceScore: 85 + Math.random() * 10,
          cost: totalCostPerQuery,
        },
      }

      setMessages((prev) => [...prev, traditionalMessage, supermodelMessage])
    } catch (error) {
      console.error("Error sending message:", error)

      // Add error message with helpful information
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "supermodel",
        content: `**Connection Error**

I encountered an issue processing your request: **${(error as Error).message}**

This might be due to:

- Backend API configuration issues (e.g., XAI_API_KEY not set on Vercel)
- Network connectivity problems  
- Grok service temporarily unavailable

**What you can try:**
1. Check your internet connection.
2. Ensure your \`XAI_API_KEY\` is correctly set in your Vercel project's environment variables.
3. Try again in a few moments.
4. Contact support if the issue persists.

**Demo Mode:** The interface is working correctly - this demonstrates how SuperModel AI would handle errors gracefully while maintaining the user experience.`,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const activeSkillPacks = skillPacks.filter((pack) => pack.isActive)
  const traditionalCost = 0.02 // Fixed traditional AI cost
  const costSavings = ((traditionalCost - totalCostPerQuery) / traditionalCost) * 100

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Interactive SuperModel AI Demo</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Experience the power of modular AI. Select skill packs, ask questions, and see real-time comparisons between
          traditional AI and SuperModel AI responses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Skill Pack Selector */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Skill Packs
              </CardTitle>
              <CardDescription>Activate skill packs to customize AI capabilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {skillPacks.map((pack) => (
                <div key={pack.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch checked={pack.isActive} onCheckedChange={() => toggleSkillPack(pack.id)} />
                      <span className="text-sm font-medium">{pack.name}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{pack.description}</p>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{pack.memoryUsage}MB</span>
                    <span>${pack.costPerQuery.toFixed(4)}/query</span>
                  </div>
                  {pack.isActive && (
                    <div className="flex flex-wrap gap-1">
                      {pack.expertise.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Resource Monitor */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Resource Monitor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Memory Usage</span>
                  <span>{totalMemoryUsage}MB / 250MB</span>
                </div>
                <Progress value={(totalMemoryUsage / 250) * 100} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Cost per Query</span>
                  <span>${totalCostPerQuery.toFixed(4)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingDown className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">{costSavings.toFixed(1)}% savings vs traditional AI</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Active Packs:</span>
                    <span>{activeSkillPacks.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Traditional AI Cost:</span>
                    <span>${traditionalCost.toFixed(4)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle>AI Comparison Chat</CardTitle>
              <CardDescription>
                Ask questions and see responses from both traditional AI and SuperModel AI
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center text-muted-foreground py-12">
                      <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">Start a conversation</p>
                      <p className="text-sm">Select skill packs and ask a question to see the difference!</p>
                    </div>
                  )}

                  {messages.map((message) => (
                    <div key={message.id} className="space-y-2">
                      {message.role === "user" && (
                        <div className="flex justify-end">
                          <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2 max-w-[80%]">
                            <div className="flex items-center gap-2 mb-1">
                              <User className="h-4 w-4" />
                              <span className="text-sm font-medium">You</span>
                            </div>
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>
                      )}

                      {message.role === "traditional" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card className="border-orange-200">
                            <CardHeader className="pb-2">
                              <div className="flex items-center gap-2">
                                <Bot className="h-4 w-4 text-orange-500" />
                                <span className="text-sm font-medium">Traditional AI</span>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <p className="text-sm">{message.content}</p>
                              {message.metrics && (
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{message.metrics.responseTime.toFixed(0)}ms</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Cpu className="h-3 w-3" />
                                    <span>{message.metrics.resourceUsage.toFixed(0)}MB</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Target className="h-3 w-3" />
                                    <span>{message.metrics.relevanceScore.toFixed(0)}%</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <DollarSign className="h-3 w-3" />
                                    <span>${message.metrics.cost.toFixed(4)}</span>
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      )}

                      {message.role === "supermodel" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div></div> {/* Empty space for alignment */}
                          <Card className="border-green-200">
                            <CardHeader className="pb-2">
                              <div className="flex items-center gap-2">
                                <Bot className="h-4 w-4 text-green-500" />
                                <span className="text-sm font-medium">SuperModel AI</span>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                              {message.metrics && (
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{message.metrics.responseTime.toFixed(0)}ms</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Cpu className="h-3 w-3" />
                                    <span>{message.metrics.resourceUsage.toFixed(0)}MB</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Target className="h-3 w-3" />
                                    <span>{message.metrics.relevanceScore.toFixed(0)}%</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <DollarSign className="h-3 w-3" />
                                    <span>${message.metrics.cost.toFixed(4)}</span>
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="border-orange-200">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
                            <span className="text-sm">Traditional AI thinking...</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-green-200">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-green-500" />
                            <span className="text-sm">
                              SuperModel AI processing with {activeSkillPacks.length} skill packs...
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <div className="pt-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about web development, data analysis, or any topic..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    disabled={isLoading}
                  />
                  <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Try: "How do I build a React component?", "Analyze this dataset", or "Write SEO content"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
