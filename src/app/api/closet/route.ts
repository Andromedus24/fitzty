import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { calculateXP } from '@/lib/avatar/engine'

export async function POST(request: NextRequest) {
  try {
    const { userId, name, description, image, category, brand, color, price, tags } = await request.json()

    if (!userId || !name || !image || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Add item to closet
    const closetItem = await prisma.closetItem.create({
      data: {
        userId,
        name,
        description,
        image,
        category,
        brand,
        color,
        price: price ? parseFloat(price) : null,
        tags: tags || []
      }
    })

    // Award XP for adding to closet
    await prisma.user.update({
      where: { id: userId },
      data: {
        xp: {
          increment: calculateXP('post')
        }
      }
    })

    return NextResponse.json({ 
      success: true, 
      closetItem 
    })
  } catch (error) {
    console.error('Error adding closet item:', error)
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
    const category = searchParams.get('category')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const where: any = { userId }
    if (category) {
      where.category = category
    }

    const closetItems = await prisma.closetItem.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    // Group items by category
    const groupedItems = closetItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    }, {} as Record<string, typeof closetItems>)

    return NextResponse.json({
      items: closetItems,
      groupedItems,
      totalItems: closetItems.length
    })
  } catch (error) {
    console.error('Error fetching closet items:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, name, description, category, brand, color, price, tags, isPublic } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 })
    }

    const updatedItem = await prisma.closetItem.update({
      where: { id },
      data: {
        name,
        description,
        category,
        brand,
        color,
        price: price ? parseFloat(price) : null,
        tags: tags || [],
        isPublic
      }
    })

    return NextResponse.json({ 
      success: true, 
      closetItem: updatedItem 
    })
  } catch (error) {
    console.error('Error updating closet item:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 })
    }

    await prisma.closetItem.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting closet item:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 