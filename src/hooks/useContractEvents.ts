
import { useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { tokenService } from '@/services/TokenService';
import { stakingService } from '@/services/StakingService';
import { airdropService } from '@/services/AirdropService';
import { useWallet } from '@/contexts/WalletContext';

export const useContractEvents = () => {
  const { isConnected, address } = useWallet();
  const [latestStakingEvent, setLatestStakingEvent] = useState<any>(null);
  const [latestAirdropEvent, setLatestAirdropEvent] = useState<any>(null);
  const [latestTransfer, setLatestTransfer] = useState<any>(null);

  useEffect(() => {
    if (!isConnected || !address) return;

    const setupEventListeners = async () => {
      try {
        // Subscribe to Token transfers
        await tokenService.subscribeToTokenTransfers((from, to, amount) => {
          setLatestTransfer({
            from,
            to,
            amount: ethers.utils.formatEther(amount),
            timestamp: Date.now()
          });
          console.log('New transfer event:', { from, to, amount: ethers.utils.formatEther(amount) });
        });

        // Subscribe to Staking events
        await stakingService.subscribeToStakingEvents((event) => {
          setLatestStakingEvent({
            type: event.event,
            data: event.args,
            timestamp: Date.now()
          });
          console.log('New staking event:', event);
        });

        // Subscribe to Airdrop events with proper object structure
        await airdropService.subscribeToAirdropEvents({
          onTaskCompleted: (user, taskId) => {
            setLatestAirdropEvent({
              type: 'TaskCompleted',
              data: { user, taskId },
              timestamp: Date.now()
            });
            console.log('New airdrop task completed:', { user, taskId });
          },
          onTokensClaimed: (user, amount) => {
            setLatestAirdropEvent({
              type: 'TokensClaimed',
              data: { user, amount },
              timestamp: Date.now()
            });
            console.log('New airdrop tokens claimed:', { user, amount });
          }
        });
      } catch (error) {
        console.error('Error setting up event listeners:', error);
      }
    };

    setupEventListeners();

    // Cleanup on unmount
    return () => {
      tokenService.cleanup();
      stakingService.cleanup();
      airdropService.cleanup();
    };
  }, [isConnected, address]);

  return {
    latestStakingEvent,
    latestAirdropEvent,
    latestTransfer
  };
};
