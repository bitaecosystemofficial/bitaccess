// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Welcome is Ownable {
    mapping(address => bool) public hasVisited;
    mapping(address => uint256) public visitCount;
    mapping(address => uint256) public lastVisit;
    
    uint256 public totalVisitors;
    
    event VisitRecorded(address indexed user, uint256 visitNumber, uint256 timestamp);
    
    constructor() Ownable(msg.sender) {}
    
    function recordVisit() external {
        if (!hasVisited[msg.sender]) {
            hasVisited[msg.sender] = true;
            totalVisitors++;
        }
        
        visitCount[msg.sender]++;
        lastVisit[msg.sender] = block.timestamp;
        
        emit VisitRecorded(msg.sender, visitCount[msg.sender], block.timestamp);
    }
    
    function getVisitInfo(address user) external view returns (
        bool visited,
        uint256 visits,
        uint256 lastVisitTime
    ) {
        return (hasVisited[user], visitCount[user], lastVisit[user]);
    }
    
    function getTotalVisitors() external view returns (uint256) {
        return totalVisitors;
    }
}
