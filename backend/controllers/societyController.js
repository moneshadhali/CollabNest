const Society = require("../models/societyModel");
const mongoose = require("mongoose");

// GET /society -> Get all the society
const getSocieties = async (req, res) => {
  const user_id = req.user._id;

  const societies = await Society.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(societies);
};

// GET /society:id -> Get single society
const getSociety = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such society" });
  }

  const society = await Society.findById(id);

  if (!society) {
    return res.status(404).json({ error: "No such society" });
  }
  res.status(200).json(society);
};

// POST /society -> Create new society
const createSociety = async (req, res) => {
  const { title, owner, description } = req.body;

  let emptyField = [];
  if (!title) {
    emptyField.push("title");
  }
  if (!owner) {
    emptyField.push("owner");
  }
  if (emptyField.length - 1 > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in the required fields ", emptyField });
  }

  try {
    const user_id = req.user._id;
    const society = await Society.create({
      title,
      owner,
      description,
      user_id,
    });
    res.status(200).json(society);
  } catch (error) {
    res.status(400).json({ error: error.message, emptyField });
  }
};

// DELETE /society:id  -> delete a society
const deleteSociety = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such society" });
  }

  const society = await Society.findOneAndDelete({ _id: id });
  if (!society) {
    return res.status(404).json({ error: "No such society" });
  }
  res.status(200).json(society);
};

// PATCH /society:id -> updates a society information
const updateSociety = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such society" });
  }
  const society = await Society.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!society) {
    return res.status(404).json({ error: "No such society" });
  }
  res.status(200).json(society);
};

// PATCH /mreq/society:id -> updates society's member request information
const updateSocietyMemReq = async (req, res) => {
  const user_id = req.user._id;
  console.log("PATCH req TEST user_id : " + user_id);
  const { member_req } = req.body;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such society" });
  }
  const society = await Society.findByIdAndUpdate(
    { _id: id },
    { $addToSet: { member_req: member_req } }
  );
  if (!society) {
    return res.status(404).json({ error: "No such society" });
  }
  res.status(200).json(society);
};

module.exports = {
  getSocieties,
  getSociety,
  createSociety,
  deleteSociety,
  updateSociety,
  updateSocietyMemReq,
};
