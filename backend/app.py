from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

notes = []

@app.route('/notes', methods=['GET', 'POST'])
def handle_notes():
    if request.method == 'POST':
        note = request.json.get('note')
        notes.append(note)
        return jsonify({'message': 'Note added'}), 201
    return jsonify(notes)

if __name__ == '__main__':
    app.run(debug=True)
