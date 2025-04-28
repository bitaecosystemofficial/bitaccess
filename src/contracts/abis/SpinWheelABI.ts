
export const SpinWheelABI = [
  // Core spin wheel functions
  "function spin() external returns (uint256)",
  "function getUserLastSpin(address user) view returns (uint256)",
  "function getTotalSpins() view returns (uint256)",
  "function getDailySpins() view returns (uint256)",
  "function getCooldownPeriod() view returns (uint256)",
  "function getPrizes() view returns (tuple(string name, uint256 amount, uint256 probability)[])",
  "function getWinRate() view returns (uint256)",
  "function getUserPrizes(address user) view returns (tuple(uint256 prizeId, uint256 amount, uint256 timestamp)[])",
  "function canSpin(address user) view returns (bool)",
  
  // Events
  "event PrizeClaimed(address indexed user, uint256 indexed prizeId, uint256 amount, uint256 timestamp)",
  "event SpinCompleted(address indexed user, uint256 result)",
  "event PrizePoolUpdated(uint256 indexed prizeId, string name, uint256 amount, uint256 probability)",
  "event CooldownPeriodUpdated(uint256 period)"
];
