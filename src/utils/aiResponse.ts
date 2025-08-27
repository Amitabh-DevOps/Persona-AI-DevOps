import { GoogleGenerativeAI } from "@google/generative-ai";
import { type Persona } from "@/data/personas";
import { personas } from "@/data/personas";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);

type PersonalityTone = "default" | "funny" | "advice" | "educational";

function createPersonaContext(
  persona: Persona, 
  otherPersonas: Persona[] = [],
  personalityTone: PersonalityTone = "default"
) {
  let context = `
      PERSONA IDENTITY:
      You are ${persona.name}, ${persona.title}.${persona.bio}
      YOUR EXPERTISE:
      ${persona.specialties.join(", ")}
      YOUR COMMUNICATION STYLE:
      - Voice: ${persona.style.voice}
      - Personality traits: ${persona.style.traits.join(", ")}
      - Example phrases you often use: ${persona.tunes.join(" | ")}
      - Reply message in good way 
      - respond casually, like you're texting a friend. Be real, helpful, and fun.
      - Use your own vibe, but don't copy-paste catchphrases every time. You can include your tone, humor, or energy but **priority is replying to the user's question or comment**
      RESOURCES:
      - Gen AI Course Course link if asked: ${persona.genAICourse.courseLink}`;

  if (personalityTone !== "default") {
    context += `\n\nSPECIAL TONE INSTRUCTIONS:`;
    
    switch (personalityTone) {
      case "funny":
        context += `
        - Be extra humorous and playful in your responses
        - Use more jokes, emojis, and light-hearted expressions
        - Don't take anything too seriously
        - Incorporate more of your funny catchphrases`;
        break;
      
      case "advice":
        context += `
        - Focus on giving practical, actionable advice
        - Be more mentorship-oriented and supportive
        - Share personal experiences that might help the user
        - Be encouraging but realistic with your guidance`;
        break;
      
      case "educational":
        context += `
        - Be more explanatory and detailed in your responses
        - Focus on teaching concepts clearly and thoroughly
        - Use examples to illustrate points when relevant
        - Be patient and pedagogical in your approach`;
        break;
    }
  }

  return context.trim();
}

export async function generateAIResponse(
  message: string,
  activePersonas: Persona[],
  temperature: number = 0.7,
  personalityTone: PersonalityTone = "default"
) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        maxOutputTokens: 100,
        temperature: temperature,
      },
    });

    if (activePersonas.length === 1) {
      const persona = activePersonas[0];
      const otherTeachers = personas.filter((p) => p.id !== persona.id);
      const context = createPersonaContext(persona, otherTeachers, personalityTone);
      const userInstruction = `
        TASK:
        Respond to this message: "${message}"
        RESPONSE GUIDELINES:
        - Respond in Hinglish style as ${persona.name}
        - Keep your response to 3-4 Lines
        - Stay true to your unique voice and personality`;
      const prompt = context + userInstruction;
      const result = await model.generateContent(prompt);
      // response format eg. "hello, I am Shubham"
      return result.response.text();
    } else {
      const responses = {};
      for (const persona of activePersonas) {
        const otherActivePersonas = activePersonas.filter(
          (p) => p.id !== persona.id
        );
        const context = createPersonaContext(persona, otherActivePersonas, personalityTone);
        const userInstruction = `
          TASK:
          Respond to this message in a group chat to: "${message}"
          RESPONSE GUIDELINES:
          - Respond in Hinglish style as ${persona.name}
          - Keep your response to 3-4 Lines
          - Stay true to your unique voice and personality`;
        const prompt = context + userInstruction;
        const result = await model.generateContent(prompt);
        responses[persona.id] = result.response.text();
      }
      // response format eg. {"Shubham": "hello, I am Shubham"}
      return responses;
    }
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw error;
  }
}