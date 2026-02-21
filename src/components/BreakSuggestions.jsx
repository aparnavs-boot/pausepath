import React, { useState } from 'react';

const activities = [
    { text: "Take a 10-minute walk outside 🌳", type: "active" },
    { text: "Visit a nearby coffee shop ☕", type: "social" },
    { text: "Plan a short trip to a local park 🏞️", type: "adventure" },
    { text: "Drive to a scenic spot for a view 🚗", type: "adventure" },
    { text: "Stretch for 5 minutes 🧘", type: "active" },
    { text: "Drink a glass of water 💧", type: "health" },
    { text: "Look out the window for 20-20-20 rule 👀", type: "health" },
    { text: "Doodle on a piece of paper ✏️", type: "creative" }
];

const BreakSuggestions = ({ showSuggestion }) => {
    const [randomSuggestion, setRandomSuggestion] = useState(null);

    React.useEffect(() => {
        if (showSuggestion) {
            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
            setRandomSuggestion(randomActivity);
        } else {
            setRandomSuggestion(null);
        }
    }, [showSuggestion]);

    return (
        <div className="places">
            <h3>Nearby Mindful Spots</h3>
            <div className="place">🌳 Riverside Park</div>
            <div className="place">☕ Cozy Café</div>
            <div className="place">🌿 Botanical Garden</div>
            {randomSuggestion && (
                <div className="place" style={{ background: '#e3f2fd', border: '1px solid #90caf9' }}>
                    ✨ Suggestion: {randomSuggestion.text}
                </div>
            )}
        </div>
    );
};

export default BreakSuggestions;
