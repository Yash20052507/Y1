import Image from "next/image"

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              SuperModel AI uses a revolutionary approach to AI processing
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Step 1</div>
              <h3 className="text-2xl font-bold">Select Your Skill Packs</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Browse our marketplace and choose skill packs that match your needs. Each pack contains specialized
                knowledge and capabilities.
              </p>
            </div>
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Step 2</div>
              <h3 className="text-2xl font-bold">Create a Chat Session</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Start a new conversation and select which skill packs to activate for this session. Only the selected
                packs will be loaded.
              </p>
            </div>
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Step 3</div>
              <h3 className="text-2xl font-bold">Interact with SuperModel AI</h3>
              <p className="text-gray-500 dark:text-gray-400">
                The AI dynamically accesses only the relevant knowledge from activated skill packs, providing efficient
                and focused responses.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg border">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="SuperModel AI workflow diagram"
                width={600}
                height={400}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
