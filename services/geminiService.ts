import { GoogleGenAI, Type, Schema } from "@google/genai";
import { PresentationData } from "../types";

// Use the appropriate model
const MODEL_NAME = "gemini-2.5-flash";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const presentationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    topic: { type: Type.STRING, description: "The main topic of the presentation" },
    title: { type: Type.STRING, description: "A catchy title for the presentation" },
    subtitle: { type: Type.STRING, description: "A short subtitle or tagline" },
    slides: {
      type: Type.ARRAY,
      description: "List of slides for the presentation",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Title of the slide" },
          content: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING }, 
            description: "Bullet points for the slide content" 
          },
          notes: { type: Type.STRING, description: "Speaker notes for this slide" },
          imageQuery: { type: Type.STRING, description: "A 2-3 word search term to find a relevant background image from unsplash/picsum (e.g. 'modern city', 'blue technology')" }
        },
        required: ["title", "content", "imageQuery"]
      }
    }
  },
  required: ["topic", "title", "slides"]
};

export const generatePresentation = async (topic: string): Promise<PresentationData> => {
  const prompt = `Create a professional presentation about "${topic}". 
  The presentation should have 6-8 slides. 
  Make it engaging, informative, and structured for a Reveal.js presentation.
  For each slide, provide a 'imageQuery' which is a simple keyword string describing a visual that would match the slide content (e.g., 'abstract code', 'team meeting', 'finance chart').
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: presentationSchema,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No content generated");
    }

    const data = JSON.parse(text) as PresentationData;
    return data;
  } catch (error) {
    console.error("Error generating presentation:", error);
    throw error;
  }
};