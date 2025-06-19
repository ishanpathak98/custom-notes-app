import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NoteApp.css';

const NoteApp = () => {
  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/notes');
      setNotesList(res.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const saveNote = async () => {
    if (!note.trim()) return;
    try {
      await axios.post('http://localhost:5000/notes', { content: note });
      setNote('');
      fetchNotes();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const searchNotes = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/notes/search?q=${search}`);
      setNotesList(res.data);
    } catch (error) {
      console.error('Error searching notes:', error);
    }
  };

  return (
    <div>
      <textarea
        placeholder="Write your note here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <br />
      <button onClick={saveNote}>Save Note</button>
      <br /><br />
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={searchNotes}>Search</button>

      <div>
        {notesList.map((n) => (
          <div key={n._id} className="note-item">
            <p>{n.content}</p>
            <small>{new Date(n.date).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteApp;
