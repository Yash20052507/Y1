import type { Metadata } from "next"
import ChatInterface from "@/components/chat/chat-interface"

export const metadata: Metadata = {
  title: "Chat - SuperModel AI",
  description: "Chat with SuperModel AI using modular skill packs",
}

export default function ChatPage() {
  return (
    <div className="min-h-screen">
      <ChatInterface />
    </div>
  )
}
