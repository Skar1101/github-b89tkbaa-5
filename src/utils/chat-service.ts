import OpenAI from 'openai';
import { CHAT_PROMPTS } from '../prompts/chat-prompts';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

if (!API_KEY) {
  throw new Error(
    'OpenAI API key is missing. Please add VITE_OPENAI_API_KEY to your .env file'
  );
}

const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true
});

export async function getChatResponse(message: string, mode: string) {
  if (!message) {
    throw new Error('Message is required');
  }

  try {
    const prompt = CHAT_PROMPTS[mode as keyof typeof CHAT_PROMPTS];
    
    if (!prompt) {
      throw new Error(`Invalid chat mode: ${mode}`);
    }
    
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    return response.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to get AI response');
  }
}