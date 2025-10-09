import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqCategories = [
    {
      category: "General Questions",
      questions: [
        {
          question: "What is BIT Access?",
          answer: "BIT Access is a comprehensive blockchain ecosystem built on Binance Smart Chain. We provide a platform for token staking, trading, community engagement, and various DeFi opportunities. Our native BIT token powers all transactions and rewards within the ecosystem."
        },
        {
          question: "How do I get started with BIT Access?",
          answer: "Getting started is easy! First, connect your Web3 wallet (MetaMask or Trust Wallet) to our platform. You can then participate in our presale, claim airdrop rewards, or purchase BIT tokens through our DEX integration. Once you have tokens, you can stake them, join the community, and access membership benefits."
        },
        {
          question: "Is BIT Access safe and secure?",
          answer: "Yes! Our smart contracts are deployed on Binance Smart Chain and have undergone thorough security audits. We use industry-standard security practices including multi-signature wallets, regular audits, and transparent on-chain operations. All contract addresses are publicly verifiable on BscScan."
        },
        {
          question: "What wallets are supported?",
          answer: "We currently support MetaMask and Trust Wallet. Any Web3-compatible wallet that works with Binance Smart Chain can be used to interact with our platform."
        }
      ]
    },
    {
      category: "Tokens & Trading",
      questions: [
        {
          question: "What is the BIT token?",
          answer: "BIT is our native BEP-20 utility token with a total supply of 10 billion tokens. It's used for staking rewards, platform transactions, membership benefits, and community governance. Token holders can earn passive income through staking and participate in ecosystem decisions."
        },
        {
          question: "How can I buy BIT tokens?",
          answer: "You can acquire BIT tokens through: 1) Our presale (when active), 2) DEX integration on our platform, 3) Participating in airdrops and completing tasks, 4) Referral rewards, or 5) Exchange listings (coming soon)."
        },
        {
          question: "What is the token price?",
          answer: "The current presale price is $0.000108 per BIT token, with a target launch price of $0.00030. Prices may vary on the open market after listing. Always check our presale page for the most current rates."
        },
        {
          question: "Can I swap BIT for other cryptocurrencies?",
          answer: "Yes! Our platform includes integrated DEX functionality allowing you to swap BIT tokens for other cryptocurrencies on Binance Smart Chain with minimal fees."
        }
      ]
    },
    {
      category: "Staking & Rewards",
      questions: [
        {
          question: "How does staking work?",
          answer: "Staking allows you to lock your BIT tokens for a specified period to earn rewards. We offer multiple staking tiers with different lock periods and APY rates. The longer you stake, the higher your rewards. You can view available staking options on our Staking page."
        },
        {
          question: "What are the staking rewards?",
          answer: "Staking rewards vary by tier and lock period. Our flexible staking offers lower APY with no lock period, while long-term staking (12+ months) offers the highest rewards. All rewards are paid in BIT tokens."
        },
        {
          question: "Can I unstake my tokens early?",
          answer: "Yes, but early unstaking may incur penalties depending on your staking tier. Flexible staking allows withdrawal at any time without penalties. Fixed-term staking has early withdrawal fees to ensure network stability."
        },
        {
          question: "How are staking rewards distributed?",
          answer: "Staking rewards are calculated and distributed automatically through our smart contracts. You can claim your rewards at any time through the dashboard, and they're immediately available in your wallet."
        }
      ]
    },
    {
      category: "Membership & Benefits",
      questions: [
        {
          question: "What are membership tiers?",
          answer: "We offer multiple membership tiers (Bronze, Silver, Gold, Platinum, Diamond) with increasing benefits. Higher tiers unlock premium features, enhanced staking rewards, priority support, and exclusive opportunities. Membership is determined by your BIT holdings and staking activity."
        },
        {
          question: "How do I upgrade my membership?",
          answer: "Membership tiers are automatically upgraded based on your BIT token holdings and staking participation. Acquire and stake more BIT tokens to reach higher tiers and unlock additional benefits."
        },
        {
          question: "What benefits do members receive?",
          answer: "Members receive various benefits including: enhanced staking APY, priority access to new features, exclusive airdrop allocations, reduced transaction fees, referral bonuses, and access to premium community channels."
        }
      ]
    },
    {
      category: "Community & Support",
      questions: [
        {
          question: "How can I participate in the community?",
          answer: "Join our community through social-to-earn activities, participate in governance voting, engage in our referral program, and attend virtual events. Active community members earn additional BIT tokens and exclusive rewards."
        },
        {
          question: "What is the referral program?",
          answer: "Our referral program allows you to earn passive income by inviting new users to BIT Access. Share your unique referral link and earn a percentage of your referrals' activities. Check the Community page for detailed information."
        },
        {
          question: "How do I contact support?",
          answer: "You can reach our support team through: 1) The Contact page on our website, 2) Our official Telegram community, 3) Email support at support@bitaccess.io, or 4) Twitter for quick updates and responses."
        },
        {
          question: "Where can I find the latest updates?",
          answer: "Follow us on our social media channels (Twitter, Telegram, Facebook) for the latest news, updates, and announcements. You can also check our blog and roadmap page for detailed information about upcoming features."
        }
      ]
    },
    {
      category: "Technical & Security",
      questions: [
        {
          question: "What blockchain does BIT Access use?",
          answer: "BIT Access is built on Binance Smart Chain (BSC), offering fast transaction speeds and low fees. Our BIT token follows the BEP-20 standard and all smart contracts are publicly verifiable."
        },
        {
          question: "Are the smart contracts audited?",
          answer: "Yes, all our smart contracts undergo thorough security audits by reputable third-party firms. Audit reports are available in our documentation, and contract addresses are verified on BscScan."
        },
        {
          question: "What are the transaction fees?",
          answer: "Transaction fees on BIT Access depend on: 1) BSC network gas fees (very low), 2) Platform fees (minimal), and 3) Transaction type (swap, stake, transfer). We strive to keep all fees as low as possible."
        },
        {
          question: "How can I verify smart contracts?",
          answer: "All our smart contracts are verified on BscScan. You can view the contract code, transaction history, and token information at any time. Contract addresses are listed on our website and documentation."
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container px-4 md:px-8 max-w-5xl">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about BIT Access"
            centered
          />

          {/* Search Suggestion */}
          <Card className="mt-12 mb-8 bg-bitaccess-black-light border-bitaccess-gold/20">
            <CardContent className="p-6 flex items-start gap-4">
              <HelpCircle className="h-6 w-6 text-bitaccess-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Can't find what you're looking for?</h3>
                <p className="text-gray-400 text-sm">
                  If you don't see your question answered here, please reach out to our support team through the{" "}
                  <a href="/contact" className="text-bitaccess-gold hover:underline">Contact page</a> or join our{" "}
                  <a href="/community" className="text-bitaccess-gold hover:underline">Community</a> channels.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Sections */}
          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-bold text-bitaccess-gold mb-4">{category.category}</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${categoryIndex}-${faqIndex}`}
                      className="bg-bitaccess-black-light border border-bitaccess-gold/20 rounded-lg px-6 data-[state=open]:border-bitaccess-gold/40"
                    >
                      <AccordionTrigger className="text-left hover:no-underline text-white hover:text-bitaccess-gold">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-400 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* Additional Help */}
          <div className="mt-16 bg-gradient-to-r from-bitaccess-black-light to-bitaccess-black p-8 rounded-xl border border-bitaccess-gold/20 text-center">
            <h2 className="text-2xl font-bold text-bitaccess-gold mb-4">Still Have Questions?</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Our team is here to help! Reach out through any of our communication channels and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black font-semibold rounded-lg transition-colors"
              >
                Contact Support
              </a>
              <a
                href="/community"
                className="inline-flex items-center justify-center px-6 py-3 border border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10 font-semibold rounded-lg transition-colors"
              >
                Join Community
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
