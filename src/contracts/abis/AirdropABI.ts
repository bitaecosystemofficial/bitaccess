
export const AirdropABI = [
  "function claim() external returns (bool)",
  "function isEligible(address user) view returns (bool)",
  "function getClaimStatus(address user) view returns (bool)",
  "function verifyTasks(address user, uint256 taskId) external returns (bool)",
  "event TokensClaimed(address indexed user, uint256 amount)",
  "event TaskCompleted(address indexed user, uint256 indexed taskId)"
];
