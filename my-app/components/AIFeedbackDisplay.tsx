// components/AIFeedbackDisplay.tsx
'use client'

import { useEffect, useState } from 'react'
import type { AIFeedback } from '@/lib/aiHelper'

interface AIFeedbackDisplayProps {
  feedback: AIFeedback
  style: string
  snapshot: string
  onTryAgain: () => void
  onChangeStyle: () => void
}

export default function AIFeedbackDisplay({
  feedback,
  style,
  snapshot,
  onTryAgain,
  onChangeStyle
}: AIFeedbackDisplayProps) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    let start = 0
    const end = feedback.rating
    const duration = 1500
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setAnimatedScore(end)
        clearInterval(timer)
      } else {
        setAnimatedScore(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [feedback.rating])

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600'
    if (score >= 70) return 'text-blue-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 85) return 'bg-green-50 border-green-200'
    if (score >= 70) return 'bg-blue-50 border-blue-200'
    if (score >= 60) return 'bg-yellow-50 border-yellow-200'
    return 'bg-red-50 border-red-200'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">AI Style Analysis</h1>
            <p className="text-purple-100">Style: {style}</p>
          </div>

          <div className="p-8">
            {/* Score Display */}
            <div className={`border-4 rounded-2xl p-8 text-center mb-8 ${getScoreBgColor(feedback.rating)}`}>
              <div className={`text-7xl font-bold mb-2 ${getScoreColor(feedback.rating)}`}>
                {animatedScore}
              </div>
              <div className="text-2xl font-semibold text-gray-700 mb-1">
                {feedback.grade}
              </div>
              <div className="text-gray-600">
                out of 100
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Your Photo */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Outfit</h3>
                <img 
                  src={snapshot} 
                  alt="Your outfit" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>

              {/* Overall Feedback */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">AI Analysis</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-800 leading-relaxed">
                    {feedback.overall_feedback}
                  </p>
                </div>
              </div>
            </div>

            {/* Strengths */}
            {feedback.strengths && feedback.strengths.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">✨</span> What&apos;s Working
                </h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <ul className="space-y-2">
                    {feedback.strengths.map((strength, index) => (
                      <li key={index} className="text-green-800 flex items-start">
                        <span className="mr-2 mt-1">✓</span>
                        <span className="flex-1">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Weaknesses */}
            {feedback.weaknesses && feedback.weaknesses.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">💡</span> Areas to Improve
                </h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <ul className="space-y-2">
                    {feedback.weaknesses.map((weakness, index) => (
                      <li key={index} className="text-yellow-800 flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span className="flex-1">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Suggestions */}
            {feedback.suggestions && feedback.suggestions.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">👕</span> AI Suggestions
                </h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <ul className="space-y-2">
                    {feedback.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-blue-800 flex items-start">
                        <span className="mr-2 mt-1">→</span>
                        <span className="flex-1">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={onTryAgain}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                📸 Try Another Outfit
              </button>
              <button
                onClick={onChangeStyle}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Change Style
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}