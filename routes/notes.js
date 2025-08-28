const express = require("express");
const router = express.Router();
const { getNotes, addNote, deleteNote } = require("../controllers/notesController");

// Routes
router.get("/", getNotes);
router.post("/", addNote);
router.delete("/:id", deleteNote);

module.exports = router;