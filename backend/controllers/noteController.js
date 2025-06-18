const Note = require('../models/Note');

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ updatedAt: -1 });
    return res.json(notes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error fetching notes' });
  }
};

exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    const note = await Note.create({
      title,
      user: req.userId,
      versions: [{ content }],
    });
    return res.status(201).json(note);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error creating note' });
  }
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Content is required for new version' });
  }

  try {
    // fallback $or to match both old docs (userid) and new docs (user)
    const note = await Note.findOne({
      _id: id,
      $or: [
        { user: req.userId },
        { userid: req.userId }
      ]
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    note.versions.unshift({ content });
    await note.save();
    return res.json(note);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error updating note' });
  }
};
