import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const searchParams = url.searchParams
    const userId = searchParams.get('userId')
    const type = searchParams.get('type') || 'fyp' // fyp, friends, trending
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = (page - 1) * limit

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    let posts

    switch (type) {
      case 'friends':
        // Get posts from followed users
        posts = await prisma.post.findMany({
          where: {
            userId: {
              in: await getFollowedUserIds(userId)
            },
            isPublic: true
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
                avatarConfig: true
              }
            },
            likes: true,
            comments: true,
            saves: true,
            _count: {
              select: {
                likes: true,
                comments: true,
                saves: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: limit,
          skip: offset
        })
        break

      case 'trending':
        // Get trending posts based on engagement
        posts = await prisma.post.findMany({
          where: {
            isPublic: true,
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
            }
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
                avatarConfig: true
              }
            },
            likes: true,
            comments: true,
            saves: true,
            _count: {
              select: {
                likes: true,
                comments: true,
                saves: true
              }
            }
          },
          orderBy: [
            { likes: { _count: 'desc' } },
            { comments: { _count: 'desc' } },
            { createdAt: 'desc' }
          ],
          take: limit,
          skip: offset
        })
        break

      case 'fyp':
      default:
        // For You Page - AI-powered recommendations
        posts = await getFYPPosts(userId, limit, offset)
        break
    }

    // Add engagement data and user interaction status
    const postsWithEngagement = posts.map((post: any) => ({
      ...post,
      engagementScore: calculateEngagementScore(post),
      isLiked: post.likes?.some((like: any) => like.userId === userId) || false,
      isSaved: post.saves?.some((save: any) => save.userId === userId) || false,
      isFollowing: false // TODO: Implement following check
    }))

    return NextResponse.json({
      posts: postsWithEngagement,
      hasMore: posts.length === limit,
      nextPage: page + 1
    })

  } catch (error) {
    console.error('Error fetching feed:', error)
    return NextResponse.json({ error: 'Failed to fetch feed' }, { status: 500 })
  }
}

async function getFollowedUserIds(userId: string): Promise<string[]> {
  const follows = await prisma.follows.findMany({
    where: { followerId: userId },
    select: { followingId: true }
  })
  return follows.map(follow => follow.followingId)
}

async function getFYPPosts(userId: string, limit: number, offset: number) {
  // Get user's preferences and behavior
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      likes: {
        include: { post: true }
      },
      saves: {
        include: { post: true }
      }
    }
  })

  if (!user) return []

  // Extract user preferences
  const likedTags = user.likes.flatMap(like => like.post.tags)
  const savedTags = user.saves.flatMap(save => save.post.tags)
  const preferredTags = [...new Set([...likedTags, ...savedTags])]

  // Get posts that match user preferences
  const posts = await prisma.post.findMany({
    where: {
      isPublic: true,
      userId: { not: userId }, // Exclude user's own posts
      OR: [
        { tags: { hasSome: preferredTags } },
        { style: { in: user.likes.map((like: any) => like.post.style).filter((style: any): style is string => Boolean(style)) } }
      ]
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          avatarConfig: true
        }
      },
      likes: true,
      comments: true,
      saves: true,
      _count: {
        select: {
          likes: true,
          comments: true,
          saves: true
        }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: offset
  })

  return posts
}

function calculateEngagementScore(post: any): number {
  const likes = post._count?.likes || 0
  const comments = post._count?.comments || 0
  const saves = post._count?.saves || 0
  
  // Weighted engagement score
  return likes * 1 + comments * 3 + saves * 2
} 