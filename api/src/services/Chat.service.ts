import { IChat, chatZodSchema } from "../types/interfaces/IChat";
import { IMessage, messageZodSchema } from "../types/interfaces/IMessages";

export default class ChatService {
  private chats: IChat[] = [];

  create(chat: IChat): IChat {
    const validatedChat = chatZodSchema.parse(chat);
    this.chats.push(validatedChat);
    return validatedChat;
  }

  findByGroupId(groupId: string): IChat | undefined {
    return this.chats.find((chat) => chat.groupId === groupId);
  }

  addMessage(groupId: string, message: IMessage): IChat | undefined {
    const chat = this.findByGroupId(groupId);
    if (chat) {
      const validatedMessage = messageZodSchema.parse(message);
      chat.messages.push(validatedMessage);
    }
    return chat;
  }

  listAll(): IChat[] {
    return this.chats;
  }
}
