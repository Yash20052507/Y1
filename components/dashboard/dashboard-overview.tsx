"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Package, ShoppingBag, Zap } from "lucide-react"
import Link from "next/link"

export default function DashboardOverview() {
  // Mock data - in a real app, this would come from an API
  const stats = {
    activeSkillPacks: 5,
    totalChatSessions: 12,
    messagesThisMonth: 243,
    availableCredits: 500,
  }

  // Mock recent sessions - in a real app, this would come from an API
  const recentSessions = [
    { id: 1, title: "Marketing Strategy", date: "2023-06-04T10:30:00", skillPacks: ["Marketing", "Business Analysis"] },
    { id: 2, title: "Code Review", date: "2023-06-03T15:45:00", skillPacks: ["JavaScript", "React", "Code Quality"] },
    { id: 3, title: "Product Research", date: "2023-06-02T09:15:00", skillPacks: ["Market Research", "Data Analysis"] },
  ]

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your SuperModel AI dashboard.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Skill Packs</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeSkillPacks}</div>
            <p className="text-xs text-muted-foreground">From your total collection</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chat Sessions</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalChatSessions}</div>
            <p className="text-xs text-muted-foreground">Total conversations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages This Month</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.messagesThisMonth}</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Credits</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.availableCredits}</div>
            <p className="text-xs text-muted-foreground">For marketplace purchases</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Chat Sessions</CardTitle>
            <CardDescription>Your latest conversations with SuperModel AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{session.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(session.date).toLocaleDateString()} • {session.skillPacks.join(", ")}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/chat?session=${session.id}`}>Continue</Link>
                  </Button>
                </div>
              ))}
              {recentSessions.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No recent sessions</p>
              )}
            </div>
            <div className="mt-4 flex justify-center">
              <Button asChild>
                <Link href="/dashboard/chat">New Chat Session</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recommended Skill Packs</CardTitle>
            <CardDescription>Based on your usage patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Advanced Data Analysis</p>
                  <p className="text-sm text-muted-foreground">Statistical methods, visualization techniques</p>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Technical Writing</p>
                  <p className="text-sm text-muted-foreground">Documentation, reports, specifications</p>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Project Management</p>
                  <p className="text-sm text-muted-foreground">Planning, tracking, resource allocation</p>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" asChild>
                <Link href="/dashboard/marketplace">Browse Marketplace</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
