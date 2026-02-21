import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

const moods = [
    { id: 'Happy', emoji: '😊' },
    { id: 'Calm', emoji: '😌' },
    { id: 'Motivated', emoji: '🔥' },
    { id: 'Anxious', emoji: '😰' }
];

const affirmations = {
    Happy: "You are radiating positive energy today. Share it with the world.",
    Calm: "Your peace is your power. Protect your inner stillness.",
    Motivated: "You have everything you need within you to succeed.",
    Anxious: "You are safe. Take it one step at a time."
};

const DailyAffirmation = () => {
    const { mood, setMood } = useAppContext();

    return (
        <div className="flex flex-col items-center mb-10 w-full max-w-2xl mx-auto text-center opacity-0 animate-[fadeIn_1s_ease_forwards_0.5s]">

            <div className="flex gap-2 mb-6 bg-surface/50 backdrop-blur-md p-2 rounded-full border border-surface-border shadow-sm">
                {moods.map((m) => (
                    <button
                        key={m.id}
                        onClick={() => setMood(m.id)}
                        className={`!px-4 !py-2 !rounded-full !text-sm flex items-center gap-2 transition-all duration-300 ${mood === m.id
                                ? '!bg-primary !text-white shadow-md scale-105'
                                : '!bg-transparent !text-text-secondary hover:!text-text-primary !shadow-none hover:bg-surface-border'
                            }`}
                    >
                        <span>{m.emoji}</span>
                        <span className="hidden sm:inline font-medium">{m.id}</span>
                    </button>
                ))}
            </div>

            <motion.div
                key={mood}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6 rounded-2xl border border-surface-border/50 shadow-inner w-full"
            >
                <h3 className="text-sm uppercase tracking-widest text-primary font-semibold mb-2">Daily Affirmation for {mood}</h3>
                <p className="text-xl md:text-2xl font-medium text-text-primary leading-relaxed">
                    "{affirmations[mood] || affirmations['Calm']}"
                </p>
            </motion.div>
        </div>
    );
};

export default DailyAffirmation;
