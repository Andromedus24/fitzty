'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Palette, 
  Shirt, 
  Sparkles, 
  Lock, 
  Star,
  Zap,
  Crown,
  Gift
} from 'lucide-react'

interface AvatarItem {
  id: string
  name: string
  type: 'hair' | 'clothing' | 'accessory' | 'background'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlocked: boolean
  xpRequired?: number
  image: string
}

const mockAvatarItems: AvatarItem[] = [
  // Hair styles
  { id: '1', name: 'Classic Cut', type: 'hair', rarity: 'common', unlocked: true, image: '💇‍♀️' },
  { id: '2', name: 'Curly Bob', type: 'hair', rarity: 'rare', unlocked: true, image: '👩‍🦱' },
  { id: '3', name: 'Space Buns', type: 'hair', rarity: 'epic', unlocked: false, xpRequired: 500, image: '👧' },
  { id: '4', name: 'Rainbow Dreads', type: 'hair', rarity: 'legendary', unlocked: false, xpRequired: 1000, image: '🌈' },
  
  // Clothing
  { id: '5', name: 'Basic Tee', type: 'clothing', rarity: 'common', unlocked: true, image: '👕' },
  { id: '6', name: 'Denim Jacket', type: 'clothing', rarity: 'rare', unlocked: true, image: '🧥' },
  { id: '7', name: 'Designer Dress', type: 'clothing', rarity: 'epic', unlocked: false, xpRequired: 750, image: '👗' },
  { id: '8', name: 'Royal Robe', type: 'clothing', rarity: 'legendary', unlocked: false, xpRequired: 1500, image: '👑' },
  
  // Accessories
  { id: '9', name: 'Simple Glasses', type: 'accessory', rarity: 'common', unlocked: true, image: '👓' },
  { id: '10', name: 'Gold Chain', type: 'accessory', rarity: 'rare', unlocked: true, image: '💎' },
  { id: '11', name: 'Wings', type: 'accessory', rarity: 'epic', unlocked: false, xpRequired: 1000, image: '👼' },
  { id: '12', name: 'Halo', type: 'accessory', rarity: 'legendary', unlocked: false, xpRequired: 2000, image: '😇' },
  
  // Backgrounds
  { id: '13', name: 'Plain', type: 'background', rarity: 'common', unlocked: true, image: '⬜' },
  { id: '14', name: 'Gradient', type: 'background', rarity: 'rare', unlocked: true, image: '🌈' },
  { id: '15', name: 'Cityscape', type: 'background', rarity: 'epic', unlocked: false, xpRequired: 500, image: '🏙️' },
  { id: '16', name: 'Galaxy', type: 'background', rarity: 'legendary', unlocked: false, xpRequired: 1500, image: '🌌' },
]

const rarityColors = {
  common: 'bg-gray-100 text-gray-800',
  rare: 'bg-blue-100 text-blue-800',
  epic: 'bg-purple-100 text-purple-800',
  legendary: 'bg-yellow-100 text-yellow-800'
}

export default function AvatarPage() {
  const [selectedItems, setSelectedItems] = useState({
    hair: '1',
    clothing: '5',
    accessory: '9',
    background: '13'
  })
  const [userXP, setUserXP] = useState(1250)
  const [userLevel, setUserLevel] = useState(8)

  const handleItemSelect = (type: string, itemId: string) => {
    setSelectedItems(prev => ({ ...prev, [type]: itemId }))
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return null
      case 'rare': return <Star className="w-3 h-3" />
      case 'epic': return <Zap className="w-3 h-3" />
      case 'legendary': return <Crown className="w-3 h-3" />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Avatar Studio</h1>
              <p className="text-gray-600 mt-1">Customize your digital identity</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Level {userLevel}</p>
                <p className="text-lg font-semibold text-gray-900">{userXP} XP</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar Preview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Avatar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className="text-8xl mb-4">👤</div>
                    <p className="text-sm text-gray-600">Avatar Preview</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Skin Tone</label>
                    <Slider defaultValue={[50]} max={100} step={1} className="mt-2" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Height</label>
                    <Slider defaultValue={[60]} max={100} step={1} className="mt-2" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Body Type</label>
                    <Slider defaultValue={[40]} max={100} step={1} className="mt-2" />
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Save Avatar
                  </Button>
                  <Button variant="outline" className="w-full">
                    Share Avatar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customization Panel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Customize Your Look</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="hair" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="hair">Hair</TabsTrigger>
                    <TabsTrigger value="clothing">Clothing</TabsTrigger>
                    <TabsTrigger value="accessory">Accessories</TabsTrigger>
                    <TabsTrigger value="background">Background</TabsTrigger>
                  </TabsList>
                  
                  {(['hair', 'clothing', 'accessory', 'background'] as const).map((type) => (
                    <TabsContent key={type} value={type} className="mt-6">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {mockAvatarItems
                          .filter(item => item.type === type)
                          .map((item) => (
                            <div
                              key={item.id}
                              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                selectedItems[type] === item.id
                                  ? 'border-purple-500 bg-purple-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              } ${!item.unlocked ? 'opacity-50' : ''}`}
                              onClick={() => item.unlocked && handleItemSelect(type, item.id)}
                            >
                              {!item.unlocked && (
                                <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                                  <Lock className="w-6 h-6 text-white" />
                                </div>
                              )}
                              
                              <div className="text-center">
                                <div className="text-3xl mb-2">{item.image}</div>
                                <p className="text-sm font-medium text-gray-900 mb-1">{item.name}</p>
                                
                                <div className="flex items-center justify-center space-x-1">
                                  <Badge 
                                    variant="secondary" 
                                    className={`text-xs ${rarityColors[item.rarity]}`}
                                  >
                                    {getRarityIcon(item.rarity)}
                                    {item.rarity}
                                  </Badge>
                                </div>
                                
                                {!item.unlocked && item.xpRequired && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    {item.xpRequired} XP needed
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            {/* Unlockables */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gift className="w-5 h-5" />
                  <span>Unlockables</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Daily Streak</h4>
                    <p className="text-sm text-gray-600 mb-3">Post for 7 days to unlock exclusive items</p>
                    <div className="flex space-x-1">
                      {[...Array(7)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-6 h-6 rounded-full border-2 ${
                            i < 5 ? 'bg-green-500 border-green-500' : 'bg-gray-200 border-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Level Up</h4>
                    <p className="text-sm text-gray-600 mb-3">Reach level 10 for legendary items</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
                        style={{ width: `${(userLevel / 10) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{userLevel}/10</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 