import express, { RequestHandler, Response } from 'express';
import { connectRedis, redisClient } from './database/redisClient';
import { db } from './database/connection';

async function start() {
  await connectRedis();

  const app = express();
  app.use(express.json());

  const router = express.Router();

  const getUsers: RequestHandler = async (_req, res): Promise<any> => {
  
    const cacheKey = 'users:all';
    const cachedUsers = await redisClient.get(cacheKey);
  
    if (cachedUsers) {
      return res.json({ fromCache: true, data: JSON.parse(cachedUsers) });
    }
  
    await new Promise(resolve => setTimeout(resolve, 3000));
    const [rows] = await db.query('SELECT * FROM users');
  
    await redisClient.setEx(cacheKey, 60, JSON.stringify(rows));
  
    return res.json({ fromCache: false, data: rows });
  };

  router.get('/users', getUsers); 

  app.use(router);

  app.listen(3000, () => console.log('✅ Server running!'));
}

start();
