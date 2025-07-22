import React from 'react';

export function Textarea(props) {
  return <textarea {...props} style={{ padding: '0.5em', borderRadius: '0.5em', border: '1px solid #ccc', width: '100%', ...props.style }} />;
} 