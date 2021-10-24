import { Router } from 'express';

import messagesRouter from './modules/messages/routes/messages.routes';
import usersRouter from './modules/users/routes/users.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/messages', messagesRouter);

export default routes;