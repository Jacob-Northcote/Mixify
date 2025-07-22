import React from 'react';

export function Button({ children, ...props }) {
  return (
    <button {...props} style={{ padding: '0.5em 1em', borderRadius: '0.5em', border: 'none', background: '#a78bfa', color: 'white', fontWeight: 600, cursor: 'pointer', ...props.style }}>
      {children}
    </button>
  );
} 