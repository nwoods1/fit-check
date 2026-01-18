import {
  Laptop,
  BookOpen,
  Sparkles,
  Shirt,
  Building2,
  Mic2,
  Briefcase,
  Coffee,
  Presentation,
  GraduationCap,
  Crown
} from "lucide-react";

export interface StyleCategory {
  id: string;
  name: string;
  description: string;
  icon: typeof Laptop;
  gradient: string;
  emoji: string;
}

export const styleCategories: StyleCategory[] = [
  {
    id: "tech-bro",
    name: "Tech Bro",
    description: "Patagonia vests & Allbirds",
    icon: Laptop,
    gradient: "from-blue-500/20 to-indigo-500/20",
    emoji: "💻"
  },
  {
    id: "pinterest-girly",
    name: "Pinterest Girly",
    description: "Aesthetic & curated looks",
    icon: Sparkles,
    gradient: "from-pink-500/20 to-rose-500/20",
    emoji: "✨"
  },
  {
    id: "baggy",
    name: "Baggy",
    description: "Oversized streetwear vibes",
    icon: Shirt,
    gradient: "from-slate-500/20 to-zinc-500/20",
    emoji: "👖"
  },
  {
    id: "preppy",
    name: "Preppy",
    description: "Clean-cut collegiate",
    icon: BookOpen,
    gradient: "from-green-500/20 to-emerald-500/20",
    emoji: "🎓"
  },
  {
    id: "banana-republic",
    name: "Banana Republic",
    description: "Elevated everyday basics",
    icon: Building2,
    gradient: "from-amber-500/20 to-yellow-500/20",
    emoji: "🍌"
  },
  {
    id: "rapper",
    name: "Rapper Stuff",
    description: "Bold chains & drip",
    icon: Crown,
    gradient: "from-purple-500/20 to-violet-500/20",
    emoji: "🎤"
  },
  {
    id: "techwear",
    name: "Tech Wear",
    description: "Futuristic utility",
    icon: Mic2,
    gradient: "from-gray-500/20 to-neutral-500/20",
    emoji: "🥷"
  },
  {
    id: "business-formal",
    name: "Business Formal",
    description: "Suit up & show up",
    icon: Briefcase,
    gradient: "from-slate-600/20 to-gray-600/20",
    emoji: "👔"
  },
  {
    id: "business-casual",
    name: "Business Casual",
    description: "Professional yet relaxed",
    icon: Coffee,
    gradient: "from-stone-500/20 to-zinc-500/20",
    emoji: "☕"
  },
  {
    id: "ted-talk",
    name: "Ted Talk",
    description: "Inspire & innovate",
    icon: Presentation,
    gradient: "from-red-500/20 to-orange-500/20",
    emoji: "🎯"
  },
  {
    id: "teacher",
    name: "Teacher",
    description: "Smart & approachable",
    icon: GraduationCap,
    gradient: "from-teal-500/20 to-cyan-500/20",
    emoji: "📚"
  }
];
