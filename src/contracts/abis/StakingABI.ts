
export const StakingABI = [
  // Staking core functions
  "function stake(uint256 amount) external returns (bool)",
  "function unstake(uint256 amount) external returns (bool)",
  "function getStakedBalance(address user) view returns (uint256)",
  "function getRewards(address user) view returns (uint256)",
  "function claimRewards() external returns (bool)",
  "function getTotalStaked() view returns (uint256)",
  "function getAPY() view returns (uint256)",
  "function getMinStakeAmount() view returns (uint256)",
  "function getLockPeriod() view returns (uint256)",
  "function getUserUnlockTime(address user) view returns (uint256)",
  
  // Events
  "event Staked(address indexed user, uint256 amount, uint256 timestamp)",
  "event Unstaked(address indexed user, uint256 amount, uint256 timestamp)",
  "event RewardsClaimed(address indexed user, uint256 amount, uint256 timestamp)",
  "event APYUpdated(uint256 oldRate, uint256 newRate)",
  "event StakingPeriodUpdated(uint256 period)"
];
