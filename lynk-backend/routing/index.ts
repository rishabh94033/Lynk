import express from 'express';
import cors from 'cors';
import userRouter from './user';
import searchRouter from './search';
import messageRouter from './messaging';
// const router = express.Router();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.listen(port, () => {
  console.log(`Lynk Backend is running on http://localhost:${port}`);
});

app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/search', searchRouter);
app.use('/api/conversation',messageRouter);