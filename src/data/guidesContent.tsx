
import { ReactNode } from "react";

export interface GuideSection {
  title: string;
  content: ReactNode;
}

export interface GuideContent {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: GuideSection[];
}

export const guidesContent: Record<string, GuideContent> = {
  "getting-started": {
    id: "getting-started",
    title: "Getting Started with BitAccess",
    description: "Learn the basics of the BitAccess ecosystem and how to get started.",
    lastUpdated: "May 12, 2025",
    sections: [
      {
        title: "Introduction to BitAccess",
        content: (
          <div className="space-y-4">
            <p>
              Welcome to BitAccess, a revolutionary blockchain ecosystem designed to bridge the gap between digital currencies 
              and everyday services. Whether you're new to blockchain or an experienced crypto enthusiast, this guide will help 
              you navigate the BitAccess platform and make the most of its features.
            </p>
            <p>
              BitAccess is built on the principle of accessibility, aiming to make blockchain technology and its benefits 
              available to everyone, regardless of their technical background. Our ecosystem comprises several interconnected 
              components, including a native BIT token, educational resources, merchant services, and staking opportunities.
            </p>
          </div>
        ),
      },
      {
        title: "Creating Your BitAccess Account",
        content: (
          <div className="space-y-4">
            <p>To get started with BitAccess, follow these simple steps to create your account:</p>
            
            <ol className="list-decimal pl-5 space-y-2">
              <li>Visit the official BitAccess website at <span className="text-bitaccess-gold">bitaecosystem.org</span></li>
              <li>Click on the "Connect Wallet" button in the top right corner</li>
              <li>Choose your preferred wallet (MetaMask, Trust Wallet, WalletConnect, etc.)</li>
              <li>Follow the prompts to connect your wallet to the BitAccess platform</li>
              <li>Once connected, you'll have access to all BitAccess services based on your wallet's BIT token holdings</li>
            </ol>
            
            <p className="bg-bitaccess-black-light p-4 rounded-lg border border-bitaccess-gold/20 mt-2">
              <strong>Important:</strong> Always ensure you're visiting the official BitAccess website to avoid phishing attempts. 
              Check that the URL is correct and look for security indicators in your browser.
            </p>
          </div>
        ),
      },
      {
        title: "Understanding BIT Tokens",
        content: (
          <div className="space-y-4">
            <p>
              The BIT token is the native cryptocurrency of the BitAccess ecosystem. It serves multiple purposes within the platform:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>Currency for payments within the ecosystem</li>
              <li>Staking for passive income generation</li>
              <li>Governance participation in platform decisions</li>
              <li>Access to premium educational content</li>
              <li>Discounts on merchant services and transaction fees</li>
            </ul>
            
            <p>
              BIT tokens are built on the Binance Smart Chain (BSC), making them fast, affordable to transfer, and compatible with 
              a wide range of wallets and services in the broader cryptocurrency ecosystem.
            </p>
            
            <p className="bg-bitaccess-black-light p-4 rounded-lg border border-bitaccess-gold/20 mt-2">
              <strong>Tip:</strong> To check your BIT token balance, simply connect your wallet to the BitAccess platform and navigate 
              to the "Wallet" section, or check directly in your wallet app if it supports BEP-20 tokens.
            </p>
          </div>
        ),
      },
      {
        title: "Navigating the BitAccess Ecosystem",
        content: (
          <div className="space-y-4">
            <p>
              The BitAccess ecosystem consists of several key components, each designed to provide value to different types of users:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-bitaccess-black-light p-4 rounded-lg border border-bitaccess-gold/20">
                <h4 className="font-medium text-white mb-2">BitAccess Education</h4>
                <p className="text-gray-300 text-sm">
                  Access blockchain and cryptocurrency educational resources, courses, and certification programs.
                </p>
              </div>
              
              <div className="bg-bitaccess-black-light p-4 rounded-lg border border-bitaccess-gold/20">
                <h4 className="font-medium text-white mb-2">BitAccess Merchant</h4>
                <p className="text-gray-300 text-sm">
                  Solutions for businesses to accept BIT tokens as payment and integrate with the BitAccess ecosystem.
                </p>
              </div>
              
              <div className="bg-bitaccess-black-light p-4 rounded-lg border border-bitaccess-gold/20">
                <h4 className="font-medium text-white mb-2">BitAccess Staking</h4>
                <p className="text-gray-300 text-sm">
                  Earn passive income by staking your BIT tokens and contributing to the ecosystem's security.
                </p>
              </div>
              
              <div className="bg-bitaccess-black-light p-4 rounded-lg border border-bitaccess-gold/20">
                <h4 className="font-medium text-white mb-2">BitAccess Swap</h4>
                <p className="text-gray-300 text-sm">
                  Exchange BIT tokens for other cryptocurrencies directly within the ecosystem.
                </p>
              </div>
            </div>
            
            <p>
              To navigate between these components, use the main menu on the BitAccess website. Each section provides specific 
              functionality and services tailored to different user needs.
            </p>
          </div>
        ),
      },
      {
        title: "Getting Help and Support",
        content: (
          <div className="space-y-4">
            <p>
              If you need assistance at any point while using BitAccess, there are several support channels available:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Documentation:</strong> Browse our comprehensive guides and tutorials in the Docs section
              </li>
              <li>
                <strong>Community Support:</strong> Join our Telegram group at <span className="text-bitaccess-gold">t.me/bitaecosystemofficial</span> to connect with other users and get help
              </li>
              <li>
                <strong>Email Support:</strong> Contact our support team at <span className="text-bitaccess-gold">support@bitaecosystem.org</span> for personalized assistance
              </li>
              <li>
                <strong>Social Media:</strong> Follow us on Twitter and Facebook for announcements and quick responses to queries
              </li>
            </ul>
            
            <p className="bg-bitaccess-black p-4 rounded-lg border border-bitaccess-gold/20 mt-4">
              <strong className="text-bitaccess-gold">Remember:</strong> The BitAccess team will never ask for your private keys or seed phrases. 
              Be vigilant about potential scams and always verify you're communicating with official BitAccess channels.
            </p>
          </div>
        ),
      },
      {
        title: "Next Steps",
        content: (
          <div className="space-y-4">
            <p>
              Now that you're familiar with the basics of BitAccess, here are some recommended next steps to make the most of the ecosystem:
            </p>
            
            <ol className="list-decimal pl-5 space-y-2">
              <li>Acquire BIT tokens through our presale, airdrop programs, or exchanges</li>
              <li>Explore the educational content to deepen your understanding of blockchain technology</li>
              <li>Consider staking your BIT tokens to earn passive income</li>
              <li>If you're a business owner, explore our merchant services to accept BIT payments</li>
              <li>Join our community on Telegram and other social media platforms to stay updated</li>
            </ol>
            
            <p>
              For more detailed information on specific topics, check out our other guides:
            </p>
            
            <ul className="list-disc pl-5 space-y-2 text-bitaccess-gold">
              <li>How to Participate in Airdrops</li>
              <li>Staking Guide for Beginners</li>
              <li>Using the BIT Token Swap</li>
              <li>Setting Up a Merchant Account</li>
              <li>BIT Token Security Best Practices</li>
            </ul>
          </div>
        ),
      },
    ],
  },
  // Add more guides here with similar structure
};
