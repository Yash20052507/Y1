"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Calculator, DollarSign, TrendingDown, Download, Share, Building, Users, Zap } from "lucide-react"

interface ROICalculation {
  currentMonthlyCost: number
  projectedMonthlyCost: number
  monthlySavings: number
  annualSavings: number
  roi: number
  paybackPeriod: number
}

export default function ROICalculator() {
  const [monthlyQueries, setMonthlyQueries] = useState(10000)
  const [currentCostPerQuery, setCurrentCostPerQuery] = useState(0.02)
  const [teamSize, setTeamSize] = useState(5)
  const [useCase, setUseCase] = useState("general")
  const [calculation, setCalculation] = useState<ROICalculation | null>(null)

  const useCaseMultipliers = {
    general: { efficiency: 0.85, cost: 0.003 },
    development: { efficiency: 0.9, cost: 0.0025 },
    content: { efficiency: 0.88, cost: 0.002 },
    analysis: { efficiency: 0.92, cost: 0.0035 },
    design: { efficiency: 0.87, cost: 0.0022 },
  }

  useEffect(() => {
    calculateROI()
  }, [monthlyQueries, currentCostPerQuery, teamSize, useCase])

  const calculateROI = () => {
    const multiplier = useCaseMultipliers[useCase as keyof typeof useCaseMultipliers]
    const currentMonthlyCost = monthlyQueries * currentCostPerQuery
    const projectedCostPerQuery = multiplier.cost
    const projectedMonthlyCost = monthlyQueries * projectedCostPerQuery
    const monthlySavings = currentMonthlyCost - projectedMonthlyCost
    const annualSavings = monthlySavings * 12

    // Assume implementation cost of $5000 + $100 per team member
    const implementationCost = 5000 + teamSize * 100
    const roi = ((annualSavings - implementationCost) / implementationCost) * 100
    const paybackPeriod = implementationCost / monthlySavings

    setCalculation({
      currentMonthlyCost,
      projectedMonthlyCost,
      monthlySavings,
      annualSavings,
      roi,
      paybackPeriod,
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const generateReport = () => {
    if (!calculation) return

    const report = `
SuperModel AI ROI Analysis Report
================================

Input Parameters:
- Monthly AI Queries: ${monthlyQueries.toLocaleString()}
- Current Cost per Query: $${currentCostPerQuery}
- Team Size: ${teamSize} members
- Primary Use Case: ${useCase}

Financial Analysis:
- Current Monthly Cost: ${formatCurrency(calculation.currentMonthlyCost)}
- Projected Monthly Cost: ${formatCurrency(calculation.projectedMonthlyCost)}
- Monthly Savings: ${formatCurrency(calculation.monthlySavings)}
- Annual Savings: ${formatCurrency(calculation.annualSavings)}
- ROI: ${calculation.roi.toFixed(1)}%
- Payback Period: ${calculation.paybackPeriod.toFixed(1)} months

Generated on: ${new Date().toLocaleDateString()}
    `.trim()

    const blob = new Blob([report], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "supermodel-ai-roi-analysis.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Calculator className="h-8 w-8" />
          ROI Calculator
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Calculate your potential savings and return on investment with SuperModel AI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Parameters */}
        <Card>
          <CardHeader>
            <CardTitle>Your Current Setup</CardTitle>
            <CardDescription>Tell us about your current AI usage and costs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="queries">Monthly AI Queries</Label>
              <div className="space-y-2">
                <Slider
                  value={[monthlyQueries]}
                  onValueChange={(value) => setMonthlyQueries(value[0])}
                  max={100000}
                  min={1000}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1K</span>
                  <span className="font-medium">{monthlyQueries.toLocaleString()}</span>
                  <span>100K</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cost">Current Cost per Query</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="cost"
                  type="number"
                  step="0.001"
                  value={currentCostPerQuery}
                  onChange={(e) => setCurrentCostPerQuery(Number.parseFloat(e.target.value) || 0)}
                  className="pl-10"
                  placeholder="0.020"
                />
              </div>
              <p className="text-xs text-muted-foreground">Typical range: $0.015 - $0.030 per query</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="team">Team Size</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="team"
                  type="number"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number.parseInt(e.target.value) || 1)}
                  className="pl-10"
                  min="1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="usecase">Primary Use Case</Label>
              <Select value={useCase} onValueChange={setUseCase}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your primary use case" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Purpose AI</SelectItem>
                  <SelectItem value="development">Software Development</SelectItem>
                  <SelectItem value="content">Content Creation</SelectItem>
                  <SelectItem value="analysis">Data Analysis</SelectItem>
                  <SelectItem value="design">UI/UX Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Your ROI Analysis</CardTitle>
            <CardDescription>Projected savings and return on investment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {calculation && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-sm text-red-600 font-medium">Current Monthly Cost</div>
                    <div className="text-2xl font-bold text-red-700">
                      {formatCurrency(calculation.currentMonthlyCost)}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-sm text-green-600 font-medium">With SuperModel AI</div>
                    <div className="text-2xl font-bold text-green-700">
                      {formatCurrency(calculation.projectedMonthlyCost)}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Monthly Savings</span>
                    <span className="text-lg font-bold text-green-600">
                      {formatCurrency(calculation.monthlySavings)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Annual Savings</span>
                    <span className="text-lg font-bold text-green-600">
                      {formatCurrency(calculation.annualSavings)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">ROI (First Year)</span>
                    <span className="text-lg font-bold text-blue-600">{calculation.roi.toFixed(1)}%</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Payback Period</span>
                    <span className="text-lg font-bold text-purple-600">
                      {calculation.paybackPeriod.toFixed(1)} months
                    </span>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <TrendingDown className="h-4 w-4" />
                    <span>
                      {(
                        ((calculation.currentMonthlyCost - calculation.projectedMonthlyCost) /
                          calculation.currentMonthlyCost) *
                        100
                      ).toFixed(1)}
                      % cost reduction
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={generateReport} variant="outline" size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share className="h-4 w-4 mr-2" />
                      Share Results
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Benefits Beyond Cost Savings</CardTitle>
          <CardDescription>SuperModel AI provides value beyond just cost reduction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold">Faster Response Times</h3>
              <p className="text-sm text-muted-foreground">
                82% faster responses improve team productivity and user experience
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Building className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold">Better Accuracy</h3>
              <p className="text-sm text-muted-foreground">
                Specialized skill packs deliver 92% relevance vs 75% for general AI
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold">Team Efficiency</h3>
              <p className="text-sm text-muted-foreground">Reduced context switching and more focused AI assistance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
