import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Database } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'vg_cookie_consent';

export type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  chat: boolean;
  timestamp: string;
};

export function getCookieConsent(): CookieConsent | null {
  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function setCookieConsent(consent: Omit<CookieConsent, 'timestamp'>) {
  const full: CookieConsent = { ...consent, timestamp: new Date().toISOString() };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(full));
}

export function clearCookieConsent() {
  localStorage.removeItem(COOKIE_CONSENT_KEY);
}

export default function CookieBanner({ onConsent }: { onConsent: (c: CookieConsent) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Always show the banner on every page load
    const existing = getCookieConsent();
    if (existing) {
      // Pass existing consent so chat/analytics load for returning users
      onConsent(existing);
    }
    // Show banner after a short delay so the page renders first
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  const handleAcceptAll = () => {
    const consent = { necessary: true, analytics: true, chat: true };
    setCookieConsent(consent);
    onConsent({ ...consent, timestamp: new Date().toISOString() });
    setVisible(false);
  };

  const handleDecline = () => {
    const consent = { necessary: true, analytics: false, chat: false };
    setCookieConsent(consent);
    onConsent({ ...consent, timestamp: new Date().toISOString() });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[9999] w-full max-w-[360px] animate-slide-up">
      <div
        className="rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        style={{ background: '#0F172A' }}
      >
        <div className="p-5">
          {/* Title row */}
          <div className="flex items-center gap-2.5 mb-3">
            <Database className="w-5 h-5 text-[#3b82f6] shrink-0" />
            <h3 className="text-base font-bold text-white tracking-tight">Cookie Consent</h3>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-400 leading-relaxed mb-5">
            We use cookies to optimize site functionality and enhance your experience. By clicking
            &quot;Accept&quot;, you agree to our{' '}
            <Link
              to="/cookies"
              className="text-[#3b82f6] hover:text-blue-400 transition-colors font-medium"
            >
              Cookie Policy
            </Link>
            .
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAcceptAll}
              className="flex-1 py-2.5 rounded-xl bg-[#3b82f6] hover:bg-blue-500 active:bg-blue-700 text-white text-sm font-bold transition-all shadow-lg shadow-blue-500/25"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/5 text-white text-sm font-bold transition-all"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
