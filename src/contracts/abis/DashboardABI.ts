
export const DASHBOARD_ABI = [
  // Dashboard specific functions
  "function getUserDashboardData(address user) external view returns (tuple(uint256 totalBalance, uint256 totalEarnings, uint256 totalReferrals, uint256 activeStakes, bool membershipActive, bool merchantActive))",
  "function getTokenBalances(address user) external view returns (tuple(uint256 bit, uint256 dcash, uint256 bnb, uint256 usdt))",
  "function getMembershipOverview(address user) external view returns (tuple(bool isActive, uint8 membershipType, uint256 expiryDate, uint256 daysRemaining))",
  "function getEarningsOverview(address user) external view returns (tuple(uint256 totalEarnings, uint256 availableEarnings, uint256 pendingEarnings, uint256 totalWithdrawn))",
  "function getStakingOverview(address user) external view returns (tuple(uint256 totalStaked, uint256 activeStakes, uint256 totalRewards, uint256 pendingRewards))",
  "function getAirdropOverview(address user) external view returns (tuple(bool isEligible, uint256 claimableAmount, bool hasClaimed, uint256 totalClaimed))",
  "function getActivityFeed(address user) external view returns (tuple(string action, uint256 amount, uint256 timestamp, string status)[])",
  "function getRecommendations(address user) external view returns (string[])",
  
  // Quick actions
  "function quickWithdraw() external returns (bool)",
  "function quickStake(uint256 amount) external returns (bool)",
  "function quickBuyTokens(uint256 amount, address token) external returns (bool)",
  
  // Events
  "event DashboardDataUpdated(address indexed user, uint256 timestamp)",
  "event QuickActionPerformed(address indexed user, string action, uint256 amount)",
  "event RecommendationGenerated(address indexed user, string recommendation)"
];
