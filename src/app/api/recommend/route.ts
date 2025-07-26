import { NextRequest, NextResponse } from 'next/server'
import { getStyleRecommendations, generateStyleDNA } from '@/lib/ai/recommender'
import { prisma } from '@/lib/db/prisma'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Get user data from database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        posts: true,
        likes: {
          include: {
            post: true
          }
        },
        saves: {
          include: {
            post: true
          }
        },
        closetItems: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Generate recommendations
    const recommendations = await getStyleRecommendations(userId)

    // Generate style DNA
    const userBehavior = {
      posts: user.posts.map(post => ({
        tags: post.tags,
        style: post.style || 'casual',
        brand: post.brand ? [post.brand] : [],
        color: post.color ? [post.color] : [],
        price: post.price || 'medium'
      })),
      likes: user.likes.map(like => ({
        tags: like.post.tags,
        style: like.post.style || 'casual',
        brand: like.post.brand ? [like.post.brand] : [],
        color: like.post.color ? [like.post.color] : []
      })),
      saves: user.saves.map(save => ({
        tags: save.post.tags,
        style: save.post.style || 'casual',
        brand: save.post.brand ? [save.post.brand] : [],
        color: save.post.color ? [save.post.color] : []
      })),
      closet: user.closetItems.map(item => ({
        category: item.category,
        brand: item.brand || '',
        color: item.color || '',
        tags: item.tags
      }))
    }

    const styleDNA = await generateStyleDNA(userBehavior)

    // Store recommendations in database
    await prisma.recommendation.createMany({
      data: recommendations.map(rec => ({
        userId,
        type: rec.type,
        content: rec as any,
        score: rec.confidence,
        isRead: false
      }))
    })

    return NextResponse.json({
      recommendations,
      styleDNA,
      user: {
        id: user.id,
        username: user.username,
        xp: user.xp,
        level: user.level,
        streak: user.streak
      }
    })
  } catch (error) {
    console.error('Error in recommendation API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const type = searchParams.get('type')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const where: any = { userId }
    if (type) {
      where.type = type
    }

    const recommendations = await prisma.recommendation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 10
    })

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 