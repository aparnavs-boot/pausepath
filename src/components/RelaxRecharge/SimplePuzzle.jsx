import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Puzzle, CheckCircle } from 'lucide-react';

// A simple 3x3 grid puzzle
const gridSize = 3;
const totalTiles = gridSize * gridSize;

// Using an array of colors to represent a gradient/image for simplicity
const generateTiles = () => {
    return Array.from({ length: totalTiles }, (_, i) => ({
        id: i,
        correctPos: i,
        // Calculate an HSL color that forms a gradient from top-left to bottom-right
        color: `hsl(${180 + (i * 10)}, 60%, 70%)`
    }));
};

const SimplePuzzle = () => {
    const [tiles, setTiles] = useState([]);
    const [selectedTile, setSelectedTile] = useState(null);
    const [isSolved, setIsSolved] = useState(false);

    useEffect(() => {
        initGame();
    }, []);

    const initGame = () => {
        let newTiles = generateTiles();
        // Shuffle
        for (let i = newTiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newTiles[i], newTiles[j]] = [newTiles[j], newTiles[i]];
        }
        setTiles(newTiles);
        setIsSolved(false);
        setSelectedTile(null);
    };

    const handleTileClick = (index) => {
        if (isSolved) return;

        if (selectedTile === null) {
            setSelectedTile(index);
        } else {
            // Swap tiles
            const newTiles = [...tiles];
            const temp = newTiles[selectedTile];
            newTiles[selectedTile] = newTiles[index];
            newTiles[index] = temp;

            setTiles(newTiles);
            setSelectedTile(null);
            checkWin(newTiles);
        }
    };

    const checkWin = (currentTiles) => {
        const won = currentTiles.every((tile, i) => tile.correctPos === i);
        if (won) {
            setIsSolved(true);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 w-full h-full max-w-sm mx-auto">
            <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                <Puzzle size={24} className="text-secondary" />
                Calm Puzzle
            </h3>
            <p className="text-sm text-text-secondary mb-8 text-center">Tap two tiles to swap and complete the gentle gradient.</p>

            <div className="relative w-full aspect-square max-w-[280px]">
                <div
                    className="grid gap-2 mb-8 bg-surface-border/50 p-2 rounded-xl w-full h-full shadow-inner"
                    style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
                >
                    {tiles.map((tile, index) => (
                        <motion.div
                            key={tile.id}
                            layout
                            className={`w-full h-full rounded-lg cursor-pointer shadow-sm ${selectedTile === index ? 'ring-4 ring-primary ring-offset-2 ring-offset-[#fdfbf7] dark:ring-offset-[#0f172a] scale-95 z-10' : 'hover:scale-[1.02] hover:shadow-md'} transition-all`}
                            style={{ backgroundColor: tile.color }}
                            onClick={() => handleTileClick(index)}
                            initial={false}
                            animate={{ opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                    ))}
                </div>

                {isSolved && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 bg-surface/90 backdrop-blur-md rounded-xl flex flex-col items-center justify-center -m-2 shadow-xl z-20"
                    >
                        <CheckCircle className="text-emerald-500 mb-3" size={48} />
                        <p className="text-xl font-medium text-text-primary">Peace Restored</p>
                    </motion.div>
                )}
            </div>

            <button onClick={initGame} className="mt-6 text-sm py-2 px-8 border-2 border-surface-border bg-transparent hover:bg-surface hover:text-primary transition-colors text-text-primary font-medium rounded-full">
                {isSolved ? "Play Again" : "Shuffle Tiles"}
            </button>
        </div>
    );
};

export default SimplePuzzle;
