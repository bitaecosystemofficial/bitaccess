
import React from 'react';

interface GuideSection {
  title: string;
  content: React.ReactNode;
}

interface Guide {
  title: string;
  lastUpdated: string;
  sections: GuideSection[];
}

// Define the content for each guide
export const guidesContent: Record<string, Guide> = {
  "getting-started": {
    title: "Getting Started with BitAccess",
    lastUpdated: "May 15, 2025",
    sections: [
      {
        title: "What is BitAccess?",
        content: (
          <p>
            BitAccess is a comprehensive blockchain ecosystem designed to bridge the gap between traditional businesses and cryptocurrency adoption. Our platform provides intuitive tools, education, and resources to help businesses and individuals leverage blockchain technology effectively.
          </p>
        )
      },
      {
        title: "Setting Up Your Wallet",
        content: (
          <div>
            <p>Before you can interact with the BitAccess ecosystem, you'll need to set up a compatible wallet:</p>
            <ol className="list-decimal pl-6 mt-4 space-y-2">
              <li>Install MetaMask or another compatible wallet extension on your browser.</li>
              <li>Create a new wallet or import an existing one.</li>
              <li>Add Binance Smart Chain to your networks (Chain ID: 56).</li>
              <li>Fund your wallet with a small amount of BNB for transaction fees.</li>
              <li>Connect your wallet to the BitAccess platform by clicking "Connect Wallet" in the top right corner.</li>
            </ol>
            <p className="mt-4">Once your wallet is set up and connected, you can access all features of the BitAccess ecosystem.</p>
          </div>
        )
      },
      {
        title: "Navigating the BitAccess Ecosystem",
        content: (
          <div>
            <p>The BitAccess ecosystem offers various features:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Token Staking:</strong> Earn passive income by staking your BIT tokens.</li>
              <li><strong>Token Swapping:</strong> Exchange BIT tokens for other cryptocurrencies.</li>
              <li><strong>Marketplace:</strong> Purchase products and services using cryptocurrency.</li>
              <li><strong>Educational Resources:</strong> Learn about blockchain technology and cryptocurrency.</li>
              <li><strong>Community:</strong> Join the BitAccess community to stay updated on news and events.</li>
            </ul>
            <p className="mt-4">Explore each section to discover the full potential of the BitAccess ecosystem.</p>
          </div>
        )
      }
    ]
  },
  "airdrops": {
    title: "How to Participate in Airdrops",
    lastUpdated: "May 20, 2025",
    sections: [
      {
        title: "Understanding BitAccess Airdrops",
        content: (
          <div>
            <p>BitAccess airdrops are a way to distribute BIT tokens to community members for free. These airdrops serve multiple purposes:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Rewarding loyal community members</li>
              <li>Increasing token distribution and decentralization</li>
              <li>Promoting awareness of the BitAccess ecosystem</li>
              <li>Encouraging community participation and engagement</li>
            </ul>
            <p className="mt-4">Airdrops typically occur during specific promotional periods or milestone achievements. Keep an eye on official announcements to stay informed about upcoming airdrops.</p>
          </div>
        )
      },
      {
        title: "Eligibility Requirements",
        content: (
          <div>
            <p>To be eligible for BitAccess airdrops, you typically need to meet certain criteria:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Wallet Connection:</strong> Have a compatible wallet connected to the BitAccess platform</li>
              <li><strong>KYC Verification:</strong> Complete any required KYC (Know Your Customer) verification</li>
              <li><strong>Community Participation:</strong> Be an active member of the BitAccess community</li>
              <li><strong>Task Completion:</strong> Complete specific tasks required for the airdrop</li>
              <li><strong>Token Holdings:</strong> Hold a minimum amount of BIT tokens (for some airdrops)</li>
            </ul>
            <p className="mt-4">Specific requirements vary by airdrop campaign, so always check the official announcement for detailed eligibility criteria.</p>
          </div>
        )
      },
      {
        title: "Step-by-Step Participation Guide",
        content: (
          <div>
            <ol className="list-decimal pl-6 mt-4 space-y-4">
              <li>
                <strong>Connect Your Wallet</strong>
                <p className="mt-1">Navigate to the BitAccess platform and connect your wallet by clicking the "Connect Wallet" button in the top right corner.</p>
              </li>
              <li>
                <strong>Visit the Airdrop Page</strong>
                <p className="mt-1">Go to the "Airdrop" section from the main navigation menu to view currently active airdrops.</p>
              </li>
              <li>
                <strong>Check Eligibility</strong>
                <p className="mt-1">Review the eligibility requirements for the active airdrop and ensure you meet all criteria.</p>
              </li>
              <li>
                <strong>Complete Required Tasks</strong>
                <p className="mt-1">Complete all required tasks listed on the airdrop page. These may include:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Following BitAccess on social media platforms</li>
                  <li>Sharing BitAccess content on your social media</li>
                  <li>Referring friends to join the platform</li>
                  <li>Participating in community discussions</li>
                  <li>Staking BIT tokens for a specified period</li>
                </ul>
              </li>
              <li>
                <strong>Verify Task Completion</strong>
                <p className="mt-1">Submit proof of completed tasks as required. This may involve connecting your social media accounts or providing transaction hashes.</p>
              </li>
              <li>
                <strong>Claim Your Airdrop</strong>
                <p className="mt-1">Once all tasks are verified, click the "Claim" button to receive your airdrop tokens. These will be sent directly to your connected wallet.</p>
              </li>
            </ol>
            <p className="mt-4 text-yellow-400">Important: Always verify airdrop campaigns through official BitAccess channels to avoid scams.</p>
          </div>
        )
      },
      {
        title: "After Receiving Your Airdrop",
        content: (
          <div>
            <p>Once you've received your airdrop tokens, you have several options:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Hold:</strong> Keep your tokens for potential future value appreciation</li>
              <li><strong>Stake:</strong> Stake your tokens to earn additional passive rewards</li>
              <li><strong>Swap:</strong> Exchange your tokens for other cryptocurrencies</li>
              <li><strong>Use:</strong> Spend your tokens in the BitAccess marketplace</li>
            </ul>
            <p className="mt-4">Consider your investment strategy and financial goals when deciding what to do with your airdropped tokens.</p>
          </div>
        )
      }
    ]
  },
  "staking-guide": {
    title: "Staking Guide for Beginners",
    lastUpdated: "May 22, 2025",
    sections: [
      {
        title: "What is Staking?",
        content: (
          <div>
            <p>Staking is a process where you lock up your cryptocurrency tokens to support network operations while earning rewards. In the BitAccess ecosystem, staking serves several purposes:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Supporting the BitAccess network security and operations</li>
              <li>Earning passive income through staking rewards</li>
              <li>Participating in governance decisions (for certain staking tiers)</li>
              <li>Accessing exclusive platform features and benefits</li>
            </ul>
            <p className="mt-4">When you stake your BIT tokens, you're essentially putting your tokens to work while maintaining ownership of them.</p>
          </div>
        )
      },
      {
        title: "Benefits of Staking BIT Tokens",
        content: (
          <div>
            <p>Staking your BIT tokens offers numerous advantages:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Passive Income:</strong> Earn up to 30% APY depending on your staking tier and duration</li>
              <li><strong>Compound Growth:</strong> Option to automatically reinvest rewards for compound returns</li>
              <li><strong>Platform Discounts:</strong> Receive discounts on marketplace purchases and transaction fees</li>
              <li><strong>Governance Rights:</strong> Higher staking tiers grant voting rights on platform proposals</li>
              <li><strong>Exclusive Access:</strong> Unlock premium educational content and early feature access</li>
            </ul>
            <p className="mt-4">The specific benefits you receive depend on your staking tier, which is determined by the amount of BIT tokens staked and the staking duration.</p>
          </div>
        )
      },
      {
        title: "BitAccess Staking Tiers",
        content: (
          <div>
            <p>BitAccess offers multiple staking tiers, each with its own benefits:</p>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border border-gray-700">
                <thead>
                  <tr className="bg-bitaccess-black-light">
                    <th className="px-4 py-2 border-b border-gray-700 text-left">Tier</th>
                    <th className="px-4 py-2 border-b border-gray-700 text-left">Minimum Stake</th>
                    <th className="px-4 py-2 border-b border-gray-700 text-left">Lock Period</th>
                    <th className="px-4 py-2 border-b border-gray-700 text-left">APY</th>
                    <th className="px-4 py-2 border-b border-gray-700 text-left">Benefits</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-700">Bronze</td>
                    <td className="px-4 py-2 border-b border-gray-700">100 BIT</td>
                    <td className="px-4 py-2 border-b border-gray-700">30 days</td>
                    <td className="px-4 py-2 border-b border-gray-700">10%</td>
                    <td className="px-4 py-2 border-b border-gray-700">Basic rewards</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-700">Silver</td>
                    <td className="px-4 py-2 border-b border-gray-700">500 BIT</td>
                    <td className="px-4 py-2 border-b border-gray-700">90 days</td>
                    <td className="px-4 py-2 border-b border-gray-700">15%</td>
                    <td className="px-4 py-2 border-b border-gray-700">5% marketplace discount</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-700">Gold</td>
                    <td className="px-4 py-2 border-b border-gray-700">1,000 BIT</td>
                    <td className="px-4 py-2 border-b border-gray-700">180 days</td>
                    <td className="px-4 py-2 border-b border-gray-700">20%</td>
                    <td className="px-4 py-2 border-b border-gray-700">10% marketplace discount, governance voting</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-700">Platinum</td>
                    <td className="px-4 py-2 border-b border-gray-700">5,000 BIT</td>
                    <td className="px-4 py-2 border-b border-gray-700">365 days</td>
                    <td className="px-4 py-2 border-b border-gray-700">30%</td>
                    <td className="px-4 py-2 border-b border-gray-700">15% marketplace discount, priority governance voting, exclusive content</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">Choose a tier that aligns with your investment goals and token availability.</p>
          </div>
        )
      },
      {
        title: "Step-by-Step Staking Process",
        content: (
          <div>
            <ol className="list-decimal pl-6 mt-4 space-y-4">
              <li>
                <strong>Connect Your Wallet</strong>
                <p className="mt-1">Connect your wallet to the BitAccess platform by clicking the "Connect Wallet" button.</p>
              </li>
              <li>
                <strong>Navigate to Staking Page</strong>
                <p className="mt-1">Go to the "Staking" section from the main navigation menu.</p>
              </li>
              <li>
                <strong>Choose Staking Tier</strong>
                <p className="mt-1">Review the available staking tiers and select one that matches your investment strategy.</p>
              </li>
              <li>
                <strong>Enter Staking Amount</strong>
                <p className="mt-1">Specify how many BIT tokens you want to stake. Ensure your wallet has sufficient balance.</p>
              </li>
              <li>
                <strong>Select Lock Period</strong>
                <p className="mt-1">Choose how long you want to lock your tokens. Longer periods typically offer higher rewards.</p>
              </li>
              <li>
                <strong>Configure Reward Settings</strong>
                <p className="mt-1">Decide whether to automatically reinvest rewards (compound) or receive them as they accrue.</p>
              </li>
              <li>
                <strong>Review and Confirm</strong>
                <p className="mt-1">Double-check all details, including staking amount, lock period, and estimated rewards.</p>
              </li>
              <li>
                <strong>Approve Token Spending</strong>
                <p className="mt-1">If this is your first time staking, you'll need to approve the staking contract to use your tokens.</p>
              </li>
              <li>
                <strong>Stake Your Tokens</strong>
                <p className="mt-1">Confirm the transaction in your wallet and pay the network gas fee.</p>
              </li>
            </ol>
            <p className="mt-4">After completing these steps, your tokens will be staked, and you'll start earning rewards based on your selected tier and lock period.</p>
          </div>
        )
      },
      {
        title: "Managing Your Staked Tokens",
        content: (
          <div>
            <p>Once your tokens are staked, you have several management options:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Monitor Performance:</strong> Track your earned rewards in the staking dashboard</li>
              <li><strong>Claim Rewards:</strong> Withdraw accumulated rewards to your wallet (if not auto-compounding)</li>
              <li><strong>Extend Staking Period:</strong> Increase your lock duration for higher returns</li>
              <li><strong>Add More Tokens:</strong> Increase your staked amount to potentially move up tiers</li>
              <li><strong>Unstake:</strong> Withdraw your tokens after the lock period expires</li>
            </ul>
            <p className="mt-4 text-yellow-400">Important: Early unstaking (before your lock period ends) may incur penalties, typically a percentage of your staked tokens or rewards.</p>
          </div>
        )
      }
    ]
  },
  "token-swap": {
    title: "Using the BIT Token Swap",
    lastUpdated: "May 17, 2025",
    sections: [
      {
        title: "Understanding the BitAccess Token Swap",
        content: (
          <div>
            <p>The BitAccess Token Swap is a feature that allows you to exchange BIT tokens for other cryptocurrencies and vice versa. The swap function operates on:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Binance Smart Chain (BSC) network for low transaction fees</li>
              <li>Automated Market Maker (AMM) model for efficient price discovery</li>
              <li>Liquidity pools that enable instant token exchanges</li>
              <li>Smart contracts that execute trades automatically and securely</li>
            </ul>
            <p className="mt-4">The BitAccess Token Swap offers competitive rates with minimal slippage for supported token pairs.</p>
          </div>
        )
      },
      {
        title: "Supported Tokens and Pairs",
        content: (
          <div>
            <p>The BitAccess Token Swap supports the following tokens and pairs:</p>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border border-gray-700">
                <thead>
                  <tr className="bg-bitaccess-black-light">
                    <th className="px-4 py-2 border-b border-gray-700 text-left">Base Token</th>
                    <th className="px-4 py-2 border-b border-gray-700 text-left">Paired Tokens</th>
                    <th className="px-4 py-2 border-b border-gray-700 text-left">Liquidity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-700">BIT</td>
                    <td className="px-4 py-2 border-b border-gray-700">BNB, USDT, BUSD, ETH, BTCB</td>
                    <td className="px-4 py-2 border-b border-gray-700">High</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-700">BNB</td>
                    <td className="px-4 py-2 border-b border-gray-700">USDT, BUSD, ETH, BTCB</td>
                    <td className="px-4 py-2 border-b border-gray-700">High</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-700">USDT</td>
                    <td className="px-4 py-2 border-b border-gray-700">BUSD, ETH, BTCB</td>
                    <td className="px-4 py-2 border-b border-gray-700">High</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-700">Other BSC tokens</td>
                    <td className="px-4 py-2 border-b border-gray-700">Limited pairs</td>
                    <td className="px-4 py-2 border-b border-gray-700">Varies</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">The platform regularly adds new token pairs based on community demand and liquidity availability.</p>
          </div>
        )
      },
      {
        title: "How to Swap Tokens",
        content: (
          <div>
            <ol className="list-decimal pl-6 mt-4 space-y-4">
              <li>
                <strong>Connect Your Wallet</strong>
                <p className="mt-1">Navigate to the BitAccess platform and connect your wallet by clicking the "Connect Wallet" button.</p>
              </li>
              <li>
                <strong>Access the Swap Feature</strong>
                <p className="mt-1">Go to the "Swap" section from the main navigation menu.</p>
              </li>
              <li>
                <strong>Select Tokens to Swap</strong>
                <p className="mt-1">Choose the token you want to swap from (source) and the token you want to receive (destination).</p>
              </li>
              <li>
                <strong>Enter Amount</strong>
                <p className="mt-1">Specify how much of the source token you want to swap. You can also click "Max" to use your entire balance.</p>
              </li>
              <li>
                <strong>Review Swap Details</strong>
                <p className="mt-1">Review the exchange rate, expected output amount, price impact, and transaction fee before proceeding.</p>
              </li>
              <li>
                <strong>Set Slippage Tolerance</strong>
                <p className="mt-1">Adjust your slippage tolerance in the settings (gear icon). Default is 0.5%, but you may need to increase it for volatile tokens.</p>
              </li>
              <li>
                <strong>Approve Token (if necessary)</strong>
                <p className="mt-1">If this is your first time swapping a particular token, you'll need to approve the smart contract to use it.</p>
              </li>
              <li>
                <strong>Execute the Swap</strong>
                <p className="mt-1">Click the "Swap" button and confirm the transaction in your wallet.</p>
              </li>
              <li>
                <strong>Wait for Confirmation</strong>
                <p className="mt-1">The swap will process on the blockchain, usually taking 15-30 seconds to complete.</p>
              </li>
            </ol>
            <p className="mt-4">Once the transaction is confirmed, you'll see the swapped tokens in your wallet balance.</p>
          </div>
        )
      },
      {
        title: "Understanding Swap Fees and Costs",
        content: (
          <div>
            <p>When using the BitAccess Token Swap, you'll encounter several types of fees and costs:</p>
            <ul className="list-disc pl-6 mt-4 space-y-4">
              <li>
                <strong>Swap Fee (0.3%)</strong>
                <p className="mt-1">A 0.3% fee is charged on all swaps. This fee is distributed as follows:</p>
                <ul className="list-disc pl-6 mt-1">
                  <li>0.25% goes to liquidity providers as incentive</li>
                  <li>0.05% goes to the BitAccess treasury for platform development</li>
                </ul>
              </li>
              <li>
                <strong>Network Gas Fees</strong>
                <p className="mt-1">You'll pay BSC network gas fees for each transaction. These fees go to network validators, not to BitAccess.</p>
              </li>
              <li>
                <strong>Price Impact</strong>
                <p className="mt-1">Not a fee, but large swap amounts can cause price slippage, resulting in fewer tokens received than expected.</p>
              </li>
            </ul>
            <p className="mt-4">BIT token holders who stake their tokens receive discounts on swap fees, ranging from 10% to 50% based on their staking tier.</p>
          </div>
        )
      },
      {
        title: "Swap Safety and Best Practices",
        content: (
          <div>
            <p>Follow these best practices to ensure safe and efficient token swaps:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Double-check token symbols</strong> - Verify you're swapping the correct tokens</li>
              <li><strong>Start with small amounts</strong> - Test the swap process with a small amount first</li>
              <li><strong>Be aware of price impact</strong> - Large swaps can cause significant price slippage</li>
              <li><strong>Adjust slippage tolerance</strong> - Set appropriate slippage based on token volatility</li>
              <li><strong>Check gas prices</strong> - Consider waiting for lower network congestion if gas fees are high</li>
              <li><strong>Verify transaction details</strong> - Always review all details before confirming transactions</li>
              <li><strong>Keep some BNB</strong> - Always maintain some BNB in your wallet for gas fees</li>
            </ul>
            <p className="mt-4 text-yellow-400">Warning: Be cautious of phishing attempts. Always ensure you're on the official BitAccess platform before connecting your wallet or authorizing transactions.</p>
          </div>
        )
      }
    ]
  },
  "merchant-account": {
    title: "Setting Up a Merchant Account",
    lastUpdated: "May 19, 2025",
    sections: [
      {
        title: "Benefits of Becoming a BitAccess Merchant",
        content: (
          <div>
            <p>Setting up a merchant account with BitAccess offers numerous advantages for businesses:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Low Transaction Fees</strong> - Significantly lower fees compared to traditional payment processors</li>
              <li><strong>Fast Settlements</strong> - Receive payments directly to your wallet within minutes</li>
              <li><strong>Global Reach</strong> - Accept payments from customers worldwide without currency conversion issues</li>
              <li><strong>No Chargebacks</strong> - Transactions are irreversible, eliminating chargeback fraud</li>
              <li><strong>Multiple Cryptocurrency Options</strong> - Accept BIT, BNB, USDT, and other popular cryptocurrencies</li>
              <li><strong>Enhanced Customer Trust</strong> - Verified merchant badge increases credibility</li>
              <li><strong>Automated Tax Reporting</strong> - Simplified tax compliance with transaction records</li>
            </ul>
            <p className="mt-4">BitAccess merchant accounts are suitable for both physical stores and online businesses across various industries.</p>
          </div>
        )
      },
      {
        title: "Types of Merchant Accounts",
        content: (
          <div>
            <p>BitAccess offers several types of merchant accounts to suit different business needs:</p>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border border-gray-700">
                <thead>
                  <tr className="bg-bitaccess-black-light">
                    <th className="px-4 py-2 border-b border-gray-700 text-left">Account Type</th>
                    <th className="px-4 py-2 border-b border-gray-700 text-left">Monthly Fee</th>
                    <th className="px-4 py-2 border-b border-gray-700 text-left">Transaction Fee</th>
                    <th className="px-4 py-2 border-b border-gray-700 text-left">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-700">Basic</td>
                    <td className="px-4 py-2 border-b border-gray-700">Free</td>
                    <td className="px-4 py-2 border-b border-gray-700">1.5%</td>
                    <td className="px-4 py-2 border-b border-gray-700">Small businesses, startups</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-700">Premium</td>
                    <td className="px-4 py-2 border-b border-gray-700">50 USDT</td>
                    <td className="px-4 py-2 border-b border-gray-700">0.8%</td>
                    <td className="px-4 py-2 border-b border-gray-700">Medium businesses, e-commerce</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-700">Enterprise</td>
                    <td className="px-4 py-2 border-b border-gray-700">200 USDT</td>
                    <td className="px-4 py-2 border-b border-gray-700">0.5%</td>
                    <td className="px-4 py-2 border-b border-gray-700">Large businesses, high volume</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-700">Marketplace Seller</td>
                    <td className="px-4 py-2 border-b border-gray-700">Free</td>
                    <td className="px-4 py-2 border-b border-gray-700">2.0%</td>
                    <td className="px-4 py-2 border-b border-gray-700">BitAccess marketplace sellers</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">You can upgrade or downgrade your merchant account type at any time based on your business needs.</p>
          </div>
        )
      },
      {
        title: "Step-by-Step Account Setup Process",
        content: (
          <div>
            <ol className="list-decimal pl-6 mt-4 space-y-4">
              <li>
                <strong>Create and Verify Your BitAccess Account</strong>
                <p className="mt-1">Before setting up a merchant account, you need a verified BitAccess user account:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Connect your wallet to the BitAccess platform</li>
                  <li>Complete the basic profile information</li>
                  <li>Verify your email address</li>
                  <li>Complete KYC verification (required for merchant accounts)</li>
                </ul>
              </li>
              <li>
                <strong>Apply for Merchant Status</strong>
                <p className="mt-1">Navigate to the "Merchant" section and click "Apply for Merchant Account."</p>
              </li>
              <li>
                <strong>Complete Business Profile</strong>
                <p className="mt-1">Provide essential information about your business:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Business name and description</li>
                  <li>Business address and contact information</li>
                  <li>Business registration documents</li>
                  <li>Website URL (if applicable)</li>
                  <li>Business category and subcategory</li>
                </ul>
              </li>
              <li>
                <strong>Set Up Payment Preferences</strong>
                <p className="mt-1">Configure your payment settings:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Select cryptocurrencies you want to accept</li>
                  <li>Choose settlement options (auto-convert to stablecoin or keep as received)</li>
                  <li>Set up withdrawal wallet addresses for different cryptocurrencies</li>
                </ul>
              </li>
              <li>
                <strong>Choose Account Type</strong>
                <p className="mt-1">Select the merchant account type that best fits your business needs from the available options.</p>
              </li>
              <li>
                <strong>Pay Setup Fee (if applicable)</strong>
                <p className="mt-1">Some account types require a one-time setup fee in addition to the monthly subscription.</p>
              </li>
              <li>
                <strong>Wait for Approval</strong>
                <p className="mt-1">The BitAccess team will review your application, typically within 1-3 business days.</p>
              </li>
              <li>
                <strong>Complete Merchant Onboarding</strong>
                <p className="mt-1">Once approved, complete the onboarding process to learn about merchant tools and features.</p>
              </li>
            </ol>
            <p className="mt-4">After completing these steps, your merchant account will be active and ready to accept cryptocurrency payments.</p>
          </div>
        )
      },
      {
        title: "Accepting Payments as a Merchant",
        content: (
          <div>
            <p>BitAccess offers multiple ways to accept cryptocurrency payments:</p>
            <ul className="list-disc pl-6 mt-4 space-y-4">
              <li>
                <strong>Payment Buttons</strong>
                <p className="mt-1">Easily integrate payment buttons on your website with copy-paste code snippets.</p>
              </li>
              <li>
                <strong>Payment Links</strong>
                <p className="mt-1">Generate shareable payment links for specific products or amounts that can be sent via email, messaging, or social media.</p>
              </li>
              <li>
                <strong>QR Code Payments</strong>
                <p className="mt-1">Create QR codes for physical stores that customers can scan with their mobile wallets.</p>
              </li>
              <li>
                <strong>E-commerce Plugins</strong>
                <p className="mt-1">Use plugins for popular platforms like Shopify, WooCommerce, and Magento to add cryptocurrency checkout options.</p>
              </li>
              <li>
                <strong>API Integration</strong>
                <p className="mt-1">Advanced merchants can use the BitAccess API for custom payment solutions and integrations.</p>
              </li>
              <li>
                <strong>Point of Sale (POS) App</strong>
                <p className="mt-1">Use the BitAccess POS mobile app for in-person transactions.</p>
              </li>
            </ul>
            <p className="mt-4">All payment methods include automatic exchange rate calculations and verification of transaction confirmations.</p>
          </div>
        )
      },
      {
        title: "Managing Your Merchant Account",
        content: (
          <div>
            <p>The Merchant Dashboard provides tools to manage your account and transactions:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Transaction History</strong> - View all incoming payments with detailed information</li>
              <li><strong>Analytics</strong> - Monitor sales trends, customer geography, and popular payment methods</li>
              <li><strong>Inventory Management</strong> - For marketplace sellers to manage product listings</li>
              <li><strong>Payment Settings</strong> - Update accepted cryptocurrencies and withdrawal addresses</li>
              <li><strong>Tax Reports</strong> - Generate reports for accounting and tax purposes</li>
              <li><strong>Customer Management</strong> - View customer information and purchase history</li>
              <li><strong>Support Center</strong> - Access merchant-specific support resources</li>
            </ul>
            <p className="mt-4">Regular updates introduce new features and improvements to the merchant platform based on community feedback.</p>
          </div>
        )
      }
    ]
  },
  "security-practices": {
    title: "BIT Token Security Best Practices",
    lastUpdated: "May 21, 2025",
    sections: [
      {
        title: "Understanding Cryptocurrency Security Risks",
        content: (
          <div>
            <p>Before implementing security measures, it's important to understand the common risks associated with cryptocurrency ownership:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Private Key Theft</strong> - Unauthorized access to your wallet's private keys</li>
              <li><strong>Phishing Attacks</strong> - Fraudulent websites or communications designed to steal credentials</li>
              <li><strong>Malware</strong> - Software designed to steal wallet information or redirect transactions</li>
              <li><strong>SIM Swapping</strong> - Attackers take control of your phone number to bypass 2FA</li>
              <li><strong>Smart Contract Vulnerabilities</strong> - Flaws in token contracts that can be exploited</li>
              <li><strong>Social Engineering</strong> - Manipulation tactics to trick you into revealing sensitive information</li>
            </ul>
            <p className="mt-4">With proper security practices, most of these risks can be significantly reduced or eliminated.</p>
          </div>
        )
      },
      {
        title: "Choosing the Right Wallet for BIT Tokens",
        content: (
          <div>
            <p>Selecting the appropriate wallet is your first line of defense. Different wallet types offer varying levels of security and convenience:</p>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border border-gray-700">
                <thead>
                  <tr className="bg-bitaccess-black-light">
                    <th className="px-4 py-2 border-b border-gray-700 text-left">Wallet Type</th>
                    <th className="px-4 py-2 border-b border-gray-700 text-left">Security Level</th>
                    <th className="px-4 py-2 border-b border-gray-700 text-left">Convenience</th>
                    <th className="px-4 py-2 border-b border-gray-700 text-left">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-700">Hardware Wallets<br/>(Ledger, Trezor)</td>
                    <td className="px-4 py-2 border-b border-gray-700">Very High</td>
                    <td className="px-4 py-2 border-b border-gray-700">Medium</td>
                    <td className="px-4 py-2 border-b border-gray-700">Large holdings, long-term storage</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-700">Software Wallets<br/>(MetaMask, Trust Wallet)</td>
                    <td className="px-4 py-2 border-b border-gray-700">Medium</td>
                    <td className="px-4 py-2 border-b border-gray-700">High</td>
                    <td className="px-4 py-2 border-b border-gray-700">Active trading, daily use</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-700">Mobile Wallets<br/>(BitAccess Mobile)</td>
                    <td className="px-4 py-2 border-b border-gray-700">Medium</td>
                    <td className="px-4 py-2 border-b border-gray-700">Very High</td>
                    <td className="px-4 py-2 border-b border-gray-700">On-the-go transactions</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-700">Paper Wallets</td>
                    <td className="px-4 py-2 border-b border-gray-700">High</td>
                    <td className="px-4 py-2 border-b border-gray-700">Low</td>
                    <td className="px-4 py-2 border-b border-gray-700">Cold storage, gifting</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-700">Exchange Wallets</td>
                    <td className="px-4 py-2 border-b border-gray-700">Low</td>
                    <td className="px-4 py-2 border-b border-gray-700">Very High</td>
                    <td className="px-4 py-2 border-b border-gray-700">Active trading only</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-yellow-400">Recommendation: For optimal security, use a hardware wallet for long-term storage and keep only small amounts in software wallets for daily transactions.</p>
          </div>
        )
      },
      {
        title: "Securing Your Wallet and Private Keys",
        content: (
          <div>
            <p>Your private keys provide direct access to your tokens. Follow these critical practices to keep them secure:</p>
            <ul className="list-disc pl-6 mt-4 space-y-4">
              <li>
                <strong>Backup Your Seed Phrase</strong>
                <p className="mt-1">When setting up a wallet, you'll receive a 12-24 word recovery phrase (seed phrase):</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Write it down physically on paper or metal (not digitally)</li>
                  <li>Store copies in multiple secure locations (e.g., home safe, safety deposit box)</li>
                  <li>Never share your seed phrase with anyone, including BitAccess support</li>
                  <li>Consider splitting the phrase across multiple locations for higher security</li>
                </ul>
              </li>
              <li>
                <strong>Use Strong Passwords</strong>
                <p className="mt-1">For wallet access and exchange accounts:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Use unique passwords with at least 12 characters</li>
                  <li>Include uppercase, lowercase, numbers, and special characters</li>
                  <li>Use a password manager to generate and store complex passwords</li>
                  <li>Never reuse passwords across different platforms</li>
                </ul>
              </li>
              <li>
                <strong>Enable Two-Factor Authentication (2FA)</strong>
                <p className="mt-1">Add an extra layer of security:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Use authenticator apps (e.g., Google Authenticator, Authy) instead of SMS</li>
                  <li>Backup your 2FA recovery codes in a secure location</li>
                  <li>Enable 2FA for all exchanges, wallets, and email accounts</li>
                </ul>
              </li>
              <li>
                <strong>Use Hardware Security Keys</strong>
                <p className="mt-1">Physical security keys like YubiKey provide advanced protection against phishing.</p>
              </li>
            </ul>
            <p className="mt-4 text-red-500">Critical Warning: If you lose your seed phrase and your wallet is damaged or lost, your tokens will be permanently inaccessible. There is no "forgot password" option for cryptocurrency wallets.</p>
          </div>
        )
      },
      {
        title: "Safe Transaction Practices",
        content: (
          <div>
            <p>Follow these guidelines when sending, receiving, or trading BIT tokens:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Verify Addresses</strong> - Always double-check the full recipient address before sending tokens</li>
              <li><strong>Start with Small Test Transactions</strong> - Send a small amount first to verify the correct recipient</li>
              <li><strong>Check Contract Addresses</strong> - Verify token contract addresses to avoid fake tokens</li>
              <li><strong>Be Wary of High Gas Fees</strong> - Unusually high gas fees might indicate a compromised wallet</li>
              <li><strong>Review Permissions</strong> - Check and revoke unnecessary smart contract approvals regularly</li>
              <li><strong>Use Hardware Wallets for Large Transactions</strong> - Sign important transactions with hardware wallets</li>
              <li><strong>Keep Transaction Records</strong> - Maintain a record of significant transactions for tax purposes</li>
            </ul>
            <p className="mt-4">The BitAccess platform implements additional safety features like address whitelisting, transaction limits, and delayed withdrawals for enhanced security.</p>
          </div>
        )
      },
      {
        title: "Protecting Against Phishing and Scams",
        content: (
          <div>
            <p>Phishing attacks are among the most common threats to cryptocurrency holders:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Verify URLs</strong> - Always check that you're on the official BitAccess website (https://bitaccess.com)</li>
              <li><strong>Bookmark Official Sites</strong> - Use bookmarks instead of clicking links from emails or messages</li>
              <li><strong>Check for SSL Certificates</strong> - Ensure websites have a valid SSL certificate (https://)</li>
              <li><strong>Be Suspicious of Unsolicited Messages</strong> - BitAccess will never ask for your seed phrase or private keys</li>
              <li><strong>Avoid Clicking Unknown Links</strong> - Don't click on suspicious links, even from friends</li>
              <li><strong>Be Wary of Airdrops and Giveaways</strong> - If it sounds too good to be true, it probably is</li>
              <li><strong>Use Hardware Wallets</strong> - They provide additional verification steps that help identify phishing attempts</li>
            </ul>
            <p className="mt-4">Remember that official BitAccess communications will never ask for your password, private keys, or seed phrase.</p>
          </div>
        )
      },
      {
        title: "Secure Device Management",
        content: (
          <div>
            <p>Your devices play a critical role in the security of your tokens:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Keep Software Updated</strong> - Regularly update your operating system and wallet applications</li>
              <li><strong>Use Antivirus/Anti-malware Software</strong> - Scan your devices regularly for malware</li>
              <li><strong>Be Careful with Browser Extensions</strong> - Install only necessary and verified extensions</li>
              <li><strong>Use a Dedicated Device</strong> - Consider having a dedicated device for significant crypto transactions</li>
              <li><strong>Encrypt Your Devices</strong> - Enable full-disk encryption on computers and phones</li>
              <li><strong>Use Secure Networks</strong> - Avoid conducting transactions on public Wi-Fi networks</li>
              <li><strong>Consider a VPN</strong> - Use a reputable VPN service for additional privacy and security</li>
            </ul>
            <p className="mt-4">For maximum security, some users maintain an air-gapped computer (never connected to the internet) for signing transactions offline.</p>
          </div>
        )
      }
    ]
  }
};
