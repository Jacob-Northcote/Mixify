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
- You MUST return exactly the same number of songs as provided in the input. Do not omit, skip, summarize, or group any songs. Output one line per input song, just reordered.
- If you cannot reorder all songs, order them to the best of your ability, but never omit any. For any song you think may not mix well in its position, wrap the song title in [MAY NOT MIX WELL] tags (these will be highlighted red in the UI).
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

      const songList = songs.split('\n').map(s => s.trim()).filter(Boolean);
      const response = await InvokeLLM({
        prompt,
        apiKey,
        songs: songList,
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
      <div className="relative z-10 flex flex-col items-center justify-start w-full min-h-screen gap-y-4 pt-2" style={{background: 'transparent', opacity: 0.75}}>
        <div style={{maxWidth: '600px', margin: '1em auto 0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5em'}}>
          <div className="w-36 h-36 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Zap className="w-20 h-20 text-white" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-white text-center w-full" style={{fontSize: '4rem'}}>
            Mixify
          </h1>
          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-2xl md:text-3xl text-white font-light text-center">
              AI DJ Set Arranger
            </p>
            <p className="text-white text-base md:text-lg leading-relaxed text-center">
              Input your music and describe your vibe - Mixify analyzes BPM, musical keys, 
              and energy flow to create the perfect DJ set sequence.
            </p>
          </div>
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
          <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            {/* Card with dark purple background, max width, and big side padding */}
            <Card style={{background: 'rgba(30, 10, 40, 0.98)', borderRadius: '1em', boxShadow: '0 2px 8px #0002', margin: '2em auto', maxWidth: '600px', padding: '2.5em', width: '100%'}}>
              <CardContent style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%'}}>
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
                    className="w-full text-white text-lg font-semibold py-6 rounded-xl shadow-lg transition-all duration-300"
                    style={{ background: '#ec4899', fontFamily: 'Poppins, Inter, Montserrat, sans-serif' }}
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
              originalSongs={songs.split('\n').map(s => s.trim()).filter(Boolean)}
            />
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
}
