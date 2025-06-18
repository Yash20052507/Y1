"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingDown, Clock, Target, Cpu } from "lucide-react"

const costComparisonData = [
  { name: "Traditional AI", cost: 0.02, savings: 0 },
  { name: "SuperModel AI", cost: 0.003, savings: 85 },
]

const performanceData = [
  { metric: "Response Time", traditional: 2500, supermodel: 450, unit: "ms" },
  { metric: "Memory Usage", traditional: 200, supermodel: 45, unit: "MB" },
  { metric: "Relevance Score", traditional: 75, supermodel: 92, unit: "%" },
  { metric: "Cost per Query", traditional: 0.02, supermodel: 0.003, unit: "$" },
]

const usageData = [
  { month: "Jan", traditional: 1200, supermodel: 180 },
  { month: "Feb", traditional: 1350, supermodel: 195 },
  { month: "Mar", traditional: 1100, supermodel: 165 },
  { month: "Apr", traditional: 1450, supermodel: 210 },
  { month: "May", traditional: 1600, supermodel: 240 },
  { month: "Jun", traditional: 1750, supermodel: 265 },
]

const skillPackUsage = [
  { name: "Web Development", value: 35, color: "#8884d8" },
  { name: "Data Analysis", value: 25, color: "#82ca9d" },
  { name: "Content Writing", value: 20, color: "#ffc658" },
  { name: "API Development", value: 15, color: "#ff7300" },
  { name: "UI/UX Design", value: 5, color: "#00ff00" },
]

export default function PerformanceMetrics() {
  const [selectedMetric, setSelectedMetric] = useState("cost")

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Performance Metrics & Analytics</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real-world performance comparisons showing SuperModel AI's efficiency advantages
        </p>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">85%</div>
            <p className="text-xs text-muted-foreground">vs traditional AI models</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">82%</div>
            <p className="text-xs text-muted-foreground">faster responses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Efficiency</CardTitle>
            <Cpu className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">77%</div>
            <p className="text-xs text-muted-foreground">less memory usage</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Relevance Score</CardTitle>
            <Target className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">92%</div>
            <p className="text-xs text-muted-foreground">average relevance</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="comparison">Performance Comparison</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          <TabsTrigger value="usage">Usage Trends</TabsTrigger>
          <TabsTrigger value="skillpacks">Skill Pack Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Comparison: Traditional AI vs SuperModel AI</CardTitle>
              <CardDescription>Side-by-side comparison of key performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {performanceData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.metric}</span>
                      <div className="flex gap-4 text-sm">
                        <span className="text-orange-500">
                          Traditional: {item.traditional}
                          {item.unit}
                        </span>
                        <span className="text-green-500">
                          SuperModel: {item.supermodel}
                          {item.unit}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <div className="text-xs text-orange-500">Traditional AI</div>
                        <Progress value={item.metric === "Relevance Score" ? item.traditional : 100} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-green-500">SuperModel AI</div>
                        <Progress
                          value={
                            item.metric === "Relevance Score"
                              ? item.supermodel
                              : (item.supermodel / item.traditional) * 100
                          }
                          className="h-2"
                        />
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground text-center">
                      {item.metric === "Relevance Score"
                        ? `${(((item.supermodel - item.traditional) / item.traditional) * 100).toFixed(1)}% improvement`
                        : `${(((item.traditional - item.supermodel) / item.traditional) * 100).toFixed(1)}% reduction`}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost per Query Comparison</CardTitle>
                <CardDescription>Average cost per AI query across different models</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={costComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, "Cost"]} />
                    <Bar dataKey="cost" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Cost Savings</CardTitle>
                <CardDescription>Projected savings for different usage volumes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <div className="font-medium">1,000 queries/month</div>
                      <div className="text-sm text-muted-foreground">Small business</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-500">$17 saved</div>
                      <div className="text-xs text-muted-foreground">85% reduction</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <div className="font-medium">10,000 queries/month</div>
                      <div className="text-sm text-muted-foreground">Growing company</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-500">$170 saved</div>
                      <div className="text-xs text-muted-foreground">85% reduction</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <div className="font-medium">100,000 queries/month</div>
                      <div className="text-sm text-muted-foreground">Enterprise</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-500">$1,700 saved</div>
                      <div className="text-xs text-muted-foreground">85% reduction</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Usage Trends</CardTitle>
              <CardDescription>Cost comparison over time (Traditional AI vs SuperModel AI)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Cost"]} />
                  <Line type="monotone" dataKey="traditional" stroke="#ff7300" strokeWidth={2} name="Traditional AI" />
                  <Line type="monotone" dataKey="supermodel" stroke="#82ca9d" strokeWidth={2} name="SuperModel AI" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skillpacks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Skill Pack Usage Distribution</CardTitle>
                <CardDescription>Most popular skill packs by usage volume</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={skillPackUsage}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {skillPackUsage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Pack Performance</CardTitle>
                <CardDescription>Efficiency metrics by skill pack category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillPackUsage.map((pack, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{pack.name}</span>
                      <Badge variant="secondary">{pack.value}% usage</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="font-medium">Avg Response</div>
                        <div className="text-green-500">{Math.floor(Math.random() * 200 + 300)}ms</div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="font-medium">Memory</div>
                        <div className="text-blue-500">{Math.floor(Math.random() * 30 + 20)}MB</div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="font-medium">Relevance</div>
                        <div className="text-purple-500">{Math.floor(Math.random() * 10 + 85)}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
