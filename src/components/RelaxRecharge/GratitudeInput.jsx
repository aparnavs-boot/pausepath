import React, { useState, useEffect } from 'react';
import { Heart, Share2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultPrompts = [
    "Name 3 things you're grateful for today.",
    "Who made you smile recently?",
    "What is a small win you had today?",
    "What is a beautiful thing you saw today?",
    "What are you looking forward to?"
];

const GratitudeInput = () => {
    const [entry, setEntry] = useState('');
    const [saved, setSaved] = useState(false);
    const [prompt, setPrompt] = useState(defaultPrompts[0]);

    useEffect(() => {
        // Simple day-based random selection
        const day = new Date().getDay();
        setPrompt(defaultPrompts[day % defaultPrompts.length]);

        // Load past entry for today if exists
        const todayKey = `gratitude-${new Date().toDateString()}`;
        const savedEntry = localStorage.getItem(todayKey);
        if (savedEntry) {
            setEntry(savedEntry);
            setSaved(true);
        }
    }, []);

    const handleSave = () => {
        if (!entry.trim()) return;
        const todayKey = `gratitude-${new Date().toDateString()}`;
        localStorage.setItem(todayKey, entry);
        setSaved(true);
    };

    const handleShare = async () => {
        if (!entry.trim()) return;
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'My Daily Gratitude',
                    text: `Today I'm grateful for: ${entry}\n\n- Written via PausePath`,
                });
            } else {
                navigator.clipboard.writeText(`Today I'm grateful for: ${entry}`);
                alert('Copied to clipboard!');
            }
        } catch (error) {
            console.error("Error sharing:", error);
        }
    };

    return (
        <div className="flex flex-col p-6 w-full h-full justify-between max-w-lg mx-auto">
            <div>
                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                    <Heart size={24} className="text-accent" />
                    Daily Gratitude
                </h3>
                <p className="text-base italic text-text-secondary mb-6">"{prompt}"</p>
            </div>

            <textarea
                value={entry}
                onChange={(e) => {
                    setEntry(e.target.value);
                    if (saved) setSaved(false);
                }}
                placeholder="Type your thoughts here..."
                className="w-full min-h-[160px] flex-grow p-5 text-lg rounded-2xl bg-surface/50 border border-surface-border text-text-primary resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-opacity-50 shadow-inner"
                maxLength={200}
            />

            <div className="flex justify-between items-center mt-6">
                <span className="text-sm text-text-secondary">{entry.length}/200</span>
                <div className="flex gap-3">
                    {saved ? (
                        <button className="!bg-emerald-500/20 !text-emerald-500 !shadow-none cursor-default flex items-center gap-1 text-sm py-2 px-5 rounded-full mt-0">
                            <Check size={16} /> Saved
                        </button>
                    ) : (
                        <button onClick={handleSave} className="text-sm py-2 px-6 rounded-full disabled:opacity-50" disabled={!entry.trim()}>
                            Save Entry
                        </button>
                    )}
                    <button onClick={handleShare} className="!bg-transparent !border-2 !border-surface-border !text-text-primary hover:!border-primary hover:!text-primary !p-2 !rounded-full transition-all" aria-label="Share">
                        <Share2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GratitudeInput;
