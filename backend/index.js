import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import resultRoutes from './routes/resultRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDB();
app.use('/uploads', express.static('uploads'));
app.use('/auth/users', userRoutes);
app.use('/auth/quizzes', quizRoutes);
app.use('/auth/profiles', profileRoutes);
app.use('/auth/results', resultRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
