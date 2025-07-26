'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  Trophy, 
  Calendar, 
  Heart, 
  MessageCircle, 
  Share,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react'

interface CommunityPost {
  id: string
  user: {
    name: string
    username: string
    avatar: string
    level: number
  }
  outfit: {
    image: string
    tags: string[]
    style: string
  }
  likes: number
  comments: number
  timestamp: Date
  isWinner?: boolean
}

interface Challenge {
  id: string
  title: string
  description: string
  prize: string
  endDate: Date
  participants: number
  submissions: number
  isActive: boolean
}

const mockCommunityPosts: CommunityPost[] = [
  {
    id: '1',
    user: { name: 'Sarah Chen', username: '@sarahstyle', avatar: '👤', level: 15 },
    outfit: { image: '👗', tags: ['y2k', 'streetwear'], style: 'Y2K Streetwear' },
    likes: 1247,
    comments: 89,
    timestamp: new Date('2024-01-22T10:30:00'),
    isWinner: true
  },
  {
    id: '2',
    user: { name: 'Marcus Johnson', username: '@marcusfits', avatar: '👤', level: 8 },
    outfit: { image: '👔', tags: ['minimalist', 'monochrome'], style: 'Minimalist' },
    likes: 892,
    comments: 45,
    timestamp: new Date('2024-01-22T09:15:00')
  },
  {
    id: '3',
    user: { name: 'Emma Rodriguez', username: '@emmarodriguez', avatar: '👤', level: 22 },
    outfit: { image: '👠', tags: ['vintage', 'feminine'], style: 'Vintage Feminine' },
    likes: 1567,
    comments: 123,
    timestamp: new Date('2024-01-22T08:45:00')
  }
]

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Best Festival Fit',
    description: 'Show us your most creative festival outfit!',
    prize: '$500 Gift Card',
    endDate: new Date('2024-02-15'),
    participants: 156,
    submissions: 89,
    isActive: true
  },
  {
    id: '2',
    title: 'Back to School Drip',
    description: 'Elevate your back-to-school style',
    prize: 'Exclusive Avatar Items',
    endDate: new Date('2024-01-30'),
    participants: 234,
    submissions: 167,
    isActive: true
  },
  {
    id: '3',
    title: 'Winter Wonderland',
    description: 'Cozy and stylish winter looks',
    prize: 'Brand Collaboration',
    endDate: new Date('2024-01-25'),
    participants: 89,
    submissions: 45,
    isActive: false
  }
]

export default function CommunityPage({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState('posts')
  const [isJoined, setIsJoined] = useState(true)

  const communityName = decodeURIComponent(params.slug)
  const memberCount = 1247
  const postCount = 567

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Community Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{communityName}</h1>
              <p className="text-purple-100 text-lg mb-4">
                A vibrant community of fashion enthusiasts sharing style inspiration
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>{memberCount} members</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>{postCount} posts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Trending</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isJoined ? (
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  Leave Community
                </Button>
              ) : (
                <Button className="bg-white text-purple-600 hover:bg-gray-100">
                  Join Community
                </Button>
              )}
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          {/* Posts Tab */}
          <TabsContent value="posts" className="mt-6">
            <div className="space-y-6">
              {mockCommunityPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    {/* User Info */}
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center">
                        <span className="text-lg">{post.user.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                          {post.isWinner && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Trophy className="w-3 h-3 mr-1" />
                              Winner
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{post.user.username}</span>
                          <span>•</span>
                          <span>Level {post.user.level}</span>
                          <span>•</span>
                          <span>{post.timestamp.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Outfit */}
                    <div className="mb-4">
                      <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-4">
                        <div className="text-center">
                          <div className="text-6xl mb-2">{post.outfit.image}</div>
                          <div className="text-sm font-medium text-gray-700">{post.outfit.style}</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {post.outfit.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Engagement */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500">
                          <Heart className="w-5 h-5" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500">
                          <Share className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockChallenges.map((challenge) => (
                <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      {challenge.isActive ? (
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Ended</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{challenge.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Prize</span>
                        <span className="font-semibold text-gray-900">{challenge.prize}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">End Date</span>
                        <span className="text-sm text-gray-900">
                          {challenge.endDate.toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Participants</span>
                        <span className="text-sm text-gray-900">{challenge.participants}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Submissions</span>
                        <span className="text-sm text-gray-900">{challenge.submissions}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      {challenge.isActive ? (
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                          <Award className="w-4 h-4 mr-2" />
                          Join Challenge
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full" disabled>
                          Challenge Ended
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Sarah Chen', level: 25, posts: 156, avatar: '👤' },
                    { name: 'Marcus Johnson', level: 18, posts: 89, avatar: '👤' },
                    { name: 'Emma Rodriguez', level: 22, posts: 134, avatar: '👤' },
                    { name: 'Alex Kim', level: 15, posts: 67, avatar: '👤' },
                    { name: 'Maya Patel', level: 12, posts: 45, avatar: '👤' }
                  ].map((member, index) => (
                    <div key={member.name} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center">
                        <span className="text-lg">{member.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{member.name}</h4>
                        <p className="text-sm text-gray-500">Level {member.level} • {member.posts} posts</p>
                      </div>
                      <div className="text-right">
                        {index < 3 && (
                          <Badge className={`${
                            index === 0 ? 'bg-yellow-100 text-yellow-800' :
                            index === 1 ? 'bg-gray-100 text-gray-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            #{index + 1}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 