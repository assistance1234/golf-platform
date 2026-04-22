import User from "../models/User.js";

export const addScore = async (req, res) => {
  const user = await User.findById(req.user.id);

  const { value, date } = req.body;

  // duplicate date check
  const exists = user.scores.find(
    s => new Date(s.date).toDateString() === new Date(date).toDateString()
  );

  if (exists) return res.status(400).json("Score already exists for this date");

  user.scores.push({ value, date });

  // keep only last 5 scores
  if (user.scores.length > 5) {
    user.scores.shift();
  }

  await user.save();

  res.json(user.scores);
};

export const getScores = async (req, res) => {
  const user = await User.findById(req.user.id);

  const sorted = user.scores.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  res.json(sorted);
};