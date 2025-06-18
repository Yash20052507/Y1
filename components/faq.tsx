import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Answers to common questions about SuperModel AI
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl py-12">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is a skill pack?</AccordionTrigger>
              <AccordionContent>
                A skill pack is a specialized knowledge module that contains domain-specific information and
                capabilities. When activated, it provides the AI with the necessary context and tools to handle tasks in
                that domain efficiently. Think of it as loading only the parts of a brain needed for a specific task.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I create my own skill pack?</AccordionTrigger>
              <AccordionContent>
                Pro and Enterprise users can create custom skill packs through our intuitive interface. Simply provide
                the domain knowledge in text form, and our system will process it, generate embeddings, and create a
                skill pack that can be activated during chat sessions. You can also choose to publish your skill pack to
                the marketplace.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How does SuperModel AI differ from other AI platforms?</AccordionTrigger>
              <AccordionContent>
                Unlike traditional AI systems that load their entire knowledge base for every query, SuperModel AI
                dynamically activates only the relevant skill packs needed for a specific task. This approach reduces
                computational overhead, improves response accuracy, and lowers costs. It also allows for a more
                extensible system where new capabilities can be added as separate modules.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I use SuperModel AI with my existing tools?</AccordionTrigger>
              <AccordionContent>
                Yes! SuperModel AI provides API access for Pro and Enterprise users, allowing you to integrate our AI
                capabilities into your existing workflows and applications. We provide comprehensive documentation and
                support to help you with the integration process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>How secure is my data with SuperModel AI?</AccordionTrigger>
              <AccordionContent>
                We take data security very seriously. All data is encrypted in transit and at rest. Enterprise users
                benefit from additional security features like private skill packs, dedicated instances, and custom data
                retention policies. We comply with industry standards for data protection and privacy.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
