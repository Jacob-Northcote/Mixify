import React from 'react';

export function Badge({ children, ...props }) {
  return <span {...props} style={{ display: 'inline-block', background: '#a78bfa', color: 'white', borderRadius: '0.5em', padding: '0.2em 0.7em', fontSize: '0.85em', fontWeight: 600, ...props.style }}>{children}</span>;
} 