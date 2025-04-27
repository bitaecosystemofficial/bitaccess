
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import { useAirdropData, claimAirdrop } from "@/utils/airdrop/airdropHooks";
import AirdropTasks from "@/components/airdrop/AirdropTasks";
import AirdropInfo from "@/components/airdrop/AirdropInfo";
import AirdropTimer from "@/components/airdrop/AirdropTimer";

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
      const result = await claimAirdrop();
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
            <AirdropInfo airdropData={airdropData} />
            
            <AirdropTasks 
              tasks={tasks} 
              handleTaskComplete={handleTaskComplete}
              isConnected={isConnected}
            />
            
            <div className="text-center mt-8">
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
              <p>Running on Binance Smart Chain (BSC) | View contract on <a href={`https://bscscan.com/address/${airdropData.userAddress}`} target="_blank" rel="noopener noreferrer" className="text-bitaccess-gold hover:underline">BscScan</a></p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Airdrop;
