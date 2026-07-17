import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'motion/react';
import { ArrowUpRight, Send, CheckCircle2, AlertCircle, ArrowUp } from 'lucide-react';
import logoUrl from '../assets/logos/logo.svg';

const socials = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/VertexGridLLC/',
    svg: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com/VertexGridus',
    svg: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@VertexGridLLC',
    svg: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/vertexgrid/',
    svg: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const quickLinks = [
  { name: 'Home', href: '/#hero' },
  { name: 'How It Works', href: '/#how-it-works' },
  { name: 'Features', href: '/#capabilities' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'Contact', href: '/#contact' },
];

const legal = [
  { name: 'Cookies Policy', href: '/cookies' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms & Conditions', href: '/terms' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('submitting');
    try {
      const res = await fetch('https://formspree.io/f/mzdlqkkp', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) { setStatus('success'); setEmail(''); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const colVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1, ease: 'easeOut' } }),
  };

  return (
    <footer id="vertexgrid-footer" className="relative bg-[#020817] text-white overflow-hidden">

      {/* ── Glowing top border ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent opacity-60" />

      {/* ── Subtle animated dot-grid background ── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Large watermark text ── */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end pointer-events-none select-none overflow-hidden">
        <span className="text-[18vw] font-black text-white/[0.025] leading-none tracking-tighter uppercase whitespace-nowrap">
          VertexGrid
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:grid-cols-12 lg:gap-12 mb-12 sm:mb-16">

          {/* Brand column — full width on mobile, full width on tablet, 4/12 on desktop */}
          <motion.div
            className="sm:col-span-2 lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left"
            custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={colVariants}
          >
            <Link to="/#hero" aria-label="VertexGrid Home" className="mb-5">
              <img src={logoUrl} alt="VertexGrid" className="h-16 w-48 object-contain" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs mb-6 mx-auto sm:mx-0">
              Enterprise AI compute platform orchestrating GPU resources, distributed training, and
              AI inference at any scale.
            </p>

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 self-center sm:self-start">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs text-emerald-400 font-medium">All systems operational</span>
            </div>

            {/* Socials */}
            <div className="flex items-center justify-center sm:justify-start gap-2.5 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#3b82f6] hover:border-[#3b82f6] transition-all duration-200"
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="lg:col-span-2 flex flex-col items-center sm:items-start text-center sm:text-left"
            custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={colVariants}
          >
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#3b82f6] mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#3b82f6]" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            className="lg:col-span-2 flex flex-col items-center sm:items-start text-center sm:text-left"
            custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={colVariants}
          >
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#3b82f6] mb-5">
              Legal
            </h4>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="group flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#3b82f6]" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            className="sm:col-span-2 lg:col-span-4"
            custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={colVariants}
          >
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#3b82f6] mb-5">
              Stay Updated
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Get the latest on AI infrastructure, GPU orchestration updates, and enterprise
              compute insights.
            </p>

            {status === 'success' ? (
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-sm text-emerald-400 font-medium">You're subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <div className="relative">
                  <input
                    id="footer-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    disabled={status === 'submitting'}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3b82f6]/60 focus:ring-1 focus:ring-[#3b82f6]/30 transition-all disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full flex items-center justify-center gap-2 bg-[#1E3A8A] hover:bg-[#2563eb] text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/30 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <span className="animate-pulse">Sending…</span>
                  ) : (
                    <>Subscribe <Send className="w-3.5 h-3.5" /></>
                  )}
                </button>
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-rose-400 text-xs">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    Failed to subscribe. Please try again.
                  </div>
                )}
              </form>
            )}
          </motion.div>
        </div>

        {/* ── Glowing divider ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 order-2 sm:order-1">
            © {new Date().getFullYear()} VertexGrid. All rights reserved.
          </p>

          <div className="flex items-center gap-4 sm:gap-6 order-1 sm:order-2">
            <Link to="/privacy" className="text-xs text-slate-500 hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="text-xs text-slate-500 hover:text-white transition-colors">Terms</Link>
            <Link to="/cookies" className="text-xs text-slate-500 hover:text-white transition-colors">Cookies</Link>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="order-3 group flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors"
          >
            Back to top
            <span className="w-6 h-6 rounded-lg border border-white/10 bg-white/5 group-hover:bg-[#3b82f6] group-hover:border-[#3b82f6] flex items-center justify-center transition-all">
              <ArrowUp className="w-3 h-3" />
            </span>
          </button>
        </div>

      </div>
    </footer>
  );
}
