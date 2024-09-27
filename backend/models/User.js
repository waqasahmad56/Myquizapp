import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },


//   resetPasswordToken: { type: String },
//   resetPasswordExpires: { type: Date },

  role: {
    type: String,
    enum: ['student', 'admin'], 
    default: 'student',    
    required: true
  },
  secretKey: { type: String, validate: { validator: function(value) {  
    if (this.role === 'admin') { return value != null && value.length > 0; } return true }, 
    message: 'Secret key is required for admin role.' } 
  }
});

export default mongoose.model('User', userSchema);