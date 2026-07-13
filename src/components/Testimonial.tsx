import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import testimonial1 from '../assets/logos/testimonial_1.svg';
import testimonial2 from '../assets/logos/testimonial_2.svg';
import testimonial3 from '../assets/logos/testimonial_3.svg';
import testimonial4 from '../assets/logos/testimonial_4.svg';
import testimonial5 from '../assets/logos/testimonial_5.svg';

const reviews = [
  {
    id: 1,
    name: 'Dr. Amelia Carter',
    position: 'Director of AI Infrastructure',
    text: 'VertexGrid has transformed the way we manage enterprise AI computing. Resource allocation is smarter, training cycles are significantly faster, and infrastructure visibility has improved across every department.',
    image: testimonial1
  },
  {
    id: 2,
    name: 'Ethan Brooks',
    position: 'Lead Machine Learning Engineer',
    text: 'Managing distributed GPU environments used to require multiple tools. VertexGrid unified everything into one intelligent platform that our engineering teams rely on every day.',
    image: testimonial2
  },
{
  id: 3,
  name: 'Sophia Nguyen',
  position: 'Head of MLOps',
  text: 'The orchestration capabilities have dramatically reduced idle GPU time while improving model deployment speed. It\'s become a critical part of our AI operations.',
  image: testimonial3
},
  {
    id: 4,
    name: 'Michael Turner',
    position: 'Cloud Platform Architect',
    text: 'VertexGrid simplified hybrid AI infrastructure management without forcing us to redesign existing cloud environments. Deployment was seamless and performance improvements were immediate.',
    image: testimonial4
  },
  {
    id: 5,
    name: 'Oliver Bennett',
    position: 'Chief Technology Officer',
    text: 'As our AI initiatives expanded, VertexGrid gave us the scalability, visibility, and operational control needed to support enterprise growth with confidence.',
    image: testimonial5
  }
];

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeReview = reviews[currentIndex];
  const prevIndex = (currentIndex - 1 + reviews.length) % reviews.length;
  const prevReview = reviews[prevIndex];

  const thumbnails = [
    reviews[(currentIndex + 1) % reviews.length],
    reviews[(currentIndex + 2) % reviews.length],
    reviews[(currentIndex + 3) % reviews.length],
  ];

  return (
    <section
      id="reviews"
      className="relative w-full bg-white py-16 sm:py-20 lg:py-24 overflow-hidden font-sans border-y border-slate-200"
    >
      {/* ── ANIMATED BACKGROUND LAYER: network / data-flow style (white + #0F172A only) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1400 600"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* static connecting lines between nodes */}
          <g stroke="#0F172A" strokeWidth="1" opacity="0.18">
            <line x1="80" y1="90" x2="260" y2="180" />
            <line x1="260" y1="180" x2="180" y2="340" />
            <line x1="260" y1="180" x2="440" y2="140" />
            <line x1="180" y1="340" x2="60" y2="470" />
            <line x1="1320" y1="80" x2="1180" y2="200" />
            <line x1="1180" y1="200" x2="1280" y2="360" />
            <line x1="1180" y1="200" x2="1000" y2="150" />
            <line x1="1280" y1="360" x2="1360" y2="500" />
            <line x1="1000" y1="150" x2="900" y2="60" />
          </g>

          {/* animated data-flow pulses traveling along the lines */}
          <g fill="none">
            <path stroke="#0F172A" strokeWidth="2" d="M80,90 L260,180 L180,340 L60,470" opacity="0.75" strokeDasharray="6 14" style={{ animation: 'dash-flow 6s linear infinite' }} />
            <path stroke="#0F172A" strokeWidth="2" d="M260,180 L440,140" opacity="0.7" strokeDasharray="5 12" style={{ animation: 'dash-flow 4.5s linear infinite' }} />
            <path stroke="#0F172A" strokeWidth="2" d="M1320,80 L1180,200 L1280,360 L1360,500" opacity="0.75" strokeDasharray="6 14" style={{ animation: 'dash-flow-rev 7s linear infinite' }} />
            <path stroke="#0F172A" strokeWidth="2" d="M1180,200 L1000,150 L900,60" opacity="0.7" strokeDasharray="5 12" style={{ animation: 'dash-flow-rev 5s linear infinite' }} />
          </g>

          {/* pulsing nodes */}
          {[
            [80, 90, '0s'], [260, 180, '0.4s'], [180, 340, '0.8s'], [440, 140, '1.2s'], [60, 470, '1.6s'],
            [1320, 80, '0.2s'], [1180, 200, '0.6s'], [1280, 360, '1s'], [1000, 150, '1.4s'], [900, 60, '1.8s'], [1360, 500, '0.3s'],
          ].map(([cx, cy, delay], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="3.5"
              fill="#0F172A"
              opacity="0.85"
              style={{ animation: 'node-pulse 3.5s ease-in-out infinite', animationDelay: delay, transformOrigin: `${cx}px ${cy}px` }}
            />
          ))}
        </svg>

        {/* two large, very soft drifting bars of tone (not circular) framing the edges */}
        <div
          className="absolute top-0 left-0 w-1/3 h-full"
          style={{
            background: 'linear-gradient(120deg, color-mix(in srgb, #0F172A 5%, transparent), transparent 60%)',
            animation: 'tone-shift 16s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-1/3 h-full"
          style={{
            background: 'linear-gradient(-60deg, color-mix(in srgb, #0F172A 5%, transparent), transparent 60%)',
            animation: 'tone-shift 16s ease-in-out infinite 5s',
          }}
        />

        <style>{`
          @keyframes dash-flow {
            to { stroke-dashoffset: -200; }
          }
          @keyframes dash-flow-rev {
            to { stroke-dashoffset: 200; }
          }
          @keyframes node-pulse {
            0%, 100% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
          }
          @keyframes tone-shift {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          @media (prefers-reduced-motion: reduce) {
            [aria-hidden="true"] * {
              animation: none !important;
            }
          }
        `}</style>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 text-center relative z-10">

        {/* Standard Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-4 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#0F172A]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
              Customer Review
            </span>
          </motion.div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Trusted by Industry Leaders
          </h2>
        </div>

        {/* ── MOBILE / TABLET: stacked vertical layout ── */}
        <div className="flex flex-col lg:hidden gap-8">
          <div
            className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto aspect-[4/5] bg-slate-100 overflow-hidden shadow-xl"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeReview.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={activeReview.image}
                alt={activeReview.name}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          <motion.div
            key={activeReview.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto mb-8 text-left"
          >
            <span className="text-lg font-bold text-slate-400 block mb-1">#{activeReview.id}</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] uppercase tracking-tight">
              {activeReview.name}
            </h3>
            <p className="mt-1 text-xs font-mono font-semibold uppercase tracking-widest text-slate-400">
              {activeReview.position}
            </p>
            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              {activeReview.text}
            </p>
          </motion.div>

          <div className="flex items-center gap-3 flex-wrap">
            {thumbnails.map((thumb) => (
              <button
                key={thumb.id}
                onClick={() => {
                  setCurrentIndex(reviews.findIndex(r => r.id === thumb.id));
                  setIsAutoPlaying(false);
                }}
                className="w-20 h-28 sm:w-24 sm:h-32 overflow-hidden bg-slate-100 hover:opacity-80 transition-opacity shadow-md focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
              >
                <img src={thumb.image} alt={thumb.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ── DESKTOP: 3-column layout, all bottoms aligned ── */}
        <div className="hidden lg:flex flex-row items-end justify-center w-full lg:pl-24 xl:pl-44 2xl:pl-64">

          {/* COLUMN 1: prev thumbnail (bottom) */}
          <div
            className="flex flex-col items-center shrink-0 w-20 xl:w-24 2xl:w-28"
            style={{ minHeight: '520px' }}
          >
            <div className="flex-1" />
            <div className="w-full aspect-[3/4] max-h-36 xl:max-h-40 overflow-hidden shadow-md shrink-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={prevReview.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={prevReview.image}
                  alt={prevReview.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* GAP */}
          <div className="w-6 xl:w-10 shrink-0" />

          {/* COLUMN 2: Main large image */}
          <div
            className="shrink-0"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="w-56 xl:w-72 2xl:w-80 aspect-[4/5] bg-slate-100 overflow-hidden shadow-xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeReview.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  src={activeReview.image}
                  alt={activeReview.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* COLUMN 3: Text + thumbnails */}
          <div
            className="flex-1 flex flex-col pl-8 xl:pl-14 max-w-md xl:max-w-lg 2xl:max-w-xl"
            style={{ minHeight: '520px' }}
          >
            <div className="flex-1 flex flex-col justify-start pt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReview.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="text-left"
                >
                  <span className="text-2xl font-bold text-slate-400 block mb-2">
                    #{activeReview.id}
                  </span>
                  <h3 className="text-2xl xl:text-4xl font-extrabold text-[#0F172A] uppercase tracking-tight leading-tight">
                    {activeReview.name}
                  </h3>
                  <p className="mt-1 text-xs font-mono font-semibold uppercase tracking-widest text-slate-400">
                    {activeReview.position}
                  </p>
                  <p className="mt-6 text-slate-600 text-base xl:text-lg leading-relaxed max-w-lg">
                    {activeReview.text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-end gap-3 xl:gap-4 pt-8">
              {thumbnails.map((thumb) => (
                <button
                  key={thumb.id}
                  onClick={() => {
                    setCurrentIndex(reviews.findIndex(r => r.id === thumb.id));
                    setIsAutoPlaying(false);
                  }}
                  className="w-24 h-32 xl:w-28 xl:h-36 overflow-hidden bg-slate-100 hover:opacity-80 transition-opacity shadow-md focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 shrink-0"
                >
                  <img src={thumb.image} alt={thumb.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}