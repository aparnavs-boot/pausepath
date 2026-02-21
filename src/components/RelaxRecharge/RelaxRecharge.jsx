import React, { useState } from 'react';
import { Sparkles, Wind, Palette, Heart, PuzzleIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import BreathingExercise from './BreathingExercise';
import ColorTherapy from './ColorTherapy';
import GratitudeInput from './GratitudeInput';
import SimplePuzzle from './SimplePuzzle';

const RelaxRecharge = () => {
    const [activeTab, setActiveTab] = useState('breathe');

    const tabs = [
        { id: 'breathe', label: 'Breathe', icon: Wind },
        { id: 'color', label: 'Color', icon: Palette },
        { id: 'gratitude', label: 'Gratitude', icon: Heart },
        { id: 'puzzle', label: 'Puzzle', icon: PuzzleIcon },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'breathe': return <BreathingExercise />;
            case 'color': return <ColorTherapy />;
            case 'gratitude': return <GratitudeInput />;
            case 'puzzle': return <SimplePuzzle />;
            default: return null;
        }
    };

    return (
        <div className="flex flex-col h-full min-h-[400px]">
            <div className="flex items-center gap-2 mb-6 text-text-primary">
                <Sparkles className="text-primary" />
                <h2 className="text-2xl font-semibold">Relax & Recharge</h2>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-surface-border mb-6 overflow-x-auto no-scrollbar relative w-full rounded-t-xl bg-surface/20">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-1 items-center justify-center gap-2 py-4 px-4 relative !bg-transparent !shadow-none !rounded-none !border-none !text-sm focus:outline-none transition-all whitespace-nowrap !min-w-0
                                ${isActive ? '!text-primary bg-surface/60 font-semibold' : '!text-text-secondary hover:!text-text-primary hover:bg-surface/30'}`}
                        >
                            <Icon size={18} className={isActive ? 'text-primary' : ''} />
                            <span>{tab.label}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </button>
                    )
                })}
            </div>

            {/* Content Area */}
            <div className="flex-grow bg-surface/40 rounded-b-2xl rounded-tr-2xl border border-surface-border overflow-hidden relative shadow-inner min-h-[300px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="h-full w-full flex items-center justify-center p-4"
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default RelaxRecharge;
