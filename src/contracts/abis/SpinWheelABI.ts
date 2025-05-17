
export const SpinWheelABI = [
  // Core spin wheel functions
  "function spin() external returns (uint256)",
  "function getUserLastSpin(address user) view returns (uint256)",
  "function getTotalSpins() view returns (uint256)",
  "function getDailySpins() view returns (uint256)",
  "function getCooldownPeriod() view returns (uint256)",
  "function getPrizes() view returns (tuple(string name, int256 amount, uint256 probability, bool isFreeSpin, uint256 spinMultiplier)[])",
  "function getWinRate() view returns (uint256)",
  "function getUserPrizes(address user) view returns (tuple(uint256 prizeId, int256 amount, uint256 timestamp, bool isFreeSpin, uint256 spinMultiplier)[])",
  "function canSpin(address user) view returns (bool)",
  "function getFreeSpins(address user) view returns (uint256)",
  "function getSpinMultiplier(address user) view returns (uint256)",
  "function spinCost() view returns (uint256)",
  
  // Events
  "event PrizeClaimed(address indexed user, uint256 indexed prizeId, int256 amount, uint256 timestamp)",
  "event SpinCompleted(address indexed user, uint256 result)",
  "event PrizePoolUpdated(uint256 indexed prizeId, string name, int256 amount, uint256 probability)",
  "event CooldownPeriodUpdated(uint256 period)",
  "event FreeSpinUsed(address indexed user)",
  "event SpinMultiplierApplied(address indexed user, uint256 multiplier)"
];
