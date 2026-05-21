import { Message }  from "../entities/Message";

//contrato define QUE se puede hacer, no COMO 

export interface ChatRepository {
    sendMessage(userMessage: string, history: Message[]): Promise<string>;
}