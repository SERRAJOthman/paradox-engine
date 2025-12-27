import { motion } from 'framer-motion';
import { Shield, Sword, Scroll, Zap, Skull, Coins, Trophy } from 'lucide-react';

export const SigmaView = () => {
    return (
        <motion.div
            className="w-full h-full bg-[#0B1016] text-[#CABDFF] font-sans p-0 flex relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Background Art Layer */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />

            {/* Left Sidebar - Character Stats */}
            <div className="w-80 h-full bg-[#151B24]/90 border-r border-[#2C333F] p-6 flex flex-col gap-6 z-10 backdrop-blur-md">
                <div className="flex flex-col items-center pb-6 border-b border-[#2C333F]">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-600 to-yellow-300 p-[2px] mb-4">
                        <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-white">Project Warlord</h2>
                    <span className="text-xs text-yellow-500 uppercase tracking-widest font-bold">Lvl 42 Engineer</span>
                </div>

                <div className="space-y-4">
                    <StatRow icon={<Sword size={16} />} label="Productivity" value={85} color="bg-red-500" />
                    <StatRow icon={<Shield size={16} />} label="Compliance" value={92} color="bg-blue-500" />
                    <StatRow icon={<Zap size={16} />} label="Morale" value={64} color="bg-yellow-500" />
                </div>

                <div className="mt-auto bg-black/40 rounded p-4 border border-white/5">
                    <div className="flex items-center gap-2 mb-2 text-yellow-500">
                        <Coins size={16} />
                        <span className="text-sm font-bold">Gold (Budget)</span>
                    </div>
                    <div className="text-2xl font-mono text-white">$4,250,000</div>
                </div>
            </div>

            {/* Main Quest Area */}
            <div className="flex-1 p-8 overflow-y-auto relative z-10">
                <header className="mb-8 flex items-center gap-4">
                    <Scroll className="text-yellow-500" size={32} />
                    <h1 className="text-3xl font-bold text-white uppercase tracking-tight shadow-black drop-shadow-lg">Active Quest Log</h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <QuestCard
                        title="The Permitting Dragon"
                        desc="Submit documentation before the deadline hits to avoid the wrath of the City Council."
                        reward="2500 XP"
                        difficulty="Legendary"
                        type="boss"
                    />
                    <QuestCard
                        title="Supply Run: Asphalt"
                        desc="Coordinate delivery of 500 tons of material to Sector 7."
                        reward="500 XP"
                        difficulty="Normal"
                        type="fetch"
                    />
                    <QuestCard
                        title="Morale Boost"
                        desc="Organize team lunch to restore +10 Mana to all crew members."
                        reward="150 XP"
                        difficulty="Easy"
                        type="social"
                    />
                </div>
            </div>
        </motion.div>
    );
};

const StatRow = ({ icon, label, value, color }: any) => (
    <div>
        <div className="flex justify-between text-xs mb-1 text-gray-400">
            <div className="flex items-center gap-2">{icon} {label}</div>
            <span>{value}/100</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                className={`h-full ${color}`}
            />
        </div>
    </div>
);

const QuestCard = ({ title, desc, reward, difficulty, type }: any) => (
    <motion.div
        whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}
        className={`bg-[#1A212E] border-2 rounded-xl p-5 flex flex-col gap-4 relative overflow-hidden group ${type === 'boss' ? 'border-red-900/50' : 'border-[#2C333F]'
            }`}
    >
        {type === 'boss' && (
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-600/20 rounded-full blur-xl group-hover:bg-red-600/30 transition-colors" />
        )}

        <div className="flex justify-between items-start z-10">
            <div className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${type === 'boss' ? 'bg-red-500 text-white' : 'bg-slate-700 text-gray-300'
                }`}>
                {difficulty}
            </div>
            {type === 'boss' ? <Skull className="text-red-500" /> : <Trophy className="text-yellow-600" size={20} />}
        </div>

        <div className="z-10">
            <h3 className="text-lg font-bold text-white mb-2 leading-tight">{title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
        </div>

        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-yellow-500 font-mono text-sm z-10">
            <span>Reward</span>
            <span className="font-bold">{reward}</span>
        </div>
    </motion.div>
);
