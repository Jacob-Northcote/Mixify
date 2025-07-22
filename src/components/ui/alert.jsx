import React from 'react';

export function Alert({ children, ...props }) {
  return <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '0.5em', padding: '1em', color: '#991b1b', ...props.style }}>{children}</div>;
}

export function AlertDescription({ children, ...props }) {
  return <div style={{ color: '#991b1b', ...props.style }}>{children}</div>;
} 