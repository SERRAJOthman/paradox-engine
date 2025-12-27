import { AnimatePresence } from 'framer-motion';
import { useStore } from './store/useStore';
import { OmegaView } from './components/modes/OmegaView';
import { AlphaView } from './components/modes/AlphaView';
import { BetaView } from './components/modes/BetaView';
import { ThetaView } from './components/modes/ThetaView';
import { SigmaView } from './components/modes/SigmaView';
import { LambdaView } from './components/modes/LambdaView';
import { ModeSelector } from './components/ui/ModeSelector';

// Placeholder components for now
// PlaceholderView removed as it was unused

function App() {
    const mode = useStore((state) => state.mode);

    const renderMode = () => {
        switch (mode) {
            case 'omega': return <OmegaView />;
            case 'alpha': return <AlphaView />;
            case 'beta': return <BetaView />;
            case 'theta': return <ThetaView />;
            case 'sigma': return <SigmaView />;
            case 'lambda': return <LambdaView />;
            default: return <OmegaView />;
        }
    };

    return (
        <div className="w-screen h-screen relative bg-omega-black overflow-hidden font-sans">
            <AnimatePresence mode="wait">
                {renderMode()}
            </AnimatePresence>

            <ModeSelector />
        </div>
    );
}

export default App;
