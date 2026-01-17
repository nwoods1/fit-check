// lib/aiHelper.ts
export interface AIFeedback {
  rating: number
  grade: string
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  overall_feedback: string
}

export async function analyzeOutfitWithAI(imageBase64: string, styleTarget: string) {
  const res = await fetch("/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageBase64, styleTarget }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Gemini route error:", data);
    throw new Error(`Gemini route error: ${res.status}`);
  }

  return data as AIFeedback;
}
