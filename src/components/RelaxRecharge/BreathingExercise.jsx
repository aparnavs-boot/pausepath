import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BreathingExercise = () => {
    const [phase, setPhase] = useState('idle'); // idle, inhale, hold, exhale
    const [timeLeft, setTimeLeft] = useState(0);

    const phases = {
        inhale: { text: 'Inhale...', duration: 4 },
        hold: { text: 'Hold...', duration: 4 },
        exhale: { text: 'Exhale...', duration: 6 },
    };

    useEffect(() => {
        let timer;
        if (phase !== 'idle' && phase !== 'done') {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        advancePhase();
                        return 0; // Handled by advancePhase immediately
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [phase]);

    const advancePhase = () => {
        if (phase === 'inhale') {
            setPhase('hold');
            setTimeLeft(phases.hold.duration);
        } else if (phase === 'hold') {
            setPhase('exhale');
            setTimeLeft(phases.exhale.duration);
        } else if (phase === 'exhale') {
            setPhase('inhale'); // loop
            setTimeLeft(phases.inhale.duration);
        }
    };

    const startExercise = () => {
        setPhase('inhale');
        setTimeLeft(phases.inhale.duration);
    };

    const stopExercise = () => {
        setPhase('idle');
        setTimeLeft(0);
    };

    const getCircleAnimation = () => {
        if (phase === 'idle') return { scale: 1, opacity: 0.5 };
        if (phase === 'inhale') return { scale: 2, opacity: 1, transition: { duration: phases.inhale.duration, ease: "easeInOut" } };
        if (phase === 'hold') return { scale: 2, opacity: 1 };
        if (phase === 'exhale') return { scale: 1, opacity: 0.5, transition: { duration: phases.exhale.duration, ease: "easeInOut" } };
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 text-center h-full min-h-[300px]">
            <div className="relative w-56 h-56 flex items-center justify-center mb-8">
                {/* Static Outer Ring */}
                <div className="absolute inset-0 rounded-full border border-primary opacity-30 border-dashed animate-[spin_20s_linear_infinite]"></div>

                {/* Animated Inner Circle */}
                <motion.div
                    className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-secondary/80 to-primary/80 opacity-60 blur-[4px] shadow-lg shadow-primary/20"
                    animate={getCircleAnimation()}
                />

                {/* Text centered */}
                <div className="z-10 absolute flex flex-col items-center gap-1 font-medium text-2xl text-text-primary drop-shadow-md">
                    <span className="tracking-wide">{phase === 'idle' ? "Ready?" : phases[phase]?.text}</span>
                    <AnimatePresence>
                        {phase !== 'idle' && (
                            <motion.span
                                key={timeLeft}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, position: 'absolute' }}
                                className="text-lg opacity-80 font-mono"
                            >
                                {timeLeft}s
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {phase === 'idle' ? (
                <button onClick={startExercise} className="text-base py-3 px-8 rounded-full shadow-lg shadow-primary/20">Begin Breathing</button>
            ) : (
                <button onClick={stopExercise} className="text-base py-3 px-8 rounded-full bg-transparent border-2 border-surface-border hover:border-primary/50 text-text-primary transition-colors">Stop</button>
            )}
        </div>
    );
};

export default BreathingExercise;
