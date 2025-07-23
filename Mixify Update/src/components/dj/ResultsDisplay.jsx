import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.jsx";
import { Badge } from "../ui/badge.jsx";
import { Button } from "../ui/button.jsx";
import { Play, Download, Share2, RotateCcw } from 'lucide-react';

export default function ResultsDisplay({ result, onReset, isLoading, originalSongs }) {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <Card className="bg-black/40 border-purple-500/30 backdrop-blur-lg">
          <CardContent className="p-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-pink-500 rounded-full animate-spin animation-delay-150"></div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-white">Mixing Your Set...</h3>
                <p className="text-gray-400">AI is analyzing BPM, keys, and energy levels</p>
                <div className="flex items-center justify-center gap-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-purple-400 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (!result) return null;

  // Remove any leading numbering from each song (e.g., '1. Song', '2 Song', etc.)
  let aiSongs = result.split('\n')
    .map(song => song.trim().replace(/^\d+\.?\s*/, ''))
    .filter(song => song);

  // Ensure the output list matches the input list length and contains all input songs
  let inputSongs = originalSongs || [];
  // If originalSongs is not provided, fallback to aiSongs length
  if (!inputSongs.length) inputSongs = aiSongs;

  // Find missing songs
  const aiSongsLower = aiSongs.map(s => s.toLowerCase());
  const missing = inputSongs.filter(s => !aiSongsLower.includes(s.toLowerCase()));
  // Append missing songs, marked as missing
  aiSongs = aiSongs.concat(missing.map(s => `[MISSING FROM AI OUTPUT] ${s}`));
  // Trim if too long
  if (aiSongs.length > inputSongs.length) aiSongs = aiSongs.slice(0, inputSongs.length);
  const songs = aiSongs;

  // Helper to check if a song is marked as 'may not mix well'
  function isMayNotMixWell(song) {
    return song.includes('[MAY NOT MIX WELL]');
  }

  // Remove the [MAY NOT MIX WELL] tag for display
  function cleanSong(song) {
    return song.replace(/\[MAY NOT MIX WELL\]/g, '').trim();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ maxWidth: '600px', margin: '2em auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5em' }}
    >
      <Button
        onClick={onReset}
        className="mb-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02]"
        style={{ marginBottom: '1em' }}
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        New Set
      </Button>
      <div style={{ width: '100%' }}>
        <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2" style={{ justifyContent: 'center', display: 'flex' }}>
          <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Play className="w-4 h-4 text-white" />
          </span>
          Your DJ Set Order
        </h2>
        <p className="text-gray-400 mt-1">Optimized for smooth transitions and energy flow</p>
      </div>
      {songs.some(song => song.startsWith('[MISSING FROM AI OUTPUT]')) && (
        <div style={{ marginBottom: '1em', color: 'black', fontWeight: 500 }}>
          Some songs could not be processed due to input size. If you see '(missing from AI output)', try reducing the number of songs in your input.
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Card style={{ background: 'rgba(60, 20, 80, 0.99)', borderRadius: '1em', boxShadow: '0 2px 8px #0002', margin: '1em 0', width: '100%', maxWidth: 600, padding: '2.5em 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CardHeader style={{ background: 'linear-gradient(to right, rgba(139,92,246,0.2), rgba(236,72,153,0.2))', borderBottom: '1px solid #a78bfa', width: '100%' }}>
            <CardTitle className="text-white flex items-center justify-between">
              <span>Track Sequence</span>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                {songs.length} tracks
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent style={{ padding: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div className="space-y-0 w-full">
              {songs.map((song, index) => (
                <p
                  key={index}
                  className={`font-medium px-4 py-2 border-b border-gray-800/50 last:border-b-0 ${isMayNotMixWell(song) || song.startsWith('[MISSING FROM AI OUTPUT]') ? 'text-red-400' : 'text-white'}`}
                  style={{ textAlign: 'center' }}
                >
                  {index + 1}. {cleanSong(song.replace('[MISSING FROM AI OUTPUT]', ''))}
                  {song.startsWith('[MISSING FROM AI OUTPUT]') && <span className="ml-2 text-xs text-red-300">(missing from AI output)</span>}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div style={{ width: '100%' }} className="flex justify-center gap-4">
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
          <Share2 className="w-4 h-4 mr-2" />
          Share Set
        </Button>
        <Button variant="outline" className="bg-black/20 border-gray-600 text-gray-300 hover:bg-gray-800">
          <Download className="w-4 h-4 mr-2" />
          Export List
        </Button>
      </div>
    </motion.div>
  );
}
