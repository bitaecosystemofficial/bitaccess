
export const PresaleABI = [
  "function getCurrentPhase() view returns (uint256)",
  "function getTokenPrice() view returns (uint256)",
  "function getAvailableTokens() view returns (uint256)",
  "function buyTokens(uint256 amount) payable returns (bool)",
  "function getEndTime() view returns (uint256)",
  "event TokensPurchased(address indexed buyer, uint256 amount, uint256 price)"
];
