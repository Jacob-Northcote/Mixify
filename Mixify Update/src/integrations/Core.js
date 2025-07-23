// Placeholder for LLM integration

// Helper to split a song list into chunks
function chunkSongs(songs, chunkSize) {
  const chunks = [];
  for (let i = 0; i < songs.length; i += chunkSize) {
    chunks.push(songs.slice(i, i + chunkSize));
  }
  return chunks;
}

export async function InvokeLLM({ prompt, apiKey, songs, chunkSize = 25 }) {
  // If songs are provided and the list is large, chunk and process each chunk
  if (songs && songs.length > chunkSize) {
    const songChunks = chunkSongs(songs, chunkSize);
    let allResults = [];
    for (let i = 0; i < songChunks.length; i++) {
      const chunkPrompt = prompt.replace('${songs}', songChunks[i].join('\n'));
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: chunkPrompt }],
          max_tokens: 1000,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'OpenAI API error');
      const chunkResult = data.choices[0].message.content.trim().split('\n').map(s => s.trim()).filter(Boolean);
      allResults = allResults.concat(chunkResult);
    }
    return allResults.join('\n');
  } else {
    // Normal single-call mode
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
      }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'OpenAI API error');
    return data.choices[0].message.content.trim();
  }
} 