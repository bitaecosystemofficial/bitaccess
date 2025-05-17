
export const PresaleABI = [
  // View functions
  "function getCurrentPhase() view returns (uint256)",
  "function getBNBRate() view returns (uint256)",
  "function getUSDTRate() view returns (uint256)",
  "function getAvailableTokens() view returns (uint256)",
  "function getTotalSupply() view returns (uint256)",
  "function getSoftCap() view returns (uint256)",
  "function getHardCap() view returns (uint256)",
  "function getEndTime() view returns (uint256)",
  "function getSoldTokens() view returns (uint256)",
  "function getTotalRaisedBNB() view returns (uint256)",
  "function getTotalRaisedUSDT() view returns (uint256)",
  "function getBNBBonus(uint256 bnbAmount) view returns (uint256)",
  "function getUSDTBonus(uint256 usdtAmount) view returns (uint256)",
  "function getBNBBonusTiers() view returns (tuple(uint256 minAmount, uint256 bonusPercent)[])",
  "function getUSDTBonusTiers() view returns (tuple(uint256 minAmount, uint256 bonusPercent)[])",
  
  // Transaction functions
  "function buyWithBNB() payable returns (bool)",
  "function buyWithUSDT(uint256 usdtAmount) returns (bool)",
  
  // Events
  "event TokensPurchased(address indexed buyer, uint256 amount, uint256 paidAmount, bool isUSDT, uint256 bonus)",
  "event PhaseAdvanced(uint256 indexed phase)",
  "event PresaleEnded(uint256 totalSold, uint256 totalRaisedBNB, uint256 totalRaisedUSDT)",
  "event RatesUpdated(uint256 newBnbRate, uint256 newUsdtRate)"
];
