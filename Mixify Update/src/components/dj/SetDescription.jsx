import React from 'react';
import { motion } from 'framer-motion';
import { Textarea } from "../ui/textarea.jsx";
import { Label } from "../ui/label.jsx";
import { Badge } from "../ui/badge.jsx";
import { Sparkles } from 'lucide-react';

const vibePresets = [
  'Energetic house party, smooth transitions',
  'Chill sunset vibes, gradual build-up',
  'High-energy club night, peak-time bangers',
  'Intimate lounge atmosphere, deep cuts',
];

export default function SetDescription({ description, setDescription }) {
  const handlePresetClick = (preset) => {
    setDescription(preset);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-4"
    >
      <Label htmlFor="description" className="text-lg font-medium text-white flex items-center gap-2">
        <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm">
          <Sparkles className="w-5 h-5 text-cyan-300" />
        </div>
        Set Description & Vibe
      </Label>
      
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {vibePresets.map((preset, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer transition-all duration-300 text-xs py-1 px-3"
              style={{ background: 'rgba(60, 20, 80, 0.7)', color: 'white', border: '1px solid #a78bfa', fontFamily: 'Poppins, Inter, Montserrat, sans-serif' }}
              onClick={() => handlePresetClick(preset)}
            >
              {preset}
            </Badge>
          ))}
        </div>
        
        <Textarea
          id="description"
          placeholder="Describe your perfect DJ set...&#10;&#10;Examples:&#10;• Start mellow, build energy, end with bangers&#10;• Smooth transitions, keep the dance floor moving&#10;• Deep house vibes with progressive build-up&#10;• High-energy from start to finish"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[120px] bg-black/30 border-cyan-500/30 text-white placeholder:text-gray-400 backdrop-blur-sm focus:border-cyan-400 focus:ring-cyan-400/20 resize-none text-sm leading-relaxed"
          rows={5}
        />
      </div>
      
      <p className="text-xs text-white flex items-center gap-1" style={{opacity: 1, fontFamily: 'Poppins, Inter, Montserrat, sans-serif', fontWeight: 600}}>
        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
        Be specific about energy levels, transitions, and crowd type
      </p>
    </motion.div>
  );
}
