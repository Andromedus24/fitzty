'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { FeedPost } from '@/components/Feed/FeedPost'
import { FeedTabs } from '@/components/Feed/FeedTabs'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

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

export default function FeedPage() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [feedType, setFeedType] = useState<'fyp' | 'friends' | 'trending'>('fyp')
  const [refreshing, setRefreshing] = useState(false)

  const fetchPosts = async (pageNum: number = 1, refresh: boolean = false) => {
    if (!session?.user) return

    try {
      setLoading(true)
      const response = await fetch(
        `/api/feed?userId=${session.user?.email || 'mock-user'}&type=${feedType}&page=${pageNum}&limit=10`
      )
      const data = await response.json()

      if (refresh) {
        setPosts(data.posts)
      } else {
        setPosts(prev => [...prev, ...data.posts])
      }

      setHasMore(data.hasMore)
      setPage(data.nextPage)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    if (session?.user) {
      setPosts([])
      setPage(1)
      setHasMore(true)
      fetchPosts(1, true)
    }
  }, [session?.user, feedType])

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchPosts(page)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    setPosts([])
    setPage(1)
    setHasMore(true)
    fetchPosts(1, true)
  }

  const handleLike = async (postId: string) => {
    if (!session?.user) return

    try {
      const response = await fetch('/api/posts/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, userId: session.user.email || 'mock-user' })
      })

      if (response.ok) {
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                isLiked: !post.isLiked,
                _count: {
                  ...post._count,
                  likes: post.isLiked ? post._count.likes - 1 : post._count.likes + 1
                }
              }
            : post
        ))
      }
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

  const handleSave = async (postId: string) => {
    if (!session?.user) return

    try {
      const response = await fetch('/api/posts/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, userId: session.user.email || 'mock-user' })
      })

      if (response.ok) {
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                isSaved: !post.isSaved,
                _count: {
                  ...post._count,
                  saves: post.isSaved ? post._count.saves - 1 : post._count.saves + 1
                }
              }
            : post
        ))
      }
    } catch (error) {
      console.error('Error saving post:', error)
    }
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Sign in to view your feed</h2>
          <p className="text-muted-foreground">Join Fitzty to discover amazing fashion content</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-bold">Fitzty</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          
          <FeedTabs 
            activeTab={feedType} 
            onTabChange={setFeedType} 
          />
        </div>

        {/* Feed */}
        <div className="pb-20">
          {posts.map((post) => (
            <FeedPost
              key={post.id}
              post={post}
              onLike={handleLike}
              onSave={handleSave}
              currentUserId={session.user?.email || 'mock-user'}
            />
          ))}

          {loading && (
            <div className="flex justify-center p-8">
              <LoadingSpinner />
            </div>
          )}

          {!loading && hasMore && (
            <div className="flex justify-center p-4">
              <Button onClick={handleLoadMore} variant="outline">
                Load More
              </Button>
            </div>
          )}

          {!loading && !hasMore && posts.length > 0 && (
            <div className="text-center p-8 text-muted-foreground">
              You've reached the end of your feed!
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="text-center p-8">
              <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
              <p className="text-muted-foreground">
                Follow some users or create your first post to see content here!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 