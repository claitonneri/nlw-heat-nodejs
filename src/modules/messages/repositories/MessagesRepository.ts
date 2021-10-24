import { Message, PrismaClient } from '@prisma/client';

import ICreateMessageDTO from '../dtos/ICreateMessageDTO';

const prisma = new PrismaClient();

class MessagesRepository {
  async list(): Promise<Message[]>{
    const messages = await prisma.message.findMany({
      take: 3,
      orderBy: {
        created_at: 'desc'
      },
      include: {
        user: true
      }
    });

    return messages;
  }

  async create({ text, user_id }: ICreateMessageDTO) {
    const message = await prisma.message.create({
      data: {
        text,
        user_id
      },
      include: {
        user: true
      }
    });

    return message;
  }
}

export default MessagesRepository;