import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.jsx";
import { Badge } from "../ui/badge.jsx";
import { Button } from "../ui/button.jsx";
import { Play, Download, Share2, RotateCcw } from 'lucide-react';

export default function ResultsDisplay({ result, onReset, isLoading }) {
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

  const songs = result.split('\n').filter(song => song.trim());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Play className="w-4 h-4 text-white" />
            </div>
            Your DJ Set Order
          </h2>
          <p className="text-gray-400 mt-1">Optimized for smooth transitions and energy flow</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-black/20 border-gray-600 text-gray-300 hover:bg-gray-800"
            onClick={onReset}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            New Set
          </Button>
        </div>
      </div>

      <Card className="bg-black/40 border-purple-500/30 backdrop-blur-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-b border-purple-500/30">
          <CardTitle className="text-white flex items-center justify-between">
            <span>Track Sequence</span>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              {songs.length} tracks
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {songs.map((song, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors border-b border-gray-800/50 last:border-b-0"
              >
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    index === 0 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : index === songs.length - 1 
                      ? 'bg-gradient-to-r from-red-500 to-pink-500'
                      : 'bg-gradient-to-r from-purple-500 to-blue-500'
                  }`}>
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{song.trim()}</p>
                  {index === 0 && (
                    <Badge variant="outline" className="text-xs bg-green-500/10 border-green-500/30 text-green-300 mt-1">
                      Opener
                    </Badge>
                  )}
                  {index === songs.length - 1 && (
                    <Badge variant="outline" className="text-xs bg-red-500/10 border-red-500/30 text-red-300 mt-1">
                      Closer
                    </Badge>
                  )}
                </div>
                <div className="flex-shrink-0">
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-pink-500/30 rounded-full">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.random() * 40 + 60}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
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
