
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import AirdropTaskList from "@/components/airdrop/AirdropTaskList";
import AirdropCountdown from "@/components/airdrop/AirdropCountdown";
import AirdropClaim from "@/components/airdrop/AirdropClaim";
import AirdropHero from "@/components/airdrop/AirdropHero";
import WalletConnectPrompt from "@/components/ui/wallet-connect-prompt";
import { useAirdropData } from "@/utils/airdrop/airdropHooks";
import { useWallet } from "@/contexts/WalletContext";
import { contractAddresses, networkInfo } from "@/constants/contracts";
import { switchNetwork } from "@/utils/blockchainUtils";
import { toast } from "@/hooks/use-toast";

const Airdrop = () => {
  const { airdropData, updateTaskCompletionStatus } = useAirdropData();
  const { isConnected } = useWallet();
  
  // Calculate if all tasks are completed and eligibility percentage
  const isAllTasksCompleted = airdropData.tasks.every(task => task.completed);
  const completedTasks = airdropData.tasks.filter(task => task.completed).length;
  const eligibilityPercentage = Math.floor((completedTasks / airdropData.tasks.length) * 100);

  // Check for correct network on component mount
  useEffect(() => {
    if (isConnected) {
      const checkAndSwitchNetwork = async () => {
        const isCorrectNetwork = await switchNetwork();
        if (!isCorrectNetwork) {
          toast({
            title: "Network Required",
            description: `Please switch to ${networkInfo.name} to participate in the airdrop`,
            variant: "destructive",
          });
        }
      };
      
      checkAndSwitchNetwork();
    }
  }, [isConnected]);

  if (!isConnected) {
    return (
      <Layout>
        <WalletConnectPrompt 
          title="Airdrop Access Required"
          description="Please connect your wallet to participate in the token airdrop"
        />
      </Layout>
    );
  }

  const handleTaskComplete = (taskId: number) => {
    updateTaskCompletionStatus(taskId, true);
  };

  return (
    <Layout>
      <div className="py-12 md:py-20 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <AirdropHero 
            allocation={airdropData.allocation}
            participants={airdropData.participants}
            remainingTokens={airdropData.remainingTokens}
            phase={airdropData.phase}
            totalPhases={airdropData.totalPhases}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AirdropTaskList 
                tasks={airdropData.tasks}
                onTaskComplete={handleTaskComplete}
                isConnected={isConnected}
              />
            </div>
            <div className="space-y-6">
              <AirdropCountdown endTimeInSeconds={airdropData.endTimeInSeconds} />
              <AirdropClaim 
                eligibilityPercentage={eligibilityPercentage} 
                isAllTasksCompleted={isAllTasksCompleted} 
              />
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-400">
            <p>
              Running on BSC Mainnet | Contract: 0xd3bd...469c |{' '}
              <a 
                href="https://binplorer.com/address/0xd3bde17ebd27739cf5505cd58ecf31cb628e469c" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-bitaccess-gold ml-1 hover:underline"
              >
                View on Binexplorer
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Airdrop;
