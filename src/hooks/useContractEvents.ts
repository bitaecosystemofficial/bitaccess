
import { useEffect, useState } from 'react';
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
        // Subscribe to Staking events
        await stakingService.subscribeToStakingEvents((event) => {
          setLatestStakingEvent({
            type: event.event,
            data: event.args,
            timestamp: Date.now()
          });
          console.log('New staking event:', event);
        });

        // Subscribe to Airdrop events with the new interface
        await airdropService.subscribeToAirdropEvents({
          onTaskCompleted: (user, taskId) => {
            setLatestAirdropEvent({
              type: 'TaskCompleted',
              data: { user, taskId },
              timestamp: Date.now()
            });
            console.log('New airdrop task completed event:', { user, taskId });
          },
          onTokensClaimed: (user, amount) => {
            setLatestAirdropEvent({
              type: 'TokensClaimed',
              data: { user, amount },
              timestamp: Date.now()
            });
            console.log('New airdrop tokens claimed event:', { user, amount });
          }
        });
      } catch (error) {
        console.error('Error setting up event listeners:', error);
      }
    };

    setupEventListeners();

    // Cleanup on unmount
    return () => {
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
