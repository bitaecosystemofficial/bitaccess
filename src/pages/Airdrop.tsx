import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import AirdropTaskList from "@/components/airdrop/AirdropTaskList";
import AirdropCountdown from "@/components/airdrop/AirdropCountdown";
import AirdropClaim from "@/components/airdrop/AirdropClaim";
import AirdropHero from "@/components/airdrop/AirdropHero";
import WalletConnectPrompt from "@/components/ui/wallet-connect-prompt";
import { useAirdropData } from "@/utils/airdrop/airdropHooks";
import { useWallet } from "@/contexts/WalletContext";
import { contractAddresses } from "@/constants/contracts"; // Added missing import

const Airdrop = () => {
  const { airdropData, updateTaskCompletionStatus } = useAirdropData();
  const { isConnected } = useWallet();
  
  // Calculate if all tasks are completed and eligibility percentage
  const isAllTasksCompleted = airdropData.tasks.every(task => task.completed);
  const completedTasks = airdropData.tasks.filter(task => task.completed).length;
  const eligibilityPercentage = Math.floor((completedTasks / airdropData.tasks.length) * 100);

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
              Running on Binance Smart Chain (BSC) | Contract address: {contractAddresses.airdrop.substring(0, 6)}...{contractAddresses.airdrop.substring(contractAddresses.airdrop.length - 4)}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Airdrop;
