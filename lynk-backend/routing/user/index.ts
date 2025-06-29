import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
const userRouter = express.Router();


userRouter.use(cors());
userRouter.use(express.json());
userRouter.get('/check', (req, res) => {
  res.send('User endpoint is working!');
});

userRouter.post('/create',async(req,res)=>{
    const { username, password, name, phone, email, bio, location, interests } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
    const response=await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            name,
            phone,
            email,
            bio,
            location,
            interests: interests || [], // Ensure interests is an array
        }
    });
    res.status(201).json(response);}
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'An error occurred while creating the user.' });
    }   
})

export default userRouter;