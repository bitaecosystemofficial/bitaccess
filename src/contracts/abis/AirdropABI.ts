
export const AirdropABI = [
  // Core functionality
  "function completeTask(uint256 taskId, bytes32 uniqueCode) external",
  "function claim() external",
  "function hasTaskCompleted(address user, uint256 taskId) view returns (bool)",
  "function getCompletedCount(address user) view returns (uint256)",
  "function calculateReward(address user) view returns (uint256)",
  
  // Admin functions
  "function withdrawUnallocated() external",
  "function extendDeadline(uint256 additionalDays) external",
  
  // View functions
  "function getRemainingAirdrop() view returns (uint256)",
  "function getUserStatus(address user) view returns (uint256 completed, uint256 pendingReward, bool eligible)",
  "function tasks(uint256 taskId) view returns (string url, uint256 reward, bool active)",
  "function totalAirdropAmount() view returns (uint256)",
  "function totalClaimed() view returns (uint256)",
  "function totalParticipants() view returns (uint256)",
  "function claimDeadline() view returns (uint256)",
  "function hasClaimed(address) view returns (bool)",
  
  // Events
  "event TaskCompleted(address indexed user, uint256 taskId)",
  "event TokensClaimed(address indexed user, uint256 amount)"
];
