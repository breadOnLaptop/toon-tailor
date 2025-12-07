import {GoogleGenAI} from '@google/genai';
import { jsonToToon } from '../utils/helper';
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
console.log(GEMINI_API_KEY);

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

export const generateCharacter = async (message)=>{
  const prompt = jsonToToon(message);  
  const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      content: prompt
    });

  return response;
}
