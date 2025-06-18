"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Zap, Brain, Settings } from "lucide-react"

const SuperModelAIChat = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm SuperModel AI 🚀. I can help you with various tasks using specialized skill packs. What would you like to work on today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSkillPacks, setSelectedSkillPacks] = useState(["general", "coding"])
  const [apiKey, setApiKey] = useState("")
  const [showSettings, setShowSettings] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const skillPacks = [
    { id: "general", name: "General Knowledge", icon: "🧠" },
    { id: "coding", name: "Programming", icon: "💻" },
    { id: "creative", name: "Creative Writing", icon: "✍️" },
    { id: "analysis", name: "Data Analysis", icon: "📊" },
    { id: "research", name: "Research", icon: "🔍" },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const callGroqAPI = async (userMessage: string) => {
    if (!apiKey) {
      throw new Error("Please set your Grok API key in settings")
    }

    const skillPackContext = selectedSkillPacks.map((pack) => skillPacks.find((sp) => sp.id === pack)?.name).join(", ")

    const systemPrompt = `You are SuperModel AI, an advanced AI assistant with modular skill packs. 
    Currently activated skill packs: ${skillPackContext}.
    Focus your responses based on these active skill packs. Be helpful, accurate, and engaging.`

    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-2-1212", // Updated to latest model
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.slice(-5), // Include last 5 messages for context
          { role: "user", content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || `API Error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || "No response generated"
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput("")

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const response = await callGroqAPI(userMessage)
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `❌ Error: ${(error as Error).message}. Please check your API key and try again.`,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const toggleSkillPack = (packId: string) => {
    setSelectedSkillPacks((prev) => (prev.includes(packId) ? prev.filter((id) => id !== packId) : [...prev, packId]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">SuperModel AI</h1>
              <p className="text-sm text-slate-400">Modular AI Assistant</p>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-slate-800 border-b border-slate-700 p-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-white font-semibold mb-3">Settings</h3>
            <div className="mb-4">
              <label className="block text-sm text-slate-300 mb-2">Grok API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Grok API key"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-xs text-slate-400 mt-1">
                Get your API key from{" "}
                <a
                  href="https://x.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:underline"
                >
                  x.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto flex h-[calc(100vh-80px)]">
        {/* Skill Packs Sidebar */}
        <div className="w-64 bg-slate-800/50 backdrop-blur-sm border-r border-slate-700 p-4">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            Active Skill Packs
          </h3>
          <div className="space-y-2">
            {skillPacks.map((pack) => (
              <button
                key={pack.id}
                onClick={() => toggleSkillPack(pack.id)}
                className={`w-full p-3 rounded-lg text-left flex items-center space-x-3 transition-all ${
                  selectedSkillPacks.includes(pack.id)
                    ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                    : "bg-slate-700/50 hover:bg-slate-700"
                }`}
              >
                <span className="text-lg">{pack.icon}</span>
                <div>
                  <div className="text-white text-sm font-medium">{pack.name}</div>
                  {selectedSkillPacks.includes(pack.id) && <div className="text-xs text-purple-300">Active</div>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-3xl p-4 rounded-lg ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : "bg-slate-800 text-slate-100 border border-slate-700"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
                {message.role === "user" && (
                  <div className="p-2 bg-blue-500 rounded-full">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-slate-400 text-sm">SuperModel AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-700 p-4 bg-slate-800/50 backdrop-blur-sm">
            <div className="flex items-end space-x-3">
              <div className="flex-1">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask SuperModel AI anything..."
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows={1}
                  style={{ minHeight: "44px", maxHeight: "120px" }}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>

            {!apiKey && (
              <div className="mt-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-yellow-400 text-sm">
                <Zap className="w-4 h-4 inline mr-1" />
                Please set your Grok API key in settings to start chatting
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperModelAIChat
