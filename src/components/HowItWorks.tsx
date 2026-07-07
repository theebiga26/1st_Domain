import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Network, Database, Settings, Play } from 'lucide-react';

interface StepItem {
  id: number;
  icon: ReactNode;
  title: string;
  fullTitle: string;
  description: string;
}

import ShapeGrid from './ShapeGrid';

export default function HowItWorks() {
  const steps: StepItem[] = [
    {
      id: 1,
      title: 'Link Resources',
      fullTitle: 'Link Cluster Resources',
      description: 'Deploy our lightweight VertexDaemon onto your bare metal or existing cloud accounts. Within seconds, global GPU instances join your logical orchestration pool.',
      icon: <Database className="w-8 h-8" />
    },
    {
      id: 2,
      title: 'Configure Workload',
      fullTitle: 'Configure Workload Profiles',
      description: 'Upload your standard PyTorch training scripts or inference container tags. Select target parameters: epoch count, checkpoints frequency, failover sensitivity.',
      icon: <Settings className="w-8 h-8" />
    },
    {
      id: 3,
      title: 'Schedule Allocation',
      fullTitle: 'Intelligent Schedule Allocation',
      description: 'Our proprietary scheduler splits and optimizes node allocations, mapping high-memory weights to the closest physical nodes to minimize network latency overhead.',
      icon: <Network className="w-8 h-8" />
    },
    {
      id: 4,
      title: 'Run & Monitor',
      fullTitle: 'Run, Monitor & Scale',
      description: 'Watch training loss curves or active inference rates in real-time. If a physical node fails, our hot weight swap restores execution to a spare node instantly.',
      icon: <Play className="w-8 h-8" />
    }
  ];

  return (
    <section id="how-it-works" className="pt-12 pb-8 sm:pt-16 sm:pb-12 bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ShapeGrid 
          speed={0.5} 
          squareSize={40}
          direction='diagonal'
          borderColor='rgba(0,0,0,0.03)'
          hoverFillColor='rgba(59,130,246,0.05)'
          shape='square'
          hoverTrailAmount={5}
        />
      </div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 mb-4 shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#1E3A8A]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-black">
              Orchestration Lifecycle
            </span>
          </motion.div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
            How VertexGrid Operates
          </h2>
          <p className="mt-4 text-black/60 text-base sm:text-lg">
            A continuous, secure loop from container compilation to model weights deployment.
          </p>
        </div>

        {/* Infographic Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 w-full relative pt-12 pb-12 gap-y-12 lg:gap-y-0">
          {steps.map((step) => (
            <div key={step.id} className="relative p-0 lg:p-6 xl:p-8">

              {/* Decorative Lines (hidden on mobile for exact spacing) */}
              {/* Dot on the left */}
              <div className="hidden lg:block absolute top-1/2 left-0 w-[14px] h-[14px] rounded-full border-[3px] border-[#0F172A] bg-white -translate-y-1/2 -translate-x-1/2 z-20" />

              {/* Dot on the right for the last item */}
              {step.id === 4 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-[14px] h-[14px] rounded-full border-[3px] border-[#0F172A] bg-white -translate-y-1/2 translate-x-1/2 z-20" />
              )}

              {/* Bottom Path */}
              <div className="hidden lg:block absolute top-1/2 left-0 w-[45%] h-[calc(50%-1.5rem)] border-l-[3px] border-b-[3px] border-[#0F172A] rounded-bl-[1.5rem] z-0" />
              <motion.div 
                animate={{ x: [-15, 15], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="hidden lg:block absolute bottom-[0.95rem] left-[calc(45%+0.2rem)] text-[#0F172A] font-black text-xs tracking-tighter"
              >
                &gt;&gt;
              </motion.div>

              {/* Top Path */}
              <div className="hidden lg:block absolute top-2 left-[25%] right-0 h-[calc(50%-1rem)] border-t-[3px] border-r-[3px] border-[#0F172A] rounded-tr-[1.5rem] z-0" />
              <motion.div 
                animate={{ x: [15, -15], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="hidden lg:block absolute top-[0.05rem] left-[calc(25%-1.2rem)] text-[#0F172A] font-black text-xs tracking-tighter"
              >
                &lt;&lt;
              </motion.div>

              {/* The Yellow Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: step.id * 0.1 }}
                className="bg-[#0F172A] border border-white/20 rounded-[1.5rem] p-6 xl:p-8 h-full min-h-[300px] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all relative z-10 flex flex-col"
              >
                {/* Title */}
                <h3 className="text-center font-black text-white uppercase tracking-wider text-sm lg:text-base mb-4 mt-2">
                  {step.title}
                </h3>
                {/* Description */}
                <p className="text-center text-blue-100/80 text-[11px] lg:text-xs font-medium leading-relaxed">
                  {step.description}
                </p>

                <div className="mt-auto pt-10 flex items-end justify-between relative z-10">
                  {/* Icon */}
                  <div className="text-[#0F172A] bg-white p-2 rounded-full shadow-sm transition-transform hover:scale-110">
                    {step.icon}
                  </div>
                </div>

                {/* Giant Number */}
                <div className="absolute bottom-1 right-2 lg:right-3 text-[100px] lg:text-[110px] font-black text-white/10 leading-none tracking-tighter select-none pointer-events-none">
                  0{step.id}
                </div>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
