import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { unlockAvatarItems, calculateLevel } from '@/lib/avatar/engine'

export async function POST(request: NextRequest) {
  try {
    const { userId, avatarConfig } = await request.json()

    if (!userId || !avatarConfig) {
      return NextResponse.json({ error: 'User ID and avatar config are required' }, { status: 400 })
    }

    // Update user's avatar configuration
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        avatarConfig: avatarConfig
      }
    })

    return NextResponse.json({ 
      success: true, 
      avatarConfig: user.avatarConfig 
    })
  } catch (error) {
    console.error('Error updating avatar:', error)
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

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Get user's avatar items and configuration
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        avatarItems: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check for new unlocks based on XP
    const newUnlocks = unlockAvatarItems(user.xp)
    const currentUnlocks = user.avatarItems.map(item => item.itemName)
    
    const availableUnlocks = newUnlocks.filter(unlock => !currentUnlocks.includes(unlock))

    return NextResponse.json({
      avatarConfig: user.avatarConfig,
      avatarItems: user.avatarItems,
      availableUnlocks,
      level: calculateLevel(user.xp),
      xp: user.xp
    })
  } catch (error) {
    console.error('Error fetching avatar data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId, itemId, itemType, itemName, itemImage } = await request.json()

    if (!userId || !itemId || !itemType || !itemName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Add or update avatar item
    const avatarItem = await prisma.avatarItem.upsert({
      where: {
        id: itemId
      },
      update: {
        itemName,
        itemImage,
        isUnlocked: true,
        unlockedAt: new Date()
      },
      create: {
        userId,
        itemId,
        itemType,
        itemName,
        itemImage,
        isUnlocked: true,
        unlockedAt: new Date()
      }
    })

    return NextResponse.json({ 
      success: true, 
      avatarItem 
    })
  } catch (error) {
    console.error('Error updating avatar item:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 