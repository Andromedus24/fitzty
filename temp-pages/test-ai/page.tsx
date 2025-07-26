'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestAIPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const testOpenRouter = async () => {
    setLoading(true)
    setError('')
    setResult('')

    try {
      const response = await fetch('/api/test-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: 'Generate a short fashion recommendation for someone who likes streetwear style.'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data.recommendation)
      } else {
        setError(data.error || 'Failed to get AI response')
      }
    } catch (err) {
      setError('Network error: ' + (err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Test OpenRouter AI Integration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={testOpenRouter} 
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Testing...' : 'Test AI Recommendation'}
            </Button>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="font-semibold text-red-800">Error:</h3>
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {result && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800">AI Response:</h3>
                <p className="text-green-700 whitespace-pre-wrap">{result}</p>
              </div>
            )}

            <div className="text-sm text-gray-600">
              <p>This test uses your OpenRouter API key to generate a fashion recommendation using the Mistral Small 3.2 24B model.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 