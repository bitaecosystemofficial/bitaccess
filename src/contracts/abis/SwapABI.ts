
export const SwapABI = [
  // Core swap functions
  "function getAmountOut(address tokenIn, address tokenOut, uint256 amountIn) view returns (uint256)",
  "function swap(address tokenIn, address tokenOut, uint256 amountIn, uint256 minAmountOut, address to) external returns (uint256)",
  "function getLiquidity(address token) view returns (uint256)",
  "function getSwapFee() view returns (uint256)",
  "function getTokenBalance(address token) view returns (uint256)",
  "function getPairInfo(address tokenA, address tokenB) view returns (tuple(uint256 reserveA, uint256 reserveB, uint256 totalLiquidity))",
  "function addLiquidity(address tokenA, address tokenB, uint256 amountA, uint256 amountB) external returns (uint256)",
  "function removeLiquidity(address tokenA, address tokenB, uint256 liquidity) external returns (uint256, uint256)",
  
  // Events
  "event Swap(address indexed sender, address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOut, uint256 timestamp)",
  "event LiquidityAdded(address indexed provider, address tokenA, address tokenB, uint256 amountA, uint256 amountB)",
  "event LiquidityRemoved(address indexed provider, address tokenA, address tokenB, uint256 amountA, uint256 amountB)"
];
