import React, { useState } from 'react';
import { BookOpen, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const stories = [
    {
        id: 1,
        title: "The Bamboo Tree",
        theme: "Growth",
        content: "A Chinese bamboo tree takes five years to grow. They have to water and fertilize the ground where it is every day, and it doesn't break through the ground for five years.\n\nAfter five years, once it breaks through the ground, it will grow 90 feet tall in five weeks! The truth is, the bamboo tree was growing underground, developing a root system strong enough to support its potential for outward growth in the fifth year and beyond.\n\nIf you feel like you've been working hard and seeing no results, remember the bamboo tree. Your roots are growing deep so you can reach high.",
        color: "bg-emerald-100 dark:bg-emerald-900/50",
        icon: "🌱"
    },
    {
        id: 2,
        title: "The Weight of the Glass",
        theme: "Letting Go",
        content: "A psychology professor walked around on a stage while teaching stress management to an auditorium filled with students. She raised a glass of water, and asked, 'How heavy is this glass of water?'\n\nThe students shouted out answers ranging from eight ounces to twenty ounces.\n\nShe replied, 'The absolute weight doesn't matter. It depends on how long I hold it. If I hold it for a minute, that's not a problem. If I hold it for an hour, I'll have an ache in my right arm. If I hold it for a day, you'll have to call an ambulance. In each case, it's the same weight, but the longer I hold it, the heavier it becomes.'\n\nShe continued, 'and that's the way it is with stress management. If we carry our burdens all the time, sooner or later, as the burden becomes increasingly heavy, we won't be able to carry on. As with the glass of water, you have to put it down for a while and rest before holding it again.'",
        color: "bg-blue-100 dark:bg-blue-900/50",
        icon: "💧"
    },
    {
        id: 3,
        title: "Kintsugi: Golden Repair",
        theme: "Healing",
        content: "When the Japanese mend broken objects, they aggrandize the damage by filling the cracks with gold. They believe that when something's suffered damage and has a history it becomes more beautiful.\n\nThis art is called Kintsugi. The flaws and the repair become a part of the history of an object, rather than something to disguise.\n\nThe scars we bear, whether physical or emotional, are not something to be hidden. They are proof that we have lived, that we have endured, and that we have healed. You are more beautiful because you have been broken, and you have put yourself back together with gold.",
        color: "bg-amber-100 dark:bg-amber-900/50",
        icon: "✨"
    }
];

const SoulStories = () => {
    const [selectedId, setSelectedId] = useState(null);
    const selectedStory = stories.find(s => s.id === selectedId);

    return (
        <div className="flex flex-col h-full min-h-[400px]">
            <div className="flex items-center gap-2 mb-6 text-text-primary">
                <BookOpen className="text-secondary" />
                <h2 className="text-2xl font-semibold">Stories for the Soul</h2>
            </div>
            <p className="text-text-secondary mb-6 leading-relaxed">
                Short 1-minute reads to inspire healing, resilience, and growth.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow relative">
                {stories.map(story => (
                    <motion.div
                        layoutId={`card-container-${story.id}`}
                        key={story.id}
                        onClick={() => setSelectedId(story.id)}
                        className={`rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow border border-surface-border flex flex-col justify-between ${story.color}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div>
                            <span className="text-4xl mb-4 block">{story.icon}</span>
                            <motion.h3 layoutId={`title-${story.id}`} className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                                {story.title}
                            </motion.h3>
                        </div>
                        <motion.span layoutId={`theme-${story.id}`} className="text-sm font-medium opacity-70 block mt-4 text-slate-700 dark:text-slate-300">
                            Theme: {story.theme}
                        </motion.span>
                    </motion.div>
                ))}

                <AnimatePresence>
                    {selectedId && selectedStory && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm"
                            onClick={() => setSelectedId(null)}
                        >
                            <motion.div
                                layoutId={`card-container-${selectedId}`}
                                className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 shadow-2xl relative border border-surface-border ${selectedStory.color}`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className="absolute top-4 right-4 p-2 bg-white/40 hover:bg-white/60 dark:bg-black/40 dark:hover:bg-black/60 rounded-full transition-colors backdrop-blur-md z-10"
                                    onClick={() => setSelectedId(null)}
                                    aria-label="Close story"
                                >
                                    <X size={20} className="text-slate-800 dark:text-slate-100" />
                                </button>

                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-5xl">{selectedStory.icon}</span>
                                    <div>
                                        <motion.h3 layoutId={`title-${selectedStory.id}`} className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                                            {selectedStory.title}
                                        </motion.h3>
                                        <motion.span layoutId={`theme-${selectedStory.id}`} className="text-sm font-medium opacity-80 text-slate-700 dark:text-slate-300">
                                            Theme: {selectedStory.theme}
                                        </motion.span>
                                    </div>
                                </div>

                                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-loose text-lg whitespace-pre-line">
                                    {selectedStory.content}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SoulStories;
