'use client'

import { useState } from 'react'
import { Heart, MessageCircle, Share, Bookmark, User, Sparkles, TrendingUp } from 'lucide-react'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function MockupPage() {
  const [currentTab, setCurrentTab] = useState('fyp')

  const mockPosts = [
    {
      id: 1,
      user: { name: 'Sarah Chen', username: '@sarahstyle', avatar: '👤' },
      outfit: { image: '👗', tags: ['y2k', 'streetwear'], style: 'Y2K Streetwear' },
      likes: 1247,
      comments: 89,
      saves: 234
    },
    {
      id: 2,
      user: { name: 'Marcus Johnson', username: '@marcusfits', avatar: '👤' },
      outfit: { image: '👔', tags: ['minimalist', 'monochrome'], style: 'Minimalist' },
      likes: 892,
      comments: 45,
      saves: 156
    }
  ]

  return (
    <div className="h-full w-full bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">Fitzty</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
            <TrendingUp className="w-3 h-3 text-purple-600" />
          </div>
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-3 h-3 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Feed Tabs */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setCurrentTab('fyp')}
          className={`flex-1 py-3 text-sm font-medium ${
            currentTab === 'fyp' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'
          }`}
        >
          For You
        </button>
        <button
          onClick={() => setCurrentTab('friends')}
          className={`flex-1 py-3 text-sm font-medium ${
            currentTab === 'friends' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'
          }`}
        >
          Friends
        </button>
        <button
          onClick={() => setCurrentTab('trending')}
          className={`flex-1 py-3 text-sm font-medium ${
            currentTab === 'trending' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'
          }`}
        >
          Trending
        </button>
      </div>

      {/* Feed Content */}
      <div className="flex-1 overflow-y-auto">
        {mockPosts.map((post) => (
          <div key={post.id} className="border-b border-gray-100">
            {/* User Info */}
            <div className="flex items-center space-x-3 p-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center">
                <span className="text-lg">{post.user.avatar}</span>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-gray-900">{post.user.name}</div>
                <div className="text-xs text-gray-500">{post.user.username}</div>
              </div>
              <div className="text-xs text-gray-400">2h ago</div>
            </div>

            {/* Outfit Image */}
            <div className="px-4 pb-4">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">{post.outfit.image}</div>
                  <div className="text-sm font-medium text-gray-700">{post.outfit.style}</div>
                  <div className="flex justify-center space-x-1 mt-2">
                    {post.outfit.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-white/80 rounded-full text-xs text-gray-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Engagement */}
            <div className="flex items-center justify-between px-4 pb-4">
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
              <button className="flex items-center space-x-1 text-gray-600 hover:text-yellow-500">
                <Bookmark className="w-5 h-5" />
                <span className="text-sm">{post.saves}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-around py-3 border-t border-gray-100 bg-white">
        <button className="flex flex-col items-center space-y-1">
          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs text-purple-600 font-medium">Feed</span>
        </button>
        <button className="flex flex-col items-center space-y-1">
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-3 h-3 text-gray-600" />
          </div>
          <span className="text-xs text-gray-500">Avatar</span>
        </button>
        <button className="flex flex-col items-center space-y-1">
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <span className="text-xs text-gray-500">Closet</span>
        </button>
        <button className="flex flex-col items-center space-y-1">
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span className="text-xs text-gray-500">Community</span>
        </button>
      </div>
    </div>
  )
} 