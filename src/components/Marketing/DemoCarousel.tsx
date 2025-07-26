'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Heart, MessageCircle } from 'lucide-react'

interface DemoOutfit {
  id: string
  user: {
    name: string
    avatar: string
    username: string
  }
  outfit: {
    image: string
    tags: string[]
    style: string
    likes: number
    comments: number
  }
  testimonial?: string
}

const demoOutfits: DemoOutfit[] = [
  {
    id: '1',
    user: {
      name: 'Sarah Chen',
      avatar: '/avatars/sarah.jpg',
      username: '@sarahstyle'
    },
    outfit: {
      image: '/outfits/outfit1.jpg',
      tags: ['y2k', 'streetwear', 'oversized'],
      style: 'Y2K Streetwear',
      likes: 1247,
      comments: 89
    },
    testimonial: 'Fitzty helped me discover my Y2K aesthetic! The AI recommendations are spot on.'
  },
  {
    id: '2',
    user: {
      name: 'Marcus Johnson',
      avatar: '/avatars/marcus.jpg',
      username: '@marcusfits'
    },
    outfit: {
      image: '/outfits/outfit2.jpg',
      tags: ['minimalist', 'monochrome', 'clean'],
      style: 'Minimalist',
      likes: 892,
      comments: 45
    },
    testimonial: 'The avatar system is incredible. I can try outfits before buying!'
  },
  {
    id: '3',
    user: {
      name: 'Emma Rodriguez',
      avatar: '/avatars/emma.jpg',
      username: '@emmarodriguez'
    },
    outfit: {
      image: '/outfits/outfit3.jpg',
      tags: ['vintage', 'retro', 'feminine'],
      style: 'Vintage Feminine',
      likes: 1567,
      comments: 123
    },
    testimonial: 'Love the community challenges! Made so many friends through fashion.'
  },
  {
    id: '4',
    user: {
      name: 'Alex Kim',
      avatar: '/avatars/alex.jpg',
      username: '@alexkim'
    },
    outfit: {
      image: '/outfits/outfit4.jpg',
      tags: ['techwear', 'futuristic', 'urban'],
      style: 'Techwear',
      likes: 2034,
      comments: 156
    },
    testimonial: 'The XP system keeps me motivated to post daily. Level 25 here I come!'
  }
]

export function DemoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % demoOutfits.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % demoOutfits.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + demoOutfits.length) % demoOutfits.length)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Community Showcase
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See What Our Community is Creating
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real outfits from real people. Join thousands of fashion enthusiasts 
            sharing their style and discovering new trends.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-8">
            <div className="flex transition-transform duration-500 ease-in-out"
                 style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {demoOutfits.map((outfit, index) => (
                <div key={outfit.id} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Outfit Image */}
                    <div className="relative">
                      <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-8xl mb-4">👗</div>
                          <p className="text-gray-600">Outfit Preview</p>
                        </div>
                      </div>
                      
                      {/* Engagement Stats */}
                      <div className="absolute bottom-4 left-4 flex items-center space-x-4 text-white">
                        <div className="flex items-center space-x-1 bg-black/50 px-3 py-1 rounded-full">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm font-medium">{outfit.outfit.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-black/50 px-3 py-1 rounded-full">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">{outfit.outfit.comments}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                      {/* User Info */}
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center">
                          <span className="text-2xl">👤</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{outfit.user.name}</h3>
                          <p className="text-gray-600">{outfit.user.username}</p>
                        </div>
                      </div>

                      {/* Style Info */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{outfit.outfit.style}</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {outfit.outfit.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Testimonial */}
                      {outfit.testimonial && (
                        <div className="bg-white/80 rounded-lg p-4 border-l-4 border-purple-500">
                          <div className="flex items-start space-x-2">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 mt-2 italic">"{outfit.testimonial}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <span className="text-2xl">‹</span>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <span className="text-2xl">›</span>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {demoOutfits.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
            <div className="text-gray-600">Outfits Shared</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600 mb-2">1M+</div>
            <div className="text-gray-600">Likes Given</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">100K+</div>
            <div className="text-gray-600">Comments</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">500+</div>
            <div className="text-gray-600">Daily Active Users</div>
          </div>
        </div>
      </div>
    </section>
  )
} 