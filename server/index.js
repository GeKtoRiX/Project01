import dotenv from 'dotenv';
import express from 'express';
import { fileURLToPath } from 'url';
import { connectDB } from './connectDB.js';
import applyMiddlewares from './middlewares.js';
import upload from './fileStorage.js';
import { register } from './controllers/auth.js';

// /=======.ENV=======/
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// /=======APP=======/
const app = express();

// /=======PATHS=======/
const __filename = fileURLToPath(import.meta.url);

// /=======MIDDLEWARES=======/
applyMiddlewares(app, __filename);

// /=======ROUTES=======/
// Регистрация нового пользователя.
app.post('/auth/register', upload.single('picture'), register);

const getStarted = async () => {
  console.log('/==============/');
  try {
    await connectDB(MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Listening port ${PORT}...`);
    });
  } catch (error) {
    console.error(`getStarted Error: ${error}`);
  }
};

getStarted();
