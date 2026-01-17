// app/gemini/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function getGrade(rating: number): string {
  if (rating >= 90) return "A - Excellent! 🔥";
  if (rating >= 80) return "B - Great job! ✨";
  if (rating >= 70) return "C - Good effort! 👍";
  if (rating >= 60) return "D - Room for improvement 💪";
  return "F - Let's try something else 🤔";
}

export async function GET() {
  return NextResponse.json({ ok: true, route: "/gemini" });
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
    }

    const { imageBase64, styleTarget } = await req.json();

    const base64Data =
      typeof imageBase64 === "string" && imageBase64.includes(",")
        ? imageBase64.split(",")[1]
        : imageBase64;

    if (!base64Data) {
      return NextResponse.json({ error: "Missing imageBase64" }, { status: 400 });
    }

    const prompt = `You are an expert fashion stylist. Analyze this outfit photo for someone trying to achieve a ${styleTarget} style.

Return ONLY valid JSON (no markdown) in exactly this shape:
{
  "rating": 75,
  "strengths": ["..."],
  "weaknesses": ["..."],
  "suggestions": ["..."],
  "overall_feedback": "..."
}`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: base64Data,
                  },
                },
              ],
            },
          ],
          generationConfig: { temperature: 0.7, maxOutputTokens: 1000 },
        }),
      }
    );

    const geminiJson = await geminiRes.json();

    if (!geminiRes.ok) {
      return NextResponse.json(
        { error: "Gemini API error", details: geminiJson },
        { status: geminiRes.status }
      );
    }

    const text = geminiJson?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      return NextResponse.json({ error: "No text returned from Gemini" }, { status: 502 });
    }

    let cleaned = String(text).trim();
    cleaned = cleaned.replace(/^```json\s*/i, "").replace(/^```\s*/i, "");
    cleaned = cleaned.replace(/```$/i, "").trim();

    const feedback = JSON.parse(cleaned);
    feedback.grade = getGrade(Number(feedback.rating ?? 0));

    return NextResponse.json(feedback);
  } catch (err: any) {
    return NextResponse.json(
      { error: "Server error in /gemini", details: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}
