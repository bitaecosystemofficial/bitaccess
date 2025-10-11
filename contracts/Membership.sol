// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Membership is Ownable, ReentrancyGuard {
    IERC20 public usdtToken;
    IERC20 public btcbToken;
    IERC20 public bnbToken;
    IERC20 public bitToken;
    
    uint256 public bitRate = 250; // 1 USDT = 250 BIT
    
    struct MembershipPlan {
        uint256 price; // in USDT
        uint256 duration; // in seconds
        uint256 btcbReward;
        uint256 usdtReward;
        uint256 bnbReward;
        uint256 bitReward;
    }
    
    struct Subscription {
        uint8 membershipType;
        uint256 startDate;
        uint256 endDate;
        address referrer;
        bool claimedRewards;
    }
    
    struct MembershipCard {
        string cardNumber;
        uint256 expiryDate;
        bool isActive;
        uint8 membershipType;
    }
    
    struct ReferralEarning {
        address referrer;
        address user;
        uint256 level;
        uint256 amount;
        uint256 timestamp;
    }
    
    mapping(uint8 => MembershipPlan) public membershipPlans;
    mapping(address => Subscription) public subscriptions;
    mapping(address => MembershipCard) public membershipCards;
    mapping(address => address[]) public referrals;
    mapping(address => uint256) public referralEarnings;
    mapping(address => ReferralEarning[]) public referralHistory;
    mapping(address => uint256) public totalDeposits;
    mapping(address => uint256) public totalWithdrawals;
    
    uint256 public totalSubscribers;
    uint256 public activeSubscribers;
    uint256 public totalReferralEarnings;
    
    uint256[] public referralLevels = [10, 5, 3]; // 10%, 5%, 3%
    
    event Subscribed(address indexed user, uint8 membershipType, address referrer, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 btcbAmount, uint256 usdtAmount, uint256 bnbAmount, uint256 bitAmount);
    event ReferralEarned(address indexed referrer, address indexed user, uint256 level, uint256 amount);
    event EarningsWithdrawn(address indexed user, uint256 amount);
    event CardActivated(address indexed user, string cardNumber);
    event CardDeactivated(address indexed user, string cardNumber);
    event MembershipExtended(address indexed user, uint256 newExpiryDate);
    
    constructor(
        address _usdt,
        address _btcb,
        address _bnb,
        address _bit
    ) Ownable(msg.sender) {
        usdtToken = IERC20(_usdt);
        btcbToken = IERC20(_btcb);
        bnbToken = IERC20(_bnb);
        bitToken = IERC20(_bit);
        
        // Initialize membership plans (Basic plan for card activation)
        membershipPlans[0] = MembershipPlan(5 * 10**18, 365 days, 0, 0, 0, 1250 * 10**18); // $5 = 1250 BIT
    }
    
    function subscribe(uint8 membershipType, address referrer) external nonReentrant {
        require(membershipType == 0, "Invalid membership type");
        require(subscriptions[msg.sender].endDate < block.timestamp, "Active subscription exists");
        
        MembershipPlan memory plan = membershipPlans[membershipType];
        require(usdtToken.transferFrom(msg.sender, address(this), plan.price), "Payment failed");
        
        subscriptions[msg.sender] = Subscription({
            membershipType: membershipType,
            startDate: block.timestamp,
            endDate: block.timestamp + plan.duration,
            referrer: referrer,
            claimedRewards: false
        });
        
        // Activate card
        string memory cardNum = generateCardNumber(msg.sender);
        membershipCards[msg.sender] = MembershipCard({
            cardNumber: cardNum,
            expiryDate: block.timestamp + plan.duration,
            isActive: true,
            membershipType: membershipType
        });
        
        totalDeposits[msg.sender] += plan.price;
        totalSubscribers++;
        activeSubscribers++;
        
        // Process referral rewards
        if (referrer != address(0) && referrer != msg.sender) {
            processReferralRewards(referrer, msg.sender, plan.price);
        }
        
        emit Subscribed(msg.sender, membershipType, referrer, plan.price);
        emit CardActivated(msg.sender, cardNum);
    }
    
    function processReferralRewards(address referrer, address user, uint256 amount) private {
        address currentReferrer = referrer;
        
        for (uint256 i = 0; i < referralLevels.length && currentReferrer != address(0); i++) {
            uint256 reward = (amount * referralLevels[i]) / 100;
            referralEarnings[currentReferrer] += reward;
            totalReferralEarnings += reward;
            
            referralHistory[currentReferrer].push(ReferralEarning({
                referrer: currentReferrer,
                user: user,
                level: i + 1,
                amount: reward,
                timestamp: block.timestamp
            }));
            
            if (!hasReferral(currentReferrer, user)) {
                referrals[currentReferrer].push(user);
            }
            
            emit ReferralEarned(currentReferrer, user, i + 1, reward);
            
            currentReferrer = subscriptions[currentReferrer].referrer;
        }
    }
    
    function hasReferral(address referrer, address user) private view returns (bool) {
        address[] memory refs = referrals[referrer];
        for (uint256 i = 0; i < refs.length; i++) {
            if (refs[i] == user) return true;
        }
        return false;
    }
    
    function generateCardNumber(address user) private pure returns (string memory) {
        bytes memory b = abi.encodePacked(user);
        bytes memory cardNum = new bytes(16);
        for (uint256 i = 0; i < 16; i++) {
            cardNum[i] = b[i];
        }
        return string(cardNum);
    }
    
    function claimMembershipRewards() external nonReentrant returns (bool) {
        Subscription storage sub = subscriptions[msg.sender];
        require(sub.endDate >= block.timestamp, "Membership expired");
        require(!sub.claimedRewards, "Already claimed");
        
        MembershipPlan memory plan = membershipPlans[sub.membershipType];
        
        if (plan.bitReward > 0) {
            require(bitToken.transfer(msg.sender, plan.bitReward), "BIT transfer failed");
        }
        
        sub.claimedRewards = true;
        
        emit RewardsClaimed(msg.sender, plan.btcbReward, plan.usdtReward, plan.bnbReward, plan.bitReward);
        return true;
    }
    
    function withdrawEarnings() external nonReentrant {
        uint256 earnings = referralEarnings[msg.sender];
        require(earnings > 0, "No earnings");
        
        referralEarnings[msg.sender] = 0;
        totalWithdrawals[msg.sender] += earnings;
        
        require(usdtToken.transfer(msg.sender, earnings), "Transfer failed");
        
        emit EarningsWithdrawn(msg.sender, earnings);
    }
    
    function extendMembership(uint256 duration) external nonReentrant returns (bool) {
        Subscription storage sub = subscriptions[msg.sender];
        require(sub.endDate > 0, "No subscription");
        
        sub.endDate += duration;
        membershipCards[msg.sender].expiryDate += duration;
        
        emit MembershipExtended(msg.sender, sub.endDate);
        return true;
    }
    
    function getUserSubscription(address user) external view returns (Subscription memory) {
        return subscriptions[user];
    }
    
    function getUserReferrals(address user) external view returns (address[] memory) {
        return referrals[user];
    }
    
    function isSubscribed(address user) external view returns (bool) {
        return subscriptions[user].endDate >= block.timestamp;
    }
    
    function getTotalStats() external view returns (uint256, uint256, uint256, uint256) {
        uint256 totalDep = 0;
        uint256 totalWith = 0;
        // In production, you'd track these properly
        return (totalDep, totalWith, totalSubscribers, activeSubscribers);
    }
    
    function getReferralEarnings(address referrer) external view returns (uint256) {
        return referralEarnings[referrer];
    }
    
    function getAvailableEarnings(address user) external view returns (uint256) {
        return referralEarnings[user];
    }
    
    function getReferralEarningsHistory(address referrer) external view returns (ReferralEarning[] memory) {
        return referralHistory[referrer];
    }
    
    function getMembershipCard(address user) external view returns (MembershipCard memory) {
        return membershipCards[user];
    }
    
    function getCardStatus(address user) external view returns (bool) {
        return membershipCards[user].isActive && membershipCards[user].expiryDate >= block.timestamp;
    }
    
    function activateCard(address user) external onlyOwner returns (bool) {
        membershipCards[user].isActive = true;
        emit CardActivated(user, membershipCards[user].cardNumber);
        return true;
    }
    
    function deactivateCard(address user) external onlyOwner returns (bool) {
        membershipCards[user].isActive = false;
        emit CardDeactivated(user, membershipCards[user].cardNumber);
        return true;
    }
    
    function setBitRate(uint256 newRate) external onlyOwner {
        bitRate = newRate;
    }
    
    function updateTokenAddresses(address _usdt, address _btcb, address _bnb, address _bit) external onlyOwner {
        usdtToken = IERC20(_usdt);
        btcbToken = IERC20(_btcb);
        bnbToken = IERC20(_bnb);
        bitToken = IERC20(_bit);
    }
}
