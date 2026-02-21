import React, { useState } from 'react';

const MoodSelector = () => {
  const [mood, setMood] = useState('calm');
  const [suggestion, setSuggestion] = useState(null);

  const suggestMusic = () => {
    let playlistUrl = '';
    let suggestionText = '';

    switch (mood) {
      case 'calm':
        playlistUrl = 'https://open.spotify.com/search/calm%20vibes';
        suggestionText = "Try some 'Calm Vibes' on Spotify.";
        break;
      case 'happy':
        playlistUrl = 'https://open.spotify.com/search/mood%20booster';
        suggestionText = "Boost your mood with happy tunes!";
        break;
      case 'focus':
        playlistUrl = 'https://open.spotify.com/search/deep%20focus';
        suggestionText = "Deep Focus playlist recommended.";
        break;
      case 'relax':
        playlistUrl = 'https://open.spotify.com/search/acoustic%20chill';
        suggestionText = "Relax with Acoustic Chill.";
        break;
      default:
        playlistUrl = 'https://open.spotify.com/';
        suggestionText = "Explore Spotify.";
    }

    setSuggestion({ url: playlistUrl, text: suggestionText });
  };

  return (
    <div className="mood-section">
      <h3>How do you feel? 🎵</h3>
      <select value={mood} onChange={(e) => setMood(e.target.value)}>
        <option value="calm">Calm</option>
        <option value="happy">Happy</option>
        <option value="focus">Focused</option>
        <option value="relax">Relaxed</option>
      </select>
      <button onClick={suggestMusic}>Suggest Music</button>
      {suggestion && (
        <div id="musicSuggestions">
          <a href={suggestion.url} target="_blank" rel="noopener noreferrer" className="spotify-link">
            {suggestion.text} 🎵
          </a>
        </div>
      )}
    </div>
  );
};

export default MoodSelector;
