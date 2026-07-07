import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, any>) => number;
    };
  }
}

export default function ContactUs() {
  const formspreeEndpoint =
    import.meta.env.VITE_FORMSPREE_ENDPOINT ||
    (import.meta.env.VITE_FORMSPREE_FORM_ID
      ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_FORM_ID}`
      : '');
  const turnstileSiteKey = import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY || '';

  const [fields, setFields] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileError, setTurnstileError] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);

  const isFormspreeConfigured = Boolean(formspreeEndpoint);
  const isTurnstileConfigured = Boolean(turnstileSiteKey);

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFields(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!isTurnstileConfigured || !turnstileContainerRef.current) {
      return;
    }

    const renderTurnstile = () => {
      if (!window.turnstile || widgetIdRef.current !== null || !turnstileContainerRef.current) {
        return;
      }

      widgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: turnstileSiteKey,
        callback: (token: string) => {
          setTurnstileToken(token);
          setTurnstileError('');
        },
        'error-callback': () => {
          setTurnstileError('Cloudflare verification failed. Please refresh the page and try again.');
          setTurnstileToken('');
        },
        'expired-callback': () => {
          setTurnstileToken('');
        },
      });
    };

    if (window.turnstile) {
      renderTurnstile();
      return;
    }

    const existingScript = document.querySelector('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]');
    if (existingScript) {
      existingScript.addEventListener('load', renderTurnstile);
      return () => existingScript.removeEventListener('load', renderTurnstile);
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.addEventListener('load', renderTurnstile);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', renderTurnstile);
    };
  }, [isTurnstileConfigured, turnstileSiteKey]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormspreeConfigured) {
      setErrorMessage('Contact form is not configured. Please add VITE_FORMSPREE_ENDPOINT or VITE_FORMSPREE_FORM_ID to your .env file.');
      setStatus('error');
      return;
    }

    if (!isTurnstileConfigured) {
      setErrorMessage('Cloudflare Turnstile is not configured. Please set VITE_CLOUDFLARE_TURNSTILE_SITE_KEY in your .env file.');
      setStatus('error');
      return;
    }

    if (!turnstileToken) {
      setErrorMessage('Please complete the Cloudflare verification challenge before submitting.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('name', fields.name);
      formData.append('email', fields.email);
      formData.append('company', fields.company);
      formData.append('message', fields.message);
      formData.append('cf-turnstile-response', turnstileToken);
      formData.append('_replyto', fields.email);
      formData.append('_subject', 'VertexGrid contact request');

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.error || 'Unable to send message. Please try again later.');
        setStatus('error');
        return;
      }

      setStatus('success');
      setFields({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      setErrorMessage('Unable to send message. Please check your network connection and try again.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F172A] rounded-[2.5rem] p-8 sm:p-12 lg:p-16 text-white shadow-2xl border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold font-display mb-6 tracking-tight">
              Get in Touch
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-md">
              Power Enterprise AI at Compute Scale. Deploy your fine-tuning workflows, establish isolated container endpoints, and slash cloud spend. Get customized priority access within minutes.
            </p>

            {/* Checkmarks from CTA */}
            <div className="flex flex-col gap-3 text-sm text-slate-300 font-mono mb-12">
              <span className="flex items-center gap-3">
                <span className="text-[#3b82f6] text-lg leading-none">✔</span> SOC2 Type II Certified
              </span>
              <span className="flex items-center gap-3">
                <span className="text-[#3b82f6] text-lg leading-none">✔</span> GDPR & HIPAA Compliant Data Channels
              </span>
              <span className="flex items-center gap-3">
                <span className="text-[#3b82f6] text-lg leading-none">✔</span> Guaranteed 99.99% Cluster SLA
              </span>
            </div>

            {/* Contact Info (like image) */}
            <div className="space-y-8">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Email Us</div>
                  <div className="font-semibold text-white text-sm">connect@vertexgrid.one</div>
                </div>
              </div>
              
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Call Us</div>
                  <div className="font-semibold text-white text-sm">+1 (800) 555-0199</div>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Office</div>
                  <div className="font-semibold text-white text-sm">San Francisco, CA 94105, USA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:pl-8">
            <form onSubmit={handleSubmit} className="space-y-10 mt-2">
              {status === 'success' && (
                <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-emerald-200 text-sm">
                  Thanks! Your message has been sent successfully.
                </div>
              )}
              {status === 'error' && (
                <div className="rounded-3xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-200 text-sm">
                  {errorMessage || 'Something went wrong. Please try again later.'}
                </div>
              )}
              {!isFormspreeConfigured && (
                <div className="rounded-3xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-amber-100 text-sm">
                  Contact form is not configured. Add VITE_FORMSPREE_ENDPOINT or VITE_FORMSPREE_FORM_ID to your .env file.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Full Name</label>
                  <input
                    name="name"
                    value={fields.name}
                    onChange={handleFieldChange}
                    type="text"
                    placeholder="Enter your name"
                    className="w-full bg-transparent border-b border-white/10 pb-3 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Corporate Enterprise Email</label>
                  <input
                    name="email"
                    value={fields.email}
                    onChange={handleFieldChange}
                    type="email"
                    placeholder="name@company.com"
                    className="w-full bg-transparent border-b border-white/10 pb-3 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Company</label>
                <input
                  name="company"
                  value={fields.company}
                  onChange={handleFieldChange}
                  type="text"
                  placeholder="Your enterprise name"
                  className="w-full bg-transparent border-b border-white/10 pb-3 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Message</label>
                <textarea
                  name="message"
                  value={fields.message}
                  onChange={handleFieldChange}
                  rows={3}
                  placeholder="How can we help you?"
                  className="w-full bg-transparent border-b border-white/10 pb-3 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              {/* Human Verification Mock */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Human Verification</label>
                <div className="space-y-3">
                  <div ref={turnstileContainerRef} className="min-h-[88px] rounded-3xl border border-white/10 bg-slate-950/40 p-4" />
                  {turnstileError && (
                    <div className="text-rose-300 text-sm">{turnstileError}</div>
                  )}
                  {!isTurnstileConfigured && (
                    <div className="text-amber-200 text-sm">
                      Cloudflare Turnstile is not configured. Add VITE_CLOUDFLARE_TURNSTILE_SITE_KEY to your .env file.
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={status === 'submitting' || !isFormspreeConfigured}
                  className="w-full py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-all flex items-center justify-center gap-3 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  {status === 'submitting' ? 'Sending...' : 'Request Invite'}
                </button>
              </div>
            </form>
          </div>

        </div>
        </div>
      </div>
    </section>
  );
}
