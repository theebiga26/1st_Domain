import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Starter',
    description: 'For small teams getting their first unified data view',
    priceMonthly: '59',
    priceAnnually: '49',
    currency: '$',
    period: '/mo',
    features: [
      'Up to 5 data connectors',
      '1TB Data Processing',
      'Basic AI Analytics',
      'Standard Support'
    ],
    buttonText: 'Get Started',
    hrefMonthly: 'https://buy.stripe.com/test_3cI7sLeUy3xR63Odzu8AE02',
    hrefAnnually: 'https://buy.stripe.com/test_00w9AT9Aeecvbo81QM8AE04',
    theme: '#0F172A',
    themeDark: '#020617',
  },
  {
    name: 'Pro',
    description: 'For growing teams needing predictive analytics + integrations',
    priceMonthly: '159',
    priceAnnually: '135',
    currency: '$',
    period: '/mo',
    features: [
      'Unlimited connectors',
      '10TB Data Processing',
      'Predictive Intelligence',
      'Decision Automation',
      'Priority Support'
    ],
    buttonText: 'Get Started',
    hrefMonthly: 'https://buy.stripe.com/test_14A5kDh2GgkD77Scvq8AE03',
    hrefAnnually: 'https://buy.stripe.com/test_bJefZh8wa8Sb2RC3YU8AE05',
    theme: '#0F172A',
    themeDark: '#020617',
    isMostPopular: true,
  },
  {
    name: 'Enterprise',
    description: 'For large orgs needing a full platform, dedicated support, and custom SLAs',
    priceMonthly: 'Custom',
    priceAnnually: 'Custom',
    currency: '',
    period: '',
    features: [
      'Unlimited Data Processing',
      'Custom AI Models (BYOM)',
      'VPC Peering & BYOK',
      'Dedicated Solutions Architect',
      '24/7 SLA Support'
    ],
    buttonText: 'Contact Sales',
    theme: '#0F172A',
    themeDark: '#020617',
  },
];

export default function Price() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-12 sm:py-16 bg-[#0F172A] relative overflow-hidden border-t border-white/10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Title Section */}
        <div className="flex flex-col items-center justify-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-4"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#0F172A]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">
              Pricing
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            Pick Your Level Of Intelligence.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Capacity-based models built to scale with your enterprise needs. No hidden fees.
          </motion.p>
        </div>

        {/* Toggle */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="flex justify-center mb-16"
        >
          <div className="bg-white p-1.5 rounded-full border border-slate-200 inline-flex items-center shadow-sm">
             <button 
               onClick={() => setIsAnnual(false)}
               className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${!isAnnual ? 'bg-[#0F172A] text-white shadow-md' : 'text-[#0F172A] hover:bg-slate-50'}`}
             >
               Monthly
             </button>
             <button 
               onClick={() => setIsAnnual(true)}
               className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${isAnnual ? 'bg-[#0F172A] text-white shadow-md' : 'text-[#0F172A] hover:bg-slate-50'}`}
             >
               Annually 
               <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full font-extrabold transition-colors ${isAnnual ? 'bg-white text-[#0F172A]' : 'bg-[#0F172A]/10 text-[#0F172A]'}`}>
                 SAVE 15%
               </span>
             </button>
          </div>
        </motion.div>
        
        {/* Ribbon Cards Layout */}
        <div className="grid gap-12 md:gap-8 lg:gap-12 md:grid-cols-3 max-w-6xl mx-auto px-4 sm:px-0">
          {pricingTiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40, scale: tier.isMostPopular ? 0.98 : 1 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={tier.isMostPopular ? { scale: 1.06 } : {}}
              whileTap={tier.isMostPopular ? { scale: 1.04 } : undefined}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15, type: 'spring', stiffness: 120 }}
              className={`bg-white rounded-[2rem] rounded-tl-xl rounded-br-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col relative pt-10 pb-6 overflow-visible transition-transform ${tier.isMostPopular ? 'border-2 border-[#0F172A] shadow-[0_12px_36px_rgb(15,23,42,0.18)] hover:-translate-y-2' : 'hover:-translate-y-2 duration-300'}`}
            >
              {tier.isMostPopular ? (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                  <span className="inline-flex items-center justify-center rounded-full bg-[#0F172A] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white shadow-lg">
                    Most Popular
                  </span>
                </div>
              ) : null}
              
              {/* Header Ribbon */}
              <div className="relative mb-6 text-left">
                <div 
                  className="text-white py-2.5 px-6 -ml-4 rounded-r-3xl relative z-10 font-display font-bold text-lg sm:text-xl inline-block min-w-[65%] text-center shadow-md"
                  style={{ backgroundColor: tier.theme }}
                >
                  {tier.name}
                  {/* Fold triangle */}
                  <div 
                     className="absolute top-full left-0 w-0 h-0 border-t-[14px] border-l-[16px] border-l-transparent" 
                     style={{ borderTopColor: tier.themeDark }} 
                  />
                </div>
              </div>

              {/* Price */}
              <div className="text-center mb-4 px-4">
                <div className="flex items-start justify-center font-bold" style={{ color: tier.theme }}>
                  {tier.currency && tier.priceMonthly !== 'Custom' && <span className="text-xl sm:text-2xl mt-1.5 sm:mt-2 mr-1 font-semibold">{tier.currency}</span>}
                  <span className="text-5xl sm:text-6xl lg:text-[4rem] tracking-tighter leading-none">
                    {tier.priceMonthly === 'Custom' ? 'Custom' : (isAnnual ? tier.priceAnnually : tier.priceMonthly)}
                  </span>
                  {tier.period && tier.priceMonthly !== 'Custom' && <span className="text-lg sm:text-xl mt-auto mb-1.5 ml-1 font-medium">{tier.period}</span>}
                </div>
                <p className="text-xs text-[#0F172A]/60 mt-2 min-h-[36px]">
                  {tier.description}
                </p>
              </div>

              {/* Features List */}
              <ul className="flex-1 mb-6 space-y-2.5 text-center text-[14px] text-[#0F172A]/80 px-6 font-medium">
                {tier.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>

              {/* Bottom Ribbon Button */}
              <div className="relative mt-auto text-right">
                <a
                  href={tier.hrefMonthly && tier.hrefAnnually ? (isAnnual ? tier.hrefAnnually : tier.hrefMonthly) : '#contact'}
                  target={tier.hrefMonthly && tier.hrefAnnually ? '_blank' : undefined}
                  rel={tier.hrefMonthly && tier.hrefAnnually ? 'noopener noreferrer' : undefined}
                  className="text-white py-3 px-8 -mr-4 rounded-l-3xl relative z-10 font-bold text-base inline-flex items-center justify-center gap-1.5 transition-all hover:brightness-110 shadow-md group"
                  style={{ backgroundColor: tier.theme }}
                >
                  {tier.buttonText} <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  {/* Fold triangle */}
                  <div 
                     className="absolute top-full right-0 w-0 h-0 border-t-[14px] border-r-[16px] border-r-transparent" 
                     style={{ borderTopColor: tier.themeDark }} 
                  />
                </a>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
