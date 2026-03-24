// backend/src/services/ai.ts
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateSmartReply = async (conversation: string[]) => {
  const prompt = `
  Generate 3 short, natural smart replies for this WhatsApp-style conversation.
  Keep them under 50 characters each. Be helpful and conversational.
  
  Conversation: ${conversation.slice(-6).join('\n')}
  
  Replies (numbered 1-3):
  `;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 100,
    temperature: 0.7
  });

  return completion.choices[0].message.content?.split('\n').filter(Boolean) || [];
};
