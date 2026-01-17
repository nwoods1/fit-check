// types/fashion.ts

export interface StyleProfile {
  id: string
  name: string
  description: string
  emoji: string
  colors: {
    preferred: string[]
    accent: string[]
    avoid: string[]
  }
  characteristics: {
    fit: string[]
    patterns: string[]
    mustHave: string[]
    avoid: string[]
  }
  tips: string[]
}

export interface OutfitRegionAnalysis {
  colors: string[]
  brightness: number
  pattern: string
  dominantColor: string
}

export interface OutfitAnalysis {
  top?: OutfitRegionAnalysis
  bottom?: OutfitRegionAnalysis
  overall?: OutfitRegionAnalysis
}

export interface OutfitRating {
  score: number
  grade: string
  feedback: string[]
  suggestions: string[]
  strengths: string[]
  details?: {
    colorScore: number
    patternScore: number
    cohesionScore: number
  }
  advice?: string[]
}

export interface CapturedOutfit {
  analysis: OutfitAnalysis
  snapshot: string
  timestamp: string
}

export interface SavedRating {
  id: string
  user_id: string | null
  style_target: string
  score: number
  feedback: string[]
  suggestions: string[]
  outfit_colors: {
    top: string[]
    bottom: string[]
    overall: string[]
  }
  created_at: string
}

export interface PoseLandmark {
  x: number
  y: number
  z: number
  visibility: number
}

export interface Region {
  x: number
  y: number
  width: number
  height: number
}