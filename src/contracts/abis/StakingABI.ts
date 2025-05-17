
export const StakingABI = [
  // Staking core functions
  "function stake(uint256 amount, uint8 tier) external returns (bool)",
  "function unstake(uint256 amount) external returns (bool)",
  "function claimRewards() external returns (bool)",
  
  // View functions
  "function getStakedBalance(address user) view returns (uint256)",
  "function getRewards(address user) view returns (uint256)",
  "function getTotalStaked() view returns (uint256)",
  "function getAPY(address user) view returns (uint256)",
  "function getMinStakeAmount() external pure returns (uint256)",
  "function getLockPeriod(address user) view returns (uint256)",
  "function getUserUnlockTime(address user) view returns (uint256)",
  "function calculateRewards(address user) view returns (uint256)",
  "function stakes(address user) view returns (uint256 amount, uint256 startTime, uint256 lastClaimTime, uint8 tier)",
  "function tierAPY(uint8 tier) view returns (uint256)",
  "function tierDuration(uint8 tier) view returns (uint256)",
  "function totalStaked() view returns (uint256)",
  "function earlyWithdrawalFee() view returns (uint256)",
  
  // Events
  "event Staked(address indexed user, uint256 amount, uint8 tier, uint256 timestamp)",
  "event Unstaked(address indexed user, uint256 amount, uint256 penalty, uint256 timestamp)",
  "event RewardsClaimed(address indexed user, uint256 amount, uint256 timestamp)",
  "event EarlyWithdrawalFeeUpdated(uint256 newFee)",
  "event TierAPYUpdated(uint8 tier, uint256 newAPY)"
];
