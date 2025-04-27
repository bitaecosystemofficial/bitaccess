
export const SpinWheelABI = [
  "function spin() external returns (uint256)",
  "function getUserLastSpin(address user) view returns (uint256)",
  "function getTotalSpins() view returns (uint256)",
  "function getDailySpins() view returns (uint256)",
  "function getCooldownPeriod() view returns (uint256)",
  "event PrizeClaimed(address indexed user, uint256 indexed prizeId, uint256 amount)"
];
