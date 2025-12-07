import { GoogleGenAI } from '@google/genai';
import { jsonToToon } from '../utils/helper';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const generateCharacter = async (message) => {
  const prompt = jsonToToon({ prompt: message });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ],
  });

  const output = response.text;

  const cleaned = output
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const parsed = JSON.parse(cleaned);

  return parsed;
};
