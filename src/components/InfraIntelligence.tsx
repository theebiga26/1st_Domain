import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, Cpu, RefreshCw, Layers, Zap, AlertTriangle, Play } from 'lucide-react';

interface SimulationState {
  title: string;
  activeNodes: number;
  utilization: number;
  costRate: string;
  stateLog: string[];
  status: 'optimal' | 'rebalancing' | 'restored' | 'warning';
}

export default function InfraIntelligence() {
  const [activeScenario, setActiveScenario] = useState<string>('idle');
  const [simState, setSimState] = useState<SimulationState>({
    title: 'Standard Pipeline Operation',
    activeNodes: 128,
    utilization: 74.5,
    costRate: '$184.20/hr',
    stateLog: [
      '✔ Daemon monitoring initialized.',
      '✔ Memory overhead optimal: 382 GB / node.',
      '✔ Global scheduler balancing active tasks.',
    ],
    status: 'optimal',
  });

  const runScenario = (scenario: string) => {
    setActiveScenario(scenario);
    if (scenario === 'spike') {
      setSimState({
        title: 'High-Volume Inference Spike (10M Tokens/sec)',
        activeNodes: 128,
        utilization: 74.5,
        costRate: '$184.20/hr',
        stateLog: ['[SIMULATING EVENT] Triggering sudden 10M inference spike...'],
        status: 'rebalancing',
      });

      setTimeout(() => {
        setSimState({
          title: 'Fractional GPU Split Active (Spike Handled)',
          activeNodes: 384,
          utilization: 94.2,
          costRate: '$292.50/hr',
          stateLog: [
            '[SIMULATING EVENT] Triggering sudden 10M inference spike...',
            '✔ [AUTOSCALE] Auto-scaler spun up 256 logical fractional nodes.',
            '✔ [OPTIMIZER] Sliced active H100 units into 4x isolated pools.',
            '✔ [ROUTING] Global traffic balanced over new container groups.',
            '✔ [SLA] Sub-15ms scheduling delay validated under load.',
          ],
          status: 'optimal',
        });
      }, 1500);
    } else if (scenario === 'failover') {
      setSimState({
        title: 'Simulating Hard Physical Node Dropout',
        activeNodes: 128,
        utilization: 74.5,
        costRate: '$184.20/hr',
        stateLog: [
          '[SIMULATING EVENT] Triggering hardware voltage dropout on node-va-34...',
          '⚠ [HARDWARE_FAIL] Node node-va-34 reported complete failure.',
        ],
        status: 'warning',
      });

      setTimeout(() => {
        setSimState({
          title: 'Weight Hot-Swap Complete (Workload Restored)',
          activeNodes: 128,
          utilization: 75.1,
          costRate: '$184.80/hr',
          stateLog: [
            '[SIMULATING EVENT] Triggering hardware voltage dropout on node-va-34...',
            '⚠ [HARDWARE_FAIL] Node node-va-34 reported complete failure.',
            '✔ [FAILSAFE] Dynamic scheduler isolated node-va-34.',
            '✔ [WEIGHT_SWAP] Pulled latest epoch checkpoint from NVMe cache.',
            '✔ [RESTORE] Workload migrated to pre-warmed stand-by node-va-45.',
            '✔ [SUCCESS] Model training execution resumed. Zero epochs lost.',
          ],
          status: 'restored',
        });
      }, 1500);
    } else {
      setSimState({
        title: 'Standard Pipeline Operation',
        activeNodes: 128,
        utilization: 74.5,
        costRate: '$184.20/hr',
        stateLog: [
          '✔ Daemon monitoring initialized.',
          '✔ Memory overhead optimal: 382 GB / node.',
          '✔ Global scheduler balancing active tasks.',
        ],
        status: 'optimal',
      });
    }
  };

  return (
    <section id="infra-intelligence" className="py-24 bg-[#EEF2FF] bg-animate-gradient-indigo relative overflow-hidden">
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="absolute top-0 bottom-0 left-12 w-px bg-slate-100 pointer-events-none hidden xl:block" />
      <div className="absolute top-0 bottom-0 right-12 w-px bg-slate-100 pointer-events-none hidden xl:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title block */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F5F9] border border-slate-200 mb-4"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#1E3A8A]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1E3A8A]">
              Autonomous Intelligence
            </span>
          </motion.div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Infrastructure Self-Healing & Telemetry
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Test the resilience of the VertexGrid scheduler. Trigger high-stress operational scenarios and watch our active nodes auto-scale and self-heal.
          </p>
        </div>

        {/* Console Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Left Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest pl-1 mb-1">
              Select Stress Test Scenario
            </div>

            {/* Scenario Button 1 */}
            <button
              onClick={() => runScenario('failover')}
              className={`text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group flex gap-4 ${
                activeScenario === 'failover'
                  ? 'bg-red-50 border-red-300 shadow-sm text-red-900'
                  : 'bg-white border-[#E2E8F0] hover:border-[#1E3A8A]/30 text-slate-700'
              }`}
            >
              <div className={`p-2.5 rounded-xl shrink-0 ${
                activeScenario === 'failover' ? 'bg-red-100 text-red-600' : 'bg-slate-50 text-slate-500'
              }`}>
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold tracking-tight">
                  Node Hardware Dropout
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Drop a physical H100 node mid-epoch. Tests our Weight Hot-Swap weight state recovery mechanism.
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#1E3A8A] group-hover:translate-x-1 transition-transform">
                  Trigger failover test <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
              </div>
            </button>

            {/* Scenario Button 2 */}
            <button
              onClick={() => runScenario('spike')}
              className={`text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group flex gap-4 ${
                activeScenario === 'spike'
                  ? 'bg-blue-50 border-blue-300 shadow-sm text-blue-900'
                  : 'bg-white border-[#E2E8F0] hover:border-[#1E3A8A]/30 text-slate-700'
              }`}
            >
              <div className={`p-2.5 rounded-xl shrink-0 ${
                activeScenario === 'spike' ? 'bg-blue-100 text-blue-600' : 'bg-slate-50 text-slate-500'
              }`}>
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold tracking-tight">
                  10M Token Inference Spike
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Trigger an instantaneous 10M token pipeline spike. Tests our fractional GPU slice auto-scalers.
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#1E3A8A] group-hover:translate-x-1 transition-transform">
                  Trigger capacity test <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
              </div>
            </button>

            {/* Reset Button */}
            <button
              onClick={() => runScenario('idle')}
              className="w-full text-center py-3 border border-[#E2E8F0] hover:bg-slate-50 rounded-xl text-xs font-bold font-mono tracking-wide text-slate-500 uppercase transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Reset standard simulation
            </button>

          </div>

          {/* Core Interactive Telemetry Dashboard Mockup Right */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Dashboard Container */}
            <div className="bg-slate-900 border border-slate-800 rounded-[24px] p-6 sm:p-8 text-white flex-1 flex flex-col justify-between relative overflow-hidden shadow-lg">
              
              {/* Animated corner status glows based on simulation status */}
              <div className={`absolute -top-10 -right-10 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
                simState.status === 'warning'
                  ? 'bg-rose-500/10'
                  : simState.status === 'rebalancing'
                  ? 'bg-amber-500/10'
                  : 'bg-emerald-500/10'
              }`} />

              <div>
                {/* Header state */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/5 mb-6">
                  <div>
                    <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest">
                      VERTEX SCHEDULER SYSTEM TELEMETRY
                    </span>
                    <h3 className="font-display font-bold text-xl text-white mt-1">
                      {simState.title}
                    </h3>
                  </div>

                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wide border ${
                    simState.status === 'warning'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      : simState.status === 'rebalancing'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {simState.status === 'warning' && 'node_dropped'}
                    {simState.status === 'rebalancing' && 'scaling_mesh'}
                    {simState.status === 'optimal' && 'all_optimal'}
                    {simState.status === 'restored' && 'swap_completed'}
                  </span>
                </div>

                {/* Dashboard Metrics Cards */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-slate-950/60 border border-white/5 rounded-2xl text-center sm:text-left">
                    <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wide">
                      Active Logical Nodes
                    </div>
                    <div className="text-lg sm:text-xl font-mono font-bold text-white mt-1">
                      {simState.activeNodes} <span className="text-xs text-slate-500">Core Units</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950/60 border border-white/5 rounded-2xl text-center sm:text-left">
                    <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wide">
                      Logical Utilization
                    </div>
                    <div className="text-lg sm:text-xl font-mono font-bold text-white mt-1">
                      {simState.utilization}%
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950/60 border border-white/5 rounded-2xl text-center sm:text-left">
                    <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wide">
                      Active Billing Rate
                    </div>
                    <div className="text-lg sm:text-xl font-mono font-bold text-emerald-400 mt-1">
                      {simState.costRate}
                    </div>
                  </div>
                </div>

                {/* Utilization progression bar */}
                <div className="mb-6">
                  <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${
                        simState.status === 'warning'
                          ? 'bg-rose-500'
                          : simState.status === 'rebalancing'
                          ? 'bg-amber-400'
                          : 'bg-blue-500'
                      }`}
                      initial={{ width: '0%' }}
                      animate={{ width: `${simState.utilization}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

              </div>

              {/* Simulation Terminal Log Screen */}
              <div>
                <div className="flex items-center gap-2 mb-3 font-mono text-xs text-slate-400">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  <span>Real-time scheduler event listener log</span>
                </div>

                <div className="bg-slate-950 rounded-2xl p-4.5 font-mono text-[11px] text-slate-300 min-h-36 overflow-y-auto space-y-2 select-all border border-white/5">
                  <AnimatePresence mode="popLayout">
                    {simState.stateLog.map((log, logIdx) => (
                      <motion.div
                        key={log + logIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className={`flex items-start gap-2 pl-2 border-l ${
                          log.startsWith('✔')
                            ? 'border-emerald-500/30 text-emerald-400'
                            : log.startsWith('⚠')
                            ? 'border-rose-500/30 text-rose-400'
                            : 'border-blue-500/30 text-blue-400'
                        }`}
                      >
                        <span className="select-none">❯</span>
                        <span>{log}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
