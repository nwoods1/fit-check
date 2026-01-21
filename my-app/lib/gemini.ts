import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
});

export const geminiModel = {
  generateVisionRating: async (prompt: string, imageBase64: string) => {
    return await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            { inlineData: { mimeType: "image/jpeg", data: imageBase64 } },
          ],
        },
      ],
    });
  },

  generateStyleRubric: async (styleDescription: string) => {
    const prompt = `You are a fashion expert. Given this style description, generate a JSON object with these exact fields:
- signature_items: array of 4-5 key clothing items/pieces that define this style
- avoid: array of 3-4 items/styles that don't fit this aesthetic
- palette_materials: array of 2-3 color palettes and fabric types appropriate for this style
- silhouette: array of 2-3 silhouette descriptors (e.g., "tailored", "relaxed", "structured")

Style description: "${styleDescription}"

Respond ONLY with valid JSON, no markdown code blocks or explanation. Example format:
{"signature_items":["item1","item2"],"avoid":["item1"],"palette_materials":["colors and fabrics"],"silhouette":["descriptor1"]}`;

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
    // Clean up any markdown formatting and parse JSON
    const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(cleaned);
  },
};
