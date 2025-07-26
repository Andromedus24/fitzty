'use client'

import { useEffect } from 'react'

export const dynamic = 'force-dynamic'
import { Hero, DemoCarousel, Testimonials, CTA } from '@/components/Marketing'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import Footer from '@/components/Footer'

export default function HomePage() {
  useEffect(() => {
    const loadSpline = async () => {
      try {
        const { Application } = await import('@splinetool/runtime')
        const canvas = document.getElementById('spline-canvas') as HTMLCanvasElement
        if (canvas) {
          const spline = new Application(canvas)
          await spline.load('https://prod.spline.design/2a115220-71cd-400b-84f2-408dbc108f72/scene.splinecode')
        }
      } catch (error) {
        console.log('Spline not loaded, using fallback UI')
      }
    }
    loadSpline()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* 3D Phone Mockup Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            A next-gen social space to express your style and shop your fits — all through your avatar.
          </p>

          {/* 3D Phone Container */}
          <div className="relative w-full max-w-6xl h-[700px] mb-16">
            {/* Spline Canvas */}
            <canvas id="spline-canvas" className="w-full h-full" />
            
            {/* Fitzty UI Overlay */}
            <div
              id="fitzty-ui"
              className="absolute top-[20%] left-[34%] w-[280px] h-[580px] rounded-[2rem] overflow-hidden shadow-2xl z-10 border-4 border-white"
            >
              <iframe
                src="/mockup"
                width="100%"
                height="100%"
                className="pointer-events-auto"
                frameBorder="0"
                allowFullScreen
              />
            </div>

            {/* Fallback Phone Mockup (if Spline fails) */}
            <div id="fallback-phone" className="hidden absolute top-[20%] left-[34%] w-[280px] h-[580px] bg-gray-900 rounded-[2rem] p-2 shadow-2xl z-10">
              <div className="w-full h-full bg-white rounded-[1.5rem] overflow-hidden">
                <iframe
                  src="/mockup"
                  width="100%"
                  height="100%"
                  className="pointer-events-auto"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors">
              Launch App
            </button>
            <button className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Rest of the sections */}
      <DemoCarousel />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
} 