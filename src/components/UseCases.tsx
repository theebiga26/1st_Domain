import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, MessageSquareCode, Video, Activity, Sparkles, CheckCircle } from 'lucide-react';

interface UseCaseItem {
  id: string;
  icon: ReactNode;
  category: string;
  title: string;
  description: string;
  clusterConfig: {
    gpus: string;
    totalVram: string;
    throughput: string;
    epochDuration: string;
    costSavings: string;
  };
  checkpoints: string[];
}

export default function UseCases() {
  const [activeTab, setActiveTab] = useState<string>('llm');

  const cases: UseCaseItem[] = [
    {
      id: 'llm',
      category: 'Foundation Models',
      icon: <MessageSquareCode className="w-5 h-5 text-[#1E3A8A]" />,
      title: 'LLM Distributed Training & Fine-Tuning',
      description: 'Orchestrate hundreds of H100s concurrently using Fully Sharded Data Parallelism (FSDP). Eliminate network synchronization bottlenecks for models ranging from 8B to 400B parameters.',
      clusterConfig: {
        gpus: '32x NVIDIA H100 SXM5 Nodes (256 GPUs total)',
        totalVram: '20,480 GB High Bandwidth HBM3',
        throughput: '345,000 Tokens per Second',
        epochDuration: '14.2 Minutes (Avg)',
        costSavings: '54% vs Traditional Hyperscalers',
      },
      checkpoints: [
        'Automatic layer-sharded weights checkpoints',
        'Zero-overhead gradient communication using custom ring topology',
        'SFT (Supervised Fine-Tuning) and RLHF pipeline integrations'
      ]
    },
    {
      id: 'multimodal',
      category: 'High-Volume Inference',
      icon: <Sparkles className="w-5 h-5 text-[#1E3A8A]" />,
      title: 'Real-Time Multi-Modal Inference Pools',
      description: 'Scale dynamically to support millions of synchronous API queries. Serve complex speech, text, and computer vision models concurrently with sub-15ms scheduler overhead.',
      clusterConfig: {
        gpus: '8x NVIDIA H200 NVL Nodes (64 logical GPUs)',
        totalVram: '9,024 GB HBM3e',
        throughput: '1.2M Concurrent Tokens / sec',
        epochDuration: 'N/A (Streaming Mode)',
        costSavings: '68% cost optimization per token',
      },
      checkpoints: [
        'Fractional GPU splitting providing isolated inference lanes',
        'Under 10ms P99 gateway-to-worker dispatch delay',
        'Dynamic model weight streaming over hot-memory caches'
      ]
    },
    {
      id: 'video',
      category: 'Generative Media',
      icon: <Video className="w-5 h-5 text-[#1E3A8A]" />,
      title: 'Massive Diffusion Video & Image Generation',
      description: 'Deploy rendering pipelines that distribute massive frame-generation batches across parallel GPU instances. Balance temporal consistency models across fast NVLink nodes.',
      clusterConfig: {
        gpus: '16x NVIDIA H100 PCIe Nodes (128 GPUs total)',
        totalVram: '10,240 GB VRAM',
        throughput: '4,500 Frames rendered / sec',
        epochDuration: '3.4 Seconds per HD clip',
        costSavings: '42% cost reduction in bulk render',
      },
      checkpoints: [
        'Dynamic batch splitting based on scheduler demand cues',
        'Native ffmpeg pipeline integration directly at edge clusters',
        'Pre-warmed container pools minimizing start times to <500ms'
      ]
    },
    {
      id: 'bio',
      category: 'Biotech & Scientific Computing',
      icon: <Activity className="w-5 h-5 text-[#1E3A8A]" />,
      title: 'Bioinformatics & Molecular Dynamics',
      description: 'Execute protein folding, chemical simulations, and neural structure predictions at unprecedented scale. Distribute complex force-field equations over low-latency clusters.',
      clusterConfig: {
        gpus: '64x NVIDIA A100 SXM4 Nodes (512 GPUs total)',
        totalVram: '40,960 GB VRAM',
        throughput: '14,200 Simulations / min',
        epochDuration: '8.1 Seconds per folding run',
        costSavings: '71% aggregate cost savings',
      },
      checkpoints: [
        'InfiniBand layout configured for high-concurrency scientific matrices',
        'Direct connection to primary genomic databases',
        'TPM-secured hardware pipelines guarding private IP'
      ]
    }
  ];

  const currentCase = cases.find((c) => c.id === activeTab) || cases[0];

  return (
    <section id="use-cases" className="py-24 sm:py-32 bg-[#0F172A] bg-animate-gradient-dark relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 mb-4 backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
                Enterprise Solutions
              </span>
            </motion.div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Powering the Most Demanding AI Workloads
            </h2>
          </div>

          {/* Horizontal tab selectors */}
          <div className="flex flex-wrap gap-2">
            {cases.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveTab(c.id)}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-bold font-display uppercase tracking-wide border transition-all duration-300 focus:outline-none ${
                  activeTab === c.id
                    ? 'bg-[#1E3A8A] border-[#1E3A8A] text-white shadow-md'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:bg-slate-800'
                }`}
              >
                {c.category}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Use Case Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Details Column Left */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-700/50 rounded-[24px] p-8 sm:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-slate-800 border border-slate-700 text-white rounded-xl">
                  {currentCase.icon}
                </div>
                <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest">
                  Active Solution Template
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentCase.title}
              </h3>

              <p className="mt-4 text-slate-400 text-base leading-relaxed">
                {currentCase.description}
              </p>

              {/* Checklist */}
              <div className="mt-8 space-y-3.5">
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  Key Orchestration Advantages
                </div>
                {currentCase.checkpoints.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300 font-medium leading-relaxed">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <a
                href="#cta"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#38BDF8] hover:text-[#7dd3fc] transition-colors"
              >
                Request custom cluster blueprint <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Cluster configuration bento Right */}
          <div className="lg:col-span-5 bg-[#0F172A] text-white rounded-[24px] p-8 sm:p-10 shadow-xl flex flex-col justify-between relative overflow-hidden">
            {/* Subtle background layout */}
            <div className="absolute inset-0 opacity-[0.03]">
              <svg width="100%" height="100%">
                <pattern id="case-spec-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#FFFFFF" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#case-spec-grid)" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-widest">
                  CLUSTER CONFIGURATION
                </span>
                <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-[9px] font-mono text-blue-300 font-bold uppercase rounded">
                  ISOLATED SECURE
                </span>
              </div>

              <div className="space-y-6">
                
                {/* Spec 1 */}
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                    Allocated Cluster Nodes
                  </div>
                  <div className="text-base sm:text-lg font-bold text-white mt-1.5">
                    {currentCase.clusterConfig.gpus}
                  </div>
                </div>

                {/* Spec 2 */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                      Total Parallel VRAM
                    </div>
                    <div className="text-sm font-mono font-bold text-white mt-1">
                      {currentCase.clusterConfig.totalVram}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                      Peak Workload Throughput
                    </div>
                    <div className="text-sm font-mono font-bold text-white mt-1">
                      {currentCase.clusterConfig.throughput}
                    </div>
                  </div>
                </div>

                {/* Spec 3 */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                      Average Completion Rate
                    </div>
                    <div className="text-sm font-mono font-bold text-white mt-1">
                      {currentCase.clusterConfig.epochDuration}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                      Aggregate Cost Savings
                    </div>
                    <div className="text-sm font-mono font-bold text-brand-success mt-1">
                      {currentCase.clusterConfig.costSavings}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="relative z-10 mt-10 p-4.5 rounded-2xl bg-white/5 border border-white/5">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                Guaranteed Node Priority
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Allocations automatically bind to warm standby hardware partitions, ensuring immediate pipeline initialization.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
