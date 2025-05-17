
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center ${className || ''}`}>
      <div className="bg-bitaccess-gold rounded-md w-8 h-8 flex items-center justify-center mr-2">
        <span className="font-bold text-black">BA</span>
      </div>
      <span className="font-bold text-lg text-white">BitAccess</span>
    </div>
  );
};

export default Logo;
