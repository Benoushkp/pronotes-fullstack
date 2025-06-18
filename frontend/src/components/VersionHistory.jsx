import React from 'react';

function VersionHistory({ versions }) {
  return (
    <details className="history">
      <summary>Version History ({versions.length})</summary>
      <ul>
        {versions.map((ver, i) => (
          <li key={i}>
            <strong>{new Date(ver.timestamp).toLocaleString()}</strong>
            <p>{ver.content}</p>
          </li>
        ))}
      </ul>
    </details>
  );
}

export default VersionHistory;
