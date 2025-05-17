
import { useState, useEffect, useCallback } from "react";
import { governanceService } from "@/services/GovernanceService";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";

interface Proposal {
  id: string;
  title: string;
  description: string;
  status: "active" | "executed" | "canceled" | "defeated";
  forVotes: string;
  againstVotes: string;
  startTime: number;
  endTime: number;
  creator: string;
  votes: number;
}

export const useGovernance = () => {
  const { isConnected, address } = useWallet();
  const [activeProposals, setActiveProposals] = useState<Proposal[]>([]);
  const [pastProposals, setPastProposals] = useState<Proposal[]>([]);
  const [userVotingPower, setUserVotingPower] = useState("0");
  const [totalVotes, setTotalVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProposals = useCallback(async () => {
    if (!governanceService) return;
    
    setIsLoading(true);
    try {
      // Get active proposal IDs
      const activeIds = await governanceService.getActiveProposals();
      
      // Fetch active proposals
      const activePromises = activeIds.map(async (id: number) => {
        const proposal = await governanceService.getProposal(id);
        return {
          id: id.toString(),
          title: proposal.title,
          description: proposal.description,
          status: "active",
          forVotes: proposal.forVotes,
          againstVotes: proposal.againstVotes,
          startTime: proposal.startTime,
          endTime: proposal.endTime,
          creator: proposal.creator,
          votes: parseFloat(proposal.forVotes) + parseFloat(proposal.againstVotes)
        };
      });
      
      const activeResults = await Promise.all(activePromises);
      setActiveProposals(activeResults);
      
      // Fetch total proposal count
      const count = await governanceService.getProposalCount();
      
      // Fetch past proposals (simple approach - in a real app, this would be paginated)
      const pastIds = Array.from({ length: count }, (_, i) => i + 1)
        .filter(id => !activeIds.includes(id));
      
      const pastPromises = pastIds.slice(0, 10).map(async (id: number) => {
        try {
          const proposal = await governanceService.getProposal(id);
          
          let status: "executed" | "canceled" | "defeated" = "defeated";
          if (proposal.executed) status = "executed";
          else if (proposal.canceled) status = "canceled";
          
          return {
            id: id.toString(),
            title: proposal.title,
            description: proposal.description,
            status,
            forVotes: proposal.forVotes,
            againstVotes: proposal.againstVotes,
            startTime: proposal.startTime,
            endTime: proposal.endTime,
            creator: proposal.creator,
            votes: parseFloat(proposal.forVotes) + parseFloat(proposal.againstVotes)
          };
        } catch (error) {
          console.error(`Error fetching proposal ${id}:`, error);
          return null;
        }
      });
      
      const pastResults = (await Promise.all(pastPromises)).filter(Boolean) as Proposal[];
      setPastProposals(pastResults);
      
      // Get total votes
      const votes = await governanceService.getTotalVotes();
      setTotalVotes(votes);
      
    } catch (error) {
      console.error("Error fetching proposals:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const fetchUserVotingPower = useCallback(async () => {
    if (!isConnected || !address || !governanceService) return;
    
    try {
      const power = await governanceService.getUserVotingPower(address);
      setUserVotingPower(power);
    } catch (error) {
      console.error("Error fetching voting power:", error);
    }
  }, [isConnected, address]);
  
  useEffect(() => {
    fetchProposals();
    fetchUserVotingPower();
    
    // Subscribe to governance events
    const subscribeToEvents = async () => {
      await governanceService.subscribeToGovernanceEvents((event) => {
        console.log("Governance event:", event);
        
        // Refresh proposals on relevant events
        if (["ProposalCreated", "VoteCast", "ProposalExecuted", "ProposalCanceled"].includes(event.event)) {
          fetchProposals();
        }
        
        // Show toast notifications
        if (event.event === "ProposalCreated") {
          toast({
            title: "New Proposal",
            description: `Proposal "${event.args.title}" has been created`
          });
        } else if (event.event === "VoteCast") {
          toast({
            title: "Vote Cast",
            description: `A vote was cast on proposal #${event.args.proposalId}`
          });
        }
      });
    };
    
    subscribeToEvents();
    
    // Refresh data periodically
    const interval = setInterval(() => {
      fetchProposals();
      fetchUserVotingPower();
    }, 60000); // Every minute
    
    return () => {
      clearInterval(interval);
      governanceService.cleanup();
    };
  }, [fetchProposals, fetchUserVotingPower, isConnected, address]);
  
  const createProposal = async (title: string, description: string) => {
    if (!isConnected) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to create a proposal",
        variant: "destructive",
      });
      return { success: false };
    }
    
    try {
      setIsLoading(true);
      const receipt = await governanceService.createProposal(title, description);
      
      toast({
        title: "Proposal Created",
        description: "Your governance proposal has been submitted successfully",
      });
      
      fetchProposals(); // Refresh proposals
      
      return { success: true, receipt };
    } catch (error: any) {
      console.error("Error creating proposal:", error);
      toast({
        title: "Proposal Failed",
        description: error.message || "Failed to create your proposal",
        variant: "destructive",
      });
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };
  
  const castVote = async (proposalId: string, support: boolean) => {
    if (!isConnected) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to vote",
        variant: "destructive",
      });
      return { success: false };
    }
    
    try {
      setIsLoading(true);
      const receipt = await governanceService.castVote(parseInt(proposalId), support);
      
      toast({
        title: "Vote Recorded",
        description: `Your vote has been recorded (${support ? "Support" : "Against"})`,
      });
      
      fetchProposals(); // Refresh proposals
      
      return { success: true, receipt };
    } catch (error: any) {
      console.error("Error casting vote:", error);
      toast({
        title: "Voting Failed",
        description: error.message || "Failed to record your vote",
        variant: "destructive",
      });
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    activeProposals,
    pastProposals,
    userVotingPower,
    totalVotes,
    isLoading,
    createProposal,
    castVote,
    refreshProposals: fetchProposals
  };
};
