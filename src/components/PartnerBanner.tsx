import { motion } from 'motion/react';
import { SiDatabricks, SiSnowflake, SiGithub } from 'react-icons/si';

const OpenAIIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
  </svg>
);

export default function PartnerBanner() {
  const partners = [
    {
      name: 'OpenAI',
      text: 'OpenAI',
      icon: <OpenAIIcon className="w-6 h-6 md:w-8 md:h-8 text-[#10A37F]" />
    },
    {
      name: 'Databricks',
      text: 'Databricks',
      icon: <SiDatabricks className="w-6 h-6 md:w-8 md:h-8 text-[#FF3621]" />
    },
    {
      name: 'Snowflake',
      text: 'Snowflake',
      icon: <SiSnowflake className="w-6 h-6 md:w-8 md:h-8 text-[#29B5E8]" />
    },
    {
      name: 'GitHub',
      text: 'GitHub',
      icon: <SiGithub className="w-6 h-6 md:w-8 md:h-8 text-white" />
    }
  ];

  // Duplicate the array to create a seamless infinite loop
  const duplicatedPartners = [...partners, ...partners, ...partners]; // Added an extra spread so it loops smoothly even with fewer items

  return (
    <div className="w-full bg-[#0B1120] border-y border-white/5 py-3 overflow-hidden relative z-20 flex mt-4 sm:mt-6 lg:mt-8">
      
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
              className="group flex items-center transition-all duration-500 cursor-pointer relative"
            >
              {/* Glow effect behind the logo on hover */}
              <div className="absolute inset-0 bg-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              
              <div className="flex items-center gap-3 relative z-10 transition-all duration-500 group-hover:scale-110 drop-shadow-lg px-8 py-2 text-slate-300 hover:text-white">
                {partner.icon}
                {partner.text && (
                  <span className="font-sans font-extrabold text-xl md:text-2xl tracking-widest">
                    {partner.text}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
