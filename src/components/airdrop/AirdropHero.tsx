
import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Countdown from "react-countdown";
import { useWallet } from "@/contexts/WalletContext";

interface AirdropHeroProps {
  totalAmount: string;
  remaining: string;
  deadline: Date;
  scrollToTasks: () => void;
}

const AirdropHero = ({ totalAmount, remaining, deadline, scrollToTasks }: AirdropHeroProps) => {
  const { isConnected, connectWallet } = useWallet();
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  // Countdown renderer
  const countdownRenderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <span>Airdrop ended</span>;
    }
    
    return (
      <div className="flex gap-4 justify-center">
        <div className="flex flex-col items-center">
          <div className="bg-bitaccess-black text-bitaccess-gold text-2xl md:text-4xl font-bold w-16 md:w-20 h-16 md:h-20 rounded-lg flex items-center justify-center border border-bitaccess-gold/30">
            {days}
          </div>
          <span className="text-xs mt-1">Days</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-bitaccess-black text-bitaccess-gold text-2xl md:text-4xl font-bold w-16 md:w-20 h-16 md:h-20 rounded-lg flex items-center justify-center border border-bitaccess-gold/30">
            {hours}
          </div>
          <span className="text-xs mt-1">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-bitaccess-black text-bitaccess-gold text-2xl md:text-4xl font-bold w-16 md:w-20 h-16 md:h-20 rounded-lg flex items-center justify-center border border-bitaccess-gold/30">
            {minutes}
          </div>
          <span className="text-xs mt-1">Minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-bitaccess-black text-bitaccess-gold text-2xl md:text-4xl font-bold w-16 md:w-20 h-16 md:h-20 rounded-lg flex items-center justify-center border border-bitaccess-gold/30">
            {seconds}
          </div>
          <span className="text-xs mt-1">Seconds</span>
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 overflow-hidden"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-bitaccess-black to-bitaccess-black/95 z-0"></div>
      <div className="absolute inset-0 bg-[url('/particles-bg.svg')] bg-repeat z-0 opacity-20"></div>
      
      <div className="container max-w-5xl mx-auto z-10">
        <motion.div variants={item} className="flex flex-col items-center">
          <div className="rounded-full bg-bitaccess-gold/10 p-6 mb-6">
            <img src="/logo.svg" alt="BIT Airdrop Logo" className="w-16 h-16 md:w-24 md:h-24" />
          </div>
        </motion.div>
        
        <motion.h1 variants={item} className="text-4xl md:text-6xl font-bold text-center text-white mb-4">
          <span className="bg-gradient-to-r from-bitaccess-gold to-bitaccess-gold-light text-transparent bg-clip-text">
            BIT Airdrop
          </span>
        </motion.h1>
        
        <motion.p variants={item} className="text-lg md:text-xl text-center text-gray-300 mb-10 max-w-2xl mx-auto">
          Claim your BIT tokens by completing simple social media tasks and joining our community.
        </motion.p>
        
        <motion.div variants={item} className="mb-10">
          <Countdown date={deadline} renderer={countdownRenderer} />
        </motion.div>
        
        <motion.div variants={item} className="grid grid-cols-2 gap-8 md:flex md:justify-center mb-10">
          <div className="rounded-xl bg-bitaccess-black-light border border-bitaccess-gold/20 p-6 flex flex-col items-center">
            <h3 className="text-gray-400 font-medium">Total Airdrop</h3>
            <p className="text-2xl md:text-3xl font-bold text-bitaccess-gold mt-2">{totalAmount} BIT</p>
          </div>
          <div className="rounded-xl bg-bitaccess-black-light border border-bitaccess-gold/20 p-6 flex flex-col items-center">
            <h3 className="text-gray-400 font-medium">Remaining</h3>
            <p className="text-2xl md:text-3xl font-bold text-bitaccess-gold mt-2">{remaining} BIT</p>
          </div>
        </motion.div>
        
        <motion.div variants={item} className="flex justify-center">
          {!isConnected ? (
            <Button
              onClick={connectWallet}
              size="lg"
              className="text-lg bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium px-8"
            >
              Connect Wallet to Participate
            </Button>
          ) : (
            <Button
              onClick={scrollToTasks}
              size="lg"
              className="text-lg bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium px-8"
            >
              View Tasks & Claim Rewards
            </Button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AirdropHero;
