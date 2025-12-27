export type AppMode = 'alpha' | 'omega' | 'beta' | 'theta' | 'sigma' | 'lambda';

export interface ProjectTask {
    id: string;
    title: string;
    start: Date;
    end: Date;
    startChainage: number;
    endChainage: number;
    type: 'earthworks' | 'paving' | 'drainage' | 'structures';
    progress: number;
}

export interface AppState {
    mode: AppMode;
    setMode: (mode: AppMode) => void;
    chaosLevel: number; // 0-100 for Alpha mode
    setChaosLevel: (level: number) => void;
    tasks: ProjectTask[];
}
