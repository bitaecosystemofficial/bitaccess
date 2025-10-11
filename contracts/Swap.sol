// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Swap is Ownable, ReentrancyGuard {
    IERC20 public bitToken;
    
    mapping(address => uint256) public exchangeRates; // token => rate (tokens per BIT)
    mapping(address => bool) public supportedTokens;
    
    uint256 public totalSwapVolume;
    uint256 public swapFee = 30; // 0.3%
    
    event TokenSwapped(address indexed user, address fromToken, address toToken, uint256 fromAmount, uint256 toAmount);
    event RateUpdated(address indexed token, uint256 newRate);
    
    constructor(address _bitToken) Ownable(msg.sender) {
        bitToken = IERC20(_bitToken);
    }
    
    function swap(address fromToken, address toToken, uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be > 0");
        require(supportedTokens[fromToken] || fromToken == address(bitToken), "From token not supported");
        require(supportedTokens[toToken] || toToken == address(bitToken), "To token not supported");
        require(fromToken != toToken, "Cannot swap same token");
        
        IERC20 from = IERC20(fromToken);
        IERC20 to = IERC20(toToken);
        
        require(from.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        uint256 toAmount = calculateSwapAmount(fromToken, toToken, amount);
        uint256 fee = (toAmount * swapFee) / 10000;
        uint256 finalAmount = toAmount - fee;
        
        require(to.transfer(msg.sender, finalAmount), "Transfer failed");
        
        totalSwapVolume += amount;
        
        emit TokenSwapped(msg.sender, fromToken, toToken, amount, finalAmount);
    }
    
    function calculateSwapAmount(address fromToken, address toToken, uint256 amount) public view returns (uint256) {
        if (fromToken == address(bitToken)) {
            return amount * exchangeRates[toToken];
        } else if (toToken == address(bitToken)) {
            return amount / exchangeRates[fromToken];
        } else {
            uint256 bitAmount = amount / exchangeRates[fromToken];
            return bitAmount * exchangeRates[toToken];
        }
    }
    
    function addSupportedToken(address token, uint256 rate) external onlyOwner {
        supportedTokens[token] = true;
        exchangeRates[token] = rate;
        emit RateUpdated(token, rate);
    }
    
    function updateRate(address token, uint256 newRate) external onlyOwner {
        require(supportedTokens[token], "Token not supported");
        exchangeRates[token] = newRate;
        emit RateUpdated(token, newRate);
    }
    
    function setSwapFee(uint256 newFee) external onlyOwner {
        require(newFee <= 100, "Fee too high"); // Max 1%
        swapFee = newFee;
    }
    
    function withdrawFees(address token, uint256 amount) external onlyOwner {
        IERC20(token).transfer(owner(), amount);
    }
}
