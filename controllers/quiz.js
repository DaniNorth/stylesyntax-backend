const express = require('express');
const verifyToken = require('../middleware/verify-token');
const router = express.Router();

const User = require('../models/user');
const QuizResult = require('../models/quizResult');
const { quizQuestions } = require('../utils/quizQuestions');
const { quizTagMap } = require('../utils/quizTagMap');

router.get('/questions', (req, res) => {
  const gender = req.query.gender;

  const filteredQuestions = Object.entries(quizQuestions).reduce((acc, [key, value]) => {
    if (!key.includes('_')) {
      acc[key] = value;
    } else if (
      (gender === 'female' && key.includes('_f')) ||
      (gender === 'male' && key.includes('_m')) ||
      (gender === 'nonbinary' && key.includes('_n'))
    ) {
      acc[key] = value;
    }
    return acc;
  }, {});

  res.json({ questions: filteredQuestions });
});

function calculateQuizResult(userAnswers) {
  const result = {
    genderCategory: null,
    fitPreference: null,
    styleProfileCounts: {},
    lifestyleTagCounts: {}
  };

  for (const [questionId, answer] of Object.entries(userAnswers)) {
    const mapping = quizTagMap[questionId]?.[answer];
    if (!mapping) continue;

    if (mapping.genderCategory) result.genderCategory = mapping.genderCategory;
    if (mapping.fitPreference) result.fitPreference = mapping.fitPreference;

    (mapping.styleProfile || []).forEach(tag => {
      result.styleProfileCounts[tag] = (result.styleProfileCounts[tag] || 0) + 1;
    });

    (mapping.lifestyleTags || []).forEach(tag => {
      result.lifestyleTagCounts[tag] = (result.lifestyleTagCounts[tag] || 0) + 1;
    });
  }

  const topStyle = Object.entries(result.styleProfileCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'other';
  const lifestyleTags = Object.entries(result.lifestyleTagCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);

  return {
    genderCategory: result.genderCategory,
    fitPreference: result.fitPreference,
    styleProfile: topStyle,
    lifestyleTags
  };
}

router.post('/submit', verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const quizAnswers = req.body.answers;

    const resultData = calculateQuizResult(quizAnswers);

    const updatedResult = await QuizResult.findOneAndUpdate(
      { user: userId },
      { ...resultData, user: userId, quizTakenAt: new Date() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await User.findByIdAndUpdate(userId, { quizResults: updatedResult._id });

    res.json({ success: true, quizResults: updatedResult });
  } catch (err) {
    console.error('Quiz submission error:', err);
    res.status(500).json({ success: false, error: 'Quiz submission failed.' });
  }
});

module.exports = router;