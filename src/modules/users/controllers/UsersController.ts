import { Request, Response } from 'express';

import UsersRepository from '../repositories/UsersRepository';
import AuthenticateUserService from '../services/AuthenticateUserService';
import ListProfileService from '../services/ListProfileService';

class UsersController {
  async login(_: Request, response: Response) {
    return response.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
  }

  async callback(request: Request, response: Response) {
    const { code } = request.query;

    return response.json(code);
  }

  async show(request: Request, response: Response) {
    const { user_id } = request;

    const usersRepository = new UsersRepository();
    const service = new ListProfileService(usersRepository);

    const user = await service.execute(user_id);

    return response.json(user);
  }
  
  async signin(request: Request, response: Response): Promise<Response>{
    const { code } = request.query;

    const usersRepository = new UsersRepository();
    const service = new AuthenticateUserService(usersRepository);

    try {
      const result = await service.execute(code as string);

      return response.json(result);  
    } catch (error) {
      return response.json({error: error.message});
    }
  }
}

export default UsersController;