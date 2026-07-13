import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ChevronDown, Menu, X, ArrowRight, ShieldCheck, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoUrl from '../assets/logos/logo2.webp';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('#hero');
    useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    const observer = new IntersectionObserver((entries) => {
       const visible = entries.filter((entry) => entry.isIntersecting);
       if (visible.length === 0) return;
       // Sort by vertical position to pick the section nearest to the top
       visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
       setActiveSection('#' + visible[0].target.id);
     }, { root: null, threshold: 0.3 });

    // Observe existing sections
    const observeSections = () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((sec) => {
        observer.observe(sec);
      });
    };

    observeSections();

    // Use MutationObserver to detect when new sections are added (for lazy-loaded components)
    const mutationObserver = new MutationObserver(() => {
      observeSections();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const navItems = [
    { name: 'Home', href: '/#hero', sections: ['#hero'] },
    { name: 'Features', href: '/#capabilities', sections: ['#capabilities', '#about'] },
    { name: 'Platform', href: '/#metrics', sections: ['#metrics', '#use-cases'] },
    { name: 'How It Works', href: '/#how-it-works', sections: ['#how-it-works'] },
    { name: 'Pricing', href: '/#pricing', sections: ['#pricing'] },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isMobile: boolean = false) => {
    if (window.location.pathname === '/' && href.startsWith('/#')) {
      e.preventDefault();
      if (isMobile) setMobileMenuOpen(false);
      const targetId = href.substring(2);
      const el = document.getElementById(targetId);
      if (el) {
        const offset = 90; // offset for fixed header
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      }
    }
  };

    return (
    <header
      id="vertexgrid-header"
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[92%] sm:w-[95%] max-w-7xl rounded-2xl md:rounded-full bg-white shadow-sm border border-slate-200 ${
        isScrolled ? 'top-2 sm:top-4 shadow-md' : 'top-4 sm:top-6'
      }`}
    >
      <div className="px-3 sm:px-5 md:px-8">
        <div className="flex items-center justify-between h-11 sm:h-12 md:h-14">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group" aria-label="VertexGrid Home">
              <img src={logoUrl} alt="VertexGrid" width="192" height="48" className="w-32 sm:w-40 md:w-48 h-auto transition-transform duration-300 group-hover:scale-105" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`nav-link text-slate-600 hover:text-brand-primary-blue hover:bg-slate-50 rounded-full px-3 py-1.5 transition-all relative ${item.sections?.includes(activeSection) ? 'nav-active font-semibold text-brand-primary-blue after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-gradient-to-r after:from-brand-primary-blue after:to-cyan-400 after:rounded-full' : ''}`}
                >
                  {item.name}
                </a>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#product"
              className={`text-sm font-semibold px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-all duration-300 bg-[#0F172A] text-white hover:bg-[#0F172A]/90`}
            >
              Product page
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-xl border transition-colors text-slate-700 border-slate-200 bg-slate-50 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden shadow-lg"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              
              <div className="flex flex-col gap-1 px-3">
                {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href, true)}
                      className={`block py-2 text-[15px] font-medium text-slate-600 hover:text-brand-primary-blue transition-all relative pl-3 ${item.sections?.includes(activeSection) ? 'text-brand-primary-blue font-semibold before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-6 before:bg-gradient-to-b before:from-brand-primary-blue before:to-cyan-400 before:rounded-full' : ''}`}
                    >
                      {item.name}
                    </a>
                ))}
              </div>
              
              <div className="pt-4 flex flex-col gap-2.5 border-t border-slate-100 mt-4">
                <a
                  href="#product"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 px-4 bg-[#0F172A] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#0F172A]/90"
                >
                  Product page
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
