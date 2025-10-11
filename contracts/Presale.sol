// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Presale is Ownable, ReentrancyGuard {
    IERC20 public bitToken;
    IERC20 public usdtToken;
    
    uint256 public currentPhase = 1;
    uint256 public bnbRate = 100000; // BIT tokens per BNB
    uint256 public usdtRate = 250; // BIT tokens per USDT
    uint256 public availableTokens;
    uint256 public totalSupply;
    uint256 public softCap = 50000 * 10**18; // 50k USDT
    uint256 public hardCap = 500000 * 10**18; // 500k USDT
    uint256 public endTime;
    uint256 public soldTokens;
    
    mapping(uint256 => uint256) public bnbBonusTiers; // amount => bonus percentage
    mapping(uint256 => uint256) public usdtBonusTiers;
    
    event TokensPurchased(address indexed buyer, uint256 amount, string currency);
    event PhaseChanged(uint256 newPhase);
    
    constructor(address _bitToken, address _usdtToken) Ownable(msg.sender) {
        bitToken = IERC20(_bitToken);
        usdtToken = IERC20(_usdtToken);
        totalSupply = 20_000_000_000 * 10**18; // 20B for presale
        availableTokens = totalSupply;
        endTime = block.timestamp + 180 days;
        
        // Set bonus tiers
        bnbBonusTiers[1 ether] = 5;
        bnbBonusTiers[5 ether] = 10;
        bnbBonusTiers[10 ether] = 15;
        
        usdtBonusTiers[1000 * 10**18] = 5;
        usdtBonusTiers[5000 * 10**18] = 10;
        usdtBonusTiers[10000 * 10**18] = 15;
    }
    
    function buyWithBNB() external payable nonReentrant {
        require(block.timestamp < endTime, "Presale ended");
        require(msg.value > 0, "Invalid BNB amount");
        
        uint256 tokenAmount = msg.value * bnbRate;
        uint256 bonus = calculateBNBBonus(msg.value);
        uint256 totalTokens = tokenAmount + (tokenAmount * bonus / 100);
        
        require(availableTokens >= totalTokens, "Not enough tokens");
        
        availableTokens -= totalTokens;
        soldTokens += totalTokens;
        
        require(bitToken.transfer(msg.sender, totalTokens), "Transfer failed");
        
        emit TokensPurchased(msg.sender, totalTokens, "BNB");
    }
    
    function buyWithUSDT(uint256 amount) external nonReentrant {
        require(block.timestamp < endTime, "Presale ended");
        require(amount > 0, "Invalid USDT amount");
        
        uint256 tokenAmount = amount * usdtRate;
        uint256 bonus = calculateUSDTBonus(amount);
        uint256 totalTokens = tokenAmount + (tokenAmount * bonus / 100);
        
        require(availableTokens >= totalTokens, "Not enough tokens");
        
        require(usdtToken.transferFrom(msg.sender, address(this), amount), "USDT transfer failed");
        
        availableTokens -= totalTokens;
        soldTokens += totalTokens;
        
        require(bitToken.transfer(msg.sender, totalTokens), "Transfer failed");
        
        emit TokensPurchased(msg.sender, totalTokens, "USDT");
    }
    
    function calculateBNBBonus(uint256 amount) public view returns (uint256) {
        if (amount >= 10 ether) return bnbBonusTiers[10 ether];
        if (amount >= 5 ether) return bnbBonusTiers[5 ether];
        if (amount >= 1 ether) return bnbBonusTiers[1 ether];
        return 0;
    }
    
    function calculateUSDTBonus(uint256 amount) public view returns (uint256) {
        if (amount >= 10000 * 10**18) return usdtBonusTiers[10000 * 10**18];
        if (amount >= 5000 * 10**18) return usdtBonusTiers[5000 * 10**18];
        if (amount >= 1000 * 10**18) return usdtBonusTiers[1000 * 10**18];
        return 0;
    }
    
    function getCurrentPhase() external view returns (uint256) {
        return currentPhase;
    }
    
    function getBNBRate() external view returns (uint256) {
        return bnbRate;
    }
    
    function getUSDTRate() external view returns (uint256) {
        return usdtRate;
    }
    
    function getAvailableTokens() external view returns (uint256) {
        return availableTokens;
    }
    
    function getTotalSupply() external view returns (uint256) {
        return totalSupply;
    }
    
    function getSoftCap() external view returns (uint256) {
        return softCap;
    }
    
    function getHardCap() external view returns (uint256) {
        return hardCap;
    }
    
    function getEndTime() external view returns (uint256) {
        return endTime;
    }
    
    function getSoldTokens() external view returns (uint256) {
        return soldTokens;
    }
    
    function getBNBBonusTiers() external view returns (uint256[] memory amounts, uint256[] memory bonuses) {
        amounts = new uint256[](3);
        bonuses = new uint256[](3);
        amounts[0] = 1 ether;
        amounts[1] = 5 ether;
        amounts[2] = 10 ether;
        bonuses[0] = bnbBonusTiers[1 ether];
        bonuses[1] = bnbBonusTiers[5 ether];
        bonuses[2] = bnbBonusTiers[10 ether];
    }
    
    function getUSDTBonusTiers() external view returns (uint256[] memory amounts, uint256[] memory bonuses) {
        amounts = new uint256[](3);
        bonuses = new uint256[](3);
        amounts[0] = 1000 * 10**18;
        amounts[1] = 5000 * 10**18;
        amounts[2] = 10000 * 10**18;
        bonuses[0] = usdtBonusTiers[1000 * 10**18];
        bonuses[1] = usdtBonusTiers[5000 * 10**18];
        bonuses[2] = usdtBonusTiers[10000 * 10**18];
    }
    
    function withdrawFunds() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
        uint256 usdtBalance = usdtToken.balanceOf(address(this));
        if (usdtBalance > 0) {
            usdtToken.transfer(owner(), usdtBalance);
        }
    }
    
    function updateRates(uint256 _bnbRate, uint256 _usdtRate) external onlyOwner {
        bnbRate = _bnbRate;
        usdtRate = _usdtRate;
    }
    
    function setPhase(uint256 _phase) external onlyOwner {
        currentPhase = _phase;
        emit PhaseChanged(_phase);
    }
}
