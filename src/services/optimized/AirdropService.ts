
import { useCallback } from 'react';
import { contractAddresses } from '@/constants/contracts';
import { AirdropABI } from '@/contracts/abis/AirdropABI';
import { useSmartContract } from '@/hooks/useSmartContract';
import { ethers } from 'ethers';
import { ContractResult } from '@/types/contracts';

export const useAirdropService = () => {
  const { contract, isLoading, error, executeContractCall, isConnected } = useSmartContract({
    contractAddress: contractAddresses.airdrop,
    contractABI: AirdropABI,
  });

  const claimAirdrop = useCallback(async (): Promise<ContractResult> => {
    const result = await executeContractCall<ethers.ContractTransaction>('claim');
    
    return { 
      success: result.success,
      hash: result.result?.hash,
      error: result.error
    };
  }, [executeContractCall]);

  const checkAirdropEligibility = useCallback(async (address: string): Promise<boolean> => {
    const result = await executeContractCall<boolean>('isEligible', address);
    return result.success && result.result === true;
  }, [executeContractCall]);

  const verifyAirdropTask = useCallback(async (address: string, taskId: number): Promise<ContractResult> => {
    const result = await executeContractCall<ethers.ContractTransaction>('verifyTasks', address, taskId);
    
    return { 
      success: result.success,
      hash: result.result?.hash,
      error: result.error
    };
  }, [executeContractCall]);

  const getClaimStatus = useCallback(async (address: string): Promise<boolean> => {
    const result = await executeContractCall<boolean>('getClaimStatus', address);
    return result.success && result.result === true;
  }, [executeContractCall]);

  const getCurrentPhase = useCallback(async (): Promise<number> => {
    const result = await executeContractCall<ethers.BigNumber>('getCurrentPhase');
    return result.success ? result.result?.toNumber() || 0 : 0;
  }, [executeContractCall]);

  const getTaskStatus = useCallback(async (address: string, taskId: number): Promise<boolean> => {
    const result = await executeContractCall<boolean>('getTaskStatus', address, taskId);
    return result.success && result.result === true;
  }, [executeContractCall]);

  return {
    claimAirdrop,
    checkAirdropEligibility,
    verifyAirdropTask,
    getClaimStatus,
    getCurrentPhase,
    getTaskStatus,
    isLoading,
    error,
    isConnected
  };
};
