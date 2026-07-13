import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Mail } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is VertexGrid?',
    answer: 'VertexGrid is an enterprise AI compute platform that simplifies GPU orchestration, distributed model training, inference acceleration, and infrastructure management for organizations building AI-powered solutions.'
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
    question: 'Can VertexGrid scale with growing AI workloads?',
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Heading and Contact Card */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-6 backdrop-blur-sm w-fit"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#0F172A]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                Support & Info
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight mb-10"
            >
              Frequently Asked Questions
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white border-2 border-[#0F172A] rounded-3xl p-6 sm:p-8 shadow-[4px_4px_0_0_rgba(15,23,42,0.1)] mt-auto max-w-[90%] xl:max-w-[85%]"
            >
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">
                Still have a questions?
              </h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Can't find the answer to your question? Send us an email and we'll get back to you as soon as possible!
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#0F172A] text-white font-medium hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-slate-900/20 gap-2 hover:-translate-y-0.5"
              >
                Contact us
              </a>
            </motion.div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  key={index} 
                  className={`rounded-2xl overflow-hidden transition-all duration-300 border-2 border-[#0F172A] ${isOpen ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] -translate-y-1' : 'bg-white hover:shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:bg-slate-50'}`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-6 sm:px-8 py-6 flex items-start sm:items-center justify-between text-left focus:outline-none gap-4 group"
                  >
                    <span className="font-semibold text-lg text-[#0F172A]">
                      {faq.question}
                    </span>
                    <div className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-white border-2 border-[#0F172A] transition-all duration-300 ${isOpen ? 'rotate-180' : 'group-hover:bg-slate-50'}`}>
                      <ChevronDown className="w-5 h-5 text-[#0F172A]" />
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
                        <div className="px-6 sm:px-8 pb-8 pt-2 text-slate-600 leading-relaxed text-[15px]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
