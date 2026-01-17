// app/page.tsx
'use client'

import { useState } from 'react'
import StyleSelector from '@/components/StyleSelector'
import SimpleCameraView from '@/components/SimpleCameraView'
import AIFeedbackDisplay from '@/components/AIFeedbackDisplay'
import { getStyleById } from '@/lib/styleProfiles'
import { analyzeOutfitWithAI, type AIFeedback } from '@/lib/aiHelper'

export default function Home() {
  const [selectedStyleId, setSelectedStyleId] = useState<string | null>(null)
  const [snapshot, setSnapshot] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<AIFeedback | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedStyle = selectedStyleId ? getStyleById(selectedStyleId) : null

  async function handleCapture(imageBase64: string) {
    // IMPORTANT: flip to analyzing first so we don’t unmount the camera mid-render
    setIsAnalyzing(true)
    setError(null)
    setSnapshot(imageBase64)

    try {
      const aiFeedback = await analyzeOutfitWithAI(
        imageBase64,
        selectedStyle?.name || 'casual'
      )
      setFeedback(aiFeedback)
    } catch (err) {
      console.error('Analysis error:', err)
      setError('Failed to analyze outfit. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  function handleTryAgain() {
    setSnapshot(null)
    setFeedback(null)
    setError(null)
    setIsAnalyzing(false)
  }

  function handleChangeStyle() {
    setSelectedStyleId(null)
    setSnapshot(null)
    setFeedback(null)
    setError(null)
    setIsAnalyzing(false)
  }

  // Show style selector
  if (!selectedStyleId) {
    return <StyleSelector onSelectStyle={setSelectedStyleId} />
  }

  // Show analyzing state (takes priority once capture happens)
  if (isAnalyzing && snapshot && !feedback) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-purple-600 mx-auto"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Analyzing Your Outfit...
          </h2>
          <p className="text-gray-600">
            Our AI stylist is reviewing your look for {selectedStyle?.name} style
          </p>
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              💡 This usually takes 3-5 seconds
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Show camera (only when not analyzing)
  if (selectedStyleId && !snapshot && !isAnalyzing) {
    return (
      <SimpleCameraView
        styleName={selectedStyle?.name || 'Unknown'}
        onCapture={handleCapture}
        onBack={handleChangeStyle}
      />
    )
  }

  // Show error
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-4">
            <button
              onClick={handleTryAgain}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Try Again
            </button>
            <button
              onClick={handleChangeStyle}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show feedback
  if (feedback && snapshot) {
    return (
      <AIFeedbackDisplay
        feedback={feedback}
        style={selectedStyle?.name || 'Unknown'}
        snapshot={snapshot}
        onTryAgain={handleTryAgain}
        onChangeStyle={handleChangeStyle}
      />
    )
  }

  // Fallback (shouldn’t really hit)
  return null
}
