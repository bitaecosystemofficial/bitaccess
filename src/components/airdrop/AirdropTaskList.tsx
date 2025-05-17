import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Facebook, Twitter, Youtube, Send, Check, ArrowUpRight } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { AirdropTask, UserStatus } from "@/hooks/useAirdrop";

interface AirdropTaskListProps {
  tasks: AirdropTask[];
  userStatus: UserStatus;
  isSubmitting: number | null;
  isClaiming: boolean;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  completeTask: (taskId: number, code: string) => Promise<void>;
  claimRewards: () => Promise<void>;
  selectedTask: AirdropTask | null;
  setSelectedTask: (task: AirdropTask | null) => void;
}

const AirdropTaskList = ({
  tasks,
  userStatus,
  isSubmitting,
  isClaiming,
  verificationCode,
  setVerificationCode,
  completeTask,
  claimRewards,
  selectedTask,
  setSelectedTask
}: AirdropTaskListProps) => {
  const { isConnected, connectWallet, address } = useWallet();
  
  const getTaskIcon = (icon: string) => {
    switch (icon) {
      case 'twitter':
        return <Twitter className="h-6 w-6" />;
      case 'facebook':
        return <Facebook className="h-6 w-6" />;
      case 'youtube':
        return <Youtube className="h-6 w-6" />;
      case 'send':
        return <Send className="h-6 w-6" />;
      default:
        return <Check className="h-6 w-6" />;
    }
  };
  
  const progressPercent = tasks.length > 0 ? (userStatus.completedTasks / tasks.length * 100) : 0;
  
  const handleTaskClick = (task: AirdropTask) => {
    if (!task.completed) {
      setSelectedTask(task);
    } else {
      window.open(task.url, '_blank');
    }
  };
  
  const handleSubmit = () => {
    if (selectedTask) {
      completeTask(selectedTask.id, verificationCode);
    }
  };
  
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Card className="max-w-md w-full p-8 bg-bitaccess-black-light border border-bitaccess-gold/20">
          <h2 className="text-xl font-semibold text-center text-white mb-4">Connect Wallet to View Tasks</h2>
          <p className="text-gray-400 text-center mb-6">
            Connect your wallet to participate in the airdrop and complete tasks to earn BIT tokens.
          </p>
          <div className="flex justify-center">
            <Button
              onClick={connectWallet}
              className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium"
            >
              Connect Wallet
            </Button>
          </div>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">User Dashboard</h2>
        <p className="text-gray-400">
          Welcome back, {address?.substring(0, 6)}...{address?.substring(address.length - 4)}!
        </p>
      </div>
      
      <Card className="bg-bitaccess-black-light border border-bitaccess-gold/20 p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-1">Task Progress</h3>
            <p className="text-gray-400 text-sm">
              Complete all {tasks.length} tasks to claim your BIT tokens
            </p>
          </div>
          <div className="bg-bitaccess-black rounded-lg p-3 border border-bitaccess-gold/10 mt-4 md:mt-0">
            <p className="text-sm text-gray-400">Estimated Reward:</p>
            <p className="text-xl font-bold text-bitaccess-gold">{userStatus.pendingReward} BIT</p>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Progress</span>
            <span className="text-white font-medium">
              {userStatus.completedTasks}/{tasks.length} Tasks ({Math.round(progressPercent)}%)
            </span>
          </div>
          <Progress 
            value={progressPercent} 
            className="h-3 bg-gray-800"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {tasks.map(task => (
            <div 
              key={task.id}
              className={`p-4 rounded-lg border flex items-center justify-between cursor-pointer transition-colors
                ${task.completed 
                  ? 'bg-green-900/20 border-green-600/30'
                  : 'bg-bitaccess-black border-gray-700 hover:border-bitaccess-gold/40'}`}
              onClick={() => handleTaskClick(task)}
            >
              <div className="flex items-center">
                <div className={`rounded-full p-2 mr-4
                  ${task.completed ? 'bg-green-900/30 text-green-500' : 'bg-gray-800 text-gray-400'}`}>
                  {getTaskIcon(task.icon)}
                </div>
                <div>
                  <h4 className="text-white font-medium">{task.title}</h4>
                  <p className="text-sm text-gray-400">Reward: {task.reward} BIT</p>
                </div>
              </div>
              
              <div className="flex items-center">
                {task.completed ? (
                  <span className="flex items-center text-green-500">
                    <Check className="h-5 w-5 mr-1" />
                    <span className="hidden md:inline">Completed</span>
                  </span>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-bitaccess-gold border border-bitaccess-gold/30"
                  >
                    Complete <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Button
            onClick={claimRewards}
            disabled={!userStatus.eligible || userStatus.hasClaimed || isClaiming || tasks.length === 0}
            size="lg"
            className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium px-8 w-full md:w-auto"
          >
            {isClaiming 
              ? 'Processing...' 
              : userStatus.hasClaimed 
                ? 'Already Claimed' 
                : userStatus.eligible 
                  ? 'Claim BIT Rewards' 
                  : 'Complete All Tasks First'}
          </Button>
        </div>
      </Card>
      
      <Dialog open={!!selectedTask} onOpenChange={(open) => !open && setSelectedTask(null)}>
        <DialogContent className="bg-bitaccess-black-light border-bitaccess-gold/20 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              {selectedTask?.title}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Complete this task to earn {selectedTask?.reward} BIT tokens
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-4 bg-bitaccess-black rounded-lg border border-gray-800 mb-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400">Task URL:</span>
              <a 
                href={selectedTask?.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-bitaccess-gold text-sm hover:underline flex items-center"
              >
                Visit {selectedTask?.icon.charAt(0).toUpperCase() + selectedTask?.icon.slice(1)}
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </a>
            </div>
            
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-400">
              <li>Visit the link above to complete the social media task</li>
              <li>Follow/Subscribe to our channel</li>
              <li>Find the unique verification code in our pinned post</li>
              <li>Enter the code below to verify completion</li>
            </ol>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="verification-code" className="text-sm text-gray-400">
                Enter verification code:
              </label>
              <Input
                id="verification-code"
                placeholder="Enter the code from our post"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="bg-bitaccess-black border-gray-700 focus:border-bitaccess-gold/50 mt-1"
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setSelectedTask(null)}
                className="border-gray-700 text-gray-400"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!verificationCode || isSubmitting === selectedTask?.id}
                className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium"
              >
                {isSubmitting === selectedTask?.id ? 'Verifying...' : 'Verify Task'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AirdropTaskList;
