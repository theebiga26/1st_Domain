import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import aboutCenter from '../assets/logos/about us_1.svg';
import aboutTop from '../assets/logos/about us_2.svg';
import aboutBottom from '../assets/logos/about us_3.svg';

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-slate-50 bg-animate-gradient-light relative overflow-hidden font-sans">

      {/* Background Decorative Dots (Left side) */}
      <div className="absolute left-0 top-0 bottom-0 w-1/2 overflow-hidden pointer-events-none opacity-20 hidden lg:block">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#1E3A8A 1px, transparent 1px)', backgroundSize: '24px 24px', maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* LEFT: Image Collage */}
          <div className="w-full lg:w-1/2 relative flex justify-center items-center">

            {/* Small abstract accent dots */}
            <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-[#38BDF8] z-0" />
            <div className="absolute bottom-20 right-10 w-3 h-3 rounded-full bg-[#1E3A8A] z-0" />
            <div className="absolute top-32 right-0 w-5 h-5 rounded-full border-2 border-[#1E3A8A] bg-transparent z-0" />

            {/* Main Image Container */}
            <div className="relative w-[300px] h-[300px] sm:w-[450px] sm:h-[450px]">

              {/* Main Circle Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 rounded-full overflow-hidden shadow-2xl border-[6px] border-white z-10"
              >
                <img
                  src={aboutTop}
                  alt="About us center image"
                  className="w-full h-full object-cover"
                />
              </motion.div>

                {/* Medium Overlapping Image (Top Right) */}
                <motion.div
                  initial={{ opacity: 0, x: 30, y: -30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="absolute -right-4 top-4 sm:-right-8 sm:top-8 w-32 h-32 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-xl border-[4px] border-white z-20"
                >
                  <img
                    src={aboutCenter}
                    alt="About us top circle image"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

              {/* Small Overlapping Image (Bottom Left) */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="absolute -left-6 bottom-12 sm:-left-12 sm:bottom-16 w-24 h-24 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-xl border-[4px] border-white z-20"
              >
                <img
                  src={aboutBottom}
                  alt="About us bottom round image"
                  className="w-full h-full object-cover"
                />
              </motion.div>

            </div>
          </div>

          {/* RIGHT: Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 border border-slate-300 mb-4"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#0F172A]" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0F172A]">
                  About Us
                </span>
              </motion.div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight leading-[1.1]">
                Architecting the Future of AI
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="mt-8 text-lg font-bold text-slate-700 leading-relaxed max-w-lg">
                Our promise is to deliver the world's most advanced bare-metal orchestration layer, built explicitly for large-scale AI workloads.
              </p>

              <p className="mt-6 text-base text-slate-500 leading-relaxed max-w-xl">
                By intelligently mapping high-memory weights and optimizing interconnect bandwidth, we eliminate virtualization overhead and empower engineers to train models faster. Tomorrow, when your cluster scales, we instantly hot-swap capabilities without dropping a single packet.
              </p>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
