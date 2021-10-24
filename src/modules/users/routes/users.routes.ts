import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/github', usersController.login);
usersRouter.get('/signin/callback', usersController.callback);
usersRouter.get('/profile', usersController.show);
usersRouter.post('/authenticate', usersController.signin);

export default usersRouter;