const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

module.exports = mongoose.model('Note', noteSchema);

