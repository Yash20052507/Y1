import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge variant="secondary" className="mb-4">
              🚀 Now with Interactive Demo
            </Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              SuperModel AI 🚀
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              A modular, self-evolving AI that dynamically loads skill-specific data packs to deliver efficient,
              focused, and cost-effective outputs.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mt-4">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>85% Cost Reduction</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>82% Faster Responses</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>92% Relevance Score</span>
              </div>
            </div>
          </div>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/demo">Try Interactive Demo</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
