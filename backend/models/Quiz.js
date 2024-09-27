import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  optionText: { type: String, required: true }
});

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: {
    type: [optionSchema],
    validate: [arrayLimit, '{PATH} must have exactly 4 options']
  },
  correctAnswer: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy', required: true }
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: { type: [questionSchema], required: true },
  createdAt: { type: Date, default: Date.now }
});

function arrayLimit(val) {
  return val.length === 4;
}

export default mongoose.model('Quiz', quizSchema);