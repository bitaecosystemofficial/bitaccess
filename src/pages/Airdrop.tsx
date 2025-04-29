
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import AirdropTasks from "@/components/airdrop/AirdropTasks";
import AirdropInfo from "@/components/airdrop/AirdropInfo";
import AirdropTimer from "@/components/airdrop/AirdropTimer";
import AirdropClaim from "@/components/airdrop/AirdropClaim";
import { useAirdropData } from "@/utils/airdrop/airdropHooks";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import { contractService } from "@/services/ContractService";

const Airdrop = () => {
  const airdropData = useAirdropData();
  const { isConnected, address } = useWallet();
  
  const [tasks, setTasks] = useState({
    twitter: false,
    telegram: false,
    newsletter: false,
    share: false
  });
  
  const [isLoading, setIsLoading] = useState(true);

  // Fetch task status from blockchain when wallet connects
  useEffect(() => {
    const fetchTaskStatus = async () => {
      if (!isConnected || !address) return;
      
      setIsLoading(true);
      try {
        // In a real implementation, these would be actual contract calls
        // Simulate fetching task statuses from blockchain with a delay
        setTimeout(async () => {
          try {
            const taskStatuses = {
              twitter: await contractService.getAirdropContract().then(
                contract => contract.getTaskStatus(address, 0)
              ).catch(() => false),
              telegram: await contractService.getAirdropContract().then(
                contract => contract.getTaskStatus(address, 1)
              ).catch(() => false),
              newsletter: await contractService.getAirdropContract().then(
                contract => contract.getTaskStatus(address, 2)
              ).catch(() => false),
              share: await contractService.getAirdropContract().then(
                contract => contract.getTaskStatus(address, 3)
              ).catch(() => false)
            };
            
            setTasks(taskStatuses);
          } catch (error) {
            console.error("Error fetching task status:", error);
            // Fallback to mock data for demo
            setTasks({
              twitter: Math.random() > 0.5,
              telegram: Math.random() > 0.5, 
              newsletter: Math.random() > 0.7,
              share: Math.random() > 0.8
            });
          } finally {
            setIsLoading(false);
          }
        }, 1000);
      } catch (error) {
        console.error("Error fetching task status:", error);
        setIsLoading(false);
      }
    };
    
    fetchTaskStatus();
  }, [isConnected, address]);

  const handleTaskComplete = (task: 'twitter' | 'telegram' | 'newsletter' | 'share') => {
    setTasks(prev => ({ ...prev, [task]: true }));
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
            {isLoading && isConnected ? (
              <div className="text-center py-6">
                <p className="text-bitaccess-gold">Loading your airdrop tasks...</p>
              </div>
            ) : (
              <AirdropTasks 
                tasks={tasks}
                handleTaskComplete={handleTaskComplete}
                isConnected={isConnected}
              />
            )}
            <AirdropClaim />
            
            <div className="mt-6 text-center text-sm text-gray-400">
              <p>
                Running on Binance Smart Chain (BSC) | View contract on{" "}
                <a
                  href={`https://bscscan.com/address/${airdropData.userAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bitaccess-gold hover:underline"
                >
                  BscScan
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Airdrop;
