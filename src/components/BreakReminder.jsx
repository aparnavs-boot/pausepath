import React, { useState, useEffect } from 'react';
import './BreakReminder.css';

const SUGGESTIONS = [
  "Take a 5-minute walk outside.",
  "Drink a glass of water.",
  "Do 2 minutes of light stretching.",
  "Look at something 20 feet away for 20 seconds.",
  "Grab a quick coffee or tea at the cafe.",
  "Do a quick 5-minute meditation.",
  "Step away from the screen and take deep breaths.",
  "Listen to one of your favorite upbeat songs."
];

export default function BreakReminder() {
  const [suggestion, setSuggestion] = useState("");
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
      generateSuggestion();
      // Simple beep sound for notification
      const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU'); // Mock or actual short ping
      audio.play().catch(e => console.log("Audio play failed:", e));
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
    setSuggestion("");
  };

  const generateSuggestion = () => {
    const randomIdx = Math.floor(Math.random() * SUGGESTIONS.length);
    setSuggestion(SUGGESTIONS[randomIdx]);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="glass-panel break-reminder">
      <h2>Break Reminder</h2>
      
      <div className="timer-display">
        {formatTime(timeLeft)}
      </div>

      <div className="timer-controls">
        <button onClick={toggleTimer} className={isActive ? 'btn-pause' : 'btn-start'}>
          {isActive ? 'Pause' : 'Start Focus'}
        </button>
        <button onClick={resetTimer} className="btn-reset">Reset</button>
        <button onClick={generateSuggestion} className="btn-suggest">Need Break Now</button>
      </div>

      {suggestion && (
        <div className="suggestion-box slide-up">
          <h3>Suggestion:</h3>
          <p>{suggestion}</p>
        </div>
      )}
    </div>
  );
}
