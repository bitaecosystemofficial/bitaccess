
export const AirdropABI = [
  // Core functionality
  "function claim() external returns (bool)",
  "function isEligible(address user) view returns (bool)",
  "function getClaimStatus(address user) view returns (bool)",
  "function verifyTasks(address user, uint256 taskId) external returns (bool)",
  "function getTaskStatus(address user, uint256 taskId) view returns (bool)",
  "function getCurrentPhase() view returns (uint256)",
  "function getTotalPhases() view returns (uint256)",
  "function getAllocation() view returns (uint256)",
  "function getEndTime() view returns (uint256)",
  "function getParticipants() view returns (uint256)",
  
  // Events
  "event TokensClaimed(address indexed user, uint256 amount, uint256 timestamp)",
  "event TaskCompleted(address indexed user, uint256 indexed taskId, uint256 timestamp)",
  "event PhaseUpdated(uint256 indexed phase, uint256 allocation)",
  "event AirdropEnded(uint256 totalParticipants, uint256 totalDistributed)"
];
