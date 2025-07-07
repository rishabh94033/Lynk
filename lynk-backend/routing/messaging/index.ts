import express, { Router } from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const messageRouter: Router = express.Router();


messageRouter.use(cors());
messageRouter.use(express.json());
const prisma = new PrismaClient();
messageRouter.get('/check', (req, res) => {
  res.send('Search endpoint is working!');
});

messageRouter.post('/', async (req: Request, res: Response) => {
   const { userId1, userId2 } = req.body;
const existing = await prisma.conversation.findFirst({
    where: {
      participants: {
        every: {
          id: { in: [userId1, userId2] },
        },
      },
    },
    include: {
      participants: true,
    },
  });

if (existing) {
   res.status(200).json({
    message: "Conversation already exists",
    data: existing,
  });
  return;
}

// Create new conversation
const newConv = await prisma.conversation.create({
  data: {
    participants: {
      connect: [{ id: userId1 }, { id: userId2 }],
    },
  },
  include: {
    participants: true,
  },
});

 res.status(200).json({
  message: "Conversation created successfully",
  data: newConv,
});
return;
});


export default messageRouter;