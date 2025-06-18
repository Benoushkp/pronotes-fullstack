const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
  content: String,
  timestamp: { type: Date, default: Date.now },
});

const noteSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
  versions: {
    type: [versionSchema],
    validate: v => Array.isArray(v) && v.length > 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
