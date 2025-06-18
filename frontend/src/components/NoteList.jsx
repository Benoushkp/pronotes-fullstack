import React, { useState } from 'react';
import VersionHistory from './VersionHistory';

function NoteList({ notes, updateNote, currentUser }) {
  const [activeNote, setActiveNote] = useState(null);
  const [newContent, setNewContent] = useState('');

  return (
    <div className="note-list">
      {notes.map(note => (
        <div key={note._id} className="note-card">
          <h2>{note.title}</h2>
          <p>{note.versions[0].content}</p>
          <small>Last edited: {new Date(note.versions[0].timestamp).toLocaleString()}</small>

          {activeNote === note._id ? (
            <div className="edit-form">
              <textarea
                rows="3"
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                className="edit-textarea"
              />
              <div className="edit-buttons">
                <button
                  className="save-btn"
                  onClick={() => {
                    updateNote(note._id, newContent);
                    setActiveNote(null);
                  }}
                >
                  Save
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setActiveNote(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              className="edit-btn"
              onClick={() => {
                setActiveNote(note._id);
                setNewContent(note.versions[0].content);
              }}
            >
              Edit
            </button>
          )}

          <VersionHistory versions={note.versions} />
        </div>
      ))}
    </div>
  );
}

export default NoteList;