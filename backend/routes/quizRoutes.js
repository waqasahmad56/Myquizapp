import express from 'express';
import { createQuiz, getQuizzes, deleteQuiz, updateQuiz,getQuizze } from '../controllers/quizController.js';

const router = express.Router();

router.post('/create-quiz', createQuiz);

router.get('/quizzes', getQuizzes);

router.delete('/delquizzes/:id', deleteQuiz);

router.put('/updatequizzes/:id', updateQuiz);
router.get('/question/quizzes', getQuizze);

export default router;


