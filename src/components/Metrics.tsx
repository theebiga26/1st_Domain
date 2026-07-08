import { useState, useEffect, ReactNode, cloneElement } from 'react';
import { motion } from 'motion/react';
import './MetricsCardBorder.css';
import { TrendingUp, ShieldAlert, BadgeDollarSign, Cpu } from 'lucide-react';

interface MetricItem {
  id: string;
  icon: ReactNode;
  value: string;
  label: string;
  suffix: string;
  sparkline: number[];
  description: string;
}

export default function Metrics() {
  const metricsList: MetricItem[] = [
    {
      id: 'availability',
      icon: <ShieldAlert className="w-5 h-5" />,
      value: '99.99',
      suffix: '%',
      label: 'Infrastructure SLA',
      sparkline: [99.50, 99.70, 99.85, 99.90, 99.95, 99.98, 99.99],
      description: 'Fully redundant clusters backed by a rigorous legal uptime agreement.',
    },
    {
      id: 'acceleration',
      icon: <TrendingUp className="w-5 h-5" />,
      value: '3.5',
      suffix: 'x',
      label: 'Model Training Speedup',
      sparkline: [1.0, 1.4, 2.1, 2.5, 2.9, 3.2, 3.5],
      description: 'Micro-scheduler network enhancements eliminate model parallel overheads.',
    },
    {
      id: 'optimization',
      icon: <BadgeDollarSign className="w-5 h-5" />,
      value: '70',
      suffix: '%',
      label: 'Infrastructure Cost Reductions',
      sparkline: [10, 20, 35, 48, 55, 62, 70],
      description: 'Fractional GPU sharing guarantees zero paid idle capacity.',
    },
    {
      id: 'cores',
      icon: <Cpu className="w-5 h-5" />,
      value: '50,000',
      suffix: '+',
      label: 'GPU Cores Coordinated',
      sparkline: [12000, 18000, 25000, 32000, 41000, 48000, 50000],
      description: 'Global resource mesh running concurrently across core hubs.',
    },
  ];

  // Animated numbers increment
  const [counts, setCounts] = useState({
    availability: 99.5,
    acceleration: 1.0,
    optimization: 10,
    cores: 10000,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) => {
        const nextAvail = prev.availability < 99.99 ? parseFloat((prev.availability + 0.05).toFixed(2)) : 99.99;
        const nextAccel = prev.acceleration < 3.5 ? parseFloat((prev.acceleration + 0.25).toFixed(1)) : 3.5;
        const nextOptim = prev.optimization < 70 ? prev.optimization + 4 : 70;
        const nextCores = prev.cores < 50000 ? prev.cores + 4000 : 50000;

        return {
          availability: nextAvail,
          acceleration: nextAccel,
          optimization: nextOptim,
          cores: nextCores,
        };
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);



  return (
    <section id="metrics" className="py-24 sm:py-32 bg-white relative border-b border-slate-100 overflow-hidden">

      {/* Decorative Shimmer Definition */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer-slide {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
        }
        .animate-shimmer {
          animation: shimmer-slide 2s infinite linear;
        }
      `}} />

      {/* Delicate Grid Accents */}
      <div className="absolute top-0 bottom-0 left-12 w-px bg-slate-100 pointer-events-none hidden xl:block z-0" />
      <div className="absolute top-0 bottom-0 right-12 w-px bg-slate-100 pointer-events-none hidden xl:block z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F5F9] border border-slate-200 mb-4"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#1E3A8A]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1E3A8A]">
              Performance Indicators
            </span>
          </motion.div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
            Enterprise Scale, Quantified
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            VertexGrid delivers significant operational efficiency gains verified by real-world enterprise workloads.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12 max-w-7xl mx-auto px-4 sm:px-6">
          {metricsList.map((metric, idx) => {
            // Get animated value based on id
            let displayValue = metric.value;
            if (metric.id === 'availability') displayValue = counts.availability.toString();
            else if (metric.id === 'acceleration') displayValue = counts.acceleration.toString();
            else if (metric.id === 'optimization') displayValue = counts.optimization.toString();
            else if (metric.id === 'cores') displayValue = counts.cores.toLocaleString();

            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative group h-[280px] w-full flex flex-col"
              >
                {/* The main border shape containing the animated gradient */}
                <div 
                  className="relative p-[2px] w-full h-full transition-transform duration-500 group-hover:-translate-y-2 overflow-hidden flex-1 drop-shadow-sm group-hover:drop-shadow-xl"
                  style={{ clipPath: "polygon(32px 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%, 0 32px)" }}
                >
                  {/* Animated Spinning Blue Border Background */}
                  <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg_at_50%_50%,#CBD5E1_0%,#1E3A8A_50%,#CBD5E1_100%)] group-hover:bg-[conic-gradient(from_0deg_at_50%_50%,#38BDF8_0%,#0F172A_50%,#38BDF8_100%)] animate-[spin_6s_linear_infinite] transition-colors duration-500" />

                  {/* The inner white area */}
                  <div 
                    className="relative bg-white w-full h-full flex flex-col justify-center items-center p-6 text-center"
                    style={{ clipPath: "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)" }}
                  >
                     {/* Shimmer Effect overlay */}
                     <div className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-[#1E3A8A]/[0.03] to-transparent hidden group-hover:block animate-shimmer pointer-events-none" />

                     <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-3 relative z-10 leading-tight px-2">{metric.label}</h3>
                     <p className="text-slate-500 text-xs sm:text-sm leading-relaxed relative z-10 max-w-[90%]">{metric.description}</p>
                  </div>
                </div>

                {/* Top Left Number overlay */}
                <div className="absolute top-0 left-0 flex items-baseline bg-white pl-0 pr-3 pb-3 pt-0 z-10 pointer-events-none transition-transform duration-500 group-hover:-translate-y-2 group-hover:-translate-x-1">
                  <span className="font-display text-4xl xl:text-5xl font-black text-[#0F172A] tracking-tighter leading-none">
                    {displayValue}
                  </span>
                  <span className="font-display text-xl font-bold text-[#0F172A] ml-1">
                    {metric.suffix}
                  </span>
                </div>

                {/* Bottom Right Icon overlay */}
                <div className="absolute bottom-0 right-0 bg-white pl-3 pt-3 pb-0 pr-0 z-10 pointer-events-none transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-1">
                  <div className="text-[#1E3A8A] w-10 h-10 flex justify-center items-center bg-[#F1F5F9] rounded-xl border border-slate-200 group-hover:bg-[#0F172A] group-hover:border-[#0F172A] group-hover:text-white transition-colors duration-300 shadow-sm">
                     {cloneElement(metric.icon as React.ReactElement, { className: "w-5 h-5" })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
