import { useState, useCallback, useMemo } from 'react';
import { Message } from '../../domain/entities/Message';
import { SendMessageUseCase } from '../../domain/usecases/SendMessageUseCase';
import { ChatRepositoryImpl } from '../../data/repositories/ChatRepositoryImpl';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Inyección de dependencias
  const sendMessageUseCase = useMemo(() => {
    return new SendMessageUseCase(new ChatRepositoryImpl());
  }, []);

  const sendMessage = useCallback(async (userInput: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { userMessage, assistantMessage } =
        await sendMessageUseCase.execute(userInput, messages);

      setMessages(prev => [...prev, userMessage, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  }, [messages, sendMessageUseCase]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
  };
};