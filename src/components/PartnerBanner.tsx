import { motion } from 'motion/react';
import nvidiaLogo from '../assets/logos/powered by icon_1.svg';
import awsLogo from '../assets/logos/powered by icon_2.svg';
import azureLogo from '../assets/logos/powered by icon_3.svg';
import googleCloudLogo from '../assets/logos/powered by icon_4.svg';
import kubernetesLogo from '../assets/logos/powered by icon_5.svg';

export default function PartnerBanner() {
  const partners = [
    {
      name: 'NVIDIA',
      icon: <object data={nvidiaLogo} type="image/svg+xml" aria-label="NVIDIA logo" className="h-8 w-auto object-contain" />,
      text: 'NVIDIA SDK'
    },
    {
      name: 'AWS',
      icon: <object data={awsLogo} type="image/svg+xml" aria-label="AWS logo" className="h-8 w-auto object-contain" />,
      text: 'AWS'
    },
    {
      name: 'Microsoft Azure',
      icon: <object data={azureLogo} type="image/svg+xml" aria-label="Microsoft Azure logo" className="h-8 w-auto object-contain" />,
      text: 'Microsoft Azure'
    },
    {
      name: 'Google Cloud',
      icon: <object data={googleCloudLogo} type="image/svg+xml" aria-label="Google Cloud logo" className="h-8 w-auto object-contain" />,
      text: 'Google Cloud'
    },
    {
      name: 'Kubernetes',
      icon: <object data={kubernetesLogo} type="image/svg+xml" aria-label="Kubernetes logo" className="h-8 w-auto object-contain" />,
      text: 'Kubernetes'
    }
  ];

  // Duplicate the array to create a seamless infinite loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <div className="w-full bg-[#0B1120] border-y border-white/5 py-6 overflow-hidden relative z-20 flex mt-4 sm:mt-6 lg:mt-8">
      
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
        <div 
          className="flex items-center gap-16 md:gap-24 whitespace-nowrap marquee"
          style={{ width: 'max-content' }}
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
        </div>
      </div>
    </div>
  );
}
