import { PrismaClient, User } from '@prisma/client';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

const prisma = new PrismaClient();

class UsersRepository {
  async find(id: number): Promise<User | undefined> {
    const user = await prisma.user.findFirst({
      where: {
        github_id: id
      }
    });

    return user;
  }

  async findOne(user_id: string): Promise<User | undefined>{
    const user = await prisma.user.findFirst({
      where: {
        id: user_id
      }
    });

    return user;
  }

  async create({ name, github_id, login, avatar_url }: ICreateUserDTO): Promise<User>{
    const user = await prisma.user.create({
      data: {
        name,
        github_id,
        login,
        avatar_url
      }
    });

    return user;
  }
}

export default UsersRepository;