
import { GoogleGenAI, Type } from "@google/genai";
import type { DiagnosisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const wellnessPlanSchema = {
  type: Type.OBJECT,
  properties: {
    differentialDiagnosis: {
      type: Type.ARRAY,
      description: "A list of possible medical diagnoses based on the symptoms, from most likely to least likely.",
      items: { type: Type.STRING },
    },
    allopathicTreatment: {
      type: Type.STRING,
      description: "Recommended conventional (allopathic) medical treatments, including medications or procedures. Provide a general overview, not a prescription.",
    },
    ayurvedicTreatment: {
      type: Type.STRING,
      description: "Recommended Ayurvedic treatments, including herbal remedies, therapies, and principles.",
    },
    dietPlan: {
      type: Type.ARRAY,
      description: "A list of dietary recommendations, including foods to eat and foods to avoid.",
      items: { type: Type.STRING },
    },
    yogaRoutine: {
      type: Type.ARRAY,
      description: "A list of suggested yoga asanas or a short yoga routine beneficial for the condition.",
      items: { type: Type.STRING },
    },
    naturopathyTips: {
      type: Type.ARRAY,
      description: "A list of naturopathic tips and lifestyle changes, such as hydrotherapy, mud therapy, or sleep hygiene.",
      items: { type: Type.STRING },
    },
  },
  required: [
    "differentialDiagnosis",
    "allopathicTreatment",
    "ayurvedicTreatment",
    "dietPlan",
    "yogaRoutine",
    "naturopathyTips",
  ],
};

export const generateIntegrativeWellnessPlan = async (
  symptoms: string,
  age: number,
  sex: string,
  reports: string
): Promise<DiagnosisResult> => {
  const prompt = `
    Analyze the following health information and generate a comprehensive, integrative wellness plan.

    **Patient Information:**
    - Age: ${age}
    - Sex: ${sex}
    - Symptoms: ${symptoms}
    - Medical Reports Summary: ${reports || "No reports provided."}

    **Task:**
    Based on the information, provide a structured wellness plan. Do not provide a medical diagnosis or prescribe medicine, but offer a general guide for educational purposes.
    The plan should be holistic, covering allopathic, Ayurvedic, dietary, yoga, and naturopathic perspectives.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: wellnessPlanSchema,
      },
    });

    const jsonText = response.text.trim();
    // It's good practice to parse and validate the JSON
    const result = JSON.parse(jsonText);
    return result as DiagnosisResult;

  } catch (error) {
    console.error("Error generating wellness plan:", error);
    throw new Error("Failed to get a response from the AI. Please try again.");
  }
};
