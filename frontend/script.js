const API_URL = 'http://localhost:5000/notes';

document.addEventListener('DOMContentLoaded', () => {
  fetchNotes();

  document.getElementById('noteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const noteInput = document.getElementById('noteInput');
    const content = noteInput.value.trim();
    if (!content) return;

    await saveNote(content);
    noteInput.value = '';
    fetchNotes();
  });

  document.getElementById('searchInput').addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query === '') {
      fetchNotes();
    } else {
      searchNotes(query);
    }
  });
});

async function fetchNotes() {
  try {
    const res = await fetch(API_URL);
    const notes = await res.json();
    renderNotes(notes);
  } catch (err) {
    console.error('❌ Error fetching notes:', err);
  }
}

async function saveNote(content) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    if (!res.ok) throw new Error('Failed to save note');
  } catch (err) {
    console.error('❌ Error saving note:', err);
  }
}

async function searchNotes(query) {
  try {
    const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
    const notes = await res.json();
    renderNotes(notes);
  } catch (err) {
    console.error('❌ Error searching notes:', err);
  }
}

function renderNotes(notes) {
  const notesContainer = document.getElementById('notesList');
  notesContainer.innerHTML = '';

  if (!notes.length) {
    notesContainer.innerHTML = '<p>No notes found.</p>';
    return;
  }

  notes.forEach(note => {
    const noteEl = document.createElement('div');
    noteEl.className = 'note';

    const contentEl = document.createElement('p');
    contentEl.textContent = note.content;

    const dateEl = document.createElement('small');
    dateEl.textContent = `🕒 ${new Date(note.createdAt).toLocaleString()}`;

    noteEl.appendChild(contentEl);
    noteEl.appendChild(dateEl);
    notesContainer.appendChild(noteEl);
  });
}
