const { ValidationError, NotFoundError } = require("../utils/errors");

let notes = []; // In-memory storage

// Get all notes
function getNotes(req, res) {
    res.json({ notes });
}

// POST add a new note
function addNote(req, res, next) {
    const { text } = req.body;
    if (!text) return next(new ValidationError("Note text is required"));

    const newNote = {
        id: Date.now().toString(),
        text
    };
    notes.push(newNote);
    res.status(201).json(newNote);
}

// Delete note by id
function deleteNote(req, res, next) {
    const { id } = req.params;
    const noteIndex = notes.findIndex(n => n.id === id);

    if (noteIndex === -1) return next(new NotFoundError("Note not found"));

    const deleted = notes.splice(noteIndex, 1);
    res.json({ deleted: deleted[0] });
}

module.exports = { getNotes, addNote, deleteNote };