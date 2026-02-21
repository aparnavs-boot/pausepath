import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const BackgroundEffects = ({ theme }) => {
    const particles = useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            size: Math.random() * 15 + 5,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: Math.random() * 20 + 20,
            delay: Math.random() * -20,
            isLeaf: Math.random() > 0.6,
        }));
    }, []);

    return (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: -1, overflow: 'hidden' }}>
            <motion.div
                style={{ position: 'absolute', inset: 0, opacity: 0.3 }}
                animate={{
                    background: theme === 'dark'
                        ? 'radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(52, 211, 153, 0.3) 0%, transparent 50%)'
                        : 'radial-gradient(circle at 20% 30%, rgba(196, 181, 253, 0.5) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(167, 243, 208, 0.4) 0%, transparent 50%)'
                }}
                transition={{ duration: 2 }}
            />

            {particles.map((p) => {
                const bgLight = p.isLeaf ? 'rgba(167, 243, 208, 0.6)' : 'rgba(249, 168, 212, 0.6)';
                const bgDark = p.isLeaf ? 'rgba(6, 78, 59, 0.4)' : 'rgba(192, 132, 252, 0.4)';

                return (
                    <motion.div
                        key={p.id}
                        style={{
                            position: 'absolute',
                            borderRadius: p.isLeaf ? '100% 0% 100% 0%' : '50%',
                            backgroundColor: theme === 'dark' ? bgDark : bgLight,
                            filter: p.isLeaf ? 'none' : 'blur(2px)',
                            width: p.size,
                            height: p.isLeaf ? p.size * 1.5 : p.size,
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                        }}
                        animate={{
                            y: ['0%', '-20%', '10%', '0%'],
                            x: ['0%', '10%', '-10%', '0%'],
                            rotate: p.isLeaf ? [0, 90, 180, 270, 360] : 0,
                            opacity: p.isLeaf ? [0.2, 0.5, 0.2] : [0.3, 0.8, 0.3],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: p.delay,
                        }}
                    />
                );
            })}
        </div>
    );
};

export default BackgroundEffects;
