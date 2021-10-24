import { Message } from "@prisma/client";
import { io } from "../../../app";
import MessagesRepository from "../repositories/MessagesRepository";

class CreateMessageService {
  constructor(private messagesRepository: MessagesRepository) { }
  
  async execute(text: string, user_id: string): Promise<Message> {
    const message = await this.messagesRepository.create({ text, user_id });

    const infoSocket = {
      text: message.text,
      user_id: message.user_id,
      created_at: message.created_at,
      user: {
        name: message.user.name,
        avatar_url: message.user.avatar_url
      }
    }

    io.emit('new_message', infoSocket);
    
    return message;
  }
}

export default CreateMessageService;