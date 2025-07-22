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

   const user1 = await prisma.user.findUnique({ where: { id: userId1 } });
const user2 = await prisma.user.findUnique({ where: { id: userId2 } });

if (!user1) {
   res.status(400).json({ message: "User1 not found." });
   return ;
}
if (!user2) {
   res.status(400).json({ message: "User2 not found." });
   return ;
}
const existing = await prisma.conversation.findFirst({
    where: {
  participants: {
    every: { id: { in: [userId1, userId2] } }
  },
  AND: [
    { participants: { some: { id: userId1 } } },
    { participants: { some: { id: userId2 } } },
  ]
},// this and check ensures that both users are part of the conversation and not the participnts from group chat

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



messageRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id },
      include: {
        participants: {
          select: { id: true, name: true, email: true },
        },
        messages: {
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            content: true,
            createdAt: true,
            sender: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    if (!conversation) {
       res.status(404).json({ error: "Conversation not found" });
      return;
    }

    res.status(200).json(conversation);
  } catch (error) {
    console.error("Failed to fetch conversation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// messageRouter.post("/messages/send", async (req, res) => {
//   const { senderId, recipientId, content } = req.body;

//   if (!senderId || !recipientId || !content) {
//      res.status(400).json({ error: "senderId, recipientId, and content are required." });
//      return;
//   }

//   try {
//     // Step 1: Check if a conversation between both participants already exists
//     let conversation = await prisma.conversation.findFirst({
//       where: {
//   participants: {
//     every: { id: { in: [senderId, recipientId] } }
//   },
//   AND: [
//     { participants: { some: { id: senderId } } },
//     { participants: { some: { id: recipientId } } },
//   ]
// },
      
//       include: {
//         participants: true,
//       },
//     });

//     // Step 2: If conversation doesn't exist, create one
//     if (!conversation) {
//       conversation = await prisma.conversation.create({
//         data: {
//           participants: {
//             connect: [{ id: senderId }, { id: recipientId }],
//           },
//         },
//         include: {
//           participants: true,
//         },
//       });
//     }

//     // Step 3: Create the message
//     const message = await prisma.message.create({
//       data: {
//         content,
//         sender: {
//           connect: { id: senderId },
//         },
//         conversation: {
//           connect: { id: conversation.id },
//         },
//       },
//     });

//      res.status(201).json({
//       message: "Message sent successfully",
//       data: {
//         message,
//         conversationId: conversation.id,
//       },
//     }
//   );
//   } catch (err) {
//     console.error("Error sending message:", err);
//      res.status(500).json({ error: "Internal server error" });
//      return;  
//   }
// });

messageRouter.post("/messages/send", async (req, res) => {
  const { conversationId, senderId, content } = req.body;

  if (!conversationId || !senderId || !content) {
     res.status(400).json({
      error: "conversationId, senderId, and content are required.",
    });
    return  ;
  }

  try {
    // Check if conversation exists
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) {
       res.status(404).json({ error: "Conversation not found." });return    ;
    }

    // Create message
    const message = await prisma.message.create({
      data: {
        content,
        senderId,
        conversationId,
      },
    });

     res.status(201).json({
      message: "Message sent successfully",
      data: {
        message,
        conversationId,
      },
    });return;
  } catch (error) {
    console.error("Error sending message:", error);
     res.status(500).json({ error: "Internal server error" });return;
  }
});




export default messageRouter;