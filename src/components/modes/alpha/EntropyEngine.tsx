import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Eye, HelpCircle } from 'lucide-react';
import { useStore } from '../../../store/useStore';

const PHILOSOPHICAL_INTRUSIONS = [
    "What if Gantt charts are just elaborate lies we tell ourselves?",
    "Does the critical path exist if no one walks it?",
    "Your deadline is a social construct.",
    "Completion is just the beginning of obsolescence.",
    "Why organize when entropy is inevitable?",
    "Productivity is a capitalist myth.",
    "Reviewing this task won't fill the void.",
    "Have you considered doing literally anything else?",
];

const GLITCH_EFFECTS = [
    "hue-rotate-90",
    "invert",
    "blur-sm",
    "skew-x-12",
    "scale-110",
    "grayscale",
];

export const EntropyEngine = () => {
    const chaosLevel = useStore((state) => state.chaosLevel);
    const [intrusions, setIntrusions] = useState<{ id: number, text: string, x: number, y: number }[]>([]);
    const [glitchClass, setGlitchClass] = useState("");

    // Random intrusions
    useEffect(() => {
        const interval = setInterval(() => {
            // Chance to spawn intrusion increases with chaos level (simulated for now as high)
            if (Math.random() > 0.7) {
                const id = Date.now();
                const text = PHILOSOPHICAL_INTRUSIONS[Math.floor(Math.random() * PHILOSOPHICAL_INTRUSIONS.length)];
                const x = Math.random() * (window.innerWidth - 300);
                const y = Math.random() * (window.innerHeight - 100);

                setIntrusions(prev => [...prev, { id, text, x, y }]);
            }
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    // Random UI Glitches
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.8) {
                const effect = GLITCH_EFFECTS[Math.floor(Math.random() * GLITCH_EFFECTS.length)];
                setGlitchClass(effect);
                setTimeout(() => setGlitchClass(""), 200 + Math.random() * 800);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const dismissIntrusion = (id: number) => {
        setIntrusions(prev => prev.filter(i => i.id !== id));
    };

    return (
        <>
            {/* Introduction of Glitch overlay handled by parent via glitchClass, 
          but we can also inject a global style or fixed overlay here */}
            <div className={`pointer-events-none fixed inset-0 z-40 mix-blend-exclusion transition-all duration-100 ${glitchClass ? 'bg-red-500/10' : 'bg-transparent'}`} />

            {/* Intrusions */}
            <AnimatePresence>
                {intrusions.map(intrusion => (
                    <motion.div
                        key={intrusion.id}
                        initial={{ opacity: 0, scale: 0, rotate: Math.random() * 20 - 10 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
                        style={{ left: intrusion.x, top: intrusion.y }}
                        className="fixed z-50 w-80 bg-black/90 border border-purple-500/50 text-purple-200 p-4 rounded shadow-[0_0_30px_rgba(168,85,247,0.4)] backdrop-blur-md"
                        drag
                        dragConstraints={{ left: 0, right: window.innerWidth - 320, top: 0, bottom: window.innerHeight - 200 }}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2 text-purple-400">
                                <BrainIcon />
                                <span className="text-xs font-mono uppercase tracking-widest">Existential Query</span>
                            </div>
                            <button
                                onClick={() => dismissIntrusion(intrusion.id)}
                                className="hover:text-white transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <p className="font-serif italic text-lg leading-relaxed">
                            "{intrusion.text}"
                        </p>
                        <div className="mt-4 flex gap-2">
                            <button className="flex-1 bg-purple-500/20 hover:bg-purple-500/40 py-1 text-xs rounded border border-purple-500/30 transition-colors">
                                Contemplate
                            </button>
                            <button
                                onClick={() => dismissIntrusion(intrusion.id)}
                                className="flex-1 bg-white/5 hover:bg-white/10 py-1 text-xs rounded border border-white/10 transition-colors"
                            >
                                Ignore Truth
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Global CSS Injection for Glitch Class on Body/App if needed, 
          but for now we passed it as a simple state. 
          Ideally, we'd pass this up to the view provided props.
          But let's assume AlphaView will use a context or we make this an overlay.
      */}
            {glitchClass && (
                <style>{`
          .paradox-app-root {
            filter: ${glitchClass === 'hue-rotate-90' ? 'hue-rotate(90deg)' :
                        glitchClass === 'invert' ? 'invert(1)' :
                            glitchClass === 'blur-sm' ? 'blur(4px)' :
                                glitchClass === 'grayscale' ? 'grayscale(1)' : 'none'};
            transform: ${glitchClass === 'skew-x-12' ? 'skewX(12deg)' :
                        glitchClass === 'scale-110' ? 'scale(1.1)' : 'none'};
          }
        `}</style>
            )}
        </>
    );
};

const BrainIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 3 2.5 2.5 0 0 0 .22 3.22l-1.46 1.46a2 2 0 0 0 3 2.5 2.5 0 0 0 3.22.22l1.46-1.46a2.5 2.5 0 0 0 3 .22 2.5 2.5 0 0 0 3-1.98A2.5 2.5 0 0 0 16.5 7.5 2.5 2.5 0 0 0 12 4.5Z" />
        <path d="M12 12v.01" />
    </svg>
)
