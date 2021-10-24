import { Router } from 'express';

import ensureAuthenticated from '../../users/middleware/ensureAuthenticated';
import MessagesController from '../controllers/MessagesController';

const messagesRouter = Router();
const messagesController = new MessagesController();

messagesRouter.get('/', ensureAuthenticated, messagesController.index);
messagesRouter.post('/', ensureAuthenticated, messagesController.create);

export default messagesRouter;