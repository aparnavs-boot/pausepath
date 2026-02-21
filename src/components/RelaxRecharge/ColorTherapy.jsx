import React, { useState } from 'react';
import { Palette, RefreshCw } from 'lucide-react';

const colors = [
    '#c4b5fd', // Lavender
    '#a7f3d0', // Mint
    '#fbcfe8', // Blush
    '#fcd34d', // Yellow
    '#bae6fd', // Sky
    '#ffffff', // White
];

const MandalaPath = ({ d, color, onClick }) => (
    <path
        d={d}
        fill={color}
        stroke="var(--surface-border)"
        strokeWidth="1"
        className="cursor-pointer transition-colors duration-300 hover:brightness-110"
        onClick={onClick}
    />
);

const ColorTherapy = () => {
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    // A simple artificial flower/mandala SVG structure
    const [fills, setFills] = useState(Array(12).fill('transparent'));

    const handleFill = (index) => {
        const newFills = [...fills];
        newFills[index] = selectedColor;
        setFills(newFills);
    };

    const resetColors = () => {
        setFills(Array(12).fill('transparent'));
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Palette size={20} className="text-primary" />
                Color Therapy
            </h3>
            <p className="text-sm text-text-secondary mb-4 text-center">Tap a color, then tap a petal to fill.</p>

            {/* SVG Interactive Graphic */}
            <div className="relative w-48 h-48 mb-6 bg-surface rounded-xl shadow-inner flex items-center justify-center border border-surface-border">
                <svg viewBox="0 0 100 100" className="w-40 h-40">
                    {/* Center Core */}
                    <circle cx="50" cy="50" r="10" fill={fills[0]} onClick={() => handleFill(0)} className="cursor-pointer" />

                    {/* Petals */}
                    {[...Array(6)].map((_, i) => (
                        <g key={i} transform={`rotate(${i * 60} 50 50)`}>
                            {/* Inner Petal */}
                            <path
                                d="M50 40 C 45 30, 55 30, 50 20 C 45 30, 55 30, 50 40"
                                fill={fills[i + 1]}
                                onClick={() => handleFill(i + 1)}
                                stroke="var(--primary)"
                                strokeWidth="0.5"
                                className="cursor-pointer"
                            />
                            {/* Outer Petal Frame */}
                            <path
                                d="M50 20 C 35 10, 65 10, 50 0 C 35 10, 65 10, 50 20"
                                fill={fills[i + 7]}
                                onClick={() => handleFill(i + 7)}
                                stroke="var(--primary)"
                                strokeWidth="0.5"
                                className="cursor-pointer"
                            />
                        </g>
                    ))}
                </svg>
            </div>

            {/* Color Palette Selector */}
            <div className="flex gap-3 mb-4 flex-wrap justify-center">
                {colors.map((color) => (
                    <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`!w-8 !h-8 !p-0 !min-w-0 !rounded-full border-2 ${selectedColor === color ? 'border-text-primary scale-110 shadow-md' : 'border-transparent opacity-70'
                            }`}
                        style={{ background: color }}
                        aria-label={`Select color ${color}`}
                    />
                ))}
            </div>

            <button onClick={resetColors} className="text-xs py-1 px-4 bg-transparent border border-surface-border hover:bg-surface flex items-center gap-2">
                <RefreshCw size={12} /> Reset
            </button>
        </div>
    );
};

export default ColorTherapy;
