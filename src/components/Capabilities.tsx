import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import coreCap1 from '../assets/logos/core_cap_1.svg';
import coreCap2 from '../assets/logos/core_cap_2.svg';
import coreCap3 from '../assets/logos/core_cap_3.svg';
import coreCap4 from '../assets/logos/core_cap_4.svg';
import coreCap5 from '../assets/logos/core_cap_5.svg';
import coreCap6 from '../assets/logos/core_cap_6.svg';

interface Capability {
  icon: ReactNode;
  title: string;
  description: string;
  badge?: string;
  image: string;
}

const list: Capability[] = [
  {
    icon: <img src={coreCap1} alt="Decentralized GPU Pooling" className="h-8 w-auto object-contain" />,
    title: 'Intelligent Compute Orchestration',
    description: 'Automatically schedule AI workloads based on resource availability, workload priority, and infrastructure performance to maximize efficiency.',
    badge: 'High Availability',
    image: coreCap1,
  },
  {
    icon: <img src={coreCap3} alt="Adaptive Priority Scheduling" className="h-8 w-auto object-contain" />,
    title: 'Distributed Model Training',
    description: 'Run large-scale machine learning workloads across multiple GPU clusters with optimized parallel processing and intelligent scaling.',
    badge: 'Live Auto-Scheduler',
    image: coreCap2,
  },
  {
    icon: <img src={coreCap2} alt="Fractional Virtual GPU Split" className="h-8 w-auto object-contain" />,
    title: 'GPU Resource Management',
    description: 'Gain complete visibility into GPU utilization, cluster availability, and compute efficiency with real-time monitoring and automated balancing.',
    image: coreCap3,
  },
  {
    icon: <img src={coreCap4} alt="Zero-Downtime Weight Hot Swap" className="h-8 w-auto object-contain" />,
    title: 'AI Inference Acceleration',
    description: 'Deliver production AI faster by routing inference requests through the most efficient compute resources while minimizing latency.',
    badge: 'Fail-Safe',
    image: coreCap4,
  },
  {
    icon: <img src={coreCap5} alt="Native Multi-Cloud Connect" className="h-8 w-auto object-contain" />,
    title: 'Workload Optimization Engine',
    description: 'Analyze compute demand continuously and dynamically rebalance workloads for higher throughput and lower infrastructure costs.',
    image: coreCap5,
  },
  {
    icon: <img src={coreCap6} alt="Intelligent Warm Pool Buffering" className="h-8 w-auto object-contain" />,
    title: 'Infrastructure Health Monitoring',
    description: 'Track node status, system availability, compute performance, and operational metrics through a centralized command center.',
    image: coreCap6,
  },
];

export default function Capabilities() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManualScroll, setIsManualScroll] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Sync scroll position when activeIndex changes via left-side click
  const handleDotClick = (idx: number) => {
    setActiveIndex(idx);
    setIsManualScroll(false);
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const child = container.children[idx] as HTMLElement;
      if (child) {
        // Calculate offset to account for left padding if any
        container.scrollTo({
          left: child.offsetLeft - container.offsetLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  // Auto-play effect
  useEffect(() => {
    if (isHovered) return;

    const intervalId = setInterval(() => {
      setActiveIndex((current) => {
        const nextIdx = (current + 1) % list.length;
        // Sync the scroll container
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const child = container.children[nextIdx] as HTMLElement;
          if (child) {
            container.scrollTo({
              left: child.offsetLeft - container.offsetLeft,
              behavior: 'smooth'
            });
          }
        }
        return nextIdx;
      });
    }, 5000); // Change every 5 seconds

    return () => clearInterval(intervalId);
  }, [isHovered]);

  // Sync activeIndex when scrolling manually
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollTimeout: number;

    const handleScroll = () => {
      // If we are scrolling via button click, ignore scroll events for updating active index
      if (!isManualScroll) {
        setIsManualScroll(true);
      }

      const scrollLeft = container.scrollLeft;
      let closestIdx = 0;
      let minDistance = Infinity;
      
      Array.from(container.children).forEach((child, idx) => {
        const childLeft = (child as HTMLElement).offsetLeft - container.offsetLeft;
        const distance = Math.abs(childLeft - scrollLeft);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });
      
      if (closestIdx !== activeIndex) {
        setActiveIndex(closestIdx);
      }

      // Reset manual scroll flag after scrolling stops
      window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        setIsManualScroll(false);
      }, 150);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.clearTimeout(scrollTimeout);
    };
  }, [activeIndex, isManualScroll]);

  return (
    <section 
      id="capabilities" 
      className="py-8 sm:py-10 bg-[#0B1120] bg-animate-grid-dark relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 mb-4 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#0F172A]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
              Core Capabilities
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
          >
            Where AI Performance Accelerates
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-slate-400 text-lg sm:text-xl"
          >
            Say goodbye to complex virtualization overhead. VertexGrid provides direct, secure, and fully orchestrated bare-metal GPU clusters.
          </motion.p>
        </div>

        {/* Interactive Split Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mt-8">
          
          {/* LEFT SIDE: Timeline & Content */}
          <div className="w-full lg:w-[45%] flex gap-6 sm:gap-10 h-auto lg:h-[360px]">
            {/* Timeline */}
            <div className="flex flex-col items-center relative py-2 justify-between w-8 shrink-0">
              {/* Vertical Line */}
              <div className="absolute top-4 bottom-4 w-px bg-white/20 left-1/2 -translate-x-1/2 z-0"></div>
              
              {list.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className="relative z-10 w-8 h-8 flex items-center justify-center group"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  {activeIndex === idx ? (
                    <motion.div 
                      layoutId="activeDot"
                      className="w-8 h-8 rounded-full bg-white text-[#0F172A] flex items-center justify-center text-sm font-bold shadow-md"
                    >
                      {idx + 1}
                    </motion.div>
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full bg-white/30 group-hover:bg-white/60 transition-colors"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Content Display */}
            <div className="flex-1 flex flex-col justify-center py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <h3 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white mb-6 tracking-tight leading-[1.1]">
                    {list[activeIndex].title}
                  </h3>
                  <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-md">
                    {list[activeIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT SIDE: Slider */}
          <div className="w-full lg:w-[55%] relative">
            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-4 -mx-4 px-4 sm:mx-0 sm:px-0 card-3d-wrapper"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {list.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className="snap-center relative h-[280px] sm:h-[360px] w-[85%] sm:w-[400px] shrink-0 cursor-pointer overflow-hidden rounded-[2rem] bg-slate-800 shadow-2xl transition-transform duration-500 border border-white card-3d tilt-hover card-shimmer"
                  style={{
                    transform: activeIndex === idx ? 'scale(1)' : 'scale(0.95)',
                  }}
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className={`w-full h-full object-cover transition-all duration-700 ${activeIndex === idx ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
                  />
                  {/* Dark gradient overlay for better contrast if needed */}
                  <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-black/20 transition-opacity duration-500 pointer-events-none ${activeIndex === idx ? 'opacity-0' : 'opacity-100'}`} />
                </div>
              ))}
              
              {/* Spacer to allow the last item to snap to the left edge if needed, though snap-center handles it nicely */}
              <div className="shrink-0 w-[5%] sm:w-[20px]" aria-hidden="true"></div>
            </div>
          </div>

        </div>

      </div>

      {/* Global styles to hide scrollbar specifically for this component if inline styles aren't enough */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

