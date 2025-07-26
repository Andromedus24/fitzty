'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Tag, 
  Calendar,
  TrendingUp,
  Sparkles
} from 'lucide-react'

interface ClosetItem {
  id: string
  name: string
  category: string
  brand?: string
  color: string
  tags: string[]
  image: string
  lastWorn?: Date
  wearCount: number
  price?: number
}

const mockClosetItems: ClosetItem[] = [
  {
    id: '1',
    name: 'Oversized Denim Jacket',
    category: 'Outerwear',
    brand: 'Levi\'s',
    color: 'Blue',
    tags: ['denim', 'oversized', 'vintage'],
    image: '👕',
    lastWorn: new Date('2024-01-15'),
    wearCount: 12,
    price: 89
  },
  {
    id: '2',
    name: 'High-Waisted Mom Jeans',
    category: 'Bottoms',
    brand: 'Zara',
    color: 'Light Blue',
    tags: ['denim', 'high-waisted', 'mom-fit'],
    image: '👖',
    lastWorn: new Date('2024-01-20'),
    wearCount: 8,
    price: 65
  },
  {
    id: '3',
    name: 'Crop Top Tank',
    category: 'Tops',
    brand: 'H&M',
    color: 'White',
    tags: ['crop', 'tank', 'summer'],
    image: '👚',
    lastWorn: new Date('2024-01-18'),
    wearCount: 15,
    price: 25
  },
  {
    id: '4',
    name: 'Chunky Sneakers',
    category: 'Footwear',
    brand: 'Nike',
    color: 'White',
    tags: ['sneakers', 'chunky', 'streetwear'],
    image: '👟',
    lastWorn: new Date('2024-01-22'),
    wearCount: 20,
    price: 120
  }
]

const categories = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Accessories', 'Dresses']

export default function ClosetPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = mockClosetItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const totalItems = mockClosetItems.length
  const totalValue = mockClosetItems.reduce((sum, item) => sum + (item.price || 0), 0)
  const mostWorn = mockClosetItems.reduce((max, item) => item.wearCount > max.wearCount ? item : max)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Closet</h1>
              <p className="text-gray-600 mt-1">Manage your digital wardrobe</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Closet Value</p>
                  <p className="text-2xl font-bold text-gray-900">${totalValue}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Most Worn</p>
                  <p className="text-lg font-bold text-gray-900">{mostWorn.name}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Streak</p>
                  <p className="text-2xl font-bold text-gray-900">7 days</p>
                </div>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-pink-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search items, brands, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mt-6">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-7">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="text-xs">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Closet Items */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={viewMode === 'grid' ? 'text-center' : 'flex items-center space-x-4'}>
                  <div className={`${viewMode === 'grid' ? 'mb-4' : ''} flex-shrink-0`}>
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                      <span className="text-3xl">{item.image}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    {item.brand && <p className="text-sm text-gray-600">{item.brand}</p>}
                    <p className="text-sm text-gray-500">{item.color} • {item.category}</p>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Worn {item.wearCount}x</span>
                        {item.lastWorn && (
                          <span>{item.lastWorn.toLocaleDateString()}</span>
                        )}
                      </div>
                      {item.price && (
                        <span className="font-semibold text-gray-900">${item.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
} 