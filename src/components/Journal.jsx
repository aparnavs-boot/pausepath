import React, { useState } from 'react';

const Journal = () => {
    const [entry, setEntry] = useState('');

    const saveJournal = () => {
        if (entry.trim()) {
            // Save to local storage (simple array of entries)
            const entries = JSON.parse(localStorage.getItem('pausePathJournal')) || [];
            const newEntry = {
                date: new Date().toLocaleString(),
                text: entry
            };
            entries.push(newEntry);
            localStorage.setItem('pausePathJournal', JSON.stringify(entries));
            
            setEntry('');
            alert("Reflection saved! 💜");
        } else {
            alert("Please write something first.");
        }
    };

    return (
        <div className="journal-section">
            <textarea
                id="journalEntry"
                placeholder="How does your mind feel? 💜"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
            ></textarea>
            <button className="journal" onClick={saveJournal}>Save Reflection</button>
        </div>
    );
};

export default Journal;
