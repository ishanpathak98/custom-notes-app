from flask import Flask, request, jsonify
from flask_cors import CORS
import models

app = Flask(__name__)
CORS(app)  # Enables requests from frontend

# Initialize database
models.init_db()

@app.route('/notes', methods=['GET'])
def get_notes():
    notes = models.get_all_notes()
    return jsonify([{'id': note[0], 'content': note[1]} for note in notes])

@app.route('/notes', methods=['POST'])
def add_note():
    data = request.get_json()
    note_content = data.get('content')
    if note_content:
        models.add_note(note_content)
        return jsonify({'message': 'Note added'}), 201
    else:
        return jsonify({'error': 'Content is required'}), 400

if __name__ == '__main__':
    app.run(debug=True)
