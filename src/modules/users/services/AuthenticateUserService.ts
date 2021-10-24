import axios from 'axios';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';

import UsersRepository from '../repositories/UsersRepository';

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserAuthenticateResponse {
  id: number;
  name: string;
  login: string;
  avatar_url: string;
}

class AuthenticateUserService {
  constructor(private usersRepository: UsersRepository){}

  async execute(code: string): Promise<{user: User, token: string}> {
    const url = 'https://github.com/login/oauth/access_token';

    const { data } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      headers: {
        "Accept": "application/json"
      }
    });

    const response = await axios.get<IUserAuthenticateResponse>('https://api.github.com/user', {
      headers: {
        authorization: `Bearer ${data.access_token}`
      }
    });

    const { id, name, login, avatar_url } = response.data;
    
    let user = await this.usersRepository.find(id);

    if (!user) {
      user = await this.usersRepository.create({
        name,
        github_id: id,
        login,
        avatar_url
      });
    }

    const token = sign({
      user: {
        name: user.name,
        avatar_url: user.avatar_url,
        id: user.id
      }
    }, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: '1d'
    });

    return { user, token  };
  }
}

export default AuthenticateUserService;