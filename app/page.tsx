import { Suspense } from "react"
import type { Metadata } from "next"
import Hero from "@/components/hero"
import Features from "@/components/features"
import HowItWorks from "@/components/how-it-works"
import Pricing from "@/components/pricing"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"
import LoadingSpinner from "@/components/ui/loading-spinner"

export const metadata: Metadata = {
  title: "SuperModel AI - Modular, Self-Evolving AI Platform",
  description:
    "A modular, self-evolving AI that dynamically loads skill-specific data packs to deliver efficient, focused, and cost-effective outputs.",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Suspense fallback={<LoadingSpinner />}>
        <HowItWorks />
      </Suspense>
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  )
}
