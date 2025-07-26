'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Quote } from 'lucide-react'

interface Testimonial {
  id: string
  user: {
    name: string
    avatar: string
    username: string
    level: number
  }
  content: string
  rating: number
  category: string
  xp: number
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    user: {
      name: 'Maya Patel',
      avatar: '/avatars/maya.jpg',
      username: '@mayastyle',
      level: 15
    },
    content: 'Fitzty completely changed how I think about fashion. The AI recommendations are incredibly accurate, and I love how the avatar system lets me visualize outfits before buying them. The community is so supportive!',
    rating: 5,
    category: 'Style Discovery',
    xp: 1500
  },
  {
    id: '2',
    user: {
      name: 'David Chen',
      avatar: '/avatars/david.jpg',
      username: '@davidfits',
      level: 8
    },
    content: 'As someone who was always unsure about my style, Fitzty has been a game-changer. The daily challenges push me to try new looks, and the XP system keeps me motivated. Level 8 and still going strong!',
    rating: 5,
    category: 'Confidence Building',
    xp: 800
  },
  {
    id: '3',
    user: {
      name: 'Sofia Rodriguez',
      avatar: '/avatars/sofia.jpg',
      username: '@sofiarodriguez',
      level: 22
    },
    content: 'The closet management feature is brilliant! I can finally keep track of all my clothes and create new combinations. The fit remix challenges are my favorite - so much creativity in this community.',
    rating: 5,
    category: 'Closet Organization',
    xp: 2200
  },
  {
    id: '4',
    user: {
      name: 'James Wilson',
      avatar: '/avatars/james.jpg',
      username: '@jameswilson',
      level: 12
    },
    content: 'I love how Fitzty combines social media with fashion in such a unique way. The avatar customization is addictive, and I\'ve made so many friends through the community challenges.',
    rating: 5,
    category: 'Community',
    xp: 1200
  },
  {
    id: '5',
    user: {
      name: 'Aisha Khan',
      avatar: '/avatars/aisha.jpg',
      username: '@aishakhan',
      level: 18
    },
    content: 'The AI fashion recommendations are spot-on! It\'s like having a personal stylist. I\'ve discovered so many new brands and styles I never would have tried otherwise.',
    rating: 5,
    category: 'AI Recommendations',
    xp: 1800
  },
  {
    id: '6',
    user: {
      name: 'Lucas Thompson',
      avatar: '/avatars/lucas.jpg',
      username: '@lucast',
      level: 6
    },
    content: 'Just started using Fitzty and I\'m already hooked! The gamification aspect makes fashion fun, and the avatar unlocks give me something to work towards. Highly recommend!',
    rating: 5,
    category: 'New User',
    xp: 600
  }
]

export function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            User Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real users who have transformed their style journey with Fitzty.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-purple-200">
                  <Quote className="w-8 h-8" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Badge variant="secondary" className="ml-3 text-xs">
                    {testimonial.category}
                  </Badge>
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{testimonial.user.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.user.username}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-purple-600">Level {testimonial.user.level}</div>
                    <div className="text-xs text-gray-500">{testimonial.xp} XP</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Style Journey?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of fashion enthusiasts who are already transforming their style with Fitzty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors">
                Join Fitzty Free
              </button>
              <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 