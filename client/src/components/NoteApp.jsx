import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5001';

function NoteApp() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [search, setSearch] = useState('');

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/notes`);
      setNotes(res.data);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    }
  };

  const handleAddNote = async () => {
    try {
      await axios.post(`${BASE_URL}/notes`, { content });
      setContent('');
      fetchNotes();
    } catch (err) {
      console.error('Failed to add note:', err);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/notes/search?q=${search}`);
      setNotes(res.data);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <textarea
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <button onClick={handleAddNote}>Add Note</button>
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {notes.map((note) => (
          <div key={note._id} className="note">
            {note.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteApp;
