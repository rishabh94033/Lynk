import express, { Router } from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const searchRouter: Router = express.Router();


searchRouter.use(cors());
searchRouter.use(express.json());
const prisma = new PrismaClient();
searchRouter.get('/check', (req, res) => {
  res.send('Search endpoint is working!');
});

searchRouter.post('/', async (req: Request, res: Response) => {
  const { query } = req.body;
 
    if (!query || typeof query !== 'string') {
         res.status(400).json({ error: 'Invalid search query' });
         return;
    }

    try {
        // const messages = await prisma.message.findMany({
        //     where: {
        //         OR: [
        //             { content: { contains: query, mode: 'insensitive' } },
        //             { sender: { name: { contains: query, mode: 'insensitive' } } },
        //         ],
        //     },
        //     include: {
        //         sender: true,
        //         room: true,
        //     },
        // });

        const people = await prisma.user.findMany({
            where: {
                OR: [
                    { username: { contains: query, mode: 'insensitive' } },
                    { email: { contains: query, mode: 'insensitive' } },
                    { name: { contains: query, mode: 'insensitive' } },
                ],
            },
        });

        // const rooms = await prisma.room.findMany({
        //     where: {
        //         name: { contains: query, mode: 'insensitive' },
        //     },
        // });

        res.json({  people });
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ error: 'An error occurred while searching' });
    }

});

export default searchRouter;