import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Alert, AlertDescription } from '@/components/ui/alert.jsx';
import { InvokeLLM } from '@/integrations/Core.js';
import { DJSet } from '@/entities/DJSet.js';
import { Zap, AlertCircle } from 'lucide-react';

import AnimatedBackground from '@/components/dj/AnimatedBackground.jsx';
import APIKeyInput from '@/components/dj/APIKeyInput.jsx';
import SongInput from '@/components/dj/SongInput.jsx';
import SetDescription from '@/components/dj/SetDescription.jsx';
import ResultsDisplay from '@/components/dj/ResultsDisplay.jsx';

export default function MixifyPage() {
  const [apiKey, setApiKey] = useState('');
  const [songs, setSongs] = useState('');
  const [description, setDescription] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateDJSet = async () => {
    if (!apiKey.trim()) {
      setError('Please enter your OpenAI API key.');
      return;
    }
    
    if (!songs.trim() || !description.trim()) {
      setError('Please enter both a song list and set description.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const prompt = `You are a professional DJ setlist arranger. Given a list of songs and a description of the desired DJ set, reorder the songs for optimal flow and energy progression.

**CRITICAL REQUIREMENTS:**
- Musical keys between consecutive songs must be compatible (within 1 semitone)
- BPM (beats per minute) between consecutive songs must be within 10 BPM
- Consider energy levels and crowd dynamics
- Ensure smooth harmonic mixing
- Double-check key compatibility and BPM transitions

**ONLY return the reordered song list, nothing else. No explanations, no additional text.**

Songs:
${songs}

Set Description:
${description}`;

      const response = await InvokeLLM({
        prompt,
      });

      setResult(response);
      
      // Save to database
      await DJSet.create({
        songs: songs.split('\n').filter(s => s.trim()),
        description,
        arranged_songs: response.split('\n').filter(s => s.trim()),
        api_key: 'encrypted' // We don't actually store the API key
      });
      
    } catch (err) {
      setError(`Error generating DJ set: ${err.message}`);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setResult('');
    setError('');
    setSongs('');
    setDescription('');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      {/* Content is a single centered column stacked vertically */}
      <div className="relative z-10 flex flex-col items-center w-full min-h-screen gap-y-8 py-12">
        <div className="inline-flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Mixify
          </h1>
        </div>
        <div className="text-center max-w-2xl">
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            AI DJ Set Arranger
          </p>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Input your music and describe your vibe - Mixify analyzes BPM, musical keys, 
            and energy flow to create the perfect DJ set sequence.
          </p>
        </div>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl w-full"
          >
            <Alert className="bg-red-500/10 border-red-500/30">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200">
                {error}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
        {!result ? (
          <div className="max-w-2xl w-full">
            <Card className="bg-black/60 backdrop-blur-lg border-white/10">
              <CardContent className="p-6 md:p-8 space-y-8">
                <APIKeyInput apiKey={apiKey} setApiKey={setApiKey} />
                <SongInput songs={songs} setSongs={setSongs} />
                <SetDescription description={description} setDescription={setDescription} />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="pt-4"
                >
                  <Button
                    onClick={generateDJSet}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg font-semibold py-6 rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02]"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating Perfect Mix...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Generate DJ Set
                      </div>
                    )}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-4xl w-full">
            <ResultsDisplay 
              result={result} 
              onReset={resetForm} 
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
}
