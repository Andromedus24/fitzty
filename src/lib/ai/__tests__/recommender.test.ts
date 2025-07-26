import { getStyleRecommendations, generateStyleDNA, analyzeOutfit } from '../recommender'

// Mock OpenAI
jest.mock('openai', () => ({
  default: jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [
            {
              message: {
                content: JSON.stringify([
                  {
                    type: 'style',
                    title: 'Y2K Revival',
                    description: 'Embrace the 2000s aesthetic with bold colors and retro silhouettes',
                    confidence: 0.85,
                    tags: ['y2k', 'retro', 'bold'],
                    reasoning: 'Based on your love for vintage styles'
                  }
                ])
              }
            }
          ]
        })
      }
    }
  }))
}))

describe('AI Recommender', () => {
  describe('getStyleRecommendations', () => {
    it('should return fashion recommendations for a user', async () => {
      const userId = 'test-user-id'
      const recommendations = await getStyleRecommendations(userId)
      
      expect(Array.isArray(recommendations)).toBe(true)
      expect(recommendations.length).toBeGreaterThan(0)
      expect(recommendations[0]).toHaveProperty('type')
      expect(recommendations[0]).toHaveProperty('title')
      expect(recommendations[0]).toHaveProperty('description')
      expect(recommendations[0]).toHaveProperty('confidence')
      expect(recommendations[0]).toHaveProperty('tags')
      expect(recommendations[0]).toHaveProperty('reasoning')
    })

    it('should handle errors gracefully', async () => {
      // Mock OpenAI to throw an error
      const mockOpenAI = require('openai').default
      mockOpenAI.mockImplementationOnce(() => ({
        chat: {
          completions: {
            create: jest.fn().mockRejectedValue(new Error('API Error'))
          }
        }
      }))

      const recommendations = await getStyleRecommendations('test-user')
      expect(recommendations).toEqual([])
    })
  })

  describe('generateStyleDNA', () => {
    it('should generate style DNA from user behavior', async () => {
      const userBehavior = {
        posts: [
          { tags: ['y2k', 'streetwear'], style: 'casual', brand: ['nike'], color: ['black'], price: 'medium' }
        ],
        likes: [
          { tags: ['vintage', 'oversized'], style: 'streetwear', brand: ['adidas'], color: ['white'] }
        ],
        saves: [
          { tags: ['minimalist', 'monochrome'], style: 'minimal', brand: ['uniqlo'], color: ['gray'] }
        ],
        closet: [
          { category: 'tops', brand: 'nike', color: 'black', tags: ['basic', 'comfortable'] }
        ]
      }

      const styleDNA = await generateStyleDNA(userBehavior)
      
      expect(typeof styleDNA).toBe('string')
      expect(styleDNA).toContain('✦')
      expect(styleDNA.length).toBeGreaterThan(0)
    })

    it('should return default style DNA on error', async () => {
      // Mock OpenAI to throw an error
      const mockOpenAI = require('openai').default
      mockOpenAI.mockImplementationOnce(() => ({
        chat: {
          completions: {
            create: jest.fn().mockRejectedValue(new Error('API Error'))
          }
        }
      }))

      const userBehavior = {
        posts: [],
        likes: [],
        saves: [],
        closet: []
      }

      const styleDNA = await generateStyleDNA(userBehavior)
      expect(styleDNA).toBe('Fashion ✦ Style ✦ Trend')
    })
  })

  describe('analyzeOutfit', () => {
    it('should analyze outfit from image URL', async () => {
      const imageUrl = 'https://example.com/outfit.jpg'
      
      // Mock OpenAI to return outfit analysis
      const mockOpenAI = require('openai').default
      mockOpenAI.mockImplementationOnce(() => ({
        chat: {
          completions: {
            create: jest.fn().mockResolvedValue({
              choices: [
                {
                  message: {
                    content: JSON.stringify({
                      items: [
                        {
                          type: 't-shirt',
                          color: 'white',
                          brand: 'nike',
                          confidence: 0.9
                        }
                      ],
                      style: 'casual',
                      tags: ['streetwear', 'comfortable']
                    })
                  }
                }
              ]
            })
          }
        }
      }))

      const analysis = await analyzeOutfit(imageUrl)
      
      expect(analysis).toHaveProperty('items')
      expect(analysis).toHaveProperty('style')
      expect(analysis).toHaveProperty('tags')
      expect(Array.isArray(analysis.items)).toBe(true)
      expect(typeof analysis.style).toBe('string')
      expect(Array.isArray(analysis.tags)).toBe(true)
    })

    it('should return default analysis on error', async () => {
      // Mock OpenAI to throw an error
      const mockOpenAI = require('openai').default
      mockOpenAI.mockImplementationOnce(() => ({
        chat: {
          completions: {
            create: jest.fn().mockRejectedValue(new Error('API Error'))
          }
        }
      }))

      const analysis = await analyzeOutfit('https://example.com/outfit.jpg')
      
      expect(analysis).toEqual({
        items: [],
        style: 'casual',
        tags: ['fashion']
      })
    })
  })
}) 