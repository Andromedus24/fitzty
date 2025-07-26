'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Sparkles, Users, Zap } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-10 left-1/4 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-white/20 text-white border-white/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Join the Fashion Revolution
          </Badge>
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Transform Your Style?
        </h2>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Join thousands of fashion enthusiasts who are already creating, sharing, and discovering 
          amazing styles with AI-powered recommendations and a vibrant community.
        </p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Vibrant Community</h3>
            <p className="text-white/80">Connect with fashion enthusiasts worldwide</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI-Powered</h3>
            <p className="text-white/80">Get personalized style recommendations</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Gamified Experience</h3>
            <p className="text-white/80">Earn XP and unlock exclusive avatar items</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button size="lg" className="px-8 py-4 text-lg font-semibold bg-white text-purple-600 hover:bg-gray-100">
            <Link href="/auth?signup" className="flex items-center">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold border-white/30 text-white hover:bg-white/10">
            <Link href="/feed" className="flex items-center">
              Explore Trending Fits
            </Link>
          </Button>
        </div>

        {/* Social Proof */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/80">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-white/80">Fits Shared</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">100+</div>
              <div className="text-white/80">Daily Challenges</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">4.9★</div>
              <div className="text-white/80">User Rating</div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12">
          <p className="text-white/70 text-sm">
            Join Fitzty today and start your fashion journey. It's free, fun, and forever changing the way we think about style.
          </p>
        </div>
      </div>
    </section>
  )
} 