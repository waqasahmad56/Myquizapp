import Result from '../models/Result.js';

const saveResult = async (req, res) => {
  try {
    const { studentId, quizId, startTime, endTime, totalQuestions, correctAnswers, incorrectAnswers, duration, resultPercentage, status } = req.body;

    const result = new Result({
      studentId,
      quizId,
      startTime,
      endTime,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      duration,
      resultPercentage,
      status
    });

    await result.save();
    res.status(201).json({ message: 'Results saved successfully' });
  } catch (error) {
    console.error('Error saving quiz results:', error);
    res.status(500).json({ message: 'Failed to save quiz results', error: error.message });
  }
};

const getResults = async (req, res) => {
  try {
    const results = await Result.find().populate('studentId', 'firstName lastName').exec();
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ message: 'Failed to fetch results' });
  }
};

export { saveResult, getResults };
