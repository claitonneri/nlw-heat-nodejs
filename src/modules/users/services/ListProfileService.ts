import { User } from "@prisma/client";
import UsersRepository from "../repositories/UsersRepository";

class ListProfileService {
  constructor(private usersRepository: UsersRepository){}

  async execute(user_id: string): Promise<User> {
    const user = await this.usersRepository.findOne(user_id);

    if (!user) {
      throw new Error('Profile user not exists.');
    }

    return user;
  }
}

export default ListProfileService;