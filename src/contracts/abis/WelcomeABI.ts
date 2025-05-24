
export const WELCOME_ABI = [
  // Welcome and onboarding functions
  "function recordWelcomeVisit(address user) external returns (bool)",
  "function getUserOnboardingStatus(address user) external view returns (tuple(bool hasVisited, bool hasConnectedWallet, bool hasSubscribed, bool hasCompletedTour))",
  "function updateOnboardingStep(address user, uint8 step) external returns (bool)",
  "function getWelcomeMessage() external view returns (string)",
  "function getAffiliateLink(address user) external view returns (string)",
  "function registerAffiliate(address affiliate, string referralCode) external returns (bool)",
  "function getAffiliateStats(address affiliate) external view returns (tuple(uint256 totalReferrals, uint256 totalEarnings, uint256 activeReferrals))",
  
  // Welcome rewards
  "function claimWelcomeBonus(address user) external returns (bool)",
  "function getWelcomeBonusAmount() external view returns (uint256)",
  "function isEligibleForWelcomeBonus(address user) external view returns (bool)",
  
  // Events
  "event WelcomeVisitRecorded(address indexed user, uint256 timestamp)",
  "event OnboardingStepCompleted(address indexed user, uint8 step)",
  "event WelcomeBonusClaimed(address indexed user, uint256 amount)",
  "event AffiliateRegistered(address indexed affiliate, string referralCode)"
];
