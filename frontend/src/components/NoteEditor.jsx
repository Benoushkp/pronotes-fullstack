import React, { useState } from 'react';

function NoteEditor({ addNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAdd = () => {
    if (title.trim() && content.trim()) {
      addNote(title, content);
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="editor">
      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        rows="4"
        placeholder="Write your note here..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={handleAdd}>Create Note</button>
    </div>
  );
}

export default NoteEditor;
