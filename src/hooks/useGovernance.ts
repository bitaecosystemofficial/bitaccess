
import { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { Proposal, ContractResult } from '@/types/contracts';
import { mockTransaction } from '@/utils/blockchainUtils';

// Mock data for governance proposals
const mockActiveProposals: Proposal[] = [
  {
    id: "prop-001",
    title: "Increase Staking Rewards by 5%",
    description: "This proposal aims to increase the staking rewards from the current 10% APY to 15% APY to incentivize more users to stake their BIT tokens and improve token stability.",
    votes: 354,
    status: "active",
    endTime: Date.now() + 5 * 24 * 60 * 60 * 1000 // 5 days from now
  },
  {
    id: "prop-002",
    title: "Launch BIT on New Exchange",
    description: "This proposal suggests we should expand our token's availability by listing on another major exchange. This would increase liquidity and accessibility for new users.",
    votes: 287,
    status: "active",
    endTime: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days from now
  },
  {
    id: "prop-003",
    title: "Add New Educational Content",
    description: "This proposal recommends allocating resources to create advanced educational content on blockchain technology and cryptocurrency trading strategies.",
    votes: 215,
    status: "pending",
    endTime: Date.now() + 3 * 24 * 60 * 60 * 1000 // 3 days from now
  }
];

const mockPastProposals: Proposal[] = [
  {
    id: "prop-p001",
    title: "Reduce Transaction Fees by 2%",
    description: "The proposal to reduce platform transaction fees from 5% to 3% has been approved and implemented.",
    votes: 425,
    status: "executed",
    endTime: Date.now() - 15 * 24 * 60 * 60 * 1000 // 15 days ago
  },
  {
    id: "prop-p002",
    title: "Add Token Burning Mechanism",
    description: "The proposal to implement a token burning mechanism where 2% of all transaction fees are used to buy back and burn BIT tokens.",
    votes: 378,
    status: "executed",
    endTime: Date.now() - 25 * 24 * 60 * 60 * 1000 // 25 days ago
  },
  {
    id: "prop-p003",
    title: "Community Fund Allocation",
    description: "The proposal to allocate 100,000 BIT tokens to a community development fund for future projects was rejected.",
    votes: 156,
    status: "rejected",
    endTime: Date.now() - 10 * 24 * 60 * 60 * 1000 // 10 days ago
  }
];

export const useGovernance = () => {
  const { isConnected, address, balance } = useWallet();
  const [activeProposals, setActiveProposals] = useState<Proposal[]>(mockActiveProposals);
  const [pastProposals, setPastProposals] = useState<Proposal[]>(mockPastProposals);
  const [userVotingPower, setUserVotingPower] = useState<number>(0);
  const [totalVotes, setTotalVotes] = useState<number>(0);

  // Calculate total votes
  useEffect(() => {
    const activeTotalVotes = activeProposals.reduce((sum, proposal) => sum + proposal.votes, 0);
    const pastTotalVotes = pastProposals.reduce((sum, proposal) => sum + proposal.votes, 0);
    setTotalVotes(activeTotalVotes + pastTotalVotes);
  }, [activeProposals, pastProposals]);

  // Set user voting power based on their token balance
  useEffect(() => {
    if (isConnected && balance > 0) {
      setUserVotingPower(balance);
    } else {
      setUserVotingPower(0);
    }
  }, [isConnected, balance, address]);

  // Create a new proposal
  const createProposal = async (
    title: string,
    description: string
  ): Promise<ContractResult> => {
    try {
      // In a real implementation, this would interact with a smart contract
      const hash = await mockTransaction();
      
      // Add the new proposal to state
      const newProposal: Proposal = {
        id: `prop-${Math.floor(Math.random() * 1000)}`,
        title,
        description,
        votes: 0,
        status: "pending",
        endTime: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days from now
      };
      
      setActiveProposals(prev => [newProposal, ...prev]);
      
      return { success: true, hash };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  };

  // Cast a vote on a proposal
  const castVote = async (
    proposalId: string,
    support: boolean
  ): Promise<ContractResult> => {
    try {
      // In a real implementation, this would interact with a smart contract
      const hash = await mockTransaction();
      
      // Update proposal votes
      setActiveProposals(prevProposals => 
        prevProposals.map(proposal => 
          proposal.id === proposalId
            ? { ...proposal, votes: proposal.votes + 1 }
            : proposal
        )
      );
      
      return { success: true, hash };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  };

  return {
    activeProposals,
    pastProposals,
    userVotingPower,
    totalVotes,
    createProposal,
    castVote
  };
};
