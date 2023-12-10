import express, { Express } from 'express';
import path from 'path';
import cors from 'cors'

import ApiCars from './routes/api/ApiCars';
import ApiAuth from './routes/api/ApiAuth';

const { PORT = 8000 } = process.env;
const PUBLIC_DIR = path.join(__dirname, 'public');

function createServer(): Express {
  const app = express();

  const corsOptions = {
      origin: ['http://localhost:5173'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      optionsSuccessStatus: 204, 
  };

  app.use(cors(corsOptions));

  app.use(express.static(PUBLIC_DIR));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/api/cars', ApiCars.routes());
  app.use('/api/auth', ApiAuth.routes());

  return app;
}

function runServer() {
  const app = createServer();

  app.listen(PORT, () => {
    console.log('Server running on http://localhost:%s', PORT);
  });
}

runServer();
