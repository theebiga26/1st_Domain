import { ReactNode } from 'react';
import { motion } from 'motion/react';
import platform1 from '../assets/logos/platform_1.svg';
import platform2 from '../assets/logos/platform_2.svg';
import platform3 from '../assets/logos/platform_3.svg';
import platform4 from '../assets/logos/platform_4.svg';

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
      title: 'Connect Infrastructure',
      fullTitle: 'Link Cluster Resources',
      description: 'Bring together GPU clusters, cloud providers, and enterprise AI resources.',
      icon: <img src={platform1} alt="link resources" className="w-12 h-12 lg:w-14 lg:h-14 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
    },
    {
      id: 2,
      title: 'Intelligent Orchestration',
      fullTitle: 'Configure Workload Profiles',
      description: 'Automatically schedule compute resources using workload-aware AI optimization.',
      icon: <img src={platform2} alt="configure workload" className="w-12 h-12 lg:w-14 lg:h-14 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
    },
    {
      id: 3,
      title: 'Distributed Processing',
      fullTitle: 'Intelligent Schedule Allocation',
      description: 'Execute model training and inference across multiple compute environments simultaneously.',
      icon: <img src={platform3} alt="schedule allocation" className="w-12 h-12 lg:w-14 lg:h-14 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
    },
    {
      id: 4,
      title: 'Continuous Monitoring',
      fullTitle: 'Run, Monitor & Scale',
      description: 'Track infrastructure performance, GPU utilization, latency, and workload efficiency in real time.',
      icon: <img src={platform4} alt="run and monitor" className="w-12 h-12 lg:w-14 lg:h-14 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
    }
  ];

  return (
    <section id="how-it-works" className="pt-12 pb-8 sm:pt-16 sm:pb-24 bg-[#F8FAFC] relative overflow-hidden">
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
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 mb-4 shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-black">
              Orchestration Lifecycle
            </span>
          </motion.div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
            AI Compute Workflow
          </h2>
          <p className="mt-4 text-black/60 text-base sm:text-lg">
            A continuous, secure loop from container compilation to model weights deployment.
          </p>
        </div>

        {/* Infographic Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 relative gap-y-12 lg:gap-y-0 lg:gap-x-6 items-center">
          {/* Continuous Line Behind Cards (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-[#0F172A] -translate-y-1/2 z-0" />
          
          {steps.map((step, index) => (
            <div key={step.id} className="relative h-full">
              {/* Connector dots between cards */}
              {index !== 0 && (
                <div className="hidden lg:block absolute top-1/2 left-[-1.5rem] w-3 h-3 rounded-full border-2 border-[#0F172A] bg-white -translate-y-1/2 -translate-x-1/2 z-20" />
              )}
              {/* Extra dot at the very beginning and very end, optional based on image but adds symmetry */}
              {index === 0 && (
                <div className="hidden lg:block absolute top-1/2 left-0 w-3 h-3 rounded-full border-2 border-[#0F172A] bg-white -translate-y-1/2 -translate-x-1/2 z-20" />
              )}
              {index === steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-3 h-3 rounded-full border-2 border-[#0F172A] bg-white -translate-y-1/2 translate-x-1/2 z-20" />
              )}

              {/* The Dark Blue Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: step.id * 0.1 }}
                className="bg-[#0F172A] rounded-[24px] p-8 xl:p-10 h-full min-h-[340px] shadow-xl relative z-10 flex flex-col transition-transform hover:-translate-y-2 duration-300 group overflow-hidden"
              >
                {/* Title */}
                <h3 className="font-bold text-white uppercase tracking-wider text-[15px] leading-tight mb-4 text-center">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-[#94A3B8] text-[14px] leading-relaxed text-center mb-8">
                  {step.description}
                </p>

                <div className="mt-auto pt-4 flex items-end justify-between relative z-20">
                  {/* Icon */}
                  <div className="transition-transform transform group-hover:scale-110 duration-300">
                    {step.icon}
                  </div>
                </div>

                {/* Giant Number */}
                <div className="absolute bottom-2 right-4 text-[90px] xl:text-[110px] font-black text-white/5 leading-none tracking-tighter select-none pointer-events-none group-hover:text-white/10 transition-colors duration-300">
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
