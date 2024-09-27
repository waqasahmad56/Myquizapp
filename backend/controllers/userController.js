import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


    const registerUser = async (req, res) => {

    const { firstname, lastname, email, password, role, secretKey } = req.body;
 
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
   
    if (role === 'admin' && secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ message: 'Invalid secret key for admin' });
    }
 
     try {
         const existingUser = await User.findOne({ email });
         if (existingUser) {
         return res.status(409).json({ message: 'User already exists' });
     
   }
 
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ firstname, lastname, email, password: hashedPassword, role });
      await newUser.save();
      res.status(201).json({ message: 'User created' });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: "Server error" });
    }
  };
  const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'User not found' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '4h' });
      res.json({ token, role: user.role });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: err.message });
    }
  };


const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'User not found' });
  
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpire = Date.now() + 3600000; 
  
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = resetTokenExpire;
      await user.save();
  
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
      const mailOptions = {
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) requested a password reset. 
               Please click on the following link, or paste it into your browser to complete the process:
               ${resetUrl}
               If you did not request this, please ignore this email.`,
      };
  
      await transporter.sendMail(mailOptions);
      res.json({ message: 'Password reset link sent' });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    try {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }, 
      });
  
      if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
  
      await user.save();
      res.json({ message: 'Password reset successful' });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

const createUser = async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstname, lastname, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findByIdAndUpdate(id, { firstname, lastname, email, password: hashedPassword, role }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user', error });
  }
};


export { registerUser,loginUser,forgotPassword, resetPassword,createUser, updateUser, deleteUser };
