'use client'

import { useEffect, useRef } from 'react'
import { AvatarEngine, AvatarConfig } from '@/lib/avatar/engine'
import { cn } from '@/lib/utils'

interface AvatarRendererProps {
  config?: AvatarConfig
  className?: string
  pose?: string
}

export function AvatarRenderer({ config, className, pose = 'standing' }: AvatarRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<AvatarEngine | null>(null)

  useEffect(() => {
    if (!containerRef.current || !config) return

    // Initialize avatar engine
    engineRef.current = new AvatarEngine(containerRef.current)
    engineRef.current.createAvatar(config)

    return () => {
      engineRef.current?.dispose()
    }
  }, [config])

  useEffect(() => {
    if (engineRef.current && pose) {
      engineRef.current.setPose(pose)
    }
  }, [pose])

  // Default avatar if no config
  if (!config) {
    return (
      <div className={cn('bg-muted rounded-full flex items-center justify-center', className)}>
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
          <span className="text-2xl">👤</span>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef} 
      className={cn('w-full h-full', className)}
    />
  )
} 