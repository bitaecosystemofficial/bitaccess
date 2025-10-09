import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Users, TrendingUp, Shield, Globe, Zap } from "lucide-react";

const Ecosystem = () => {
  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container px-4 md:px-8 max-w-6xl">
          <SectionHeading
            title="BIT Access Ecosystem"
            subtitle="A comprehensive blockchain platform connecting communities, businesses, and financial opportunities"
            centered
          />

          {/* Overview Section */}
          <section className="mt-12 mb-16">
            <div className="bg-bitaccess-black-light p-8 rounded-xl border border-bitaccess-gold/20">
              <h2 className="text-2xl font-bold text-bitaccess-gold mb-4">What is BIT Access?</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                BIT Access is a revolutionary blockchain ecosystem designed to bridge the gap between traditional
                finance and decentralized technologies. Our platform empowers users with comprehensive tools for
                token management, staking, trading, and community participation.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Built on Binance Smart Chain, BIT Access offers fast, secure, and cost-effective solutions for
                individuals and businesses looking to leverage the power of blockchain technology.
              </p>
            </div>
          </section>

          {/* Core Components */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-bitaccess-gold mb-8 text-center">Core Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-bitaccess-black-light border-bitaccess-gold/20 hover:border-bitaccess-gold/40 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Coins className="text-bitaccess-gold h-6 w-6" />
                    <span>BIT Token</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm">
                    The native utility token powering all ecosystem transactions, rewards, and governance activities.
                    Stake BIT tokens to earn passive income and participate in platform decisions.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-bitaccess-black-light border-bitaccess-gold/20 hover:border-bitaccess-gold/40 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <TrendingUp className="text-bitaccess-gold h-6 w-6" />
                    <span>Staking Platform</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm">
                    Multiple staking tiers offering competitive APY rates. Lock your tokens to earn rewards while
                    supporting network security and stability.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-bitaccess-black-light border-bitaccess-gold/20 hover:border-bitaccess-gold/40 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Zap className="text-bitaccess-gold h-6 w-6" />
                    <span>DEX Integration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm">
                    Seamlessly swap BIT tokens with other cryptocurrencies through our integrated decentralized
                    exchange functionality with minimal fees.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-bitaccess-black-light border-bitaccess-gold/20 hover:border-bitaccess-gold/40 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Users className="text-bitaccess-gold h-6 w-6" />
                    <span>Daily Rewards Claim</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm">
                    Claim daily rewards and bonuses. Participate in social-to-earn activities and engage in
                    community-driven initiatives to maximize your earnings.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-bitaccess-black-light border-bitaccess-gold/20 hover:border-bitaccess-gold/40 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Shield className="text-bitaccess-gold h-6 w-6" />
                    <span>Membership System</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm">
                    Unlock exclusive benefits with tiered membership levels offering premium features, enhanced
                    rewards, and priority access to new opportunities.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-bitaccess-black-light border-bitaccess-gold/20 hover:border-bitaccess-gold/40 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Globe className="text-bitaccess-gold h-6 w-6" />
                    <span>Airdrop Campaign</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm">
                    Participate in regular airdrops and token distribution events. Complete tasks to earn BIT tokens
                    and build your portfolio.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-bitaccess-gold mb-8 text-center">Ecosystem Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
                <h3 className="text-xl font-bold text-white mb-3">For Token Holders</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>• Earn passive income through staking rewards</li>
                  <li>• Access to exclusive membership benefits</li>
                  <li>• Participate in platform governance</li>
                  <li>• Early access to new features and opportunities</li>
                  <li>• Referral rewards and community incentives</li>
                </ul>
              </div>

              <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
                <h3 className="text-xl font-bold text-white mb-3">For the Community</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>• Transparent and secure blockchain infrastructure</li>
                  <li>• Low transaction fees on BSC network</li>
                  <li>• Regular airdrops and promotional events</li>
                  <li>• Social-to-earn opportunities</li>
                  <li>• Growing ecosystem of partners and integrations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Technology Stack */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-bitaccess-gold mb-8 text-center">Technology Stack</h2>
            <div className="bg-bitaccess-black-light p-8 rounded-xl border border-bitaccess-gold/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-white mb-2">Blockchain</h4>
                  <p className="text-gray-400 text-sm">Binance Smart Chain (BEP-20)</p>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-white mb-2">Smart Contracts</h4>
                  <p className="text-gray-400 text-sm">Solidity, Audited & Verified</p>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-white mb-2">Security</h4>
                  <p className="text-gray-400 text-sm">Multi-sig wallets, Regular audits</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Ecosystem;
