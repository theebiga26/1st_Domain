import { useState, useEffect, ReactNode } from 'react';
import { motion } from 'motion/react';
import { Database, GitFork, Cpu, Disc, Shield, ArrowRight, Activity, Terminal } from 'lucide-react';

interface ArchStage {
  id: string;
  name: string;
  label: string;
  icon: ReactNode;
  description: string;
  metrics: { name: string; value: string; unit: string }[];
  details: string[];
}

export default function Architecture() {
  const [selectedStage, setSelectedStage] = useState<string>('scheduler');
  const [pulseLine, setPulseLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseLine((prev) => (prev + 1) % 100);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const stages: ArchStage[] = [
    {
      id: 'ingestion',
      name: 'Ingestion Gateways',
      label: 'Stage 01',
      icon: <Database className="w-5 h-5 text-brand-accent-blue" />,
      description: 'Stream datasets directly from multi-cloud Object Stores (S3, GCS, Blob) via specialized pre-cached data links.',
      metrics: [
        { name: 'Bandwidth Limit', value: '800', unit: 'Gbps' },
        { name: 'Cache Hit Rate', value: '99.82', unit: '%' },
        { name: 'Latency Overhead', value: '0.4', unit: 'ms' },
      ],
      details: [
        'Direct fiber connect to primary AWS & GCP hubs',
        'Zstandard dynamic compression on metadata paths',
        'Automatic regional mirror resolution',
      ],
    },
    {
      id: 'scheduler',
      name: 'Dynamic Scheduler',
      label: 'Stage 02',
      icon: <GitFork className="w-5 h-5 text-brand-accent-blue" />,
      description: 'The computational core of the platform. Matches model requirements with current physical GPU cluster telemetry.',
      metrics: [
        { name: 'Queue P99 delay', value: '1.2', unit: 'ms' },
        { name: 'Concurrency', value: '50,000+', unit: 'Jobs' },
        { name: 'Failure Auto-Retry', value: '100', unit: 'ms' },
      ],
      details: [
        'Proprietary optimization mapping matching node thermal states',
        'Sub-millisecond fair-share container prioritization',
        'Real-time weights buffer scheduling',
      ],
    },
    {
      id: 'compute',
      name: 'Dynamic GPU Mesh',
      label: 'Stage 03',
      icon: <Cpu className="w-5 h-5 text-brand-accent-blue" />,
      description: 'Ultra-high-density physical compute clusters interconnected with multi-rail InfiniBand network interfaces.',
      metrics: [
        { name: 'Managed H100s', value: '12,288', unit: 'Units' },
        { name: 'InfiniBand Rate', value: '3.2', unit: 'Tbps' },
        { name: 'Thermal Buffer', value: '14.5', unit: '°C' },
      ],
      details: [
        'Dedicated bare-metal architectures with direct memory access',
        'Automatic NUMA node alignment',
        'Hardware failure auto-isolation within 45ms',
      ],
    },
    {
      id: 'checkpoint',
      name: 'Hot Weight Swap',
      label: 'Stage 04',
      icon: <Disc className="w-5 h-5 text-brand-accent-blue" />,
      description: 'High-speed distributed model weights warehouse. Swaps optimizer state states and checkpoints near-instantaneously.',
      metrics: [
        { name: 'Read Speeds', value: '520', unit: 'GB/s' },
        { name: 'Write Speeds', value: '440', unit: 'GB/s' },
        { name: 'Failback Window', value: '1.5', unit: 'Sec' },
      ],
      details: [
        'Ultra-fast NVMe storage pooling layers',
        'Incremental background checkpoint delta logs',
        'Consistent global lock architecture',
      ],
    },
    {
      id: 'egress',
      name: 'Secure Delivery',
      label: 'Stage 05',
      icon: <Shield className="w-5 h-5 text-brand-accent-blue" />,
      description: 'Deploy fine-tuned weights or active endpoints into global inference edge nodes with enterprise encryption.',
      metrics: [
        { name: 'Endpoint SLA', value: '99.999', unit: '%' },
        { name: 'Encryption Strength', value: 'AES-256', unit: 'gcm' },
        { name: 'Total Inference Capacity', value: '45.2', unit: 'B/tok' },
      ],
      details: [
        'Direct API endpoints secured by hardware TPM',
        'Dynamic weight streaming onto server memory layers',
        'SOC2 and HIPAA fully-compliant access logs',
      ],
    },
  ];

  const currentStage = stages.find((s) => s.id === selectedStage) || stages[1];

  return (
    <section id="architecture" className="py-24 bg-[#F8FAFC] relative border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-16 text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 border border-slate-300 mb-4"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#0F172A]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0F172A]">
              The Ultimate Infrastructure
            </span>
          </motion.div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark-navy tracking-tight">
            Designed for Zero-Overhead AI Pipeline Execution
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Interactive system architecture blueprint. Click on any block to drill down into our hardware abstraction, dynamic scheduling latency, and secure output.
          </p>
        </div>

        {/* Blueprint Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Schematic Diagram Block */}
          <div className="lg:col-span-8 bg-white border border-[#E2E8F0] rounded-[24px] p-6 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
            {/* Background Blueprint Grid Lines */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <svg width="100%" height="100%">
                <pattern id="arch-blueprint-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-brand-dark-navy" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#arch-blueprint-grid)" />
              </svg>
            </div>

            {/* Label */}
            <div className="flex items-center justify-between mb-8 relative z-10">
              <span className="text-xs font-mono font-semibold text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-brand-accent-blue" /> Interactive Topology Map
              </span>
              <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 uppercase">
                Active Path: Flow Optimizers
              </span>
            </div>

            {/* Interactive Nodes Connection Rail */}
            <div className="relative my-auto py-12 z-10">
              
              {/* Dynamic Connection Line */}
              <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-200 -translate-y-1/2 rounded-full overflow-hidden">
                {/* Moving Pulse Particle along active path */}
                <div
                  className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-brand-accent-blue to-transparent"
                  style={{ left: `${pulseLine}%` }}
                />
              </div>

              {/* Node Placements */}
              <div className="relative flex justify-between items-center max-w-full overflow-x-auto gap-4 px-2">
                {stages.map((stage) => {
                  const isActive = selectedStage === stage.id;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => setSelectedStage(stage.id)}
                      className="group flex flex-col items-center gap-3 focus:outline-none min-w-[100px] relative"
                    >
                      {/* Active Connector Halo */}
                      {isActive && (
                        <motion.span
                          layoutId="activeHalo"
                          className="absolute -inset-2.5 rounded-full bg-blue-100 border border-blue-200 pointer-events-none"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}

                      {/* Node Circle */}
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 relative z-10 ${
                          isActive
                            ? 'bg-brand-primary-blue border-brand-primary-blue shadow-lg shadow-blue-500/10 text-white'
                            : 'bg-white border-slate-200 text-slate-500 hover:border-brand-accent-blue hover:text-brand-accent-blue hover:scale-105'
                        }`}
                      >
                        {stage.icon}
                      </div>

                      {/* Info below Node */}
                      <div className="text-center relative z-10">
                        <div className={`text-[10px] font-mono font-bold tracking-wide uppercase transition-colors ${
                          isActive ? 'text-brand-accent-blue' : 'text-slate-400 group-hover:text-brand-primary-blue'
                        }`}>
                          {stage.label}
                        </div>
                        <div className={`text-xs font-bold tracking-tight mt-0.5 transition-colors ${
                          isActive ? 'text-brand-dark-navy font-extrabold' : 'text-slate-600 group-hover:text-brand-primary-blue'
                        }`}>
                          {stage.name.split(' ')[0]}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Static Schematic Footnotes */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-slate-500 font-mono relative z-10">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-success" /> Integrated InfiniBand v2 topology mapped
              </span>
              <span>
                Encryption: Hardware TLS 1.3 standard
              </span>
            </div>

          </div>

          {/* Drilled-down technical specifications sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Main Spec Card */}
            <div className="bg-brand-dark-navy rounded-[24px] p-8 text-white flex-1 flex flex-col justify-between shadow-xl relative overflow-hidden">
              {/* Corner accent glow */}
              <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-widest">
                    {currentStage.label} SPECIFICATIONS
                  </span>
                  <div className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[9px] font-mono text-blue-300 font-bold uppercase tracking-wider">
                    PROD VERIFIED
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold tracking-tight">
                  {currentStage.name}
                </h3>
                
                <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                  {currentStage.description}
                </p>

                {/* Metric Bars */}
                <div className="mt-6 space-y-4">
                  {currentStage.metrics.map((metric) => (
                    <div key={metric.name} className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-medium">{metric.name}</span>
                      <span className="font-mono text-sm font-bold text-white">
                        {metric.value} <span className="text-[10px] text-blue-400 font-normal">{metric.unit}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-features checklist */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold mb-3">
                  Orchestration Details
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {currentStage.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-blue-400" /> {detail}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Quick Terminal Live Log Code preview */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between font-mono text-[11px] text-slate-300 shadow-lg">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">VertexGrid Daemon Log</span>
                <span className="w-2.5 h-2.5 rounded-full bg-brand-success animate-pulse" />
              </div>
              <div className="space-y-1 text-emerald-400/90 leading-tight">
                <div>[INFO] scheduling queue initialized...</div>
                <div>[OK] node-mesh network latency checking...</div>
                <div className="text-white font-semibold">
                  [LOAD] allocated {currentStage.id} configuration.
                </div>
                <div className="text-slate-500">
                  P99 latency metric verified: {currentStage.metrics[0].value} {currentStage.metrics[0].unit}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
