import { motion } from 'framer-motion';
import { EntropyEngine } from './alpha/EntropyEngine';

export const AlphaView = () => {
    return (
        <motion.div
            className="paradox-app-root w-full h-full bg-alpha-bg relative overflow-hidden transition-all duration-300"
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'hue-rotate(90deg)' }}
            transition={{ duration: 0.8, ease: "anticipate" }}
        >
            <EntropyEngine />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-pulse transform -rotate-6 mix-blend-difference z-10">
                    ENTROPY REIGNS
                </h1>
            </div>

            {/* Floating Chaos Elements */}
            <motion.div
                animate={{ x: [0, 100, -100, 0], y: [0, -50, 50, 0], rotate: [0, 180, -180, 0] }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl mix-blend-screen"
            />
            <motion.div
                animate={{ x: [0, -150, 50, 0], y: [0, 100, -20, 0], scale: [1, 1.5, 0.5, 1] }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl mix-blend-screen"
            />
        </motion.div>
    );
};
