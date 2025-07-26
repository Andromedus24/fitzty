import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { calculateXP } from '@/lib/avatar/engine'

export async function POST(request: NextRequest) {
  try {
    const { 
      creatorId, 
      title, 
      description, 
      image, 
      tags, 
      startDate, 
      endDate, 
      isBranded, 
      brandName, 
      prize 
    } = await request.json()

    if (!creatorId || !title || !description || !startDate || !endDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create new challenge
    const challenge = await prisma.challenge.create({
      data: {
        creatorId,
        title,
        description,
        image,
        tags: tags || [],
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isBranded: isBranded || false,
        brandName,
        prize
      }
    })

    return NextResponse.json({ 
      success: true, 
      challenge 
    })
  } catch (error) {
    console.error('Error creating challenge:', error)
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
    const type = searchParams.get('type') || 'active' // active, ended, my-challenges

    let challenges

    switch (type) {
      case 'my-challenges':
        if (!userId) {
          return NextResponse.json({ error: 'User ID required for my-challenges' }, { status: 400 })
        }
        
        challenges = await prisma.challenge.findMany({
          where: { creatorId: userId },
          include: {
            creator: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true
              }
            },
            entries: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    username: true,
                    image: true
                  }
                }
              }
            },
            _count: {
              select: {
                entries: true,
                posts: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        })
        break

      case 'ended':
        challenges = await prisma.challenge.findMany({
          where: {
            endDate: { lt: new Date() },
            isActive: true
          },
          include: {
            creator: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true
              }
            },
            entries: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    username: true,
                    image: true
                  }
                }
              }
            },
            _count: {
              select: {
                entries: true,
                posts: true
              }
            }
          },
          orderBy: { endDate: 'desc' }
        })
        break

      case 'active':
      default:
        challenges = await prisma.challenge.findMany({
          where: {
            startDate: { lte: new Date() },
            endDate: { gt: new Date() },
            isActive: true
          },
          include: {
            creator: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true
              }
            },
            entries: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    username: true,
                    image: true
                  }
                }
              }
            },
            _count: {
              select: {
                entries: true,
                posts: true
              }
            }
          },
          orderBy: { startDate: 'desc' }
        })
        break
    }

    // Add user participation status
    if (userId) {
      challenges = challenges.map(challenge => ({
        ...challenge,
        isParticipating: challenge.entries.some(entry => entry.userId === userId),
        userEntry: challenge.entries.find(entry => entry.userId === userId)
      }))
    }

    return NextResponse.json({ challenges })
  } catch (error) {
    console.error('Error fetching challenges:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { challengeId, userId, postId, score } = await request.json()

    if (!challengeId || !userId) {
      return NextResponse.json({ error: 'Challenge ID and User ID are required' }, { status: 400 })
    }

    // Join challenge or update entry
    const entry = await prisma.challengeEntry.upsert({
      where: {
        challengeId_userId: {
          challengeId,
          userId
        }
      },
      update: {
        postId,
        score
      },
      create: {
        challengeId,
        userId,
        postId,
        score
      }
    })

    // Award XP for participating
    await prisma.user.update({
      where: { id: userId },
      data: {
        xp: {
          increment: calculateXP('challenge')
        }
      }
    })

    return NextResponse.json({ 
      success: true, 
      entry 
    })
  } catch (error) {
    console.error('Error updating challenge entry:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 