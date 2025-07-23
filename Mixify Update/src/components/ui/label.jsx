import React from 'react';

export function Label({ children, ...props }) {
  return <label {...props} style={{ fontWeight: 600, color: 'white', fontFamily: 'Poppins, Inter, Montserrat, sans-serif', ...props.style }}>{children}</label>;
} 