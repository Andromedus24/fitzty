'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Bookmark, MessageCircle, Share2, MoreHorizontal } from 'lucide-react'
import { AvatarRenderer } from '@/components/Avatar/AvatarRenderer'

interface Post {
  id: string
  content?: string
  images: string[]
  avatarImage?: string
  tags: string[]
  style?: string
  brand?: string
  color?: string
  price?: string
  createdAt: string
  user: {
    id: string
    name?: string
    username?: string
    image?: string
    avatarConfig?: any
  }
  _count: {
    likes: number
    comments: number
    saves: number
  }
  isLiked: boolean
  isSaved: boolean
  engagementScore: number
}

interface FeedPostProps {
  post: Post
  onLike: (postId: string) => void
  onSave: (postId: string) => void
  currentUserId: string
}

export function FeedPost({ post, onLike, onSave, currentUserId }: FeedPostProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAvatar, setShowAvatar] = useState(false)

  const handleImageClick = () => {
    if (post.avatarImage) {
      setShowAvatar(!showAvatar)
    }
  }

  const nextImage = () => {
    if (post.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % post.images.length)
    }
  }

  const prevImage = () => {
    if (post.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + post.images.length) % post.images.length)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return date.toLocaleDateString()
  }

  return (
    <Card className="mb-4 border-0 shadow-none">
      <CardContent className="p-0">
        {/* User Header */}
        <div className="flex items-center justify-between p-4 pb-2">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.user.image || ''} />
              <AvatarFallback>
                {post.user.name?.charAt(0) || post.user.username?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">
                {post.user.name || post.user.username || 'Anonymous'}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        {post.content && (
          <div className="px-4 pb-2">
            <p className="text-sm">{post.content}</p>
          </div>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="px-4 pb-2 flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{post.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Image/Avatar */}
        <div className="relative aspect-square bg-muted">
          {showAvatar && post.avatarImage ? (
            <div className="w-full h-full flex items-center justify-center">
              <AvatarRenderer
                config={post.user.avatarConfig}
                className="w-full h-full"
              />
            </div>
          ) : (
            <>
              <Image
                src={post.images[currentImageIndex] || '/placeholder.svg'}
                alt="Post image"
                fill
                className="object-cover cursor-pointer"
                onClick={handleImageClick}
              />
              
              {/* Image Navigation */}
              {post.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    onClick={prevImage}
                  >
                    ‹
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    onClick={nextImage}
                  >
                    ›
                  </Button>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {post.images.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between p-4 pt-2">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike(post.id)}
              className={`flex items-center space-x-1 ${
                post.isLiked ? 'text-red-500' : 'text-muted-foreground'
              }`}
            >
              <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm">{post._count.likes}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">{post._count.comments}</span>
            </Button>
            
            <Button variant="ghost" size="sm">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSave(post.id)}
            className={post.isSaved ? 'text-blue-500' : 'text-muted-foreground'}
          >
            <Bookmark className={`h-5 w-5 ${post.isSaved ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Style Info */}
        {(post.style || post.brand || post.color || post.price) && (
          <div className="px-4 pb-4">
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              {post.style && <span>Style: {post.style}</span>}
              {post.brand && <span>Brand: {post.brand}</span>}
              {post.color && <span>Color: {post.color}</span>}
              {post.price && <span>Price: {post.price}</span>}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 