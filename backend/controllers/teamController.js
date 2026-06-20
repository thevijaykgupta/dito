const Team = require("../models/Team");

exports.createProfile = async (req, res) => {
  const profile = await Team.create({
    ...req.body,
    userId: req.user.id
  });

  res.json(profile);
};

exports.matchUsers = async (req, res) => {
  const users = await Team.find({
    availability: true,
    subjects: { $in: req.body.subjects }
  });

  res.json(users);
};