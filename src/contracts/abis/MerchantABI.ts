
export const MerchantABI = [
  // Core merchant functions
  "function subscribe(uint256 planId, uint256 duration) external returns (bool)",
  "function getMerchantStatus(address merchant) view returns (uint8)",
  "function getSubscriptionEnd(address merchant) view returns (uint256)",
  "function getPlanDetails(uint256 planId) view returns (tuple(string name, uint256 price, string[] features))",
  "function getAllPlans() view returns (tuple(uint256 id, string name, uint256 price, string[] features)[])",
  "function getTotalMerchants() view returns (uint256)",
  "function getActiveMerchants() view returns (uint256)",
  "function getMerchantsByCategory(string category) view returns (address[])",
  "function extendSubscription(uint256 duration) external returns (bool)",
  "function getMerchantsByType(string storeType) view returns (address[])",
  "function getRecentStores() view returns (tuple(address owner, string name, string category, uint256 joinedAt)[])",
  "function getStoreDetails(address store) view returns (tuple(string name, string description, string category, string[] products, uint256 joinedAt))",
  
  // Events
  "event Subscribed(address indexed merchant, uint256 planId, uint256 duration, uint256 price)",
  "event SubscriptionExtended(address indexed merchant, uint256 duration)",
  "event PlanUpdated(uint256 indexed planId, string name, uint256 price)",
  "event MerchantStatusChanged(address indexed merchant, uint8 status)",
  "event ProductAdded(address indexed merchant, string productName, string category)",
  "event StoreCategoryUpdated(address indexed merchant, string category)"
];
