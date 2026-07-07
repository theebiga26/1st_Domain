import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle, Mail, Send, Sparkles } from 'lucide-react';

export default function FinalCTA() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Enterprise email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid corporate email address');
      return;
    }

    // Success response trigger
    setIsSubmitted(true);
  };

  return (
    <section id="cta" className="py-24 sm:py-32 bg-gradient-to-tr from-[#0F172A] to-[#172554] text-white relative overflow-hidden">
      
      {/* Decorative Network Connection Lines (Subtle SVG backdrops) */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M100,100 L400,300 L800,200 L1200,450" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="6 4" />
          <path d="M200,400 L600,150 L1000,500 L1400,200" fill="none" stroke="#1E3A8A" strokeWidth="1.5" strokeDasharray="5 5" />
          <circle cx="400" cy="300" r="4" fill="#3B82F6" />
          <circle cx="800" cy="200" r="5" fill="#1E3A8A" />
          <circle cx="600" cy="150" r="4.5" fill="#3B82F6" />
          <circle cx="1000" cy="500" r="3.5" fill="#1E3A8A" />
        </svg>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#cta-grid)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="max-w-3xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-widest">
              Join VertexGrid Network
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
          >
            Power Enterprise AI at Compute Scale.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto"
          >
            Deploy your fine-tuning workflows, establish isolated container endpoints, and slash cloud spend. Get customized priority access within minutes.
          </motion.p>

          {/* Interactive Capture Frame */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 max-w-lg mx-auto bg-slate-900/60 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="text-left mb-2">
                    <label htmlFor="email" className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Corporate Enterprise Email
                    </label>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="name@company.com"
                      className="w-full pl-12 pr-4.5 py-4 bg-slate-950 border border-white/10 rounded-full text-white text-sm font-medium focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                    />
                  </div>

                  {error && (
                    <div className="text-rose-400 text-xs text-left pl-1 font-semibold">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 px-6 bg-[#1E3A8A] hover:bg-blue-600 active:scale-[0.99] rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/10"
                    >
                      Request Invite <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('why-vertexgrid');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-4 px-6 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-sm font-semibold transition-all"
                    >
                      Compare Platform
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-brand-success">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">Invite Request Submitted</h3>
                    <p className="text-slate-400 text-xs mt-2 max-w-sm mx-auto leading-relaxed">
                      Thank you. We have logged <strong>{email}</strong> for our Q3 priority cohort validation. Our engineering representative will follow up within 2 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setEmail('');
                    }}
                    className="text-xs text-blue-400 hover:text-blue-300 font-mono font-semibold underline mt-2"
                  >
                    Submit another email
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* SLA and Security Subtitle notes */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-slate-400 font-mono">
            <span>✔ SOC2 Type II Certified</span>
            <span>✔ GDPR & HIPAA Compliant Data Channels</span>
            <span>✔ Guaranteed 99.99% Cluster SLA</span>
          </div>

        </div>

      </div>
    </section>
  );
}
