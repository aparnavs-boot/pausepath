import React from 'react';

const Timer = ({ timeLeft, totalTime, isFocusMode }) => {
  const radius = 90;
  const circumference = radius * 2 * Math.PI;
  const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;
  const offset = circumference - (progressPercent / 100) * circumference;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="timer-container">
      <svg className="progress-ring" width="200" height="200">
        <circle
          className="progress-ring__circle"
          stroke={isFocusMode ? "#6c5ce7" : "#fd79a8"}
          strokeWidth="10"
          fill="transparent"
          r={radius}
          cx="100"
          cy="100"
          style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
        />
      </svg>
      <div className="timer-text">{timeString}</div>
    </div>
  );
};

export default Timer;
