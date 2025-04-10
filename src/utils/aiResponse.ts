import { GoogleGenerativeAI } from "@google/generative-ai";
import { type Persona } from "@/data/personas";
import { personas } from "@/data/personas";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);

function createPersonaContext(persona: Persona, otherPersonas: Persona[] = []) {
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
      - respond casually, like you’re texting a friend. Be real, helpful, and fun.
      - Use your own vibe, but don’t copy-paste catchphrases every time. You can include your tone, humor, or energy but **priority is replying to the user's question or comment**


      RESOURCES:
      - Gen AI Course Course link if asked: ${persona.genAICourse.courseLink}`;

  return context.trim();
}

export async function generateAIResponse(
  message: string,
  activePersonas: Persona[]
) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        maxOutputTokens: 100,
        temperature: 0.7,
      },
    });

    if (activePersonas.length === 1) {
      const persona = activePersonas[0];
      const otherTeachers = personas.filter((p) => p.id !== persona.id);

      const context = createPersonaContext(persona, otherTeachers);
      const userInstruction = `
        TASK:
        Respond to this message: "${message}"

        RESPONSE GUIDELINES:
        - Respond in Hinglish style as ${persona.name}
        - Keep your response to 3-4 Lines
        - Stay true to your unique voice and personality`;

      const prompt = context + userInstruction;
      const result = await model.generateContent(prompt);

      // response format eg. "hello, I am Hitesh"
      return result.response.text();
    } else {
      const responses = {};

      for (const persona of activePersonas) {
        const otherActivePersonas = activePersonas.filter(
          (p) => p.id !== persona.id
        );

        const context = createPersonaContext(persona, otherActivePersonas);
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

      // response formate eg. {"hitesh": "hello, I am Hitesh"}
      return responses;
    }
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw error;
  }
}
