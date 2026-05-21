import { Message } from '../../domain/entities/Message';
import { ChatRepository } from '../../domain/repositories/ChatRepository';
import { GeminiDataSource } from '../datasources/GeminiDataSource';

// La palabra 'implements' garantiza en tiempo de compilación
// que esta clase cumple con el contrato del Domain
export class ChatRepositoryImpl implements ChatRepository {
  private dataSource: GeminiDataSource;

  constructor() {
    this.dataSource = new GeminiDataSource();
  }

  async sendMessage(userMessage: string, history: Message[]): Promise<string> {
    return this.dataSource.generateResponse(userMessage, history);
  }
}