const noteForm = document.getElementById('noteForm');
const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notesList');

// Backend API URL
const API_URL = 'http://127.0.0.1:5000/notes';

// Load notes from server when page loads
window.onload = loadNotes;

noteForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const content = noteInput.value.trim();
    if (content === '') return;

    // Send to backend
    await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ content })
    });

    noteInput.value = '';
    loadNotes();
});

async function loadNotes() {
    const res = await fetch(API_URL);
    const notes = await res.json();

    // Clear current notes
    notesList.innerHTML = '';

    // Show each note
    notes.forEach(note => {
        const li = document.createElement('li');
        li.textContent = note.content;
        notesList.appendChild(li);
    });
}
