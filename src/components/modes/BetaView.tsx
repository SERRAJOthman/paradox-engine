import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export const BetaView = () => {
    const [breathState, setBreathState] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

    // 4-7-8 Breathing Technique Simulation
    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        const cycle = () => {
            setBreathState('inhale');
            timeout = setTimeout(() => {
                setBreathState('hold');
                timeout = setTimeout(() => {
                    setBreathState('exhale');
                    timeout = setTimeout(() => {
                        cycle();
                    }, 8000); // Exhale for 8s
                }, 7000); // Hold for 7s
            }, 4000); // Inhale for 4s
        };

        cycle();
        return () => clearTimeout(timeout);
    }, []);

    return (
        <motion.div
            className="w-full h-full bg-[#E8E8DA] text-[#5C5A55] flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-1000"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Ambient Background Noise/Texture could go here */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            <div className="z-10 flex flex-col items-center max-w-xl text-center space-y-12">
                <motion.div>
                    <h2 className="text-sm font-serif italic tracking-widest uppercase opacity-60 mb-8">
                        Current Focus
                    </h2>
                    <h1 className="text-4xl md:text-5xl font-serif text-[#2C2B29] leading-tight">
                        Review structural integrity reports for Section 4.
                    </h1>
                </motion.div>

                {/* Breathing Indicator */}
                <div className="relative flex items-center justify-center w-64 h-64">
                    <motion.div
                        className="absolute rounded-full border border-[#8A9A5B]/30"
                        animate={{
                            width: breathState === 'inhale' ? 200 : breathState === 'hold' ? 200 : 100,
                            height: breathState === 'inhale' ? 200 : breathState === 'hold' ? 200 : 100,
                            opacity: breathState === 'exhale' ? 0.2 : 0.5,
                            borderColor: breathState === 'hold' ? '#8A9A5B' : '#8A9A5B33'
                        }}
                        transition={{ duration: breathState === 'inhale' ? 4 : breathState === 'hold' ? 0 : 8, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="w-4 h-4 rounded-full bg-[#8A9A5B]"
                        animate={{ scale: breathState === 'inhale' ? 1.5 : 1 }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                    />
                    <span className="absolute mt-32 text-xs font-serif italic opacity-40">
                        {breathState === 'inhale' ? 'Inhale' : breathState === 'hold' ? 'Hold' : 'Exhale'}
                    </span>
                </div>

                <button className="text-xs tracking-widest uppercase border-b border-transparent hover:border-[#5C5A55]/50 transition-all opacity-40 hover:opacity-100 pb-1">
                    Complete Task
                </button>
            </div>
        </motion.div>
    );
};
