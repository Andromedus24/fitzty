'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Sparkles, Users, TrendingUp } from 'lucide-react'

export function Hero() {
  const [currentDemo, setCurrentDemo] = useState(0)
  const demos = [
    { title: 'Avatar Evolution', description: 'Watch your style grow', icon: '👤' },
    { title: 'AI Recommendations', description: 'Discover your perfect fit', icon: '🤖' },
    { title: 'Community Challenges', description: 'Compete with style', icon: '🏆' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % demos.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [demos.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            Fashion-First Social Media
          </Badge>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Your Closet.{' '}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Your Avatar.
          </span>{' '}
          <br />
          Your Vibe.
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Join the next generation of fashion social media. Create your digital avatar, 
          showcase your style, and discover amazing fits with AI-powered recommendations.
        </p>

        {/* Stats */}
        <div className="flex justify-center items-center space-x-8 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">10K+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600">50K+</div>
            <div className="text-gray-600">Fits Shared</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">100+</div>
            <div className="text-gray-600">Challenges</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button size="lg" className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Link href="/auth?signup" className="flex items-center">
              Join Fitzty
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold">
            <Link href="/feed" className="flex items-center">
              Explore Trending Fits
            </Link>
          </Button>
        </div>

        {/* Animated Demo */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
            <div className="flex items-center justify-center mb-6">
              <div className="text-4xl mr-4">{demos[currentDemo].icon}</div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-900">{demos[currentDemo].title}</h3>
                <p className="text-gray-600">{demos[currentDemo].description}</p>
              </div>
            </div>
            
            {/* Demo Animation Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">👗</div>
                <p className="text-gray-600">Interactive Demo Coming Soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community First</h3>
            <p className="text-gray-600">Connect with fashion enthusiasts worldwide</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Powered</h3>
            <p className="text-gray-600">Get personalized style recommendations</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Gamified</h3>
            <p className="text-gray-600">Earn XP and unlock avatar items</p>
          </div>
        </div>
      </div>
    </section>
  )
} 