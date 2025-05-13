
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
  
  // Custom BitAccess Token Functions (if they exist)
  "function getCirculatingSupply() view returns (uint256)",
  "function getBurnedTokens() view returns (uint256)",
  "function getTokenomicsData() view returns (uint256[10])"
];
