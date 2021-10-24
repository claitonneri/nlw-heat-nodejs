import 'dotenv/config';

import http from 'http';
import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';

import routes from './routes';

const app = express();
const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: {
    origin: '*'
  }
});

io.on('connection', socket => {
  console.log(`Usuário conectado no socket ${socket.id}`)
});

app.use(cors());
app.use(express.json());
app.use(routes);

export { serverHttp, io };