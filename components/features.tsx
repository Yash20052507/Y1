import { Brain, Cpu, DollarSign, Gauge, Layers, Puzzle } from "lucide-react"

export default function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Key Features</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              SuperModel AI brings a revolutionary approach to artificial intelligence
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Modular Architecture</h3>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Load only the skill packs you need, reducing computational overhead and costs
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Puzzle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Extensible Skills</h3>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Create, share, and acquire specialized skill packs through our marketplace
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Self-Evolving</h3>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              AI continuously improves through usage patterns and feedback
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Gauge className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Enhanced Performance</h3>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Focused skill packs deliver more accurate and relevant responses
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Cost Effective</h3>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Pay only for the skills you use, optimizing your AI investment
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Cpu className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Efficient Computing</h3>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Reduced computational requirements through targeted knowledge activation
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
