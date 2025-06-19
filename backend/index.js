const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Note = require('./models/Note');

const app = express();

// ✅ Use PORT from environment or default to 5001
const PORT = process.env.PORT || 5001;

// ✅ MongoDB URI - hosted Atlas connection string
const MONGO_URI = 'mongodb+srv://notesuser:Test%40123@notesappcluster.9jrk69z.mongodb.net/?retryWrites=true&w=majority&appName=NotesAppCluster';

// ✅ Middleware setup
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB and start the server
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1); // Exit if DB fails
});

// ✅ Routes

// ➕ Create a note
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

// 📄 Get all notes
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// 🔍 Search notes by keyword
app.get('/notes/search', async (req, res) => {
  try {
    const { q } = req.query;
    const notes = await Note.find({ content: new RegExp(q, 'i') }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});
