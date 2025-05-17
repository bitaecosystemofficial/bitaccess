
export const SwapABI = [
  // Core swap functions
  "function getAmountOut(address tokenIn, address tokenOut, uint256 amountIn) view returns (uint256)",
  "function swap(address tokenIn, address tokenOut, uint256 amountIn, uint256 minAmountOut, address to) external returns (uint256)",
  
  // Liquidity functions
  "function addLiquidity(address tokenA, address tokenB, uint256 amountA, uint256 amountB) external returns (uint256)",
  "function removeLiquidity(address tokenA, address tokenB, uint256 liquidity) external returns (uint256, uint256)",
  
  // View functions
  "function getPairInfo(address tokenA, address tokenB) view returns (uint256 reserveA, uint256 reserveB, uint256 totalLiquidity)",
  "function swapFee() view returns (uint256)",
  "function isAllowedToken(address token) view returns (bool)",
  "function BIT() view returns (address)",
  "function BNB() view returns (address)",
  "function USDT() view returns (address)",
  "function FEE_DENOMINATOR() view returns (uint256)",
  
  // Events
  "event Swap(address indexed sender, address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOut, uint256 timestamp)",
  "event LiquidityAdded(address indexed provider, address tokenA, address tokenB, uint256 amountA, uint256 amountB, uint256 liquidity)",
  "event LiquidityRemoved(address indexed provider, address tokenA, address tokenB, uint256 amountA, uint256 amountB, uint256 liquidity)",
  "event SwapFeeUpdated(uint256 newFee)"
];
