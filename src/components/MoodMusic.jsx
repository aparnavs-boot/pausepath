import React, { useState } from 'react';
import './MoodMusic.css';

const MOOD_PLAYLISTS = [
    { mood: 'Focus', id: '37i9dQZF1DWZeKCadgRdKQ', icon: '🎧', label: 'Deep Focus' },
    { mood: 'Chill', id: '37i9dQZF1DWTvNyxOwkztu', icon: '🍃', label: 'Chillout Lounge' },
    { mood: 'Energy', id: '37i9dQZF1DXaXB8fQg7xif', icon: '⚡', label: 'Dance Pop' },
    { mood: 'Relax', id: '37i9dQZF1DWWEJlAGA9gs0', icon: '🧘', label: 'Classical Relax' },
];

export default function MoodMusic() {
    const [activePlaylist, setActivePlaylist] = useState(MOOD_PLAYLISTS[0]);

    return (
        <div className="glass-panel mood-music">
            <h2>Music for your Mood</h2>

            <div className="mood-selectors">
                {MOOD_PLAYLISTS.map((p) => (
                    <button
                        key={p.mood}
                        className={`mood-btn ${activePlaylist.mood === p.mood ? 'active' : ''}`}
                        onClick={() => setActivePlaylist(p)}
                    >
                        <span className="mood-icon">{p.icon}</span> {p.mood}
                    </button>
                ))}
            </div>

            <div className="spotify-player slide-up" key={activePlaylist.id}>
                <iframe
                    style={{ borderRadius: '12px' }}
                    src={`https://open.spotify.com/embed/playlist/${activePlaylist.id}?utm_source=generator&theme=0`}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy">
                </iframe>
            </div>
        </div>
    );
}
