import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { TimeDistanceChart } from './omega/TimeDistanceChart';

export const OmegaView = () => {
    const tasks = useStore((state) => state.tasks);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full bg-omega-black flex flex-col p-6"
        >
            <header className="flex justify-between items-center mb-8 border-b border-omega-gray pb-4">
                <div>
                    <h1 className="text-3xl font-bold font-sans tracking-tight text-white">ATLAS CONTROL</h1>
                    <p className="text-omega-cobalt font-mono text-sm">MODE: OMEGA // SYSTEM: OPTIMAL</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-omega-gray px-4 py-2 rounded border border-white/10">
                        <span className="text-xs text-gray-400 block">ACTIVE CREWS</span>
                        <span className="font-mono text-lg text-omega-cobalt">14</span>
                    </div>
                    <div className="bg-omega-gray px-4 py-2 rounded border border-white/10">
                        <span className="text-xs text-gray-400 block">SCHEDULE VARIANCE</span>
                        <span className="font-mono text-lg text-emerald-400">-0.4%</span>
                    </div>
                </div>
            </header>

            <div className="flex-1 bg-omega-gray rounded-lg border border-white/10 relative overflow-hidden">
                <TimeDistanceChart tasks={tasks} />

                {/* Overlay UI */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <div className="bg-black/50 backdrop-blur text-xs px-2 py-1 rounded border border-white/10 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500" /> Earthworks
                    </div>
                    <div className="bg-black/50 backdrop-blur text-xs px-2 py-1 rounded border border-white/10 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" /> Paving
                    </div>
                    <div className="bg-black/50 backdrop-blur text-xs px-2 py-1 rounded border border-white/10 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" /> Drainage
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
