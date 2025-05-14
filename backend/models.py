import sqlite3
import os

# Ensure a database directory exists
if not os.path.exists('database'):
    os.makedirs('database')

DB_PATH = 'database/notes.db'

# Create notes table if not exists
def init_db():
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT NOT NULL
            )
        ''')
        conn.commit()

# Add a new note
def add_note(content):
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute('INSERT INTO notes (content) VALUES (?)', (content,))
        conn.commit()

# Get all notes
def get_all_notes():
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT id, content FROM notes')
        return cursor.fetchall()
