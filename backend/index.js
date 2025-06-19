const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Note = require('./models/Note');

const app = express();
const PORT = process.env.PORT || 5001;

const MONGO_URI = 'mongodb+srv://notesuser:Test%40123@notesappcluster.9jrk69z.mongodb.net/?retryWrites=true&w=majority';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Create a new note
app.post('/notes', async (req, res) => {
  try {
    const note = new Note({ content: req.body.content });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save note' });
  }
});

// Get all notes
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Search notes by content keyword
app.get('/notes/search', async (req, res) => {
  try {
    const notes = await Note.find({
      content: new RegExp(req.query.q, 'i')
    }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});
