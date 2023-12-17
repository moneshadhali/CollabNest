const express = require("express");
const router = express.Router();

//GET all the societies
router.get("/", (req, res) => {
  res.json({ msg: "GET all societies" });
});

//GET a single societies
router.get("/:id", (req, res) => {
  res.json({ msg: "GET a single society" });
});

//POST a single societies
router.post("/", (req, res) => {
  res.json({ msg: "POST a single society" });
});

//DELETE a single societies
router.delete("/:id", (req, res) => {
  res.json({ msg: "DELETE a single society" });
});

//UPDATE a single societies
router.patch("/:id", (req, res) => {
  res.json({ msg: "PATCH a single society" });
});

module.exports = router;
