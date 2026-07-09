import { Facebook, Linkedin, Mail, Phone, MapPin, Printer, Twitter, Youtube } from 'lucide-react';
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
    <section id="contact" className="py-24 bg-slate-100 flex items-center justify-center min-h-screen relative">
      <div className="max-w-6xl w-full px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mx-auto max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 border border-slate-300 mb-4 mx-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0F172A]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0F172A]">
              Contact Us
            </span>
          </div>
          <h2 className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight text-[#0F172A]">Get in Touch</h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Need help architecting your next GPU cluster or want a tailored enterprise deployment plan? Reach out and our VertexGrid specialists will connect you with the right team immediately.
          </p>
        </div>
        <div className="bg-white rounded-[2rem] rounded-tl-xl rounded-br-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col md:flex-row ml-0 md:ml-16 relative">
          
          {/* Left Overlay Card */}
          <div className="bg-[#0F172A] text-white p-8 md:p-12 flex flex-col rounded-2xl shadow-2xl md:absolute md:top-6 md:bottom-6 md:-left-16 md:w-[400px] z-10 w-full">
            <div>
              <h3 className="text-xl font-semibold text-slate-200 mb-4">Contact Details</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Reach out for sales, support, or to discuss your enterprise GPU strategy with our team.
              </p>
            </div>
            
            <div className="my-auto pt-10 pb-4">
              <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-slate-400" />
                <p className="text-sm font-medium text-slate-200">822 E. 20th Street<br/>Los Angeles CA 90011</p>
              </div>
              
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 shrink-0 text-slate-400" />
                <p className="text-sm font-medium text-slate-200">+1 (310) 569930</p>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 shrink-0 text-slate-400" />
                <p className="text-sm font-medium text-slate-200">VertexGrid.one</p>
              </div>
            </div>

            <div className="mt-10">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Follow Us</p>
              <div className="flex items-center gap-3 flex-wrap">
                
                {/* LinkedIn */}
                <a href="#" aria-label="LinkedIn" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-[#0A66C2]/30 hover:border-[#0A66C2]/50 transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>

                {/* Facebook */}
                <a href="#" aria-label="Facebook" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-[#1877F2]/30 hover:border-[#1877F2]/50 transition-all">
                  <Facebook className="w-4 h-4" />
                </a>

                {/* YouTube */}
                <a href="#" aria-label="YouTube" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all">
                  <Youtube className="w-4 h-4" />
                </a>

                {/* Twitter / X */}
                <a href="#" aria-label="Twitter" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all">
                  <Twitter className="w-4 h-4" />
                </a>

                {/* Pinterest — inline SVG */}
                <a href="#" aria-label="Pinterest" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-[#E60023]/20 hover:border-[#E60023]/40 transition-all">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                  </svg>
                </a>

              </div>
            </div>
          </div>
        </div>

          {/* Right Form Area */}
          <div className="p-8 md:py-16 md:pr-16 md:pl-[380px] w-full flex flex-col justify-center bg-white rounded-2xl min-h-[550px] relative z-0">

            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
              {status === 'success' && (
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-50 px-4 py-3 text-emerald-700 text-sm">
                  Thanks! Your message has been sent successfully.
                </div>
              )}
              {status === 'error' && (
                <div className="rounded-lg border border-rose-500/20 bg-rose-50 px-4 py-3 text-rose-700 text-sm">
                  {errorMessage || 'Something went wrong. Please try again later.'}
                </div>
              )}
              {!isFormspreeConfigured && (
                <div className="rounded-lg border border-amber-500/20 bg-amber-50 px-4 py-3 text-amber-700 text-sm">
                  Contact form is not configured. Add VITE_FORMSPREE_ENDPOINT or VITE_FORMSPREE_FORM_ID to your .env file.
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2 ml-1">Full Name</label>
                <input
                  name="name"
                  value={fields.name}
                  onChange={handleFieldChange}
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-[#0F172A] border border-white/10 text-white rounded-xl px-5 py-4 text-sm outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-slate-400"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2 ml-1">Email Address</label>
                <input
                  name="email"
                  value={fields.email}
                  onChange={handleFieldChange}
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-[#0F172A] border border-white/10 text-white rounded-xl px-5 py-4 text-sm outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2 ml-1">Company</label>
                <input
                  name="company"
                  value={fields.company}
                  onChange={handleFieldChange}
                  type="text"
                  placeholder="Your Company"
                  className="w-full bg-[#0F172A] border border-white/10 text-white rounded-xl px-5 py-4 text-sm outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2 ml-1">Message</label>
                <textarea
                  name="message"
                  value={fields.message}
                  onChange={handleFieldChange}
                  rows={4}
                  placeholder="Typing your message here....."
                  className="w-full bg-[#0F172A] border border-white/10 text-white rounded-xl px-5 py-4 text-sm outline-none focus:ring-1 focus:ring-white/20 transition-all resize-none placeholder:text-slate-400"
                />
              </div>

              {/* Turnstile */}
              <div className="space-y-3">
                <div ref={turnstileContainerRef} className="min-h-[88px]" />
                {turnstileError && (
                  <div className="text-rose-600 text-sm">{turnstileError}</div>
                )}
                {!isTurnstileConfigured && (
                  <div className="text-amber-600 text-sm">
                    Cloudflare Turnstile is not configured. Add VITE_CLOUDFLARE_TURNSTILE_SITE_KEY to your .env file.
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting' || !isFormspreeConfigured}
                  className="bg-[#0F172A] text-white px-10 py-3.5 rounded-full text-sm font-semibold hover:bg-slate-900 transition-all shadow-lg shadow-slate-900/30 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'SENDING...' : 'SEND'}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
