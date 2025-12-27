import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight, AlertCircle, TrendingUp, Calendar } from 'lucide-react';

export const ThetaView = () => {
    const [confidence, setConfidence] = useState(50);
    const [selectedTimeline, setSelectedTimeline] = useState<number | null>(null);

    const predictions = [
        { id: 1, date: 'Mar 15', event: 'Material Shortage', probability: 85, impact: 'High', type: 'risk' },
        { id: 2, date: 'Mar 18', event: 'Early Completion: Phase 1', probability: 30, impact: 'Positive', type: 'opportunity' },
        { id: 3, date: 'Apr 02', event: 'Weather Delay (Storm)', probability: confidence > 60 ? 92 : 45, impact: 'Medium', type: 'risk' },
    ];

    return (
        <motion.div
            className="w-full h-full bg-[#0F0529] text-[#E0D4FF] relative overflow-hidden font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(107,70,193,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(107,70,193,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

            <div className="relative z-10 p-8 h-full flex flex-col">
                <header className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-amber-300 mb-2">
                            ORACLE NEXUS
                        </h1>
                        <p className="text-purple-300/60 text-sm tracking-widest uppercase">
                            Probabilistic Future Modeling // T+{confidence}H
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 w-64">
                        <label className="text-xs text-purple-400 uppercase">Speculation Threshold</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={confidence}
                            onChange={(e) => setConfidence(parseInt(e.target.value))}
                            className="w-full h-1 bg-purple-900 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-amber-400 [&::-webkit-slider-thumb]:rounded-full"
                        />
                        <div className="flex justify-between w-full text-[10px] text-purple-500">
                            <span>Conservative</span>
                            <span>Aggressive</span>
                        </div>
                    </div>
                </header>

                <div className="flex-1 grid grid-cols-12 gap-8">
                    {/* Timeline Visualization */}
                    <div className="col-span-8 bg-purple-900/10 border border-purple-500/20 rounded-xl p-6 relative backdrop-blur-sm">
                        <h3 className="text-purple-300 text-xs uppercase mb-6 flex items-center gap-2">
                            <TrendingUp size={14} /> Projected Trajectories
                        </h3>

                        <div className="flex items-center justify-between h-64 relative">
                            {/* Simplified Lines */}
                            <svg className="absolute inset-0 w-full h-full overflow-visible">
                                <path d="M0,150 C100,150 200,100 800,50" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5,5" className="opacity-50" />
                                <path d="M0,150 C100,150 200,180 800,200" fill="none" stroke="#DC2626" strokeWidth="2" strokeDasharray="5,5" className="opacity-50" />
                                <path d="M0,150 C150,150 300,120 800,120" fill="none" stroke="#A855F7" strokeWidth="4" />

                                {/* Data Points */}
                                <circle cx="800" cy="50" r="4" fill="#F59E0B" />
                                <circle cx="800" cy="200" r="4" fill="#DC2626" />
                                <circle cx="800" cy="120" r="6" fill="#A855F7" className="animate-pulse" />
                            </svg>

                            {/* Time Markers */}
                            <div className="absolute bottom-0 w-full flex justify-between text-[10px] text-purple-500/50">
                                <span>Today</span>
                                <span>+1 Week</span>
                                <span>+1 Month</span>
                                <span>+3 Months</span>
                                <span>+6 Months</span>
                            </div>
                        </div>
                    </div>

                    {/* Event Feed */}
                    <div className="col-span-4 space-y-4">
                        <h3 className="text-purple-300 text-xs uppercase mb-2 flex items-center gap-2">
                            <AlertCircle size={14} /> Predicted Events
                        </h3>

                        {predictions.map(pred => (
                            <motion.div
                                key={pred.id}
                                layoutId={`pred - ${pred.id} `}
                                onClick={() => setSelectedTimeline(pred.id)}
                                className={`p - 4 rounded - lg border cursor - pointer transition - all ${pred.probability > 80 ? 'bg-purple-500/10 border-purple-500/50' : 'bg-white/5 border-white/5'
                                    } `}
                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(139, 92, 246, 0.15)' }}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text - xs px - 2 py - 0.5 rounded font - bold ${pred.type === 'risk' ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'
                                        } `}>
                                        {pred.impact.toUpperCase()}
                                    </span>
                                    <span className="text-amber-400 font-bold text-sm">{pred.probability}%</span>
                                </div>
                                <h4 className="text-sm font-semibold mb-1">{pred.event}</h4>
                                <div className="flex items-center gap-2 text-xs text-purple-400/60">
                                    <Calendar size={12} /> {pred.date}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
