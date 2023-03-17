import { IMessage, messageZodSchema } from "../types/interfaces/IMessages";
import { IChat } from "../types/interfaces/IChat";

export class MessageService {
  private readonly messages: IMessage[] = [];

  constructor(private readonly chat: IChat) {}

  public addMessage(message: IMessage): IMessage {
    const validatedMessage = messageZodSchema.parse(message);
    this.messages.push(validatedMessage);
    return validatedMessage;
  }

  public getMessages(): IMessage[] {
    return [...this.messages];
  }

  public getMessagesBySenderId(senderId: string): IMessage[] {
    return this.messages.filter((msg) => msg.senderId === senderId);
  }

  public getMessagesByRecipientId(recipientId: string): IMessage[] {
    return this.messages.filter((msg) => msg.recipientId === recipientId);
  }
}
