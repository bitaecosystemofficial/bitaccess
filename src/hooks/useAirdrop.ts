
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { airdropService } from '@/services/AirdropService';
import { useWallet } from '@/contexts/WalletContext';
import { toast } from '@/hooks/use-toast';

export interface AirdropTask {
  id: number;
  url: string;
  reward: string;
  active: boolean;
  completed?: boolean;
  title: string;
  icon: string;
}

export interface AirdropInfo {
  totalAmount: string;
  totalClaimed: string;
  participants: number;
  deadline: Date;
  remaining: string;
  percentClaimed: number;
}

export interface UserStatus {
  completedTasks: number;
  pendingReward: string;
  eligible: boolean;
  hasClaimed: boolean;
}

export const useAirdrop = () => {
  const { address, isConnected } = useWallet();
  const [isLoading, setIsLoading] = useState(true);
  const [airdropInfo, setAirdropInfo] = useState<AirdropInfo | null>(null);
  const [tasks, setTasks] = useState<AirdropTask[]>([]);
  const [userStatus, setUserStatus] = useState<UserStatus>({
    completedTasks: 0,
    pendingReward: "0",
    eligible: false,
    hasClaimed: false
  });
  const [isSubmitting, setIsSubmitting] = useState<number | null>(null);
  const [isClaiming, setIsClaiming] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  // Define task titles and icons based on contract data
  const taskMetadata = [
    { id: 1, title: "Follow on Twitter", icon: "twitter", platform: "Twitter" },
    { id: 2, title: "Join Telegram", icon: "send", platform: "Telegram" },
    { id: 3, title: "Like Facebook Page", icon: "facebook", platform: "Facebook" },
    { id: 4, title: "Subscribe YouTube", icon: "youtube", platform: "YouTube" }
  ];

  // Fetch airdrop data
  const fetchAirdropData = useCallback(async () => {
    setIsLoading(true);
    try {
      const info = await airdropService.getAirdropInfo();
      const taskDetails = await airdropService.getTaskDetails();
      
      // Calculate percentage claimed
      const totalAmount = parseFloat(info.totalAmount);
      const claimed = parseFloat(info.totalClaimed);
      const percentClaimed = totalAmount > 0 ? (claimed / totalAmount) * 100 : 0;
      
      // Combine task details with metadata
      const enhancedTasks = taskDetails.map(task => {
        const metadata = taskMetadata.find(m => m.id === task.id) || 
          { title: `Task ${task.id}`, icon: "check-circle", platform: "Platform" };
        
        return {
          ...task,
          title: `${metadata.platform}: ${metadata.title}`,
          icon: metadata.icon,
          completed: false
        };
      });
      
      setAirdropInfo({
        ...info,
        percentClaimed
      });
      setTasks(enhancedTasks);
      
      // If wallet is connected, get user status
      if (isConnected && address) {
        await fetchUserStatus();
      }
    } catch (error) {
      console.error("Error fetching airdrop data:", error);
      toast({
        title: "Error",
        description: "Failed to load airdrop information. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, address]);
  
  // Fetch user-specific status
  const fetchUserStatus = useCallback(async () => {
    if (!address) return;
    
    try {
      const status = await airdropService.getUserStatus(address);
      const hasClaimed = await airdropService.hasClaimed(address);
      
      // Update task completion status
      const updatedTasks = await Promise.all(tasks.map(async (task) => {
        const completed = await airdropService.hasTaskCompleted(address, task.id);
        return { ...task, completed };
      }));
      
      setUserStatus({
        ...status,
        hasClaimed
      });
      
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error fetching user status:", error);
    }
  }, [address, tasks]);
  
  // Complete a task
  const completeTask = async (taskId: number, code: string) => {
    if (!isConnected || !address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(taskId);
    try {
      await airdropService.completeTask(taskId, code);
      
      toast({
        title: "Task Completed!",
        description: `You've successfully completed task #${taskId}`,
      });
      
      // Refresh user status
      await fetchUserStatus();
      setVerificationCode("");
      setSelectedTask(null);
    } catch (error: any) {
      console.error("Error completing task:", error);
      toast({
        title: "Task Verification Failed",
        description: error.message || "Failed to verify task. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(null);
    }
  };
  
  // Claim rewards
  const claimRewards = async () => {
    if (!isConnected || !address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first.",
        variant: "destructive"
      });
      return;
    }
    
    setIsClaiming(true);
    try {
      const tx = await airdropService.claimAirdrop();
      
      toast({
        title: "Rewards Claimed!",
        description: `You've successfully claimed ${userStatus.pendingReward} BIT tokens.`,
      });
      
      // Refresh user status and airdrop info
      await fetchAirdropData();
    } catch (error: any) {
      console.error("Error claiming rewards:", error);
      toast({
        title: "Claim Failed",
        description: error.message || "Failed to claim rewards. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsClaiming(false);
    }
  };

  useEffect(() => {
    fetchAirdropData();
  }, [fetchAirdropData]);
  
  useEffect(() => {
    if (isConnected && address) {
      fetchUserStatus();
    }
  }, [isConnected, address, fetchUserStatus]);

  return {
    isLoading,
    airdropInfo,
    tasks,
    userStatus,
    isSubmitting,
    isClaiming,
    verificationCode,
    setVerificationCode,
    completeTask,
    claimRewards,
    refreshData: fetchAirdropData
  };
};
