import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref:'User',required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  totalQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  incorrectAnswers: { type: Number, required: true },
  duration: { type: Number, required: true }, 
  resultPercentage: { type: Number, required: true },
  status: { type: String, required: true, enum: ['pass', 'fail'] },
}, { timestamps: true });

export default mongoose.model('Result', resultSchema);