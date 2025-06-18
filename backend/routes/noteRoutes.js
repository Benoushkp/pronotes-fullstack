const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getNotes, createNote, updateNote } = require('../controllers/noteController');

// GET    /api/notes       → list all notes for the user
router.get('/', auth, getNotes);

// POST   /api/notes       → create a new note
router.post('/', auth, createNote);

// PUT    /api/notes/:id   → add a new version to an existing note
router.put('/:id', auth, updateNote);

module.exports = router;
