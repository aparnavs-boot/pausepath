import React, { useState, useEffect } from 'react';
import './TalkSpace.css';

export default function TalkSpace() {
    const [thoughts, setThoughts] = useState(() => {
        const saved = localStorage.getItem('pauseThoughts');
        if (saved) {
            return JSON.parse(saved);
        }
        return [];
    });
    const [currentThought, setCurrentThought] = useState("");

    useEffect(() => {
        localStorage.setItem('pauseThoughts', JSON.stringify(thoughts));
    }, [thoughts]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!currentThought.trim()) return;

        const newThought = {
            id: Date.now(),
            text: currentThought,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setThoughts([newThought, ...thoughts]);
        setCurrentThought("");
    };

    const clearThoughts = () => {
        if (confirm("Are you sure you want to clear your thoughts?")) {
            setThoughts([]);
        }
    };

    return (
        <div className="glass-panel talk-space">
            <div className="talk-header">
                <h2>Talk Space</h2>
                <button className="btn-clear" onClick={clearThoughts} title="Clear Thoughts">🗑️</button>
            </div>

            <p className="subtitle">Share what's on your mind. Take a deep breath.</p>

            <form onSubmit={handleSubmit} className="thought-form">
                <textarea
                    value={currentThought}
                    onChange={(e) => setCurrentThought(e.target.value)}
                    placeholder="I'm feeling... / Right now I need..."
                    rows={3}
                    className="thought-input"
                />
                <button type="submit" className="btn-submit-thought">Vent / Save</button>
            </form>

            <div className="thoughts-list">
                {thoughts.length === 0 ? (
                    <div className="empty-state">Your space is clear.</div>
                ) : (
                    thoughts.map((t) => (
                        <div key={t.id} className="thought-item slide-up">
                            <span className="timestamp">{t.timestamp}</span>
                            <p>{t.text}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
