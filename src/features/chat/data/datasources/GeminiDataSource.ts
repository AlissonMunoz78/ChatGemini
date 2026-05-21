import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai';

import { Message } from '../../domain/entities/Message';

export class GeminiDataSource {
  private genAI: GoogleGenerativeAI;

  constructor() {

    const apiKey =
      process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';

    if (!apiKey) {
      throw new Error(
        'No se encontró la API KEY de Gemini'
      );
    }

    this.genAI =
      new GoogleGenerativeAI(apiKey);
  }

  async generateResponse(
    userMessage: string,
    history: Message[]
  ): Promise<string> {

    const model =
      this.genAI.getGenerativeModel({

        // Modelo recomendado para free tier
        model: 'models/gemini-1.5-flash',

        safetySettings: [
          {
            category:
              HarmCategory.HARM_CATEGORY_HARASSMENT,

            threshold:
              HarmBlockThreshold
                .BLOCK_MEDIUM_AND_ABOVE,
          },
        ],
      });

    // Convertir historial al formato Gemini
    const geminiHistory =
      history.map((msg) => ({
        role:
          msg.role === 'user'
            ? 'user'
            : 'model',

        parts: [
          {
            text: msg.content,
          },
        ],
      }));

    const chat = model.startChat({
      history: geminiHistory,

      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    const result =
      await chat.sendMessage(userMessage);

    return result.response.text();
  }
}