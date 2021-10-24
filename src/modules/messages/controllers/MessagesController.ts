import { Request, Response } from 'express';

import MessagesRepository from '../repositories/MessagesRepository';
import CreateMessageService from '../services/CreateMessageService';
import ListMessagesService from '../services/ListMessagesService';

class MessagesController {

  async index(_: Request, response: Response): Promise<Response>{
    const messageRepository = new MessagesRepository();
    const service = new ListMessagesService(messageRepository);

    const messages = await service.execute();

    return response.status(201).json(messages);
  }

  async create(request: Request, response: Response): Promise<Response>{
    const { user_id } = request;
    const { text } = request.body;

    const messagesRepository = new MessagesRepository();
    const service = new CreateMessageService(messagesRepository);

    try {
      const result = await service.execute(text, user_id);

      return response.json(result);
    } catch (error) {
      return response.json({ error: error.message })
    }
  }
}

export default MessagesController;