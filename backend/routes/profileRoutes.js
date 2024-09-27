import express from 'express';
import { createProfile, getProfile } from '../controllers/profileController.js';
import upload from '../middleware/upload.js'; 

const router = express.Router();

router.post('/profile', upload.single('profilePic'), createProfile);
router.get('/profile', getProfile);

export default router;


