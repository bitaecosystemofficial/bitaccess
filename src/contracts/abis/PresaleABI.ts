
export const PresaleABI = [
  // Core functions
  "function getCurrentPhase() view returns (uint256)",
  "function getTokenPrice() view returns (uint256)",
  "function getAvailableTokens() view returns (uint256)",
  "function getTotalSupply() view returns (uint256)",
  "function getSoftCap() view returns (uint256)",
  "function getHardCap() view returns (uint256)",
  "function getMinPurchase() view returns (uint256)",
  "function getMaxPurchase() view returns (uint256)",
  "function buyTokens(uint256 amount) payable returns (bool)",
  "function getEndTime() view returns (uint256)",
  "function getNextPhasePrice() view returns (uint256)",
  "function getLaunchPrice() view returns (uint256)",
  "function getBonusStructure() view returns (tuple(uint256 minAmount, uint256 bonus)[])",
  "function getSoldTokens() view returns (uint256)",
  
  // Events
  "event TokensPurchased(address indexed buyer, uint256 amount, uint256 price, uint256 bonus)",
  "event PhaseAdvanced(uint256 indexed phase, uint256 newPrice)",
  "event PresaleEnded(uint256 totalSold, uint256 totalRaised)",
  "event BonusUpdated(uint256 minAmount, uint256 bonus)"
];
