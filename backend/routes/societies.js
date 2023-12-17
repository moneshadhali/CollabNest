const express = require("express");
const router = express.Router();
const {
  getSocieties,
  getSociety,
  createSociety,
  deleteSociety,
  updateSociety,
} = require("../controllers/societyController");

//GET all the societies
router.get("/", getSocieties);

//GET a single societies
router.get("/:id", getSociety);

//POST a single societies
router.post("/", createSociety);

//DELETE a single societies
router.delete("/:id", deleteSociety);

//UPDATE a single societies
router.patch("/:id", updateSociety);

module.exports = router;
