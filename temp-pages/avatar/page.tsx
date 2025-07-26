'use client'

import { useSession } from 'next-auth/react'
import { AvatarRenderer } from '@/components/Avatar/AvatarRenderer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Sparkles, Trophy, Gift } from 'lucide-react'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function AvatarPage() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to customize your avatar</h2>
          <p className="text-gray-600">Create your unique digital identity</p>
        </div>
      </div>
    )
  }

  const mockAvatarConfig = {
    gender: 'female' as const,
    skinTone: 'medium',
    hairStyle: 'long',
    hairColor: 'brown',
    eyeColor: 'brown',
    pose: 'standing' as const,
    background: 'plain',
    clothing: {
      top: 't-shirt',
      bottom: 'jeans',
      shoes: 'sneakers',
      accessories: ['glasses', 'watch']
    }
  }

  const mockXP = 1250
  const mockLevel = 5
  const mockProgress = 75

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar Display */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span>Your Avatar</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                  <AvatarRenderer config={mockAvatarConfig} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customization Panel */}
          <div className="space-y-6">
            {/* XP Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <span>Level {mockLevel}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>XP Progress</span>
                    <span>{mockXP} / 2000</span>
                  </div>
                  <Progress value={mockProgress} className="w-full" />
                </div>
                <p className="text-sm text-gray-600">
                  {2000 - mockXP} XP until next level
                </p>
              </CardContent>
            </Card>

            {/* Customization Options */}
            <Card>
              <CardHeader>
                <CardTitle>Customization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">Hair Style</Button>
                  <Button variant="outline" size="sm">Hair Color</Button>
                  <Button variant="outline" size="sm">Skin Tone</Button>
                  <Button variant="outline" size="sm">Clothing</Button>
                </div>
              </CardContent>
            </Card>

            {/* Unlockables */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gift className="w-5 h-5 text-green-600" />
                  <span>Unlockables</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Premium Hair Style</p>
                      <p className="text-xs text-gray-600">Level 10 required</p>
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Designer Outfit</p>
                      <p className="text-xs text-gray-600">Level 15 required</p>
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
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