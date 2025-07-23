import React from 'react';
import { motion } from 'framer-motion';
import { Textarea } from '../ui/textarea.jsx';
import { Label } from '../ui/label.jsx';
import { Music } from 'lucide-react';

export default function SongInput({ songs, setSongs }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-3"
    >
      <Label htmlFor="songs" className="text-lg font-medium text-white flex items-center gap-2">
        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm">
          <Music className="w-5 h-5 text-purple-300" />
        </div>
        Your Track List
      </Label>
      <Textarea
        id="songs"
        placeholder="Paste your songs here, one per line...&#10;&#10;Example:&#10;Calvin Harris - Feel So Close&#10;Avicii - Wake Me Up&#10;Swedish House Mafia - Don't You Worry Child&#10;David Guetta - Titanium"
        value={songs}
        onChange={(e) => setSongs(e.target.value)}
        className="min-h-[200px] bg-black/30 border-purple-500/30 text-white placeholder:text-gray-400 backdrop-blur-sm focus:border-purple-400 focus:ring-purple-400/20 resize-none text-sm leading-relaxed"
        rows={8}
      />
      <p className="text-xs text-white flex items-center gap-1" style={{opacity: 1, fontFamily: 'Poppins, Inter, Montserrat, sans-serif', fontWeight: 600}}>
        <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
        Enter one song per line for best results
      </p>
    </motion.div>
  );
}
