import { NextResponse } from "next/server"

// Skill Pack Configurations (copied from previous chat-interface.tsx for consistency)
const SKILL_PACKS = {
  "general-knowledge": {
    systemPrompt: `You are a general knowledge assistant. Provide accurate, well-researched information on various topics. Keep responses informative but concise.`,
    context: `You have access to general knowledge across multiple domains including history, science, geography, and current events.`,
  },
  programming: {
    systemPrompt: `You are a programming expert specializing in web development, software engineering, and coding best practices. Provide practical, working code solutions.`,
    context: `You specialize in JavaScript, Python, React, Node.js, databases, APIs, and modern development frameworks. Focus on clean, efficient code.`,
  },
  business: {
    systemPrompt: `You are a business strategy consultant. Provide actionable business advice, market analysis, and strategic recommendations.`,
    context: `You specialize in business strategy, market analysis, startup advice, financial planning, and growth strategies.`,
  },
  "web-development": {
    systemPrompt: `You are a full-stack web developer expert. Focus on modern web technologies, responsive design, and scalable architecture.`,
    context: `You specialize in React, Next.js, Node.js, HTML5, CSS3, JavaScript ES6+, REST APIs, and modern web development practices.`,
  },
  "data-analysis": {
    systemPrompt: `You are a data analyst expert. Provide insights on data interpretation, statistical analysis, and visualization recommendations.`,
    context: `You specialize in Python (Pandas, NumPy), SQL, data visualization, and statistical analysis.`,
  },
  "content-writing": {
    systemPrompt: `You are a content writing specialist. Create engaging, SEO-optimized content tailored to specific audiences and purposes.`,
    context: `You specialize in copywriting, technical writing, SEO optimization, content strategy, and audience engagement.`,
  },
}

// Function to build context from active skill packs
function buildContextFromSkillPacks(activeSkillPackIds: string[]) {
  // Ensure activeSkillPackIds is an array before proceeding
  const safeActiveSkillPackIds = Array.isArray(activeSkillPackIds) ? activeSkillPackIds : []

  if (safeActiveSkillPackIds.length === 0) {
    return SKILL_PACKS["general-knowledge"]
  }

  const activePacks = safeActiveSkillPackIds
    .map((packId) => SKILL_PACKS[packId as keyof typeof SKILL_PACKS])
    .filter(Boolean) // Filter out any undefined packs if an invalid ID is passed

  const combinedSystemPrompt = activePacks.map((pack) => pack.systemPrompt).join("\n\n")
  const combinedContext = activePacks.map((pack) => pack.context).join("\n\n")
  const activePacksInfo = `Currently using ${safeActiveSkillPackIds.length} skill pack(s): ${safeActiveSkillPackIds.join(", ")}`

  return {
    systemPrompt: combinedSystemPrompt,
    context: combinedContext,
    activePacksInfo: activePacksInfo,
  }
}

// Main API route handler
export async function POST(request: Request) {
  try {
    const { message, activeSkillPackIds, messageHistory } = await request.json()

    // Ensure API key is set on the server
    const grokApiKey = process.env.XAI_API_KEY
    if (!grokApiKey) {
      console.error("XAI_API_KEY is not set in environment variables.")
      return NextResponse.json(
        { error: "Server API key not configured. Please set XAI_API_KEY in your Vercel environment variables." },
        { status: 500 },
      )
    }

    // Ensure activeSkillPackIds is an array before passing to buildContextFromSkillPacks
    const safeActiveSkillPackIds = Array.isArray(activeSkillPackIds) ? activeSkillPackIds : []
    const skillPackContext = buildContextFromSkillPacks(safeActiveSkillPackIds)

    // Ensure messageHistory is an array before mapping
    const safeMessageHistory = Array.isArray(messageHistory) ? messageHistory : []

    const messagesForGrok = [
      {
        role: "system",
        content: `${skillPackContext.systemPrompt}\n\nContext: ${skillPackContext.context}\n\n${skillPackContext.activePacksInfo}`,
      },
      ...safeMessageHistory.map((msg: any) => ({
        role: msg.role === "ai" ? "assistant" : msg.role, // Map 'ai' role to 'assistant' for Grok API
        content: msg.content,
      })),
      { role: "user", content: message },
    ]

    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${grokApiKey}`,
      },
      body: JSON.stringify({
        model: "grok-2-1212",
        messages: messagesForGrok,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Grok API Error Response:", errorData)

      let errorMessage = "An unknown error occurred with the Grok API."
      if (response.status === 403) {
        errorMessage =
          "Authentication failed. Please ensure your XAI_API_KEY is correct and has access to the specified model."
      } else if (response.status === 404) {
        errorMessage = `The model 'grok-2-1212' was not found or your account does not have access to it. ${errorData.error || ""}`
      } else if (response.status === 429) {
        errorMessage = "Rate limit exceeded. Please try again after some time."
      } else if (errorData.error?.message) {
        errorMessage = errorData.error.message
      }

      return NextResponse.json({ error: errorMessage }, { status: response.status })
    }

    const data = await response.json()
    const aiResponseContent = data.choices[0]?.message?.content || "No response generated from AI."

    // Simulate metadata for the frontend
    const simulatedMetadata = {
      activeSkillPacks: safeActiveSkillPackIds,
      processingTime: Math.random() * 1000 + 300, // Simulated processing time
      tokensUsed: Math.random() * 800 + 200, // Simulated token usage
      costEstimate: (safeActiveSkillPackIds.length * 0.001).toFixed(4),
      efficiency: `${Math.round((1 - safeActiveSkillPackIds.length / 6) * 100)}% more efficient than general AI`,
    }

    return NextResponse.json({ message: aiResponseContent, metadata: simulatedMetadata })
  } catch (error) {
    console.error("Backend API Error (Caught in try-catch block):", error)
    // Catch any unexpected errors during JSON parsing or other operations
    return NextResponse.json({ error: "Internal server error. Please check server logs for details." }, { status: 500 })
  }
}
