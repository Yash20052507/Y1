"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Star, Download, Eye, ShoppingCart } from "lucide-react"

type MarketplaceSkillPack = {
  id: string
  name: string
  description: string
  category: string
  author: string
  price: number
  rating: number
  reviews: number
  downloads: number
  tags: string[]
  featured: boolean
  createdAt: string
  updatedAt: string
}

export default function MarketplaceList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [selectedSkillPack, setSelectedSkillPack] = useState<MarketplaceSkillPack | null>(null)

  // Mock data - in a real app, this would come from an API
  const [skillPacks] = useState<MarketplaceSkillPack[]>([
    {
      id: "1",
      name: "Advanced Python Development",
      description:
        "Comprehensive Python knowledge including advanced concepts, frameworks like Django and Flask, data science libraries, and best practices for production code.",
      category: "Programming",
      author: "TechExpert",
      price: 29.99,
      rating: 4.9,
      reviews: 234,
      downloads: 5420,
      tags: ["Python", "Django", "Flask", "Data Science"],
      featured: true,
      createdAt: "2023-04-15",
      updatedAt: "2023-05-20",
    },
    {
      id: "2",
      name: "Digital Marketing Mastery",
      description:
        "Complete digital marketing strategies including SEO, SEM, social media marketing, content marketing, email campaigns, and analytics.",
      category: "Marketing",
      author: "MarketingPro",
      price: 39.99,
      rating: 4.8,
      reviews: 189,
      downloads: 3210,
      tags: ["SEO", "SEM", "Social Media", "Analytics"],
      featured: true,
      createdAt: "2023-03-10",
      updatedAt: "2023-05-15",
    },
    {
      id: "3",
      name: "Financial Analysis Expert",
      description:
        "Professional financial analysis techniques, valuation models, risk assessment, portfolio management, and market analysis tools.",
      category: "Finance",
      author: "FinanceGuru",
      price: 49.99,
      rating: 4.7,
      reviews: 156,
      downloads: 2890,
      tags: ["Valuation", "Risk Analysis", "Portfolio", "Markets"],
      featured: false,
      createdAt: "2023-02-20",
      updatedAt: "2023-04-30",
    },
    {
      id: "4",
      name: "Creative Writing Assistant",
      description:
        "Storytelling techniques, character development, plot structures, dialogue writing, and genre-specific writing styles for fiction and non-fiction.",
      category: "Creative",
      author: "WriterStudio",
      price: 24.99,
      rating: 4.9,
      reviews: 312,
      downloads: 4560,
      tags: ["Storytelling", "Character Development", "Fiction", "Non-fiction"],
      featured: false,
      createdAt: "2023-01-15",
      updatedAt: "2023-05-10",
    },
    {
      id: "5",
      name: "Legal Research Pro",
      description:
        "Legal research methodologies, case law analysis, statutory interpretation, legal writing, and jurisdiction-specific legal knowledge.",
      category: "Legal",
      author: "LegalMind",
      price: 59.99,
      rating: 4.6,
      reviews: 98,
      downloads: 1240,
      tags: ["Case Law", "Research", "Legal Writing", "Analysis"],
      featured: false,
      createdAt: "2023-03-05",
      updatedAt: "2023-05-25",
    },
    {
      id: "6",
      name: "Data Science Fundamentals",
      description:
        "Essential data science concepts, statistical analysis, machine learning basics, data visualization, and practical applications.",
      category: "Data Science",
      author: "DataScientist",
      price: 34.99,
      rating: 4.8,
      reviews: 267,
      downloads: 3890,
      tags: ["Statistics", "Machine Learning", "Visualization", "Analytics"],
      featured: true,
      createdAt: "2023-02-28",
      updatedAt: "2023-05-18",
    },
  ])

  const categories = ["all", "Programming", "Marketing", "Finance", "Creative", "Legal", "Data Science", "Business"]

  const filteredSkillPacks = skillPacks.filter((pack) => {
    const matchesSearch =
      pack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pack.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pack.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || pack.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const sortedSkillPacks = [...filteredSkillPacks].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.downloads - a.downloads
      case "rating":
        return b.rating - a.rating
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
  })

  const featuredPacks = skillPacks.filter((pack) => pack.featured)

  const handleAcquire = (skillPack: MarketplaceSkillPack) => {
    // Handle skill pack acquisition
    console.log("Acquiring skill pack:", skillPack.name)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Skill Pack Marketplace</h1>
        <p className="text-muted-foreground">Discover and acquire specialized AI skill packs from the community</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search skill packs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Skill Packs</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="free">Free</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedSkillPacks.map((pack) => (
              <Card key={pack.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg line-clamp-1">{pack.name}</CardTitle>
                        {pack.featured && <Badge variant="secondary">Featured</Badge>}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{pack.category}</Badge>
                        <span className="text-sm text-muted-foreground">by {pack.author}</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-3">{pack.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {pack.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {pack.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{pack.tags.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{pack.rating}</span>
                        <span className="text-muted-foreground">({pack.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{pack.downloads.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">${pack.price}</span>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedSkillPack(pack)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>{pack.name}</DialogTitle>
                              <DialogDescription>by {pack.author}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p>{pack.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {pack.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium">Rating:</span> {pack.rating}/5.0 ({pack.reviews}{" "}
                                  reviews)
                                </div>
                                <div>
                                  <span className="font-medium">Downloads:</span> {pack.downloads.toLocaleString()}
                                </div>
                                <div>
                                  <span className="font-medium">Created:</span>{" "}
                                  {new Date(pack.createdAt).toLocaleDateString()}
                                </div>
                                <div>
                                  <span className="font-medium">Updated:</span>{" "}
                                  {new Date(pack.updatedAt).toLocaleDateString()}
                                </div>
                              </div>
                              <div className="flex justify-between items-center pt-4">
                                <span className="text-2xl font-bold">${pack.price}</span>
                                <Button onClick={() => handleAcquire(pack)}>
                                  <ShoppingCart className="h-4 w-4 mr-2" />
                                  Acquire Skill Pack
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" onClick={() => handleAcquire(pack)}>
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Acquire
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="featured" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredPacks.map((pack) => (
              <Card key={pack.id} className="hover:shadow-lg transition-shadow border-primary/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg line-clamp-1">{pack.name}</CardTitle>
                        <Badge>Featured</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{pack.category}</Badge>
                        <span className="text-sm text-muted-foreground">by {pack.author}</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-3">{pack.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {pack.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{pack.rating}</span>
                        <span className="text-muted-foreground">({pack.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{pack.downloads.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">${pack.price}</span>
                      <Button size="sm" onClick={() => handleAcquire(pack)}>
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Acquire
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="free" className="space-y-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Free skill packs coming soon!</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
