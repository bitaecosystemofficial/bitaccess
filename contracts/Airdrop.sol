// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Airdrop is Ownable, ReentrancyGuard {
    IERC20 public bitToken;
    
    uint256 public currentPhase = 1;
    uint256 public totalAllocated = 5_000_000_000 * 10**18; // 5B BIT
    uint256 public claimedAmount;
    
    struct UserAirdrop {
        bool claimed;
        uint256 amount;
        mapping(uint256 => bool) tasksCompleted;
    }
    
    mapping(address => UserAirdrop) public airdrops;
    mapping(uint256 => uint256) public taskRewards; // taskId => reward amount
    
    event AirdropClaimed(address indexed user, uint256 amount);
    event TaskCompleted(address indexed user, uint256 taskId);
    event TaskVerified(address indexed user, uint256 taskId);
    
    constructor(address _bitToken) Ownable(msg.sender) {
        bitToken = IERC20(_bitToken);
        
        // Initialize task rewards
        taskRewards[1] = 100 * 10**18; // Follow social media
        taskRewards[2] = 150 * 10**18; // Share post
        taskRewards[3] = 200 * 10**18; // Join Telegram
        taskRewards[4] = 250 * 10**18; // Complete KYC
        taskRewards[5] = 300 * 10**18; // Refer friend
    }
    
    function claimAirdrop() external nonReentrant {
        require(!airdrops[msg.sender].claimed, "Already claimed");
        require(airdrops[msg.sender].amount > 0, "No airdrop allocation");
        
        uint256 amount = airdrops[msg.sender].amount;
        airdrops[msg.sender].claimed = true;
        claimedAmount += amount;
        
        require(bitToken.transfer(msg.sender, amount), "Transfer failed");
        
        emit AirdropClaimed(msg.sender, amount);
    }
    
    function verifyTask(address user, uint256 taskId) external onlyOwner {
        require(taskId > 0 && taskId <= 5, "Invalid task");
        require(!airdrops[user].tasksCompleted[taskId], "Task already completed");
        
        airdrops[user].tasksCompleted[taskId] = true;
        airdrops[user].amount += taskRewards[taskId];
        
        emit TaskVerified(user, taskId);
    }
    
    function checkEligibility(address user) external view returns (bool) {
        return airdrops[user].amount > 0 && !airdrops[user].claimed;
    }
    
    function getClaimStatus(address user) external view returns (bool) {
        return airdrops[user].claimed;
    }
    
    function getCurrentPhase() external view returns (uint256) {
        return currentPhase;
    }
    
    function getTaskStatus(address user, uint256 taskId) external view returns (bool) {
        return airdrops[user].tasksCompleted[taskId];
    }
    
    function getUserAirdropAmount(address user) external view returns (uint256) {
        return airdrops[user].amount;
    }
    
    function setPhase(uint256 _phase) external onlyOwner {
        currentPhase = _phase;
    }
    
    function setTaskReward(uint256 taskId, uint256 reward) external onlyOwner {
        taskRewards[taskId] = reward;
    }
    
    function addAirdropAllocation(address[] calldata users, uint256[] calldata amounts) external onlyOwner {
        require(users.length == amounts.length, "Length mismatch");
        
        for (uint256 i = 0; i < users.length; i++) {
            airdrops[users[i]].amount += amounts[i];
        }
    }
}
