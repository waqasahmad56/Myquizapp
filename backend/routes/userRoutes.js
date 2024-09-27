import express from 'express';
import { registerUser,loginUser,forgotPassword, resetPassword, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);  
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: `Welcome to out main dashboard` });
  });

export default router;
