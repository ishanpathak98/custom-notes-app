import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NoteApp() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5001/notes');
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      await axios.post('http://localhost:5001/notes', { content });
      setContent('');
      fetchNotes();
    } catch (err) {
      console.error('Error creating note:', err);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    try {
      const res = await axios.get(`http://localhost:5001/notes/search?q=${query}`);
      setNotes(res.data);
    } catch (err) {
      console.error('Error searching notes:', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter note"
        />
        <button type="submit">Add Note</button>
      </form>

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search notes"
      />

      <ul>
        {notes.map((note) => (
          <li key={note._id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default NoteApp;
