import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NoteApp.css'; // optional if using separate CSS

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');

  const fetchNotes = async () => {
    const res = await axios.get('http://localhost:5001/notes');
    setNotes(res.data);
  };

  const addNote = async () => {
    if (!content.trim()) return;
    await axios.post('http://localhost:5001/notes', { content });
    setContent('');
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container">
      <h1>My Notes</h1>
      <div>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your note here..."
        />
        <button onClick={addNote}>Add</button>
      </div>
      {notes.map((note) => (
        <div key={note._id} className="note">
          {note.content}
        </div>
      ))}
    </div>
  );
};

export default NoteApp;
