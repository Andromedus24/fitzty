'use client'

import { useSession } from 'next-auth/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function ClosetPage() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to view your closet</h2>
          <p className="text-gray-600">Start building your digital wardrobe</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Closet</h1>
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="tops">Tops</TabsTrigger>
            <TabsTrigger value="bottoms">Bottoms</TabsTrigger>
            <TabsTrigger value="dresses">Dresses</TabsTrigger>
            <TabsTrigger value="shoes">Shoes</TabsTrigger>
            <TabsTrigger value="accessories">Accessories</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Placeholder for closet items */}
              <div className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
                <h3 className="font-medium text-sm">Item Name</h3>
                <p className="text-xs text-gray-500">Category</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tops" className="space-y-4">
            <p className="text-gray-600">No tops in your closet yet.</p>
          </TabsContent>

          <TabsContent value="bottoms" className="space-y-4">
            <p className="text-gray-600">No bottoms in your closet yet.</p>
          </TabsContent>

          <TabsContent value="dresses" className="space-y-4">
            <p className="text-gray-600">No dresses in your closet yet.</p>
          </TabsContent>

          <TabsContent value="shoes" className="space-y-4">
            <p className="text-gray-600">No shoes in your closet yet.</p>
          </TabsContent>

          <TabsContent value="accessories" className="space-y-4">
            <p className="text-gray-600">No accessories in your closet yet.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 