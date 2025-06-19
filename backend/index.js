const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Note = require('./models/Note');

const app = express();
const PORT = 5001;

// ✅ Replace this with your real MongoDB URI (already updated)
const MONGO_URI = 'mongodb+srv://notesuser:Test%40123@notesappcluster.9jrk69z.mongodb.net/?retryWrites=true&w=majority&appName=NotesAppCluster';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

// ✅ Create Note
app.post('/notes', async (req, res) => {
  try {
    const { content } = req.body;
    const note = new Note({ content });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save note' });
  }
});

// ✅ Get All Notes
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// ✅ Search Notes (by keyword)
app.get('/notes/search', async (req, res) => {
  try {
    const { q } = req.query;
    const notes = await Note.find({ content: new RegExp(q, 'i') }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

