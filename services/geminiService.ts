import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

// FIX: Aligned with @google/genai guidelines by removing the non-null assertion.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzePasswordStrength = async (password: string): Promise<AnalysisResult> => {
  const prompt = `Analyze the strength of the following password and provide feedback. Do not echo the password in your response. Password: "${password}"`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          strength: {
            type: Type.STRING,
            description: "A single rating of the password strength, such as 'Very Weak', 'Weak', 'Moderate', 'Strong', or 'Very Strong'."
          },
          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
            description: "An array of specific, actionable suggestions for improving the password's security. For example, 'Add uppercase letters' or 'Increase the length to at least 16 characters'."
          },
        },
        required: ["strength", "suggestions"],
      },
    }
  });
  
  // FIX: Trim whitespace from the response string before parsing to prevent errors.
  const jsonString = response.text.trim();
  try {
    const result: AnalysisResult = JSON.parse(jsonString);
    return result;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Could not parse the password analysis from the AI.");
  }
};
