import express, { Router } from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
const userRouter: Router = express.Router();


userRouter.use(cors());
userRouter.use(express.json());
userRouter.get('/check', (req, res) => {
  res.send('User endpoint is working!');
});

userRouter.post('/userinfo', async (req, res) => {
  const { username, name, phone, email, bio, location, interests } = req.body;

  try {
    const formattedInterests = (interests || []).map((interest: string) => ({
      where: { name: interest },
      create: { name: interest },
    }));

    const updateData: any = {
  email,
  ...(username && { username }),
  ...(name && { name }),
  ...(phone && { phone }),
  ...(bio && { bio }),
  ...(location && { location }),
};

if (interests && Array.isArray(interests)) {
  const formattedInterests = interests.map((interest: string) => ({
    where: { name: interest },
    create: { name: interest },
  }));

  updateData.interests = {
    set: [],
    connectOrCreate: formattedInterests,
  };
}

    const response = await prisma.user.upsert({
      where: { email },
      update: updateData,
        
      create: {
        username,
        name,
        phone,
        email,
        bio,
        location,
        interests: {
          connectOrCreate: formattedInterests,
        },
      },
    });

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating/updating user:', error);
    res.status(500).json({ error: 'An error occurred while creating/updating the user.' });
  }
});


userRouter.post('/isonboarded', async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
     res.status(400).json({ error: 'Email is required.' });
     return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { onboarded: true },
    });

    if (!user) {
       res.status(404).json({ error: 'User not found.' });
       return;
    }

    if (!user.onboarded) {
       res.status(200).json({ onboarded: false, message: 'User is not onboarded yet.' });
       return;
    }

     res.status(200).json({ onboarded: true });
     return;
  } catch (error) {
    console.error('Error checking onboarding status:', error);
     res.status(500).json({ error: 'An error occurred while checking onboarding status.' });
     return;
  }
});


userRouter.get('/profile', async (req: Request, res: Response) => {
  const { email } = req.query;
  if (!email || typeof email !== 'string') {
     res.status(400).json({ error: 'Email is required and must be a string.' });
     return;
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        // image: true,
        interests: true,
      },
    });

    if (!user) {
       res.status(404).json({ error: 'User not found.' });
       return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
});

userRouter.post('/setonboardtrue', async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
     res.status(400).json({ error: 'Email is required.' });
     return;
  }
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { onboarded: true },
    });

    res.status(200).json({ message: 'User onboarding status updated successfully.', user });
  } catch (error) {
    console.error('Error updating onboarding status:', error);
    res.status(500).json({ error: 'An error occurred while updating onboarding status.' });
  } 


});


userRouter.post('/signup', async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    res.status(400).json({ error: 'Email already in use. Please log in or use another email.' });
    return;
  }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
});

userRouter.post("/google-signup", async (req, res) => {
  const { email, name, image } = req.body;

  if (!email) {
     res.status(400).json({ error: "Email is required." });
     return;
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          email,
          name,
          image,
          password: null,
        },
      });
    }

    res.status(200).json({ message: "Google user synced successfully." });
  } catch (err) {
    console.error("Error saving Google user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});



userRouter.post('/signin', async (req: Request, res: Response)=> {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required." });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password || typeof user.password !== "string") {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
       res.status(401).json({ error: "Invalid email or password." });
       return;
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Error during signin:", error);
    res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
});


export default userRouter;