
export const SwapABI = [
  "function getAmountOut(address tokenIn, address tokenOut, uint256 amountIn) view returns (uint256)",
  "function swap(address tokenIn, address tokenOut, uint256 amountIn, uint256 minAmountOut, address to) external returns (uint256)",
  "function getLiquidity(address token) view returns (uint256)",
  "event Swap(address indexed sender, address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOut)"
];
