const express = require("express");
const {
  getSocieties,
  getSociety,
  createSociety,
  deleteSociety,
  updateSociety,
  updateSocietyMemReq,
} = require("../controllers/societyController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//require auth to access all the societies routes
router.use(requireAuth);

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

//UPDATE a single societies member request array
router.patch("/mreq/:id", updateSocietyMemReq);

module.exports = router;
