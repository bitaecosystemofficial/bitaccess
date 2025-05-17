
import { useState, useEffect } from 'react';
import { contractAddresses } from '@/constants/contracts';
import { airdropService } from '@/services/AirdropService';
import { useWallet } from '@/contexts/WalletContext';

export interface SocialTask {
  id: number;
  name: string;
  description: string;
  icon: string;
  url: string;
  completed: boolean;
}

export interface AirdropData {
  phase: number;
  totalPhases: number;
  allocation: number;
  endTimeInSeconds: number;
  tasks: SocialTask[];
  userAddress: string | null;
  totalClaimed: number;
  remainingTokens: number;
  participants: number;
}

export const useAirdropData = () => {
  const { address } = useWallet();
  const [selectedTask, setSelectedTask] = useState<SocialTask | null>(null);
  const [airdropData, setAirdropData] = useState<AirdropData>({
    phase: 1,
    totalPhases: 3,
    allocation: 500000,
    endTimeInSeconds: Math.floor(Date.now() / 1000) + 100 * 24 * 60 * 60, // 100 days from now
    tasks: [
      { 
        id: 0, 
        name: "Like Facebook Page", 
        description: "Like the official BitAccess Facebook page", 
        icon: "facebook", 
        url: "https://facebook.com/bitaecosystemfficial",
        completed: false 
      },
      { 
        id: 1, 
        name: "Follow Twitter", 
        description: "Follow the official BitAccess Twitter account", 
        icon: "twitter", 
        url: "https://twitter.com/bitaecosystem",
        completed: false 
      },
      { 
        id: 2, 
        name: "Subscribe to YouTube", 
        description: "Subscribe to the BitAccess YouTube channel", 
        icon: "youtube", 
        url: "https://youtube.com/@bitaecosystemofficial",
        completed: false 
      },
      { 
        id: 3, 
        name: "Join Telegram Group", 
        description: "Join the official BitAccess Telegram group", 
        icon: "telegram", 
        url: "https://t.me/bitaecosystemofficial",
        completed: false 
      }
    ],
    userAddress: address || null,
    totalClaimed: 150000,
    remainingTokens: 350000,
    participants: 2500
  });

  // Update task completion status
  const updateTaskCompletionStatus = (taskId: number, completed: boolean) => {
    setAirdropData(prev => ({
      ...prev,
      tasks: prev.tasks.map(task => 
        task.id === taskId ? { ...task, completed } : task
      )
    }));
  };

  // Fetch task status from blockchain when wallet connects
  useEffect(() => {
    if (!address) return;

    const fetchTaskStatus = async () => {
      try {
        const contract = await airdropService.getAirdropContract();
        
        // Update the address in airdrop data
        setAirdropData(prev => ({
          ...prev,
          userAddress: address
        }));

        // Fetch task status for each task
        for (let i = 0; i < airdropData.tasks.length; i++) {
          const isCompleted = await contract.getTaskStatus(address, i).catch(() => false);
          updateTaskCompletionStatus(i, isCompleted);
        }
      } catch (error) {
        console.error("Error fetching task status:", error);
      }
    };

    fetchTaskStatus();
  }, [address]);

  // Subscribe to blockchain events
  useEffect(() => {
    if (!address) return;

    const setupEventListeners = async () => {
      try {
        await airdropService.subscribeToAirdropEvents({
          onTaskCompleted: (user, taskId) => {
            if (user.toLowerCase() === address.toLowerCase()) {
              updateTaskCompletionStatus(taskId, true);
            }
          }
        });
      } catch (error) {
        console.error("Error setting up airdrop event listeners:", error);
      }
    };

    setupEventListeners();

    return () => {
      airdropService.cleanup();
    };
  }, [address]);

  return {
    airdropData,
    selectedTask,
    setSelectedTask,
    updateTaskCompletionStatus
  };
};

export const claimAirdrop = async () => {
  try {
    console.log("Claiming airdrop");
    const tx = await airdropService.claimAirdrop();
    
    return { 
      success: true, 
      hash: tx.transactionHash 
    };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

export const verifyTask = async (taskId: number, walletAddress: string) => {
  try {
    console.log(`Verifying task ${taskId} for wallet ${walletAddress}`);
    
    const tx = await airdropService.verifyAirdropTask(walletAddress, taskId);
    return { 
      success: true,
      hash: tx.transactionHash
    };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};
