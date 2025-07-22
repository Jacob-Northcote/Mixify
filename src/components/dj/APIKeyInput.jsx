import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from "../ui/input.jsx";
import { Label } from "../ui/label.jsx";
import { Button } from "../ui/button.jsx";
import { Card, CardContent } from "../ui/card.jsx";
import { Key, ExternalLink, Eye, EyeOff, Info } from 'lucide-react';
import { Alert, AlertDescription } from "../ui/alert.jsx";

export default function APIKeyInput({ apiKey, setApiKey }) {
  const [showKey, setShowKey] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      <Label htmlFor="apiKey" className="text-lg font-medium text-white flex items-center gap-2">
        <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm">
          <Key className="w-5 h-5 text-yellow-300" />
        </div>
        OpenAI API Key
      </Label>
      
      <div className="relative">
        <Input
          id="apiKey"
          type={showKey ? "text" : "password"}
          placeholder="sk-..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="bg-black/30 border-yellow-500/30 text-white placeholder:text-gray-400 backdrop-blur-sm focus:border-yellow-400 focus:ring-yellow-400/20 pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          onClick={() => setShowKey(!showKey)}
        >
          {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="bg-black/20 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white text-xs"
          onClick={() => setShowInstructions(!showInstructions)}
        >
          <Info className="w-3 h-3 mr-1" />
          {showInstructions ? 'Hide' : 'Show'} Instructions
        </Button>
        <a
          href="https://platform.openai.com/account/api-keys"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
        >
          Get API Key
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
      
      {showInstructions && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-black/20 border-gray-700">
            <CardContent className="p-4">
              <Alert className="bg-blue-500/10 border-blue-500/30">
                <Info className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-sm text-gray-300">
                  <div className="space-y-2">
                    <p className="font-medium text-white">How to get your OpenAI API key:</p>
                    <ol className="list-decimal list-inside space-y-1 text-xs">
                      <li>Go to OpenAI's website and log in</li>
                      <li>Navigate to API Keys in your account settings</li>
                      <li>Click "Create new secret key"</li>
                      <li>Copy the key and paste it above</li>
                    </ol>
                    <p className="text-xs text-gray-400 mt-2">
                      Your key is processed securely and never stored permanently.
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
