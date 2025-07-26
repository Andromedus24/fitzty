import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENROUTER_API_KEY 
    ? 'https://openrouter.ai/api/v1'
    : undefined,
  defaultHeaders: process.env.OPENROUTER_API_KEY
    ? {
        'HTTP-Referer': 'https://fitzty.com',
        'X-Title': 'Fitzty Fashion AI',
      }
    : undefined,
})

export interface UserBehavior {
  posts: Array<{
    tags: string[]
    style: string
    brand: string[]
    color: string[]
    price: string
  }>
  likes: Array<{
    tags: string[]
    style: string
    brand: string[]
    color: string[]
  }>
  saves: Array<{
    tags: string[]
    style: string
    brand: string[]
    color: string[]
  }>
  closet: Array<{
    category: string
    brand: string
    color: string
    tags: string[]
  }>
}

export interface FashionRecommendation {
  type: 'style' | 'item' | 'outfit' | 'challenge'
  title: string
  description: string
  confidence: number
  tags: string[]
  reasoning: string
}

export async function getStyleRecommendations(userId: string): Promise<FashionRecommendation[]> {
  try {
    // In a real app, you'd fetch this from the database
    const userData: UserBehavior = {
      posts: [],
      likes: [],
      saves: [],
      closet: []
    }

    const prompt = `You are a fashion stylist AI. Analyze this user's fashion behavior and generate 5 personalized fashion recommendations.

User Data:
${JSON.stringify(userData, null, 2)}

Generate recommendations in this JSON format:
[
  {
    "type": "style|item|outfit|challenge",
    "title": "Short title",
    "description": "Detailed description",
    "confidence": 0.85,
    "tags": ["y2k", "streetwear", "nike"],
    "reasoning": "Why this recommendation fits the user"
  }
]

Focus on:
- Current trends that match their style
- Items they might like based on their behavior
- Outfit combinations from their closet
- Style challenges they'd enjoy

Be specific and actionable.`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a fashion expert AI that provides personalized style recommendations. Always respond with valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from AI')
    }

    const recommendations = JSON.parse(content) as FashionRecommendation[]
    return recommendations
  } catch (error) {
    console.error('Error getting style recommendations:', error)
    return []
  }
}

export async function generateStyleDNA(userBehavior: UserBehavior): Promise<string> {
  try {
    const prompt = `You are a fashion stylist AI. Analyze this user's outfits and produce a short style DNA tag like:
"Y2K ✦ Monochrome ✦ Urban Street ✦ Nike ✦ Oversized"

User Data:
- Posts: ${JSON.stringify(userBehavior.posts.map(p => p.tags).flat())}
- Likes: ${JSON.stringify(userBehavior.likes.map(l => l.tags).flat())}
- Saves: ${JSON.stringify(userBehavior.saves.map(s => s.tags).flat())}

Create a concise style DNA with 3-5 key elements separated by ✦ symbols.`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a fashion expert. Respond with only the style DNA tag, no additional text.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.5,
      max_tokens: 100,
    })

    return response.choices[0]?.message?.content?.trim() || 'Fashion ✦ Style ✦ Trend'
  } catch (error) {
    console.error('Error generating style DNA:', error)
    return 'Fashion ✦ Style ✦ Trend'
  }
}

export async function analyzeOutfit(imageUrl: string): Promise<{
  items: Array<{
    type: string
    color: string
    brand?: string
    confidence: number
  }>
  style: string
  tags: string[]
}> {
  try {
    const prompt = `Analyze this fashion outfit image and identify:
1. Each clothing item (type, color, potential brand)
2. Overall style category
3. Fashion tags

Respond in JSON format:
{
  "items": [
    {
      "type": "t-shirt|jeans|dress|shoes|etc",
      "color": "color name",
      "brand": "brand name if visible",
      "confidence": 0.85
    }
  ],
  "style": "casual|streetwear|formal|vintage|etc",
  "tags": ["y2k", "streetwear", "oversized", "etc"]
}`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a fashion analysis AI. Always respond with valid JSON.'
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl
              }
            }
          ]
        }
      ],
      temperature: 0.3,
      max_tokens: 500,
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from AI')
    }

    return JSON.parse(content)
  } catch (error) {
    console.error('Error analyzing outfit:', error)
    return {
      items: [],
      style: 'casual',
      tags: ['fashion']
    }
  }
} 