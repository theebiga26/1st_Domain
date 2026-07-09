import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is VertexGrid?',
    answer: 'VertexGrid is an enterprise AI compute platform that simplifies GPU orchestration, distributed model training, inference acceleration, and infrastructure management for organizations building AI-powered solutions'
  },
  {
    question: 'Who is the platform designed for?',
    answer: 'VertexGrid supports AI research teams, machine learning engineers, MLOps professionals, cloud infrastructure teams, enterprise AI departments, and organizations operating large-scale AI workloads.'
  },
  {
    question: 'Does VertexGrid replace existing cloud providers?',
    answer: 'No. VertexGrid works alongside your existing infrastructure by orchestrating resources across public cloud, private cloud, hybrid environments, Kubernetes clusters, and edge computing systems.'
  },
  {
    question: 'Can VertexGrid support complex enterprise deployments?Can VertexGrid scale with growing AI workloads?',
    answer: 'Yes. The platform is designed to support everything from experimental machine learning projects to enterprise AI deployments running across distributed GPU clusters.'
  },
  {
    question: 'How does VertexGrid improve compute efficiency?',
    answer: 'The platform continuously analyzes infrastructure utilization, intelligently schedules workloads, balances GPU resources, and optimizes compute allocation to maximize performance while reducing operational costs.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Decorative Curves Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top right curve */}
        <svg className="absolute top-0 right-0 w-full h-64" viewBox="0 0 1200 300" preserveAspectRatio="none">
          <path
            d="M 0,100 Q 300,0 600,50 T 1200,80 L 1200,0 L 0,0 Z"
            fill="#0F172A"
          />
        </svg>

        {/* Bottom left curve */}
        <svg className="absolute bottom-0 left-0 w-full h-64" viewBox="0 0 1200 300" preserveAspectRatio="none">
          <path
            d="M 0,200 Q 300,300 600,250 T 1200,220 L 1200,300 L 0,300 Z"
            fill="#0F172A"
          />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#0F172A] mb-4 shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#0F172A]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0F172A]">
              Information
            </span>
          </motion.div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-[#0F172A]/70 text-base sm:text-lg">
            Got questions about our architecture, billing, or security? Explore answers to common platform queries.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-[#0F172A] border-[#0F172A] shadow-lg shadow-[#0F172A]/20' : 'bg-white border-[#0F172A]/20 hover:border-[#0F172A]/40'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`font-semibold text-lg pr-8 transition-colors ${isOpen ? 'text-white' : 'text-[#0F172A]'}`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 transition-all duration-300 ${isOpen ? 'rotate-180 text-white' : 'text-[#0F172A]'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 text-white/90 leading-relaxed text-[15px]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
