
export const MerchantABI = [
  "function subscribe(uint256 planId, uint256 duration) external returns (bool)",
  "function getMerchantStatus(address merchant) view returns (uint8)",
  "function getSubscriptionEnd(address merchant) view returns (uint256)",
  "event Subscribed(address indexed merchant, uint256 planId, uint256 duration)"
];
