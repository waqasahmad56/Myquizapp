import path from 'path';
import Profile from '../models/Profile.js';

const createProfile = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const profilePic = req.file ? path.basename(req.file.path) : '';  

  try {
    const newProfile = new Profile({
      firstName,
      lastName,
      email,
      password,
      profilePic,
    });

    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving profile' });
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne(); 
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { createProfile, getProfile };

