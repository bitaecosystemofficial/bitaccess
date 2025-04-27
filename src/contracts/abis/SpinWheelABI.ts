
export const SpinWheelABI = [
  "function spin() external returns (uint256)",
  "function getLastSpinTime(address user) view returns (uint256)",
  "function canSpin(address user) view returns (bool)",
  "event PrizeWon(address indexed user, uint256 indexed prizeId, uint256 amount)"
];
