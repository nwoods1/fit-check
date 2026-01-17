// components/StyleSelector.tsx
'use client'

import { getAllStyles } from '@/lib/styleProfiles'

interface StyleSelectorProps {
  onSelectStyle: (styleId: string) => void
}

export default function StyleSelector({ onSelectStyle }: StyleSelectorProps) {
  const styles = getAllStyles()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Fashion Style Rater
          </h1>
          <p className="text-xl text-gray-600">
            Choose your target style and we'll rate your outfit
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {styles.map((style) => (
            <button
              key={style.id}
              onClick={() => onSelectStyle(style.id)}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-left"
            >
              <div className="text-4xl mb-3">{style.emoji}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {style.name}
              </h3>
              <p className="text-gray-600 mb-4">{style.description}</p>
              
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {style.colors.preferred.slice(0, 4).map((color) => (
                    <span
                      key={color}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {color}
                    </span>
                  ))}
                </div>
                
                <p className="text-sm text-gray-500 italic">
                  &quot;{style.tips[0]}&quot;
                </p>
              </div>
              
              <div className="mt-4 text-purple-600 font-semibold flex items-center">
                Select this style
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}