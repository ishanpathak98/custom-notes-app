const API_URL = 'http://localhost:5000/notes';

// Event listeners
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
    const q = e.target.value.trim();
    q ? searchNotes(q) : fetchNotes();
  });

  document.getElementById('calendarDate').addEventListener('change', fetchCalendarNotes);
};

async function fetchNotes() {
  const res = await fetch(API_URL);
  const notes = await res.json();
  renderNotes(notes);
}

async function saveNote(content) {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  });
}

async function searchNotes(q) {
  const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(q)}`);
  const notes = await res.json();
  renderNotes(notes);
}

async function fetchCalendarNotes() {
  const date = document.getElementById('calendarDate').value;
  const res = await fetch(`${API_URL}/by-date?date=${date}`);
  const notes = await res.json();
  renderCalendarNotes(notes);
}

function renderNotes(notes) {
  const list = document.getElementById('notesList');
  list.innerHTML = notes.length ? '' : '<p>No notes found.</p>';
  notes.forEach(note => {
    const el = document.createElement('div');
    el.className = 'note';
    el.innerHTML = `<p>${note.content}</p><small>${new Date(note.createdAt).toLocaleString()}</small>`;
    list.appendChild(el);
  });
}

function renderCalendarNotes(notes) {
  const list = document.getElementById('calendarNotes');
  list.innerHTML = notes.length ? '' : '<p>No notes found on selected date.</p>';
  notes.forEach(note => {
    const el = document.createElement('div');
    el.className = 'note';
    el.innerHTML = `<p>${note.content}</p><small>${new Date(note.createdAt).toLocaleString()}</small>`;
    list.appendChild(el);
  });
}

function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
  document.getElementById(tabId).style.display = 'block';
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[onclick*="${tabId}"]`).classList.add('active');
}
