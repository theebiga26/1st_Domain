import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Server, Activity, Terminal, Shield, Cpu, RefreshCw, Layers, Globe } from 'lucide-react';

interface ClusterInfo {
  id: string;
  name: string;
  region: string;
  status: 'optimal' | 'scaling' | 'maintenance';
  gpus: string;
  count: number;
  utilization: number;
  temp: number;
  bandwidth: string;
}

export default function InfrastructureViz() {
  const [selectedCluster, setSelectedCluster] = useState<string>('us-east');
  const [activeLog, setActiveLog] = useState<string[]>([]);
  const [totalCompute, setTotalCompute] = useState<number>(142510);

  const clusters: ClusterInfo[] = [
    {
      id: 'us-east',
      name: 'Virginia Core-01',
      region: 'North America East',
      status: 'optimal',
      gpus: 'NVIDIA H100 SXM5',
      count: 4096,
      utilization: 91.2,
      temp: 42.5,
      bandwidth: '3.2 Tbps InfiniBand ND',
    },
    {
      id: 'eu-west',
      name: 'Frankfurt Core-02',
      region: 'Europe Central',
      status: 'optimal',
      gpus: 'NVIDIA H200 NVL',
      count: 2048,
      utilization: 87.4,
      temp: 39.8,
      bandwidth: '1.6 Tbps NVLink Hub',
    },
    {
      id: 'ap-tokyo',
      name: 'Tokyo Core-03',
      region: 'Asia Pacific East',
      status: 'scaling',
      gpus: 'NVIDIA B200 NVL72',
      count: 1024,
      utilization: 64.1,
      temp: 45.2,
      bandwidth: '6.4 Tbps Liquid-Cooled Mesh',
    },
    {
      id: 'us-west',
      name: 'Oregon Core-04',
      region: 'North America West',
      status: 'optimal',
      gpus: 'NVIDIA H100 PCIe',
      count: 8192,
      utilization: 94.6,
      temp: 41.1,
      bandwidth: '3.2 Tbps InfiniBand ND',
    },
  ];

  const currentCluster = clusters.find((c) => c.id === selectedCluster) || clusters[0];

  // Simulated live log terminal
  useEffect(() => {
    const actions = [
      'ALLOCATING GPU_BLOCK_34: H100 x 64',
      'OPTIMIZING GRAPH: layer checkpointing mapped',
      'GRADIENT_DECENT: batch synchronization optimal',
      'NVLINK STATUS: all 18 lane structures running on 900 GB/s',
      'NODE MONITOR: thermal parameters stabilized',
      'SLA CHECK: guaranteed scheduling delay < 1.4ms confirmed',
      'BALANCER: workload distributed across remaining nodes',
      'SAVING CHECKPOINT: epoch_142 serialized to weights storage'
    ];

    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const prefix = `[${timestamp}] [${currentCluster.name.split(' ')[0]}] `;
      
      setActiveLog((prev) => {
        const next = [prefix + randomAction, ...prev];
        return next.slice(0, 10); // Keep last 10 logs
      });

      // Fluctuate total managed compute slightly for realism
      setTotalCompute((prev) => prev + Math.floor((Math.random() - 0.5) * 80));
    }, 1500);

    return () => clearInterval(interval);
  }, [selectedCluster]);

  return (
    <section id="telemetry-viz" className="py-24 sm:py-32 bg-[#0F172A] text-white relative overflow-hidden">
      
      {/* Absolute high-end background layout */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%">
          <pattern id="viz-dot-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#FFFFFF" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#viz-dot-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-10">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono font-bold uppercase tracking-wider text-blue-400 mb-4"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              Infrastructure Visualization
            </motion.div>
            
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Enterprise Compute Command Center
            </h2>
            <p className="mt-3 text-slate-400 text-base max-w-2xl">
              Inspect active high-availability nodes, physical GPU cluster layouts, core temperatures, and live task orchestration flows.
            </p>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 flex items-center gap-6">
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                Aggregate capacity Managed
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white mt-1">
                {totalCompute.toLocaleString()} <span className="text-xs text-blue-400">TFLOPS</span>
              </div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                Network Backbone SLA
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-brand-success mt-1">
                99.999% <span className="text-xs text-emerald-400">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Console Dashboard layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Active clusters sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-2 pl-1">
              Active Regional Clusters
            </div>
            {clusters.map((cluster) => {
              const isActive = selectedCluster === cluster.id;
              return (
                <button
                  key={cluster.id}
                  onClick={() => setSelectedCluster(cluster.id)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group flex items-center justify-between ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-950/40 to-slate-900 border-brand-accent-blue shadow-lg shadow-blue-500/5 text-white'
                      : 'bg-slate-900/60 border-white/5 text-slate-300 hover:border-white/15 hover:bg-slate-900'
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-brand-accent-blue" />
                  )}
                  <div>
                    <div className="font-display font-bold text-base flex items-center gap-2">
                      <Server className={`w-4.5 h-4.5 ${isActive ? 'text-brand-accent-blue' : 'text-slate-500 group-hover:text-slate-400'}`} />
                      <span>{cluster.name}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1 pl-6">
                      {cluster.region}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-mono font-bold">
                      {cluster.count.toLocaleString()} <span className="text-[10px] text-slate-400">Cores</span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-end mt-1 pl-6">
                      <span className={`h-1.5 w-1.5 rounded-full ${cluster.status === 'optimal' ? 'bg-brand-success' : 'bg-amber-400 animate-pulse'}`} />
                      <span className="text-[10px] uppercase font-mono font-semibold tracking-wide text-slate-400">
                        {cluster.status}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Cluster Terminal Telemetry */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 flex-1 flex flex-col justify-between relative overflow-hidden">
              
              {/* Dynamic decorative backdrop line drawing */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-radial-gradient from-blue-500/5 to-transparent pointer-events-none" />

              <div>
                {/* Cluster Metadata Details */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
                  <div>
                    <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest">
                      Live Telemetry Panel
                    </span>
                    <h3 className="font-display font-extrabold text-2xl tracking-tight text-white mt-1">
                      {currentCluster.name} Detailed Stats
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">Auto-Balancing Status:</span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      SYS_SECURE
                    </span>
                  </div>
                </div>

                {/* Dashboard Metrics Rows */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  
                  {/* Metric 1 */}
                  <div className="p-4 bg-slate-950/60 border border-white/5 rounded-2xl">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                      GPU Core Type
                    </div>
                    <div className="text-sm font-bold text-white mt-1.5 flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="truncate">{currentCluster.gpus.split(' ').slice(1).join(' ')}</span>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-4 bg-slate-950/60 border border-white/5 rounded-2xl">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                      Core Temperature
                    </div>
                    <div className="text-sm font-mono font-bold text-white mt-1.5 flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{currentCluster.temp} °C</span>
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="p-4 bg-slate-950/60 border border-white/5 rounded-2xl">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                      Network Bandwidth
                    </div>
                    <div className="text-sm font-mono font-bold text-white mt-1.5 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-brand-success shrink-0" />
                      <span className="truncate">{currentCluster.bandwidth.split(' ')[0]} {currentCluster.bandwidth.split(' ')[1]}</span>
                    </div>
                  </div>

                  {/* Metric 4 */}
                  <div className="p-4 bg-slate-950/60 border border-white/5 rounded-2xl">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                      Cluster Capacity
                    </div>
                    <div className="text-sm font-mono font-bold text-blue-400 mt-1.5">
                      {currentCluster.utilization}% <span className="text-[10px] text-slate-400">Used</span>
                    </div>
                  </div>

                </div>

                {/* Utilization gauge visualization */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <span>Cluster Workload Density</span>
                    <span className="text-brand-success font-bold">{currentCluster.utilization}% Allocation Capacity</span>
                  </div>
                  <div className="h-2 bg-slate-950 border border-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-emerald-400"
                      initial={{ width: '0%' }}
                      animate={{ width: `${currentCluster.utilization}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>

              </div>

              {/* Live Streaming Terminal logs */}
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wide">
                    Live Scheduler Activity Log ({currentCluster.name.split(' ')[0]})
                  </span>
                </div>
                <div className="bg-slate-950 border border-white/5 rounded-2xl p-4 font-mono text-xs text-slate-300 h-36 overflow-y-auto space-y-2 select-all scrollbar-thin">
                  <AnimatePresence mode="popLayout">
                    {activeLog.map((log, lIdx) => (
                      <motion.div
                        key={log + lIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-start gap-2 border-l border-blue-500/20 pl-2 text-[11px] leading-relaxed"
                      >
                        <span className="text-blue-500 select-none">❯</span>
                        <span>{log}</span>
                      </motion.div>
                    ))}
                    {activeLog.length === 0 && (
                      <div className="text-slate-500 animate-pulse text-[11px]">
                        Listening to regional cluster pipeline...
                      </div>
                    )}
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
