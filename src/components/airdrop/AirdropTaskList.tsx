
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, ExternalLink, Facebook, Twitter, Youtube, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import { SocialTask, verifyTask } from "@/utils/airdrop/airdropHooks";

interface AirdropTasksProps {
  tasks: SocialTask[];
  onTaskComplete: (taskId: number) => void;
  isConnected: boolean;
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "facebook": return <Facebook className="h-5 w-5" />;
    case "twitter": return <Twitter className="h-5 w-5" />;
    case "youtube": return <Youtube className="h-5 w-5" />;
    case "telegram": return <MessageCircle className="h-5 w-5" />;
    default: return <ExternalLink className="h-5 w-5" />;
  }
};

const AirdropTaskList = ({ tasks, onTaskComplete, isConnected }: AirdropTasksProps) => {
  const { address, connectWallet } = useWallet();
  const [verifying, setVerifying] = useState<number | null>(null);

  // Calculate completion percentage
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionPercentage = (completedTasks / tasks.length) * 100;

  const handleTaskClick = (task: SocialTask) => {
    window.open(task.url, '_blank');
  };

  const handleVerifyClick = async (task: SocialTask) => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    
    setVerifying(task.id);
    try {
      if (address) {
        const result = await verifyTask(task.id, address);
        
        if (result.success) {
          onTaskComplete(task.id);
          
          // Auto-open the task link in a new tab after successful verification
          window.open(task.url, '_blank');
          
          toast({
            title: "Task Verified",
            description: `${task.name} task successfully verified on the blockchain.`,
          });
        } else {
          toast({
            title: "Verification Failed",
            description: result.error || `Failed to verify ${task.name} task.`,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error(`Error verifying ${task.name} task:`, error);
      toast({
        title: "Verification Failed",
        description: error instanceof Error ? error.message : `Failed to verify ${task.name} task.`,
        variant: "destructive",
      });
    } finally {
      setVerifying(null);
    }
  };

  return (
    <Card className="bg-bitaccess-black p-6 rounded-lg border border-bitaccess-gold/10">
      <h4 className="font-medium text-white mb-4">Complete Tasks</h4>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-400">Task Completion</span>
          <span className="text-sm text-bitaccess-gold">{completedTasks}/{tasks.length} Tasks</span>
        </div>
        <Progress value={completionPercentage} className="h-2 bg-gray-700">
          <div 
            className="h-full bg-bitaccess-gold rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </Progress>
      </div>
      
      <CardContent className="p-0 space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-bitaccess-black-light p-4 rounded-lg border border-bitaccess-gold/5">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="bg-bitaccess-black p-2 rounded-full mr-3">
                  {getIconComponent(task.icon)}
                </div>
                <div>
                  <h5 className="font-medium text-white">{task.name}</h5>
                  <p className="text-sm text-gray-400">{task.description}</p>
                </div>
              </div>
              <div className={`flex h-6 w-6 items-center justify-center rounded-full ${task.completed ? 'bg-green-500' : 'bg-gray-700'}`}>
                {task.completed && <Check className="h-4 w-4 text-white" />}
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <Button 
                onClick={() => handleTaskClick(task)}
                className="flex-1 bg-transparent border border-bitaccess-gold/20 text-bitaccess-gold hover:bg-bitaccess-gold/10"
              >
                Visit
                <ExternalLink className="ml-1 h-4 w-4" />
              </Button>
              
              {!task.completed && (
                <Button 
                  onClick={() => handleVerifyClick(task)}
                  disabled={verifying === task.id}
                  className="flex-1 bg-bitaccess-gold text-bitaccess-black hover:bg-bitaccess-gold-dark"
                >
                  {verifying === task.id ? "Verifying..." : "Verify"}
                  {verifying !== task.id && <Check className="ml-1 h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AirdropTaskList;
