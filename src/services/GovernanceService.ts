
import { ethers } from "ethers";
import { BaseContractService } from "./BaseContractService";
import { GOVERNANCE_ABI } from "../contracts/abis/GovernanceABI";
import { contractAddresses } from "../constants/contracts";

class GovernanceServiceClass extends BaseContractService {
  async getGovernanceContract(withSigner = true) {
    try {
      if (withSigner) {
        // Ensure we have a signer first
        const signer = await this.ensureSigner();
        return new ethers.Contract(contractAddresses.governance, GOVERNANCE_ABI, signer);
      } else {
        // Read-only contract using provider
        return new ethers.Contract(contractAddresses.governance, GOVERNANCE_ABI, this.provider);
      }
    } catch (error) {
      console.error("Error getting governance contract:", error);
      throw error;
    }
  }

  async getProposalCount() {
    const contract = await this.getGovernanceContract(false);
    const count = await contract.getProposalCount();
    return count.toNumber();
  }

  async getProposal(proposalId: number) {
    const contract = await this.getGovernanceContract(false);
    const proposal = await contract.getProposal(proposalId);
    return {
      id: proposal.id.toNumber(),
      creator: proposal.creator,
      title: proposal.title,
      description: proposal.description,
      forVotes: ethers.utils.formatUnits(proposal.forVotes, 18),
      againstVotes: ethers.utils.formatUnits(proposal.againstVotes, 18),
      startTime: proposal.startTime.toNumber() * 1000, // Convert to milliseconds
      endTime: proposal.endTime.toNumber() * 1000, // Convert to milliseconds
      executed: proposal.executed,
      canceled: proposal.canceled
    };
  }

  async getActiveProposals() {
    const contract = await this.getGovernanceContract(false);
    const proposalIds = await contract.getActiveProposals();
    return proposalIds.map((id: ethers.BigNumber) => id.toNumber());
  }

  async getUserVotingPower(address: string) {
    const contract = await this.getGovernanceContract(false);
    const votingPower = await contract.getUserVotingPower(address);
    return ethers.utils.formatUnits(votingPower, 18);
  }

  async createProposal(title: string, description: string, data: string = "0x") {
    const contract = await this.getGovernanceContract();
    const tx = await contract.createProposal(title, description, data);
    return await tx.wait();
  }

  async castVote(proposalId: number, support: boolean) {
    const contract = await this.getGovernanceContract();
    const tx = await contract.castVote(proposalId, support);
    return await tx.wait();
  }

  async executeProposal(proposalId: number) {
    const contract = await this.getGovernanceContract();
    const tx = await contract.executeProposal(proposalId);
    return await tx.wait();
  }

  async getTotalVotes() {
    const contract = await this.getGovernanceContract(false);
    const votes = await contract.getTotalVotes();
    return votes.toNumber();
  }

  async subscribeToGovernanceEvents(callback: (event: any) => void) {
    const contract = await this.getGovernanceContract(false);
    
    // Subscribe to ProposalCreated events
    contract.on("ProposalCreated", (proposalId, creator, title, startTime, endTime, event) => {
      callback({
        event: "ProposalCreated",
        args: { 
          proposalId: proposalId.toNumber(), 
          creator, 
          title,
          startTime: startTime.toNumber() * 1000,
          endTime: endTime.toNumber() * 1000
        },
        transaction: event.transactionHash
      });
    });
    
    // Subscribe to VoteCast events
    contract.on("VoteCast", (voter, proposalId, support, votes, event) => {
      callback({
        event: "VoteCast",
        args: { 
          voter, 
          proposalId: proposalId.toNumber(),
          support,
          votes: ethers.utils.formatUnits(votes, 18)
        },
        transaction: event.transactionHash
      });
    });
    
    // Store the contract in eventSubscriptions map for cleanup
    this.eventSubscriptions.set('governance', contract);
  }

  cleanup() {
    super.cleanup('governance');
  }
}

export const governanceService = new GovernanceServiceClass();
