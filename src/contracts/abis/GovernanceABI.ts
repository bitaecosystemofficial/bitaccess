
export const GOVERNANCE_ABI = [
  // Read functions
  "function getProposal(uint256 proposalId) view returns (tuple(uint256 id, address creator, string title, string description, uint256 forVotes, uint256 againstVotes, uint256 startTime, uint256 endTime, bool executed, bool canceled))",
  "function getProposalCount() view returns (uint256)",
  "function getActiveProposals() view returns (uint256[])",
  "function getUserVotingPower(address user) view returns (uint256)",
  "function getVoteReceipt(uint256 proposalId, address voter) view returns (bool hasVoted, bool support, uint256 votes)",
  "function getMinimumVotingThreshold() view returns (uint256)",
  "function getTotalVotes() view returns (uint256)",
  "function getQuorum() view returns (uint256)",
  
  // Write functions
  "function createProposal(string title, string description, bytes calldata data) returns (uint256)",
  "function castVote(uint256 proposalId, bool support)",
  "function executeProposal(uint256 proposalId)",
  "function cancelProposal(uint256 proposalId)",
  
  // Events
  "event ProposalCreated(uint256 indexed proposalId, address indexed creator, string title, uint256 startTime, uint256 endTime)",
  "event VoteCast(address indexed voter, uint256 indexed proposalId, bool support, uint256 votes)",
  "event ProposalExecuted(uint256 indexed proposalId)",
  "event ProposalCanceled(uint256 indexed proposalId)"
];
