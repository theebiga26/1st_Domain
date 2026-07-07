import { motion } from 'motion/react';
import { SiNvidia, SiGooglecloud, SiKubernetes, SiPytorch } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { FaAws } from "react-icons/fa";

export default function PartnerBanner() {
  const partners = [
    {
      name: 'NVIDIA',
      icon: <SiNvidia className="w-8 h-8 text-[#76B900]" />,
      text: 'NVIDIA SDK'
    },
    {
      name: 'AWS',
      icon: <FaAws className="w-8 h-8 text-[#FF9900]" />,
      text: 'AWS'
    },
    {
      name: 'Microsoft Azure',
      icon: <VscAzure className="w-8 h-8 text-[#0089D6]" />,
      text: 'Microsoft Azure'
    },
    {
      name: 'Google Cloud',
      icon: <SiGooglecloud className="w-8 h-8 text-[#4285F4]" />,
      text: 'Google Cloud'
    },
    {
      name: 'Kubernetes',
      icon: <SiKubernetes className="w-8 h-8 text-[#326CE5]" />,
      text: 'kubernetes'
    },
    {
      name: 'PyTorch',
      icon: <SiPytorch className="w-8 h-8 text-[#EE4C2C]" />,
      text: 'PyTorch'
    }
  ];

  // Duplicate the array to create a seamless infinite loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <div className="w-full bg-[#0B1120] border-y border-white/5 py-6 overflow-hidden relative z-20 flex">
      
      {/* Label fixed on the left */}
      <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120] to-transparent w-48 z-10 flex items-center pl-4 sm:pl-8">
        <span className="text-slate-400 font-mono text-xs font-bold tracking-[0.2em] uppercase whitespace-nowrap drop-shadow-md">
          Powered By
        </span>
      </div>

      {/* Fade out on the right edge */}
      <div className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-[#0B1120] to-transparent w-32 z-10 pointer-events-none" />

      {/* Marquee Container */}
      <div className="flex items-center overflow-hidden w-full pl-40">
        <motion.div 
          className="flex items-center gap-16 md:gap-24 whitespace-nowrap"
          style={{ width: 'max-content' }}
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30, // Adjust speed here
          }}
        >
          {duplicatedPartners.map((partner, index) => (
            <motion.div
              key={`${partner.name}-${index}`}
              animate={{ y: [-3, 3, -3] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: index * 0.4
              }}
              className="group flex items-center gap-3 transition-all duration-500 cursor-pointer relative"
            >
              {/* Glow effect behind the logo on hover */}
              <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              
              <div className="relative z-10 drop-shadow-md flex items-center justify-center">
                {partner.icon}
              </div>
              {partner.text && (
                <span className="text-white font-bold text-lg tracking-tight relative z-10">
                  {partner.text}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
