
import { ethers } from "ethers";
import { BaseContractService } from "./BaseContractService";
import { MEMBERSHIP_ABI } from "../contracts/abis/MembershipABI";
import { contractAddresses } from "../constants/contracts";

class MembershipServiceClass extends BaseContractService {
  // Add the missing getContract method
  private async getContract(address: string, abi: any, withSigner = false) {
    try {
      if (withSigner) {
        // Ensure we have a signer first
        const signer = await this.ensureSigner();
        const contract = new ethers.Contract(address, abi, signer);
        return contract;
      } else {
        // Read-only contract using provider
        const contract = new ethers.Contract(address, abi, this.provider);
        return contract;
      }
    } catch (error) {
      console.error("Error getting contract:", error);
      throw error;
    }
  }

  async getMembershipContract(withSigner = true) {
    return this.getContract(contractAddresses.membership, MEMBERSHIP_ABI, withSigner);
  }

  async subscribe(membershipType: number, referrer: string) {
    const contract = await this.getMembershipContract();
    const tx = await contract.subscribe(membershipType, referrer);
    return await tx.wait();
  }

  async claimRewards() {
    const contract = await this.getMembershipContract();
    const tx = await contract.claimRewards();
    return await tx.wait();
  }

  async getUserSubscription(address: string) {
    const contract = await this.getMembershipContract(false);
    const subscription = await contract.getUserSubscription(address);
    return {
      mType: subscription.mType,
      startDate: new Date(subscription.startDate.toNumber() * 1000),
      endDate: new Date(subscription.endDate.toNumber() * 1000),
      referrer: subscription.referrer,
      claimedRewards: subscription.claimedRewards
    };
  }

  async getUserReferrals(address: string) {
    const contract = await this.getMembershipContract(false);
    return await contract.getUserReferrals(address);
  }

  async isSubscribed(address: string) {
    const contract = await this.getMembershipContract(false);
    return await contract.isSubscribed(address);
  }

  async getTotalStats() {
    const contract = await this.getMembershipContract(false);
    const stats = await contract.getTotalStats();
    return {
      deposits: ethers.utils.formatUnits(stats.deposits, 6), // USDT has 6 decimals
      withdrawals: ethers.utils.formatUnits(stats.withdrawals, 6),
      subscribers: stats.subscribers.toNumber(),
      activeSubscriptions: stats.activeSubs.toNumber()
    };
  }

  async getReferralEarnings(address: string) {
    const contract = await this.getMembershipContract(false);
    const earnings = await contract.getReferralEarnings(address);
    return ethers.utils.formatUnits(earnings, 6); // USDT has 6 decimals
  }

  async getActiveSubscribersCount() {
    const contract = await this.getMembershipContract(false);
    const count = await contract.getActiveSubscribersCount();
    return count.toNumber();
  }

  async getTotalReferralEarnings() {
    const contract = await this.getMembershipContract(false);
    const earnings = await contract.getTotalReferralEarnings();
    return ethers.utils.formatUnits(earnings, 6); // USDT has 6 decimals
  }

  async subscribeToMembershipEvents(callback: (event: any) => void) {
    const contract = await this.getMembershipContract(false);
    
    // Subscribe to Subscribed events
    contract.on("Subscribed", (user, mType, referrer, amount, event) => {
      callback({
        event: "Subscribed",
        args: { user, mType, referrer, amount: ethers.utils.formatUnits(amount, 6) },
        transaction: event.transactionHash
      });
    });
    
    // Subscribe to RewardsClaimed events
    contract.on("RewardsClaimed", (user, totalValue, event) => {
      callback({
        event: "RewardsClaimed",
        args: { user, totalValue: ethers.utils.formatUnits(totalValue, 6) },
        transaction: event.transactionHash
      });
    });
    
    // Subscribe to ReferralEarned events
    contract.on("ReferralEarned", (referrer, user, level, amount, event) => {
      callback({
        event: "ReferralEarned",
        args: { 
          referrer, 
          user, 
          level: level.toNumber(),
          amount: ethers.utils.formatUnits(amount, 6)
        },
        transaction: event.transactionHash
      });
    });
    
    // Store the contract in eventSubscriptions map for cleanup
    this.eventSubscriptions.set('membership', contract);
  }

  cleanup() {
    super.cleanup('membership');
  }
}

export const membershipService = new MembershipServiceClass();
