import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Play, Pause, Square } from 'lucide-react';

export const LambdaView = () => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: any = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const formatTime = (totalSeconds: number) => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return `${h > 0 ? h + ':' : ''}${m < 10 && h > 0 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s} `;
    };

    return (
        <motion.div
            className="w-full h-full bg-[#050B14] text-blue-100 flex flex-col items-center justify-center relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Visualizer Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="w-[800px] h-[800px] rounded-full border border-blue-500/20"
                />
                <motion.div
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ repeat: Infinity, duration: 6 }}
                    className="absolute w-[600px] h-[600px] rounded-full border border-cyan-500/20"
                />
            </div>

            <div className="z-10 text-center">
                <h3 className="text-cyan-500/50 tracking-[0.3em] text-sm uppercase mb-8">Deep Work Session</h3>

                <div className="text-9xl font-light font-mono text-white tracking-widest mb-12 tabular-nums">
                    {formatTime(seconds)}
                </div>

                <div className="flex items-center justify-center gap-8">
                    {!isActive ? (
                        <button
                            onClick={() => setIsActive(true)}
                            className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-all hover:scale-110 shadow-[0_0_30px_rgba(37,99,235,0.4)]"
                        >
                            <Play fill="white" className="ml-1" />
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsActive(false)}
                            className="w-16 h-16 rounded-full bg-transparent border border-white/20 hover:bg-white/10 flex items-center justify-center transition-all"
                        >
                            <Pause fill="white" />
                        </button>
                    )}
                </div>
            </div>

            <div className="absolute bottom-12 text-blue-500/40 text-xs">
                Notifications Silenced • Peripheral Noise Cancelled
            </div>
        </motion.div>
    );
};
