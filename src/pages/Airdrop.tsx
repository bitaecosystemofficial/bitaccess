
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import { useAirdropData, claimAirdrop } from "@/utils/airdrop/airdropHooks";

const Airdrop = () => {
  const { isConnected, address, connectWallet } = useWallet();
  const airdropData = useAirdropData();
  const [isLoading, setIsLoading] = useState(false);
  
  // Track task completion
  const [tasks, setTasks] = useState({
    twitter: false,
    telegram: false,
    newsletter: false,
    share: false
  });
  
  // Calculate time remaining
  const calculateTimeRemaining = () => {
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = airdropData.endTimeInSeconds - now;
    
    if (timeLeft <= 0) return "Ended";
    
    const days = Math.floor(timeLeft / (24 * 60 * 60));
    return `${days} days`;
  };

  const handleTaskComplete = (task: 'twitter' | 'telegram' | 'newsletter' | 'share') => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    
    setTasks(prev => ({
      ...prev,
      [task]: true
    }));
    
    toast({
      title: "Task Completed",
      description: `You have completed the ${task} task!`
    });
  };
  
  const handleClaimAirdrop = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    
    const allTasksCompleted = Object.values(tasks).every(task => task);
    if (!allTasksCompleted) {
      toast({
        title: "Tasks Incomplete",
        description: "You must complete all tasks before claiming the airdrop.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await claimAirdrop(address!);
      if (result.success) {
        toast({
          title: "Airdrop Claimed",
          description: "You have successfully claimed your BIT tokens!"
        });
      } else {
        toast({
          title: "Claim Failed",
          description: result.error || "Transaction failed. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="BitAccess Airdrop"
            subtitle="Participate in our token airdrop program and receive free BIT tokens"
            centered
          />
          
          <div className="max-w-3xl mx-auto bg-bitaccess-black-light rounded-xl p-8 border border-bitaccess-gold/20">
            <div className="flex flex-col md:flex-row items-center mb-8">
              <div className="bg-bitaccess-gold/10 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
                <Gift size={40} className="text-bitaccess-gold" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Current Airdrop Phase: {airdropData.phase} of {airdropData.totalPhases}</h3>
                <p className="text-gray-400">
                  Total allocation: {(airdropData.allocation).toLocaleString()} BIT tokens | Ends in: {calculateTimeRemaining()}
                </p>
              </div>
            </div>
            
            <div className="space-y-6 mb-8">
              <div>
                <h4 className="font-medium text-bitaccess-gold mb-2">How to Participate:</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li>Connect your wallet using the button below</li>
                  <li>Complete the required social tasks (Twitter, Telegram, etc.)</li>
                  <li>Refer friends to earn bonus tokens (10% of their allocation)</li>
                  <li>Verify your participation and submit your wallet address</li>
                </ol>
              </div>
              
              <div>
                <h4 className="font-medium text-bitaccess-gold mb-2">Requirements:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Follow BitAccess on Twitter</li>
                  <li>Join our Telegram community</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Share the airdrop announcement (with proof)</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-bitaccess-black p-6 rounded-lg border border-bitaccess-gold/10 mb-8">
              <h4 className="font-medium text-white mb-4">Your Airdrop Status</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Twitter Task</span>
                    <span className={`text-sm ${tasks.twitter ? 'text-green-500' : 'text-red-500'}`}>
                      {tasks.twitter ? 'Completed' : 'Not Completed'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`${tasks.twitter ? 'bg-green-500' : 'bg-red-500'} h-2 rounded-full`} 
                      style={{ width: tasks.twitter ? '100%' : '0%' }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Telegram Task</span>
                    <span className={`text-sm ${tasks.telegram ? 'text-green-500' : 'text-red-500'}`}>
                      {tasks.telegram ? 'Completed' : 'Not Completed'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`${tasks.telegram ? 'bg-green-500' : 'bg-red-500'} h-2 rounded-full`} 
                      style={{ width: tasks.telegram ? '100%' : '0%' }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Newsletter</span>
                    <span className={`text-sm ${tasks.newsletter ? 'text-green-500' : 'text-red-500'}`}>
                      {tasks.newsletter ? 'Completed' : 'Not Completed'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`${tasks.newsletter ? 'bg-green-500' : 'bg-red-500'} h-2 rounded-full`} 
                      style={{ width: tasks.newsletter ? '100%' : '0%' }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Share Proof</span>
                    <span className={`text-sm ${tasks.share ? 'text-green-500' : 'text-red-500'}`}>
                      {tasks.share ? 'Completed' : 'Not Completed'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`${tasks.share ? 'bg-green-500' : 'bg-red-500'} h-2 rounded-full`} 
                      style={{ width: tasks.share ? '100%' : '0%' }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {isConnected && (
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Button 
                    onClick={() => handleTaskComplete('twitter')}
                    disabled={tasks.twitter}
                    className="bg-transparent border border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10"
                  >
                    {tasks.twitter ? 'Twitter Verified' : 'Verify Twitter'}
                  </Button>
                  
                  <Button 
                    onClick={() => handleTaskComplete('telegram')}
                    disabled={tasks.telegram}
                    className="bg-transparent border border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10"
                  >
                    {tasks.telegram ? 'Telegram Verified' : 'Verify Telegram'}
                  </Button>
                  
                  <Button 
                    onClick={() => handleTaskComplete('newsletter')}
                    disabled={tasks.newsletter}
                    className="bg-transparent border border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10"
                  >
                    {tasks.newsletter ? 'Newsletter Verified' : 'Verify Newsletter'}
                  </Button>
                  
                  <Button 
                    onClick={() => handleTaskComplete('share')}
                    disabled={tasks.share}
                    className="bg-transparent border border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10"
                  >
                    {tasks.share ? 'Share Verified' : 'Verify Share'}
                  </Button>
                </div>
              )}
            </div>
            
            <div className="text-center">
              {isConnected ? (
                <Button 
                  onClick={handleClaimAirdrop}
                  disabled={isLoading || !Object.values(tasks).every(task => task)} 
                  size="lg" 
                  className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium"
                >
                  {isLoading ? 'Processing...' : 'Claim Airdrop'}
                </Button>
              ) : (
                <Button 
                  onClick={connectWallet}
                  size="lg" 
                  className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium"
                >
                  Connect Wallet to Participate
                </Button>
              )}
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-400">
              <p>Running on Binance Smart Chain (BSC) | View contract on <a href="https://bscscan.com" target="_blank" rel="noopener noreferrer" className="text-bitaccess-gold hover:underline">BscScan</a></p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Airdrop;
