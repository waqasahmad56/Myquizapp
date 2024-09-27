import express from 'express';
import { saveResult, getResults } from '../controllers/resultController.js';

const router = express.Router();

router.post('/results', saveResult);
router.get('/results', getResults);

export default router;
