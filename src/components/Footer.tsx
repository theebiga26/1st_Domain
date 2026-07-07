import { Cpu, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';
import logoUrl from '../assets/logos/logo.svg';

export default function Footer() {
  const links = {
    platform: [
      { name: 'Compute Orchestrator', href: '#hero' },
      { name: 'Dynamic Scheduling', href: '#capabilities' },
      { name: 'Fractional GPU Splitting', href: '#capabilities' },
      { name: 'Weight Hot-Swap', href: '#capabilities' },
      { name: 'Global Telemetry Map', href: '#telemetry-viz' },
    ],
    solutions: [
      { name: 'LLM Fine-tuning', href: '#use-cases' },
      { name: 'Multi-Modal Inference', href: '#use-cases' },
      { name: 'Generative Media', href: '#use-cases' },
      { name: 'Scientific Computing', href: '#use-cases' },
    ],
    resources: [
      { name: 'System Architecture Blueprint', href: '#architecture' },
      { name: 'Vertex CLI Docs', href: '#how-it-works' },
      { name: 'Security & Compliance (SOC2)', href: '#why-vertexgrid' },
      { name: 'Uptime SLA Metrics', href: '#metrics' },
    ],
    company: [
      { name: 'About VertexGrid', href: '#' },
      { name: 'Engineering Blog', href: '#' },
      { name: 'Careers (Hiring!)', href: '#' },
      { name: 'Press & Media', href: '#' },
    ],
  };

  return (
    <footer id="vertexgrid-footer" className="bg-[#0F172A] border-t border-white/10 relative pt-16 pb-8 z-10">
      
      {/* Structural layout vertical boundaries */}
      <div className="absolute top-0 bottom-0 left-12 w-px bg-white/5 pointer-events-none hidden xl:block" />
      <div className="absolute top-0 bottom-0 right-12 w-px bg-white/5 pointer-events-none hidden xl:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top brand grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Left Column */}
          <div className="col-span-2 flex flex-col items-start space-y-4">
            <a href="#" className="flex items-center gap-2.5 group">
              <img src={logoUrl} alt="VertexGrid" className="w-48 h-auto transition-transform duration-300 group-hover:scale-105" />
            </a>
            
            <p className="text-white/50 text-xs leading-relaxed max-w-sm">
              Premium decentralized bare-metal and hybrid cloud GPU orchestrator. Purpose-built for massive-scale distributed deep learning and low-latency inference pipelines.
            </p>

            {/* Social handles */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5">
              {links.platform.map((item) => (
                <li key={item.name}>
              <a href={item.href} className="text-white/55 hover:text-white text-xs transition-colors">
                {item.name}
              </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5">
              {links.solutions.map((item) => (
                <li key={item.name}>
              <a href={item.href} className="text-white/55 hover:text-white text-xs transition-colors">
                {item.name}
              </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider mb-4">
              Architecture
            </h4>
            <ul className="space-y-2.5">
              {links.resources.map((item) => (
                <li key={item.name}>
              <a href={item.href} className="text-white/55 hover:text-white text-xs transition-colors">
                {item.name}
              </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 4 */}
          <div>
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {links.company.map((item) => (
                <li key={item.name}>
              <a href={item.href} className="text-white/55 hover:text-white text-xs transition-colors">
                {item.name}
              </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom copyright and status rails */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-white/40">
            <span>© {new Date().getFullYear()} VertexGrid Inc. All rights reserved.</span>
              <div className="flex items-center gap-3">
              <a href="#" className="hover:text-white/80 transition-colors">Privacy Policy</a>
              <span className="text-white/20">•</span>
              <a href="#" className="hover:text-white/80 transition-colors">Terms of Service</a>
              <span className="text-white/20">•</span>
              <a href="#" className="hover:text-white/80 transition-colors">Trust & Security</a>
            </div>
          </div>

          {/* Dynamic API version pill */}
          <div className="flex items-center gap-2.5 border border-white/15 rounded-lg py-1 px-2.5 bg-white/5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-success"></span>
            </span>
            <span className="text-[10px] font-mono font-bold tracking-wide text-white/40 uppercase">
              API v1.4.2 - operational
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}
