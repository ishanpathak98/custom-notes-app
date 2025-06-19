import React from 'react';
import NoteApp from './components/NoteApp';

function App() {
  return (
    <div className="App">
      <h1>📝 Custom Notes App</h1>
      <NoteApp />
    </div>
  );
}

export default App; // ✅ This is the required fix
