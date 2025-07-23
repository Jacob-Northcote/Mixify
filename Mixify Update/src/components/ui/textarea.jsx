import React from 'react';

export function Textarea(props) {
  return <textarea {...props} style={{ padding: '0.5em', borderRadius: '0.5em', border: '1px solid #333', width: '100%', background: 'rgba(0,0,0,0.75)', color: 'white', fontFamily: 'Poppins, Inter, Montserrat, sans-serif', ...props.style }} />;
} 