import express from 'express';
import cors from 'cors';
import userRouter from './user';
// const router = express.Router();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.listen(port, () => {
  console.log(`Lynk Backend is running on http://localhost:${port}`);
});

app.use(express.json());
app.use('/user', userRouter);
