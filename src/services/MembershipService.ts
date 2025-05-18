
import { ethers } from "ethers";
import { BaseContractService } from "./BaseContractService";
import { MEMBERSHIP_ABI } from "../contracts/abis/MembershipABI";
import { contractAddresses } from "../constants/contracts";

export interface ReferralEarning {
  referrer: string;
  user: string;
  level: number;
  amount: string;
  timestamp: Date;
}

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

  async withdrawAllRewards() {
    const contract = await this.getMembershipContract();
    const tx = await contract.withdrawAllRewards();
    return await tx.wait();
  }

  async withdrawEarnings() {
    const contract = await this.getMembershipContract();
    const tx = await contract.withdrawEarnings();
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

  async getReferralsByLevel(address: string, level: number) {
    const contract = await this.getMembershipContract(false);
    return await contract.getReferralsByLevel(address, level);
  }

  async isSubscribed(address: string) {
    const contract = await this.getMembershipContract(false);
    return await contract.isSubscribed(address);
  }

  async getTotalStats() {
    const contract = await this.getMembershipContract(false);
    const stats = await contract.getTotalStats();
    return {
      deposits: ethers.utils.formatUnits(stats.deposits, 18), 
      withdrawals: ethers.utils.formatUnits(stats.withdrawals, 18),
      subscribers: stats.subscribers.toNumber(),
      activeSubscriptions: stats.activeSubs.toNumber()
    };
  }

  async getReferralEarnings(address: string) {
    const contract = await this.getMembershipContract(false);
    const earnings = await contract.getReferralEarnings(address);
    return ethers.utils.formatUnits(earnings, 18); 
  }

  async getAvailableEarnings(address: string) {
    const contract = await this.getMembershipContract(false);
    const earnings = await contract.getAvailableEarnings(address);
    return ethers.utils.formatUnits(earnings, 18);
  }

  async getReferralEarningsHistory(address: string): Promise<ReferralEarning[]> {
    const contract = await this.getMembershipContract(false);
    const history = await contract.getReferralEarningsHistory(address);
    
    return history.map((item: any) => ({
      referrer: item.referrer,
      user: item.user,
      level: item.level.toNumber(),
      amount: ethers.utils.formatUnits(item.amount, 18),
      timestamp: new Date(item.timestamp.toNumber() * 1000)
    }));
  }

  async getActiveSubscribersCount() {
    const contract = await this.getMembershipContract(false);
    const count = await contract.getActiveSubscribersCount();
    return count.toNumber();
  }

  async getTotalReferralEarnings() {
    const contract = await this.getMembershipContract(false);
    const earnings = await contract.getTotalReferralEarnings();
    return ethers.utils.formatUnits(earnings, 18);
  }

  async subscribeToMembershipEvents(callback: (event: any) => void) {
    const contract = await this.getMembershipContract(false);
    
    // Subscribe to Subscribed events
    contract.on("Subscribed", (user, mType, referrer, amount, event) => {
      callback({
        event: "Subscribed",
        args: { 
          user, 
          mType, 
          referrer, 
          amount: ethers.utils.formatUnits(amount, 18) 
        },
        transaction: event.transactionHash
      });
    });
    
    // Subscribe to RewardsClaimed events
    contract.on("RewardsClaimed", (user, btcbAmount, usdtAmount, bnbAmount, bitAmount, event) => {
      callback({
        event: "RewardsClaimed",
        args: { 
          user, 
          btcbAmount: ethers.utils.formatUnits(btcbAmount, 18),
          usdtAmount: ethers.utils.formatUnits(usdtAmount, 18),
          bnbAmount: ethers.utils.formatUnits(bnbAmount, 18),
          bitAmount: ethers.utils.formatUnits(bitAmount, 18)
        },
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
          amount: ethers.utils.formatUnits(amount, 18)
        },
        transaction: event.transactionHash
      });
    });

    // Subscribe to EarningsWithdrawn events
    contract.on("EarningsWithdrawn", (user, amount, event) => {
      callback({
        event: "EarningsWithdrawn",
        args: { 
          user, 
          amount: ethers.utils.formatUnits(amount, 18)
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
