import React from 'react';

export function Input(props) {
  return <input {...props} style={{ padding: '0.5em', borderRadius: '0.5em', border: '1px solid #ccc', ...props.style }} />;
} 