
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
  reports: string,
  reportFiles: Array<{ mimeType: string; data: string; description: string }> | null
): Promise<DiagnosisResult> => {
    let reportDetails = "";
    if (reportFiles && reportFiles.length > 0) {
        reportDetails += `\n\n**Attached Medical Reports:**`;
        reportDetails += `\nThere are ${reportFiles.length} image(s) of medical reports attached.`;
        reportDetails += "\nHere are the user-provided descriptions for each report:";
        reportFiles.forEach((file, index) => {
            reportDetails += `\n- Report ${index + 1}: ${file.description || 'No description provided.'}`;
        });
        reportDetails += "\nPlease analyze the content of these images in conjunction with their descriptions and the other patient information."
    }
  
    const prompt = `
    Analyze the following health information and generate a comprehensive, integrative wellness plan.

    **Patient Information:**
    - Age: ${age}
    - Sex: ${sex}
    - Symptoms: ${symptoms}
    - Medical Reports Summary (Text): ${reports || "No summary provided."}
    ${reportDetails}

    **Task:**
    Based on all the provided information, provide a structured wellness plan. Do not provide a medical diagnosis or prescribe medicine, but offer a general guide for educational purposes.
    The plan should be holistic, covering allopathic, Ayurvedic, dietary, yoga, and naturopathic perspectives.
  `;

  try {
    const textPart = { text: prompt };
    const parts: ({ text: string } | { inlineData: { mimeType: string; data: string; }})[] = [textPart];

    if (reportFiles) {
        for (const reportFile of reportFiles) {
            parts.push({
                inlineData: {
                    mimeType: reportFile.mimeType,
                    data: reportFile.data
                }
            });
        }
    }
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: wellnessPlanSchema,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result as DiagnosisResult;

  } catch (error) {
    console.error("Error generating wellness plan:", error);
    throw new Error("Failed to get a response from the AI. Please try again.");
  }
};

export const interpretWellnessPlan = async (plan: DiagnosisResult): Promise<string> => {
  const prompt = `
    Based on the following AI-generated wellness plan, provide a simple, easy-to-understand interpretation for the user in a conversational and empathetic tone. The output should be plain text, using newlines for paragraph breaks. Do not use markdown.

    Your tasks are:
    1.  Start with a clear disclaimer that this is an interpretation of an AI-generated educational guide and NOT a substitute for professional medical advice. The user must consult a qualified doctor.
    2.  Explain each section of the report (e.g., "What 'Differential Diagnosis' means for you," "Understanding the Allopathic Suggestions," etc.).
    3.  Briefly describe how the different approaches (Allopathic, Ayurvedic, Diet, Yoga) work together to create a holistic plan.
    4.  Maintain a positive and empowering tone, encouraging the user to take this information to a healthcare professional for a proper consultation.

    Here is the wellness plan to interpret:
    ${JSON.stringify(plan, null, 2)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error interpreting wellness plan:", error);
    throw new Error("Failed to get an interpretation from the AI.");
  }
};
