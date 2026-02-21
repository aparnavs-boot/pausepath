import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Bookmark, Check } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const quotes = {
    Happy: [
        "Joy is what happens to us when we allow ourselves to recognize how good things really are.",
        "Your smile is a signature of joy.",
    ],
    Calm: [
        "In the midst of movement and chaos, keep stillness inside of you.",
        "Peace is the result of retraining your mind to process life as it is.",
        "Breathe in deeply to bring your mind home to your body."
    ],
    Anxious: [
        "You don't have to control your thoughts. You just have to stop letting them control you.",
        "Take a deep breath. It's just a bad day, not a bad life.",
        "This too shall pass."
    ],
    Motivated: [
        "Small steps in the right direction can turn out to be the biggest step of your life.",
        "The secret of getting ahead is getting started.",
    ]
};

const QuotePopup = () => {
    const { mood } = useAppContext();
    const [isVisible, setIsVisible] = useState(false);
    const [currentQuote, setCurrentQuote] = useState("");
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        // Show a quote every 3 minutes (180000 ms) for demo purposes we can use 60000 (1 min)
        const interval = setInterval(() => {
            showRandomQuote();
        }, 120000); // 2 minutes

        // Show first quote shortly after load
        const initialTimeout = setTimeout(() => {
            showRandomQuote();
        }, 30000); // 30 seconds

        return () => {
            clearInterval(interval);
            clearTimeout(initialTimeout);
        };
    }, [mood]);

    const showRandomQuote = () => {
        const moodQuotes = quotes[mood] || quotes['Calm'];
        const randomQuote = moodQuotes[Math.floor(Math.random() * moodQuotes.length)];
        setCurrentQuote(randomQuote);
        setIsSaved(false);
        setIsVisible(true);
    };

    const handleSave = () => {
        setIsSaved(true);
        const savedQuotes = JSON.parse(localStorage.getItem('saved-quotes') || '[]');
        if (!savedQuotes.includes(currentQuote)) {
            savedQuotes.push(currentQuote);
            localStorage.setItem('saved-quotes', JSON.stringify(savedQuotes));
        }
    };

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Motivational Quote',
                    text: `"${currentQuote}"\n- Shared from PausePath 🍃`,
                });
            } else {
                navigator.clipboard.writeText(`"${currentQuote}"\n- Shared from PausePath 🍃`);
                alert('Quote copied to clipboard!');
            }
        } catch (error) {
            console.error("Error sharing:", error);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="fixed bottom-6 right-6 z-40 w-80 sm:w-96 glass-panel !p-6 !border-primary/30 shadow-2xl"
                >
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors bg-transparent border-none shadow-none focus:outline-none"
                        aria-label="Close popup"
                    >
                        <X size={20} />
                    </button>

                    <div className="mb-4 pr-6 mt-2">
                        <span className="text-primary text-3xl font-serif">"</span>
                        <p className="text-lg font-medium text-text-primary italic leading-relaxed">
                            {currentQuote}
                        </p>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            onClick={handleSave}
                            disabled={isSaved}
                            className={`!p-2 !w-10 !h-10 flex items-center justify-center !rounded-full transition-colors ${isSaved ? '!bg-emerald-500/20 !text-emerald-500 border-none' : '!bg-transparent border border-surface-border hover:!bg-surface !text-text-primary'
                                }`}
                            title="Save Quote"
                        >
                            {isSaved ? <Check size={18} /> : <Bookmark size={18} />}
                        </button>
                        <button
                            onClick={handleShare}
                            className="!p-2 !w-10 !h-10 flex items-center justify-center !rounded-full !bg-primary/20 hover:!bg-primary/40 !text-primary !border-none transition-colors"
                            title="Share"
                        >
                            <Share2 size={18} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default QuotePopup;
