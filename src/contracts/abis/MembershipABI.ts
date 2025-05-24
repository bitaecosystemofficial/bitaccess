
export const MEMBERSHIP_ABI = [
  // Read functions
  "function getUserSubscription(address user) external view returns (tuple(uint8 mType, uint256 startDate, uint256 endDate, address referrer, bool claimedRewards))",
  "function getUserReferrals(address user) external view returns (address[])",
  "function isSubscribed(address user) external view returns (bool)",
  "function getTotalStats() external view returns (uint256 deposits, uint256 withdrawals, uint256 subscribers, uint256 activeSubs)",
  "function getReferralEarnings(address referrer) external view returns (uint256)",
  "function getActiveSubscribersCount() external view returns (uint256)",
  "function getTotalReferralEarnings() external view returns (uint256)",
  "function getAvailableEarnings(address user) external view returns (uint256)",
  "function getReferralsByLevel(address referrer, uint256 level) external view returns (address[])",
  "function getReferralEarningsHistory(address referrer) external view returns (tuple(address referrer, address user, uint256 level, uint256 amount, uint256 timestamp)[])",
  "function getUserSubscriptionHistory(address user) external view returns (tuple(address user, uint8 mType, uint256 amount, uint256 timestamp)[])",
  "function getReferralEarningsByLevel(address referrer, uint256 level) external view returns (tuple(address referrer, address user, uint256 level, uint256 amount, uint256 timestamp)[])",
  "function membershipPlans(uint8 mType) external view returns (uint256 price, uint256 duration, uint256 btcbReward, uint256 usdtReward, uint256 bnbReward, uint256 bitReward)",
  "function bitRate() external view returns (uint256)",
  "function getMembershipCard(address user) external view returns (tuple(string cardNumber, uint256 expiryDate, bool isActive, uint8 membershipType))",
  "function getCardStatus(address user) external view returns (bool)",
  "function activateCard(address user) external returns (bool)",
  "function deactivateCard(address user) external returns (bool)",
  
  // Write functions
  "function subscribe(uint8 mType, address referrer) external",
  "function withdrawAllRewards() external",
  "function withdrawEarnings() external",
  "function setBitRate(uint256 newRate) external",
  "function withdrawFunds(address token, uint256 amount) external",
  "function updateTokenAddresses(address _usdt, address _btcb, address _bnb, address _bit) external",
  "function updateMembershipPlan(uint8 mType, uint256 price, uint256 duration, uint256 btcbReward, uint256 usdtReward, uint256 bnbReward, uint256 bitRewardInUsdt) external",
  "function claimMembershipRewards() external returns (bool)",
  "function extendMembership(uint256 duration) external returns (bool)",
  
  // Events
  "event Subscribed(address indexed user, uint8 mType, address referrer, uint256 amount)",
  "event RewardsClaimed(address indexed user, uint256 btcbAmount, uint256 usdtAmount, uint256 bnbAmount, uint256 bitAmount)",
  "event ReferralEarned(address indexed referrer, address indexed user, uint256 level, uint256 amount)",
  "event EarningsWithdrawn(address indexed user, uint256 amount)",
  "event FundsWithdrawn(address indexed owner, address token, uint256 amount)",
  "event BitRateUpdated(uint256 newRate)",
  "event RewardsDistributed(address indexed user, uint256 btcbAmount, uint256 usdtAmount, uint256 bnbAmount, uint256 bitAmount)",
  "event CardActivated(address indexed user, string cardNumber)",
  "event CardDeactivated(address indexed user, string cardNumber)",
  "event MembershipExtended(address indexed user, uint256 newExpiryDate)"
];
