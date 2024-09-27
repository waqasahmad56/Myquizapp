import Quiz from '../models/Quiz.js';
import User from '../models/User.js'; 

const createQuiz = async (req, res) => {
  const { title, questions } = req.body;

  if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ message: 'Invalid quiz data' });
  }

  const newQuiz = new Quiz({
    title,
    questions: questions.map((question) => ({
      questionText: question.questionText,
      options: question.options.map(optionText => ({ optionText })),
      correctAnswer: question.correctAnswer,
      difficulty: question.difficulty 
    }))
  });

  try {
    const savedQuiz = await newQuiz.save(); 
    res.status(201).json({ message: 'Quiz created successfully', quiz: savedQuiz });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create quiz', error: error.message });
  }
};

const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes", error });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
 
const updateQuiz = async (req, res) => {
  const { id } = req.params;
  const updatedQuizData = req.body;

  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(id, updatedQuizData, { new: true });
    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ message: "Error updating quiz", error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

const getQuizze = async (req, res) => {
    const { title, difficulty } = req.query;
    const filters = {};
    
    if (title) filters.title = { $regex: title, $options: 'i' }; 
    if (difficulty) filters['questions.difficulty'] = difficulty;
  
    try {
      const quizzes = await Quiz.find(filters);
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
export { createQuiz, getQuizzes, deleteQuiz, updateQuiz, getUsers,getQuizze  };




