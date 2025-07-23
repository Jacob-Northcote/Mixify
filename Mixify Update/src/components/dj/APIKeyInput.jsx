import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from "../ui/input.jsx";
import { Label } from "../ui/label.jsx";
import { Button } from "../ui/button.jsx";
import { Card, CardContent } from "../ui/card.jsx";
import { Key, ExternalLink, Eye, EyeOff, Info } from 'lucide-react';
import { Alert, AlertDescription } from "../ui/alert.jsx";

export default function APIKeyInput({ apiKey, setApiKey }) {
  return (
    <div style={{ width: '100%', marginTop: '1em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input
        id="apiKey"
        type="text"
        placeholder="Enter your OpenAI API key..."
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        style={{
          width: '100%',
          maxWidth: 400,
          padding: '0.75em 1em',
          borderRadius: '0.75em',
          border: '1px solid #a78bfa',
          background: 'rgba(60, 20, 80, 0.7)',
          color: 'white',
          fontFamily: 'Poppins, Inter, Montserrat, sans-serif',
          fontSize: '1em',
          outline: 'none',
        }}
      />
    </div>
  );
}
