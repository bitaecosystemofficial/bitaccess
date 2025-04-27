
export const StakingABI = [
  "function stake(uint256 amount) external returns (bool)",
  "function unstake(uint256 amount) external returns (bool)",
  "function getStakedBalance(address user) view returns (uint256)",
  "function getRewards(address user) view returns (uint256)",
  "function claimRewards() external returns (bool)",
  "event Staked(address indexed user, uint256 amount)",
  "event Unstaked(address indexed user, uint256 amount)",
  "event RewardsClaimed(address indexed user, uint256 amount)"
];
