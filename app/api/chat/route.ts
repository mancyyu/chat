import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import type { 
  ChatCompletionUserMessageParam,
  ChatCompletionAssistantMessageParam,
  ChatCompletionSystemMessageParam
} from 'openai/resources/chat/completions';

const apiKey = process.env.DEEPSEEK_API_KEY;

if (!apiKey) {
  throw new Error('DEEPSEEK_API_KEY is not set in environment variables');
}

const client = new OpenAI({
  apiKey: apiKey,
  baseURL: 'https://api.deepseek.com',
});

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // 转换消息格式为 DeepSeek API 格式，确保类型正确
    const apiMessages: Array<
      ChatCompletionUserMessageParam | 
      ChatCompletionAssistantMessageParam | 
      ChatCompletionSystemMessageParam
    > = messages.map((msg: { role: string; content: string }) => {
      // 确保 role 是有效的值
      if (msg.role !== 'user' && msg.role !== 'assistant' && msg.role !== 'system') {
        throw new Error(`Invalid role: ${msg.role}`);
      }
      
      // 根据 role 类型返回正确的消息格式
      if (msg.role === 'user') {
        const userMsg: ChatCompletionUserMessageParam = {
          role: 'user',
          content: msg.content,
        };
        return userMsg;
      } else if (msg.role === 'assistant') {
        const assistantMsg: ChatCompletionAssistantMessageParam = {
          role: 'assistant',
          content: msg.content,
        };
        return assistantMsg;
      } else {
        const systemMsg: ChatCompletionSystemMessageParam = {
          role: 'system',
          content: msg.content,
        };
        return systemMsg;
      }
    });

    const response = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: apiMessages,
      temperature: 0.7,
    });

    const assistantMessage = response.choices[0]?.message?.content || '抱歉，我无法生成回复。';

    return NextResponse.json({
      message: assistantMessage,
    });
  } catch (error: any) {
    console.error('DeepSeek API Error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to get response from AI',
        details: error.response?.data || null
      },
      { status: error.status || 500 }
    );
  }
}

