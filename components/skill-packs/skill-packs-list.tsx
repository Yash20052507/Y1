"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Eye, Download, Upload } from "lucide-react"

type SkillPack = {
  id: string
  name: string
  description: string
  category: string
  status: "active" | "draft" | "published"
  downloads: number
  rating: number
  createdAt: string
  size: string
}

export default function SkillPacksList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Mock data - in a real app, this would come from an API
  const [skillPacks] = useState<SkillPack[]>([
    {
      id: "1",
      name: "JavaScript Mastery",
      description: "Comprehensive JavaScript knowledge including ES6+, frameworks, and best practices",
      category: "Programming",
      status: "published",
      downloads: 1250,
      rating: 4.8,
      createdAt: "2023-05-15",
      size: "2.3 MB",
    },
    {
      id: "2",
      name: "Digital Marketing Strategies",
      description: "Modern digital marketing techniques, SEO, social media, and analytics",
      category: "Marketing",
      status: "active",
      downloads: 890,
      rating: 4.6,
      createdAt: "2023-05-10",
      size: "1.8 MB",
    },
    {
      id: "3",
      name: "Financial Analysis Pro",
      description: "Advanced financial modeling, valuation techniques, and market analysis",
      category: "Finance",
      status: "draft",
      downloads: 0,
      rating: 0,
      createdAt: "2023-06-01",
      size: "3.1 MB",
    },
    {
      id: "4",
      name: "Creative Writing Assistant",
      description: "Storytelling techniques, character development, and narrative structures",
      category: "Creative",
      status: "published",
      downloads: 567,
      rating: 4.9,
      createdAt: "2023-04-20",
      size: "1.5 MB",
    },
  ])

  const filteredSkillPacks = skillPacks.filter(
    (pack) =>
      pack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pack.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pack.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "active":
        return "bg-blue-100 text-blue-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleCreateSkillPack = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle skill pack creation
    setIsCreateDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Skill Packs</h1>
          <p className="text-muted-foreground">Create and manage your custom AI skill packs</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Skill Pack
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Skill Pack</DialogTitle>
              <DialogDescription>
                Create a custom skill pack with specialized knowledge for SuperModel AI
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateSkillPack} className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter skill pack name" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="programming">Programming</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this skill pack covers"
                    className="min-h-[100px]"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="content">Knowledge Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Paste your knowledge content here (documents, articles, data, etc.)"
                    className="min-h-[200px]"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Skill Pack</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search skill packs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All ({skillPacks.length})</TabsTrigger>
          <TabsTrigger value="published">
            Published ({skillPacks.filter((p) => p.status === "published").length})
          </TabsTrigger>
          <TabsTrigger value="active">Active ({skillPacks.filter((p) => p.status === "active").length})</TabsTrigger>
          <TabsTrigger value="draft">Drafts ({skillPacks.filter((p) => p.status === "draft").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSkillPacks.map((pack) => (
              <Card key={pack.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{pack.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{pack.category}</Badge>
                        <Badge className={getStatusColor(pack.status)}>{pack.status}</Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">{pack.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Size: {pack.size}</span>
                      <span>Created: {new Date(pack.createdAt).toLocaleDateString()}</span>
                    </div>

                    {pack.status === "published" && (
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Downloads: {pack.downloads}</span>
                        <span>Rating: {pack.rating}/5.0</span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="published" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSkillPacks
              .filter((p) => p.status === "published")
              .map((pack) => (
                <Card key={pack.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{pack.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{pack.category}</Badge>
                          <Badge className={getStatusColor(pack.status)}>{pack.status}</Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="line-clamp-2">{pack.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Downloads: {pack.downloads}</span>
                        <span>Rating: {pack.rating}/5.0</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSkillPacks
              .filter((p) => p.status === "active")
              .map((pack) => (
                <Card key={pack.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{pack.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{pack.category}</Badge>
                          <Badge className={getStatusColor(pack.status)}>{pack.status}</Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="line-clamp-2">{pack.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Size: {pack.size}</span>
                        <span>Created: {new Date(pack.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSkillPacks
              .filter((p) => p.status === "draft")
              .map((pack) => (
                <Card key={pack.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{pack.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{pack.category}</Badge>
                          <Badge className={getStatusColor(pack.status)}>{pack.status}</Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="line-clamp-2">{pack.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Size: {pack.size}</span>
                        <span>Created: {new Date(pack.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Continue Editing
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
