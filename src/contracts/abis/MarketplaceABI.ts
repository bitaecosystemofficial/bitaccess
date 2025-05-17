
export const MARKETPLACE_ABI = [
  // Read functions
  "function getProduct(uint256 productId) view returns (tuple(uint256 id, string name, string description, uint256 price, address seller, uint256 stock, bool active))",
  "function getProductCount() view returns (uint256)",
  "function getSellerProducts(address seller) view returns (uint256[])",
  "function getProductsByCategory(uint256 categoryId) view returns (uint256[])",
  "function getCategories() view returns (tuple(uint256 id, string name, string imageUrl)[])",
  "function getUserPurchases(address buyer) view returns (uint256[])",
  "function getProductSales(uint256 productId) view returns (tuple(address buyer, uint256 amount, uint256 date)[])",
  
  // Write functions
  "function listProduct(string name, string description, uint256 price, uint256 categoryId, uint256 stock) payable returns (uint256)",
  "function updateProduct(uint256 productId, string name, string description, uint256 price, uint256 stock, bool active)",
  "function purchaseProduct(uint256 productId, uint256 quantity) payable",
  "function addProductToFavorites(uint256 productId)",
  "function removeProductFromFavorites(uint256 productId)",
  "function addCategory(string name, string imageUrl) returns (uint256)",
  
  // Events
  "event ProductListed(uint256 indexed productId, address indexed seller, uint256 price, uint256 timestamp)",
  "event ProductUpdated(uint256 indexed productId, uint256 price, uint256 stock, bool active)",
  "event ProductPurchased(uint256 indexed productId, address indexed buyer, address indexed seller, uint256 quantity, uint256 amount, uint256 timestamp)",
  "event ProductAddedToFavorites(address indexed user, uint256 indexed productId)",
  "event CategoryAdded(uint256 indexed categoryId, string name)"
];
