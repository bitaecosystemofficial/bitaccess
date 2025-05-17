
import { useState, useEffect, useRef } from "react";
import Layout from "@/components/layout/Layout";
import AirdropHero from "@/components/airdrop/AirdropHero";
import AirdropTaskList from "@/components/airdrop/AirdropTaskList";
import { useAirdrop } from "@/hooks/useAirdrop";
import { useWallet } from "@/contexts/WalletContext";
import WalletConnectPrompt from "@/components/ui/wallet-connect-prompt";
import { Loader } from "lucide-react";

const Airdrop = () => {
  const { isConnected } = useWallet();
  const taskSectionRef = useRef<HTMLDivElement>(null);
  
  const {
    isLoading,
    airdropInfo,
    tasks,
    userStatus,
    isSubmitting,
    isClaiming,
    verificationCode,
    setVerificationCode,
    completeTask,
    claimRewards
  } = useAirdrop();
  
  const scrollToTasks = () => {
    if (taskSectionRef.current) {
      taskSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <Loader className="h-12 w-12 text-bitaccess-gold animate-spin mb-4" />
          <p className="text-gray-400">Loading airdrop information...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero section */}
      <AirdropHero 
        totalAmount={airdropInfo?.totalAmount || "1,000,000"} 
        remaining={airdropInfo?.remaining || "750,000"}
        deadline={airdropInfo?.deadline || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)}
        scrollToTasks={scrollToTasks}
      />
      
      {/* Task section */}
      <div ref={taskSectionRef} className="bg-gradient-to-b from-bitaccess-black to-bitaccess-black-light">
        <AirdropTaskList 
          tasks={tasks}
          userStatus={userStatus}
          isSubmitting={isSubmitting}
          isClaiming={isClaiming}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          completeTask={completeTask}
          claimRewards={claimRewards}
        />
      </div>
      
      {/* Footer */}
      <footer className="bg-bitaccess-black py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img src="/logo.svg" alt="BIT Logo" className="h-10" />
            </div>
            
            <div className="flex space-x-6 mb-6 md:mb-0">
              <a href="https://twitter.com/bitaecosystem" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-bitaccess-gold">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="https://t.me/bitaecosystemofficial" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-bitaccess-gold">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295h-.014l.338-3.999 7.3-6.58c.19-.169-.062-.265-.285-.106l-9.004 5.66-3.9-1.22c-.841-.265-.858-.845.175-1.27l15.355-5.954c.7-.276 1.302.19 1.089 1.004z"></path>
                </svg>
              </a>
              <a href="https://facebook.com/bitaecosystemofficial" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-bitaccess-gold">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                </svg>
              </a>
              <a href="https://youtube.com/@bitaecosystemofficial" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-bitaccess-gold">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                </svg>
              </a>
            </div>
            
            <div className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} BitAccess. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Airdrop;
