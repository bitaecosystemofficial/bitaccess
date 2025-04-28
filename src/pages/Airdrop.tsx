
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import AirdropTasks from "@/components/airdrop/AirdropTasks";
import AirdropInfo from "@/components/airdrop/AirdropInfo";
import AirdropTimer from "@/components/airdrop/AirdropTimer";
import AirdropClaim from "@/components/airdrop/AirdropClaim";
import { useAirdropData } from "@/utils/airdrop/airdropHooks";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";

const Airdrop = () => {
  const airdropData = useAirdropData();
  const { isConnected } = useWallet();
  
  const [tasks, setTasks] = useState({
    twitter: false,
    telegram: false,
    newsletter: false,
    share: false
  });

  const handleTaskComplete = (task: 'twitter' | 'telegram' | 'newsletter' | 'share') => {
    setTasks(prev => ({ ...prev, [task]: true }));
    toast({
      title: "Task Completed",
      description: `${task.charAt(0).toUpperCase() + task.slice(1)} task verified successfully.`
    });
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
