
import { useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { contractService } from '@/services/ContractService';
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
        await contractService.subscribeToTokenTransfers((from, to, amount) => {
          setLatestTransfer({
            from,
            to,
            amount: ethers.utils.formatEther(amount),
            timestamp: Date.now()
          });
          console.log('New transfer event:', { from, to, amount: ethers.utils.formatEther(amount) });
        });

        // Subscribe to Staking events
        await contractService.subscribeToStakingEvents((event) => {
          setLatestStakingEvent({
            type: event.event,
            data: event.args,
            timestamp: Date.now()
          });
          console.log('New staking event:', event);
        });

        // Subscribe to Airdrop events
        await contractService.subscribeToAirdropEvents((event) => {
          setLatestAirdropEvent({
            type: event.event,
            data: event.args,
            timestamp: Date.now()
          });
          console.log('New airdrop event:', event);
        });
      } catch (error) {
        console.error('Error setting up event listeners:', error);
      }
    };

    setupEventListeners();

    // Cleanup on unmount
    return () => {
      contractService.cleanup();
    };
  }, [isConnected, address]);

  return {
    latestStakingEvent,
    latestAirdropEvent,
    latestTransfer
  };
};
