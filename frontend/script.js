const API_URL = 'http://localhost:5000/notes';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = 'login.html';
}

window.onload = () => {
  fetchNotes();

  document.getElementById('saveNote').addEventListener('click', async () => {
    const content = document.getElementById('noteInput').value.trim();
    if (!content) return;
    await saveNote(content);
    document.getElementById('noteInput').value = '';
    fetchNotes();
  });

  document.getElementById('searchInput').addEventListener('input', (e) => {
    const query = e.target.value.trim();
    query ? searchNotes(query) : fetchNotes();
  });

  document.getElementById('calendarDate').addEventListener('change', fetchCalendarNotes);
};

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}

async function fetchNotes() {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const notes = await res.json();
  renderNotes(notes);
}

async function saveNote(content) {
  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ content })
  });
}

async function searchNotes(query) {
  const res = await fetch(`${API_URL}/search?q=${query}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const notes = await res.json();
  renderNotes(notes);
}

async function fetchCalendarNotes(e) {
  const date = e.target.value;
  const res = await fetch(`${API_URL}/by-date?date=${date}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const notes = await res.json();
  renderNotes(notes);
}

function renderNotes(notes) {
  const notesList = document.getElementById('notesList');
  notesList.innerHTML = '';
  notes.forEach(note => {
    const li = document.createElement('li');
    const date = new Date(note.createdAt).toLocaleString();
    li.textContent = `${note.content} (${date})`;
    notesList.appendChild(li);
  });
}
