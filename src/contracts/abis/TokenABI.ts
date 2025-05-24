
export const TokenABI = [
  // ERC20 Standard Interface
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function transfer(address to, uint amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  
  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
  
  // BitAccess Token Functions
  "function getCirculatingSupply() view returns (uint256)",
  "function getBurnedTokens() view returns (uint256)",
  "function getTokenomicsData() view returns (uint256[10])",
  "function getHolders() view returns (uint256)",
  "function getMarketCap() view returns (uint256)",
  "function getPrice() view returns (uint256)",
  "function getLiquidity() view returns (uint256)",
  "function getVolume24h() view returns (uint256)",
  "function getPriceChange24h() view returns (int256)",
  
  // Utility functions
  "function pause() external",
  "function unpause() external",
  "function mint(address to, uint256 amount) external",
  "function burn(uint256 amount) external",
  "function burnFrom(address from, uint256 amount) external"
];
