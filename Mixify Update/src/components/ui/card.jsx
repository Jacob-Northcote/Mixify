import React from 'react';

export function Card({ children, ...props }) {
  return <div style={{ background: '#222', borderRadius: '1em', boxShadow: '0 2px 8px #0002', margin: '1em 0', ...props.style }}>{children}</div>;
}

export function CardContent({ children, ...props }) {
  return <div style={{ padding: '1.5em', ...props.style }}>{children}</div>;
}

export function CardHeader({ children, ...props }) {
  return <div style={{ borderBottom: '1px solid #444', padding: '1em 1.5em 0.5em', ...props.style }}>{children}</div>;
}

export function CardTitle({ children, ...props }) {
  return <h3 style={{ margin: 0, fontWeight: 700, color: 'white', ...props.style }}>{children}</h3>;
} 