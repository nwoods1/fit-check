// lib/styleProfiles.ts
import type { StyleProfile } from '@/types/fashion'

export const styleProfiles: Record<string, StyleProfile> = {
  streetwear: {
    id: 'streetwear',
    name: 'Streetwear',
    description: 'Urban, trendy, and bold',
    emoji: '🔥',
    colors: {
      preferred: ['black', 'white', 'gray', 'grey', 'olive', 'khaki', 'brown', 'beige'],
      accent: ['red', 'orange', 'yellow', 'neon', 'bright'],
      avoid: ['pastel', 'pink', 'purple']
    },
    characteristics: {
      fit: ['oversized', 'relaxed', 'baggy'],
      patterns: ['graphic', 'logo', 'camo', 'tie-dye', 'bold'],
      mustHave: ['sneakers', 'statement piece', 'layering'],
      avoid: ['formal', 'fitted', 'dressy']
    },
    tips: [
      'Oversized fits are key',
      'Statement sneakers complete the look',
      'Layer with hoodies or jackets',
      'Bold graphics or logos work well'
    ]
  },

  businessCasual: {
    id: 'businessCasual',
    name: 'Business Casual',
    description: 'Professional yet approachable',
    emoji: '💼',
    colors: {
      preferred: ['navy', 'blue', 'gray', 'grey', 'black', 'white', 'beige', 'khaki'],
      accent: ['burgundy', 'forest green', 'wine'],
      avoid: ['neon', 'hot pink', 'lime']
    },
    characteristics: {
      fit: ['tailored', 'fitted', 'slim'],
      patterns: ['solid', 'subtle stripes', 'small checks'],
      mustHave: ['collared shirt or blazer', 'closed-toe shoes'],
      avoid: ['sneakers', 'graphic tees', 'overly casual']
    },
    tips: [
      'Well-fitted pieces are essential',
      'Stick to neutral color palette',
      'Avoid athletic wear',
      'Simple accessories only'
    ]
  },

  minimalist: {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean, simple, timeless',
    emoji: '⚪',
    colors: {
      preferred: ['black', 'white', 'gray', 'grey', 'beige', 'cream', 'navy'],
      accent: [],
      avoid: ['bright', 'neon', 'multicolor']
    },
    characteristics: {
      fit: ['tailored', 'clean', 'structured'],
      patterns: ['solid only'],
      mustHave: ['quality basics', 'clean lines'],
      avoid: ['busy patterns', 'logos', 'excess accessories']
    },
    tips: [
      'Quality over quantity',
      'Stick to 2-3 colors max',
      'No visible logos',
      'Clean, simple silhouettes'
    ]
  },

  y2k: {
    id: 'y2k',
    name: 'Y2K',
    description: 'Early 2000s nostalgia',
    emoji: '💿',
    colors: {
      preferred: ['pink', 'purple', 'silver', 'baby blue', 'lime', 'hot pink'],
      accent: ['metallics', 'neon', 'pastel'],
      avoid: ['earth tones', 'muted']
    },
    characteristics: {
      fit: ['fitted', 'cropped', 'low-rise', 'mini'],
      patterns: ['animal print', 'butterfly', 'checkered', 'shiny'],
      mustHave: ['something shiny or metallic', 'platform shoes'],
      avoid: ['oversized', 'minimalist', 'conservative']
    },
    tips: [
      'Embrace the shimmer',
      'Low-rise or mini bottoms',
      'Platform shoes are a must',
      'Have fun with accessories'
    ]
  },

  indie: {
    id: 'indie',
    name: 'Indie/Alt',
    description: 'Vintage, artistic, alternative',
    emoji: '🎸',
    colors: {
      preferred: ['brown', 'mustard', 'rust', 'forest green', 'burgundy', 'olive'],
      accent: ['burnt orange', 'deep purple', 'wine'],
      avoid: ['neon', 'bright pink', 'electric blue']
    },
    characteristics: {
      fit: ['relaxed', 'vintage', 'thrifted'],
      patterns: ['plaid', 'floral', 'vintage prints', 'corduroy'],
      mustHave: ['vintage piece', 'band tee or unique top'],
      avoid: ['overly trendy', 'athletic', 'preppy']
    },
    tips: [
      'Thrift and vintage vibes',
      'Layer with cardigans or flannels',
      'Earth tones are your friend',
      'Unique accessories complete the look'
    ]
  },

  athleisure: {
    id: 'athleisure',
    name: 'Athleisure',
    description: 'Athletic meets casual',
    emoji: '👟',
    colors: {
      preferred: ['black', 'gray', 'grey', 'white', 'navy'],
      accent: ['any sporty color'],
      avoid: ['overly formal colors']
    },
    characteristics: {
      fit: ['fitted', 'stretchy', 'athletic'],
      patterns: ['solid', 'color blocks', 'sporty'],
      mustHave: ['sneakers', 'athletic piece'],
      avoid: ['formal', 'dressy', 'stiff fabrics']
    },
    tips: [
      'Balance athletic and casual pieces',
      'Sneakers are essential',
      'Fitted but comfortable',
      'Can mix with casual pieces'
    ]
  }
}

export function getStyleById(styleId: string): StyleProfile | null {
  return styleProfiles[styleId] || null
}

export function getAllStyles(): StyleProfile[] {
  return Object.values(styleProfiles)
}

export function getStyleNames(): string[] {
  return Object.keys(styleProfiles)
}