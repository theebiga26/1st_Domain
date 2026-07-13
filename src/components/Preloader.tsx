import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const loadingSteps = [
  'INITIALIZING COMPUTE ENVIRONMENT...',
  'CONNECTING GPU CLUSTERS...',
  'ESTABLISHING INFRASTRUCTURE LATENCY MESH...',
  'STARTING VERTEXGRID ORCHESTRATOR...',
  'SYSTEM READY'
];

export default function Preloader() {
  const [stepIndex, setStepIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Cycle through loading steps
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepInterval);
        return prev;
      });
    }, 450);

    // Simulate completion
    const loadTimeout = setTimeout(() => {
      setIsLoaded(true);
    }, 2400);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(loadTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -100,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020817] overflow-hidden select-none pointer-events-none"
        >
          {/* Animated Tech Grid Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Glowing background blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative flex flex-col items-center max-w-md w-full px-6 text-center">
            {/* Spinning/pulsing unique central node network indicator */}
            <div className="relative w-24 h-24 mb-10 flex items-center justify-center">
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                className="absolute inset-0 border-2 border-dashed border-blue-500/30 rounded-full"
              />

              {/* Inner rotating hexagonal pattern */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                className="absolute w-16 h-16 border-2 border-double border-blue-400/50 rounded-lg"
              />

              {/* Glowing center core */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="w-6 h-6 bg-blue-500 rounded-full shadow-[0_0_20px_#3b82f6]"
              />
            </div>

            {/* Simulated telemetry logs */}
            <div className="h-6 mb-2 overflow-hidden w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stepIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs font-mono tracking-[0.2em] text-blue-400 font-bold"
                >
                  {loadingSteps[stepIndex]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Glowing progress line */}
            <div className="w-48 h-[2px] bg-slate-800 rounded-full overflow-hidden relative border border-slate-700/50">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_10px_#3b82f6]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>

            {/* Running operations count indicator */}
            <div className="mt-6 flex justify-between w-48 text-[9px] font-mono text-slate-500">
              <span>SYS_OP: 0x8F9B</span>
              <span>VAL_NODE: OK</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
