import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InteractiveDemo from "@/components/demo/interactive-demo"
import PerformanceMetrics from "@/components/demo/performance-metrics"
import ROICalculator from "@/components/demo/roi-calculator"

export const metadata: Metadata = {
  title: "Interactive Demo - SuperModel AI",
  description: "Experience SuperModel AI's modular efficiency with our interactive demonstration",
}

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <Tabs defaultValue="interactive" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="interactive">Live Demo</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="calculator">ROI Calculator</TabsTrigger>
          </TabsList>

          <TabsContent value="interactive" className="mt-8">
            <InteractiveDemo />
          </TabsContent>

          <TabsContent value="metrics" className="mt-8">
            <PerformanceMetrics />
          </TabsContent>

          <TabsContent value="calculator" className="mt-8">
            <ROICalculator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
