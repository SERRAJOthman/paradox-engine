import { useStore } from '../../store/useStore';
import { AppMode } from '../../store/types';
import { Layers, Zap, Hexagon, Eye, MonitorPlay, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

export const ModeSelector = () => {
    const { mode, setMode } = useStore();

    const modes: { id: AppMode; icon: any; label: string; color: string }[] = [
        { id: 'alpha', icon: Zap, label: 'Entropy', color: 'text-purple-400' },
        { id: 'omega', icon: Layers, label: 'Control', color: 'text-blue-400' },
        { id: 'beta', icon: Hexagon, label: 'Zen', color: 'text-stone-300' },
        { id: 'theta', icon: Eye, label: 'Oracle', color: 'text-amber-400' },
        { id: 'sigma', icon: MonitorPlay, label: 'Game', color: 'text-yellow-500' },
        { id: 'lambda', icon: BrainCircuit, label: 'Flow', color: 'text-cyan-400' },
    ];

    return (
        <motion.div
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex gap-4 shadow-2xl z-50"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
        >
            {modes.map((m) => (
                <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={`flex flex-col items-center gap-1 group transition-all duration-300 ${mode === m.id ? 'scale-110' : 'opacity-50 hover:opacity-100'}`}
                >
                    <div className={`p-2 rounded-full ${mode === m.id ? 'bg-white/10' : 'bg-transparent'} transition-colors`}>
                        <m.icon className={`w-6 h-6 ${m.color}`} />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-white/80 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 bg-black px-2 py-1 rounded">
                        {m.label}
                    </span>
                </button>
            ))}
        </motion.div>
    );
};
