import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const app = express();
const server = createServer(app);

// Initialize Socket.IO with CORS for your Next.js frontend
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Your Next.js URL
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join conversation room
  socket.on('join-conversation', (conversationId) => {
    socket.join(conversationId);
    console.log(`Socket ${socket.id} joined conversation ${conversationId}`);
  });

  // Handle new messages
  socket.on('send-message', async (data) => {
    const { conversationId, senderId, content } = data;
    
    try {
      // Save message to database (your existing logic)
      const message = await prisma.message.create({
        data: { content, senderId, conversationId },
        include: { sender: { select: { id: true, name: true,email:true,username:true } } }
      });

      // Broadcast to all users in the conversation room
      io.to(conversationId).emit('new-message', message);
    } catch (error) {
      socket.emit('error', 'Failed to send message');
    }
  });

  // Handle typing indicators
  socket.on('typing-start', (data) => {
    socket.to(data.conversationId).emit('user-typing', data);
  });

  socket.on('typing-stop', (data) => {
    socket.to(data.conversationId).emit('user-stopped-typing', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`WebSocket Server running on port ${PORT}`);
});


export default server