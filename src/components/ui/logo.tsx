
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    // Keep the square BA logo for mobile
    return (
      <div className={`flex items-center ${className || ''}`}>
        <div className="bg-bitaccess-gold rounded-md w-8 h-8 flex items-center justify-center mr-2">
          <span className="font-bold text-black">BA</span>
        </div>
        <span className="font-bold text-lg text-bitaccess-gold">BitAccess</span>
      </div>
    );
  }
  
  // Use the circular logo design for desktop view with gold text
  return (
    <div className={`flex items-center ${className || ''}`}>
      <div className="h-10 w-10 mr-2 overflow-hidden">
        <img 
          src="https://github.com/bitaecosystemofficial/BIT-Logo/raw/main/logo.png" 
          alt="BitAccess Logo" 
          className="h-full w-full object-contain"
        />
      </div>
      <span className="font-bold text-xl text-bitaccess-gold">Bit Access Ecosystem</span>
    </div>
  );
};

export default Logo;
