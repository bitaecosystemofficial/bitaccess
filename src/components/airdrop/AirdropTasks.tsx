import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useWallet } from "@/contexts/WalletContext";
import { contractService } from "@/services/ContractService"; // Now properly imported
import { toast } from "@/hooks/use-toast";

interface AirdropTasksProps {
  tasks: {
    twitter: boolean;
    telegram: boolean;
    newsletter: boolean;
    share: boolean;
  };
  handleTaskComplete: (task: 'twitter' | 'telegram' | 'newsletter' | 'share') => void;
  isConnected: boolean;
}

const taskLinks = {
  twitter: "https://twitter.com/BitAccessOfficial",
  telegram: "https://t.me/BitAccessOfficial",
  newsletter: "https://bitaccess.com/newsletter",
  share: "https://twitter.com/intent/tweet?text=Join%20the%20BitAccess%20Airdrop%20now!%20%23BitAccess%20%23Airdrop"
};

const taskIds = {
  twitter: 0,
  telegram: 1,
  newsletter: 2,
  share: 3
};

const AirdropTasks = ({ tasks, handleTaskComplete, isConnected }: AirdropTasksProps) => {
  const { address, connectWallet } = useWallet();
  const [verifying, setVerifying] = useState<string | null>(null);

  const handleTaskClick = (task: keyof typeof taskLinks) => {
    window.open(taskLinks[task], '_blank');
  };

  const handleVerifyClick = async (task: keyof typeof taskLinks) => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    
    setVerifying(task);
    try {
      // Verify task on the blockchain
      const taskId = taskIds[task];
      if (address) {
        const result = await contractService.verifyAirdropTask(address, taskId);
        console.log(`Task ${task} verification transaction:`, result);
        
        // Call the local state update handler
        handleTaskComplete(task);
        
        toast({
          title: "Task Verified",
          description: `${task.charAt(0).toUpperCase() + task.slice(1)} task successfully verified on the blockchain.`,
        });
      }
    } catch (error) {
      console.error(`Error verifying ${task} task:`, error);
      toast({
        title: "Verification Failed",
        description: error instanceof Error ? error.message : `Failed to verify ${task} task.`,
        variant: "destructive",
      });
    } finally {
      setVerifying(null);
    }
  };

  return (
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
      
      <Card className="bg-bitaccess-black p-6 rounded-lg border border-bitaccess-gold/10">
        <h4 className="font-medium text-white mb-4">Your Airdrop Status</h4>
        <CardContent className="p-0 space-y-3">
          <TaskProgress label="Twitter Task" completed={tasks.twitter} />
          <TaskProgress label="Telegram Task" completed={tasks.telegram} />
          <TaskProgress label="Newsletter" completed={tasks.newsletter} />
          <TaskProgress label="Share Proof" completed={tasks.share} />
          
          {isConnected && (
            <div className="mt-6 grid grid-cols-2 gap-4">
              <VerificationButton 
                task="twitter"
                completed={tasks.twitter}
                onClick={() => handleTaskClick('twitter')}
                onVerify={() => handleVerifyClick('twitter')}
                isVerifying={verifying === "twitter"}
              />
              
              <VerificationButton 
                task="telegram"
                completed={tasks.telegram}
                onClick={() => handleTaskClick('telegram')}
                onVerify={() => handleVerifyClick('telegram')}
                isVerifying={verifying === "telegram"}
              />
              
              <VerificationButton 
                task="newsletter"
                completed={tasks.newsletter}
                onClick={() => handleTaskClick('newsletter')}
                onVerify={() => handleVerifyClick('newsletter')}
                isVerifying={verifying === "newsletter"}
              />
              
              <VerificationButton 
                task="share"
                completed={tasks.share}
                onClick={() => handleTaskClick('share')}
                onVerify={() => handleVerifyClick('share')}
                isVerifying={verifying === "share"}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

interface TaskProgressProps {
  label: string;
  completed: boolean;
}

const TaskProgress = ({ label, completed }: TaskProgressProps) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm text-gray-400">{label}</span>
      <span className={`text-sm ${completed ? 'text-green-500' : 'text-red-500'}`}>
        {completed ? 'Completed' : 'Not Completed'}
      </span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div 
        className={`${completed ? 'bg-green-500' : 'bg-red-500'} h-2 rounded-full`} 
        style={{ width: completed ? '100%' : '0%' }}
      />
    </div>
  </div>
);

interface VerificationButtonProps {
  task: string;
  completed: boolean;
  onClick: () => void;
  onVerify: () => void;
  isVerifying: boolean;
}

const VerificationButton = ({ task, completed, onClick, onVerify, isVerifying }: VerificationButtonProps) => (
  <div className="flex flex-col gap-2">
    <Button 
      onClick={onClick}
      className="bg-transparent border border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10"
    >
      Visit {task.charAt(0).toUpperCase() + task.slice(1)}
      <ArrowUpRight className="ml-1 h-4 w-4" />
    </Button>
    <Button 
      onClick={onVerify}
      disabled={completed || isVerifying}
      className="bg-transparent border border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10"
    >
      {completed ? (
        `${task.charAt(0).toUpperCase() + task.slice(1)} Verified`
      ) : isVerifying ? (
        "Verifying..."
      ) : (
        `Verify ${task.charAt(0).toUpperCase() + task.slice(1)}`
      )}
      {completed && <Check className="ml-1 h-4 w-4" />}
    </Button>
  </div>
);

export default AirdropTasks;
