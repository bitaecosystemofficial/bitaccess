
const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="w-10 h-10 overflow-hidden mr-2">
        <img 
          src="https://github.com/bitaecosystemofficial/BIT-Logo/raw/main/logo.png" 
          alt="Bit Access Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      <span className="font-bold text-xl text-bitaccess-gold">Bit Access Ecosystem</span>
    </div>
  );
};

export default Logo;
