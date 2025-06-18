import type { Metadata } from "next"
import SuperModelAIChat from "@/components/chat/supermodel-ai-chat"

export const metadata: Metadata = {
  title: "Advanced Chat - SuperModel AI",
  description: "Advanced chat interface with Grok AI integration and skill pack management",
}

export default function AdvancedChatPage() {
  return <SuperModelAIChat />
}
