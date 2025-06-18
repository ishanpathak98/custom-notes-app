const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Note = require('./models/Note');

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Replace with your MongoDB connection string:
const MONGO_URI = process.env.MONGO_URI || 'YOUR_MONGODB_URI';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ DB Connection Error:", err.message));

app.post('/notes', async (req, res) => {
  try {
    const note = new Note({ content: req.body.content });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find().sort({ date: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/notes/search', async (req, res) => {
  try {
    const q = req.query.q || '';
    const notes = await Note.find({
      content: { $regex: q, $options: 'i' }
    }).sort({ date: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
