// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Staking is Ownable, ReentrancyGuard {
    IERC20 public bitToken;
    
    struct StakeInfo {
        uint256 amount;
        uint256 startTime;
        uint256 lastClaimTime;
        uint256 tier; // 0: Bronze, 1: Silver, 2: Gold, 3: Diamond
    }
    
    struct TierInfo {
        uint256 minAmount;
        uint256 apy; // Annual Percentage Yield (in basis points, e.g., 1000 = 10%)
        uint256 lockPeriod;
    }
    
    mapping(address => StakeInfo) public stakes;
    mapping(uint256 => TierInfo) public tiers;
    
    uint256 public totalStaked;
    uint256 public totalRewardsDistributed;
    
    event Staked(address indexed user, uint256 amount, uint256 tier);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    
    constructor(address _bitToken) Ownable(msg.sender) {
        bitToken = IERC20(_bitToken);
        
        // Initialize tiers
        tiers[0] = TierInfo(100 * 10**18, 1000, 30 days); // Bronze: 100 BIT, 10% APY, 30 days
        tiers[1] = TierInfo(1000 * 10**18, 1500, 60 days); // Silver: 1000 BIT, 15% APY, 60 days
        tiers[2] = TierInfo(10000 * 10**18, 2000, 90 days); // Gold: 10000 BIT, 20% APY, 90 days
        tiers[3] = TierInfo(100000 * 10**18, 3000, 180 days); // Diamond: 100000 BIT, 30% APY, 180 days
    }
    
    function stake(uint256 amount, uint256 tier) external nonReentrant {
        require(amount > 0, "Amount must be > 0");
        require(tier < 4, "Invalid tier");
        require(amount >= tiers[tier].minAmount, "Amount below tier minimum");
        require(stakes[msg.sender].amount == 0, "Already staking");
        
        require(bitToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        stakes[msg.sender] = StakeInfo({
            amount: amount,
            startTime: block.timestamp,
            lastClaimTime: block.timestamp,
            tier: tier
        });
        
        totalStaked += amount;
        
        emit Staked(msg.sender, amount, tier);
    }
    
    function unstake() external nonReentrant {
        StakeInfo storage stakeInfo = stakes[msg.sender];
        require(stakeInfo.amount > 0, "No stake found");
        
        TierInfo memory tierInfo = tiers[stakeInfo.tier];
        require(block.timestamp >= stakeInfo.startTime + tierInfo.lockPeriod, "Lock period not ended");
        
        uint256 rewards = calculateRewards(msg.sender);
        uint256 totalAmount = stakeInfo.amount + rewards;
        
        totalStaked -= stakeInfo.amount;
        totalRewardsDistributed += rewards;
        
        delete stakes[msg.sender];
        
        require(bitToken.transfer(msg.sender, totalAmount), "Transfer failed");
        
        emit Unstaked(msg.sender, stakeInfo.amount);
        if (rewards > 0) {
            emit RewardsClaimed(msg.sender, rewards);
        }
    }
    
    function claimRewards() external nonReentrant {
        require(stakes[msg.sender].amount > 0, "No stake found");
        
        uint256 rewards = calculateRewards(msg.sender);
        require(rewards > 0, "No rewards to claim");
        
        stakes[msg.sender].lastClaimTime = block.timestamp;
        totalRewardsDistributed += rewards;
        
        require(bitToken.transfer(msg.sender, rewards), "Transfer failed");
        
        emit RewardsClaimed(msg.sender, rewards);
    }
    
    function calculateRewards(address user) public view returns (uint256) {
        StakeInfo memory stakeInfo = stakes[user];
        if (stakeInfo.amount == 0) return 0;
        
        TierInfo memory tierInfo = tiers[stakeInfo.tier];
        uint256 timeStaked = block.timestamp - stakeInfo.lastClaimTime;
        
        // Calculate rewards: (amount * apy * timeStaked) / (365 days * 10000)
        uint256 rewards = (stakeInfo.amount * tierInfo.apy * timeStaked) / (365 days * 10000);
        
        return rewards;
    }
    
    function getStakeInfo(address user) external view returns (
        uint256 amount,
        uint256 startTime,
        uint256 lastClaimTime,
        uint256 tier,
        uint256 pendingRewards
    ) {
        StakeInfo memory stakeInfo = stakes[user];
        return (
            stakeInfo.amount,
            stakeInfo.startTime,
            stakeInfo.lastClaimTime,
            stakeInfo.tier,
            calculateRewards(user)
        );
    }
    
    function getTierInfo(uint256 tier) external view returns (uint256 minAmount, uint256 apy, uint256 lockPeriod) {
        TierInfo memory tierInfo = tiers[tier];
        return (tierInfo.minAmount, tierInfo.apy, tierInfo.lockPeriod);
    }
    
    function getTotalStaked() external view returns (uint256) {
        return totalStaked;
    }
    
    function getTotalRewardsDistributed() external view returns (uint256) {
        return totalRewardsDistributed;
    }
    
    function updateTier(uint256 tier, uint256 minAmount, uint256 apy, uint256 lockPeriod) external onlyOwner {
        require(tier < 4, "Invalid tier");
        tiers[tier] = TierInfo(minAmount, apy, lockPeriod);
    }
}
