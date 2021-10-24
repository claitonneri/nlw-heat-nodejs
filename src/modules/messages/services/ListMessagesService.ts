import ICreateMessageDTO from "../dtos/ICreateMessageDTO";
import MessagesRepository from "../repositories/MessagesRepository";

class ListMessagesService {
  constructor(private messagesRepository: MessagesRepository) { }

  async execute(): Promise<ICreateMessageDTO[]> {
    const messages = await this.messagesRepository.list();

    return messages;
  }
}

export default ListMessagesService;