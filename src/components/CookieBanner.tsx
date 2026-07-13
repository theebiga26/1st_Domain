import { useState, useEffect } from 'react';
import { Cookie, X, ShieldCheck, BarChart2, MessageSquare } from 'lucide-react';

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
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [chat, setChat] = useState(true);

  useEffect(() => {
    const existing = getCookieConsent();
    if (!existing) {
      // Small delay so page loads first
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    } else {
      onConsent(existing);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = { necessary: true, analytics: true, chat: true };
    setCookieConsent(consent);
    onConsent({ ...consent, timestamp: new Date().toISOString() });
    setVisible(false);
  };

  const handleRejectAll = () => {
    const consent = { necessary: true, analytics: false, chat: false };
    setCookieConsent(consent);
    onConsent({ ...consent, timestamp: new Date().toISOString() });
    setVisible(false);
  };

  const handleSavePreferences = () => {
    const consent = { necessary: true, analytics, chat };
    setCookieConsent(consent);
    onConsent({ ...consent, timestamp: new Date().toISOString() });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[9999] w-full max-w-[380px] animate-slide-up">
      <div className="bg-[#0F172A] text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
        
        {/* Main Banner */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <Cookie className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-white mb-1">We use cookies</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                We use cookies to enhance your browsing experience, enable live chat support, and analyze site traffic. You can manage your preferences below.
              </p>
            </div>
            <button
              onClick={handleRejectAll}
              className="shrink-0 text-slate-500 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Detailed preferences */}
          {showDetails && (
            <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
              {/* Necessary */}
              <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-white/5">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">Necessary</p>
                    <p className="text-xs text-slate-500">Required for the site to function. Cannot be disabled.</p>
                  </div>
                </div>
                <div className="w-10 h-5 rounded-full bg-emerald-500 flex items-center justify-end px-0.5 shrink-0 opacity-60 cursor-not-allowed">
                  <div className="w-4 h-4 rounded-full bg-white" />
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-white/5">
                <div className="flex items-center gap-3">
                  <BarChart2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">Analytics</p>
                    <p className="text-xs text-slate-500">Helps us understand how visitors use our site.</p>
                  </div>
                </div>
                <button
                  onClick={() => setAnalytics(v => !v)}
                  className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-all shrink-0 ${analytics ? 'bg-blue-500 justify-end' : 'bg-slate-600 justify-start'}`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow" />
                </button>
              </div>

              {/* Chat */}
              <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-white/5">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-purple-400 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">Live Chat</p>
                    <p className="text-xs text-slate-500">Enables Tawk.to live chat support widget.</p>
                  </div>
                </div>
                <button
                  onClick={() => setChat(v => !v)}
                  className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-all shrink-0 ${chat ? 'bg-purple-500 justify-end' : 'bg-slate-600 justify-start'}`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow" />
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={handleAcceptAll}
              className="px-5 py-2.5 bg-[#3b82f6] hover:bg-blue-600 text-white text-sm font-semibold rounded-full transition-all shadow-lg shadow-blue-500/20"
            >
              Accept All
            </button>
            <button
              onClick={handleRejectAll}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-full transition-all"
            >
              Reject All
            </button>
            {showDetails ? (
              <button
                onClick={handleSavePreferences}
                className="px-5 py-2.5 border border-white/20 hover:border-white/40 text-white text-sm font-semibold rounded-full transition-all"
              >
                Save Preferences
              </button>
            ) : (
              <button
                onClick={() => setShowDetails(true)}
                className="text-sm text-slate-400 hover:text-white underline underline-offset-2 transition-colors"
              >
                Manage Preferences
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
