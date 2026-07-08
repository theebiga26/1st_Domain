import { Link } from 'react-router-dom';
import logoUrl from '../assets/logos/logo.svg';

export default function Footer() {
  const links = {
    quickLinks: [
      { name: 'Home', href: '/#hero' },
      { name: 'How It Works', href: '/#how-it-works' },
      { name: 'Features', href: '/#capabilities' },
      { name: 'Pricing', href: '/#pricing' },
      { name: 'Contact', href: '/#contact' },
    ],
    legal: [
      { name: 'Cookies Policy', href: '/cookies' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms & Conditions', href: '/terms' },
    ],
  };

  return (
    <footer id="vertexgrid-footer" className="bg-[#0F172A] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-5 flex flex-col items-center text-center sm:items-start sm:text-left">
            <Link to="/#hero" className="inline-flex items-center gap-3">
              <img src={logoUrl} alt="VertexGrid" className="w-40 h-auto" />
            </Link>
            <p className="text-sm text-white/60 max-w-sm leading-relaxed">
              Intelligent generative content formatting network with zero operational delay.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 text-center sm:text-left">
            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] text-white/70 font-semibold mb-4">
                Quick Links
              </h4>
              <ul className="space-y-3 text-sm text-white/60">
                {links.quickLinks.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="hover:text-white transition-colors">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] text-white/70 font-semibold mb-4">
                Legal
              </h4>
              <ul className="space-y-3 text-sm text-white/60">
                {links.legal.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-5 text-center sm:text-left">
            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] text-white/70 font-semibold mb-4">
                System Outflows
              </h4>
              <p className="text-sm text-white/60 leading-relaxed max-w-md mx-auto sm:mx-0">
                Subscribe to standard newsletters to receive structural algorithm updates.
              </p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row sm:items-center w-full max-w-sm mx-auto sm:mx-0">
              <label htmlFor="footer-email" className="sr-only">Enter email detail</label>
              <input
                id="footer-email"
                type="email"
                placeholder="Enter email detail"
                className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-white placeholder:text-white/40 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10"
              />
              <button
                type="submit"
                className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full bg-white px-6 py-3 text-[#0F172A] font-semibold hover:bg-white/90 transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-white/50 text-center sm:text-left">
          <span>© {new Date().getFullYear()} VertexGrid. All rights reserved.</span>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookies Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
