'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { FeedTabs } from '@/components/Feed/FeedTabs'
import { FeedPost } from '@/components/Feed/FeedPost'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

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
  const [feedType, setFeedType] = useState<'fyp' | 'friends' | 'trending'>('fyp')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    if (session?.user) {
      fetchPosts()
    }
  }, [session, feedType, page])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const userId = session?.user?.email || 'mock-user'
      const response = await fetch(`/api/feed?userId=${userId}&type=${feedType}&page=${page}`)
      
      if (response.ok) {
        const data = await response.json()
        if (page === 1) {
          setPosts(data.posts)
        } else {
          setPosts(prev => [...prev, ...data.posts])
        }
        setHasMore(data.hasMore)
      }
    } catch (error) {
      console.error('Error fetching feed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1)
    }
  }

  const handleLike = async (postId: string) => {
    // TODO: Implement like functionality
    console.log('Like post:', postId)
  }

  const handleSave = async (postId: string) => {
    // TODO: Implement save functionality
    console.log('Save post:', postId)
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to view your feed</h2>
          <p className="text-gray-600">Connect with fashion enthusiasts and discover new styles</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <FeedTabs activeTab={feedType} onTabChange={setFeedType} />
        
        <div className="space-y-4 p-4">
          {loading && page === 1 ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
              <p className="text-gray-600">Follow some users or create your first post!</p>
            </div>
          ) : (
            <>
              {posts.map((post: Post) => (
                <FeedPost
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onSave={handleSave}
                  currentUserId={session.user?.email || 'mock-user'}
                />
              ))}
              
              {hasMore && (
                <div className="text-center py-4">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                  >
                    {loading ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
} 