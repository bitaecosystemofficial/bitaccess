
export const MEMBERSHIP_ABI = [
  // Read functions
  "function getUserSubscription(address user) external view returns (tuple(uint8 mType, uint256 startDate, uint256 endDate, address referrer, bool claimedRewards))",
  "function getUserReferrals(address user) external view returns (address[])",
  "function isSubscribed(address user) external view returns (bool)",
  "function getTotalStats() external view returns (uint256 deposits, uint256 withdrawals, uint256 subscribers, uint256 activeSubs)",
  "function getReferralEarnings(address referrer) external view returns (uint256)",
  "function getActiveSubscribersCount() external view returns (uint256)",
  "function getTotalReferralEarnings() external view returns (uint256)",
  
  // Write functions
  "function subscribe(uint8 mType, address referrer) external",
  "function claimRewards() external",
  
  // Events
  "event Subscribed(address indexed user, uint8 mType, address referrer, uint256 amount)",
  "event RewardsClaimed(address indexed user, uint256 totalValue)",
  "event ReferralEarned(address indexed referrer, address indexed user, uint256 level, uint256 amount)"
];
