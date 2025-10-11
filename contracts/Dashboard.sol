// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Dashboard is Ownable {
    struct UserData {
        uint256 totalBalance;
        uint256 stakedAmount;
        uint256 airdropAllocation;
        uint256 referralEarnings;
        bool hasMembership;
        uint256 lastUpdated;
    }
    
    mapping(address => UserData) public userData;
    
    event DataUpdated(address indexed user, uint256 timestamp);
    
    constructor() Ownable(msg.sender) {}
    
    function updateUserData(
        address user,
        uint256 totalBalance,
        uint256 stakedAmount,
        uint256 airdropAllocation,
        uint256 referralEarnings,
        bool hasMembership
    ) external onlyOwner {
        userData[user] = UserData({
            totalBalance: totalBalance,
            stakedAmount: stakedAmount,
            airdropAllocation: airdropAllocation,
            referralEarnings: referralEarnings,
            hasMembership: hasMembership,
            lastUpdated: block.timestamp
        });
        
        emit DataUpdated(user, block.timestamp);
    }
    
    function getUserData(address user) external view returns (UserData memory) {
        return userData[user];
    }
}
