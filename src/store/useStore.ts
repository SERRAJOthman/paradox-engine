import { create } from 'zustand';
import { AppState, AppMode } from './types';

// Mock Data Generation
const generateMockTasks = () => {
    return Array.from({ length: 50 }).map((_, i) => ({
        id: `task-${i}`,
        title: `Operation ${['Alpha', 'Bravo', 'Charlie', 'Delta'][i % 4]}-${i}`,
        start: new Date(2025, 0, 1 + i),
        end: new Date(2025, 0, 5 + i),
        startChainage: 1000 + (i * 50),
        endChainage: 1200 + (i * 50),
        type: ['earthworks', 'paving', 'drainage', 'structures'][i % 4] as any,
        progress: Math.random() * 100,
    }));
};

export const useStore = create<AppState>((set) => ({
    mode: 'omega', // Default to Order/Control

    setMode: (mode: AppMode) => {
        // Logic for transition effects could go here or in a middleware
        console.log(`Transitioning to ${mode.toUpperCase()} MODE`);
        set({ mode });
    },

    chaosLevel: 0,
    setChaosLevel: (level) => set({ chaosLevel: level }),

    tasks: generateMockTasks(),
}));
