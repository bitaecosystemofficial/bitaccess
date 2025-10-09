import { Download, Shield, CheckCircle, AlertTriangle, Info } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Audit = () => {
  const handleDownloadPDF = () => {
    toast({
      title: "PDF Download",
      description: "Audit report PDF will be available soon.",
    });
  };

  return (
    <Layout>
      <div className="container px-4 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-bitaccess-gold/10 mb-6">
              <Shield className="w-10 h-10 text-bitaccess-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gold-gradient text-transparent bg-clip-text">
              Security Audit Report
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Our commitment to security and transparency.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Powered by <span className="text-bitaccess-gold font-semibold">BitX Security Audit</span>
            </p>
            <Button 
              onClick={handleDownloadPDF}
              className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black font-semibold"
            >
              <Download className="w-4 h-4 mr-2" />
              Download as PDF
            </Button>
          </div>

          {/* Audit Summary */}
          <Card className="mb-8 border-bitaccess-gold/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Info className="w-6 h-6 text-bitaccess-gold" />
                🔍 Audit Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-700">
                    <span className="text-gray-400">Contract Name</span>
                    <span className="font-semibold">BITACCESSTOKEN</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-700">
                    <span className="text-gray-400">Token Symbol</span>
                    <span className="font-semibold">BIT</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-700">
                    <span className="text-gray-400">Blockchain</span>
                    <span className="font-semibold">BNB Chain</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-700">
                    <span className="text-gray-400">Network Detection</span>
                    <span className="font-semibold text-blue-400">Mainnet / Testnet auto-detection</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-700">
                    <span className="text-gray-400">Total Supply</span>
                    <span className="font-semibold">100,000,000,000 BIT</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-700">
                    <span className="text-gray-400">Supply Format</span>
                    <span className="font-semibold text-sm">1e11 * 10⁹</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-700">
                    <span className="text-gray-400">Decimals</span>
                    <span className="font-semibold">9</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-700">
                    <span className="text-gray-400">Decimal Note</span>
                    <span className="font-semibold text-xs text-yellow-400">Less common (vs. 18 standard), but not problematic</span>
                  </div>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-700">
                  <span className="text-gray-400">Verified Source Code</span>
                  <span className="font-semibold text-green-400">✓ Yes - Fully verified</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-700">
                  <span className="text-gray-400">Proxy Used</span>
                  <span className="font-semibold">No - Static logic, no upgradeability</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Features */}
          <Card className="mb-8 border-green-500/20 bg-green-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <CheckCircle className="w-6 h-6 text-green-400" />
                ✅ Security & Safety Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Ownership Control", value: "Yes", note: "Secure, with owner functions gated" },
                  { label: "Hidden Owner/Backdoor", value: "None found", note: "No hidden ownership mechanisms" },
                  { label: "Blacklist/Whitelist", value: "Whitelist present", note: "Some addresses can be excluded from fees" },
                  { label: "Self-Destruct", value: "Not found", note: "Cannot be destroyed" },
                  { label: "Burn Functionality", value: "Yes", note: "Only callable by owner" },
                  { label: "Gas Efficiency", value: "No abuse found", note: "" },
                  { label: "Proxy/Upgradeable", value: "No proxy used", note: "" },
                  { label: "Reentrancy", value: "Protected", note: "On airdrop & swap functions" },
                  { label: "Tax Adjustable", value: "Yes", note: "Buy/sell tax adjustable by owner" },
                  { label: "Anti-Whale", value: "None", note: "Unlimited transfers allowed" },
                  { label: "Trading Lock", value: "Yes", note: "Trading cannot begin until enabled" },
                  { label: "Blacklist Risk", value: "None", note: "No blacklist function present" },
                  { label: "Cooldown Mechanism", value: "None", note: "" },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col py-3 px-4 bg-bitaccess-black-light rounded-lg border border-green-500/10">
                    <div className="flex justify-between items-start">
                      <span className="text-gray-400 text-sm">{item.label}</span>
                      <span className="font-semibold text-green-400">{item.value}</span>
                    </div>
                    {item.note && <span className="text-xs text-gray-500 mt-1">{item.note}</span>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tokenomics & Fees */}
          <Card className="mb-8 border-bitaccess-gold/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                💸 Tokenomics & Fee Mechanics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-700">
                    <span className="text-gray-400">Initial Fees</span>
                    <span className="font-semibold">3% Buy / 3% Sell / 0% Transfer</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-700">
                    <span className="text-gray-400">Fee Receiver</span>
                    <span className="font-semibold text-sm">feeReceiver address (updatable by owner)</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-700">
                    <span className="text-gray-400">Max Buy Fee</span>
                    <span className="font-semibold text-green-400">5% - Hard limit enforced</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-700">
                    <span className="text-gray-400">Max Sell Fee</span>
                    <span className="font-semibold text-green-400">5% - Hard limit enforced</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-700">
                    <span className="text-gray-400">Total Fee Cap</span>
                    <span className="font-semibold text-green-400">10% - Buy + Sell must be ≤ 10%</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-700">
                    <span className="text-gray-400">Excluded From Fees</span>
                    <span className="font-semibold text-sm">Owner, contract, dead, PinkLock</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-700">
                    <span className="text-gray-400">Swap Threshold</span>
                    <span className="font-semibold">0.02% of total supply</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-700">
                    <span className="text-gray-400">Swap for ETH</span>
                    <span className="font-semibold">Yes - Fee tokens swapped for ETH via DEX</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Airdrop System */}
          <Card className="mb-8 border-blue-500/20 bg-blue-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                🎁 Airdrop System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between py-3 border-b border-gray-700">
                  <span className="text-gray-400">Total Airdrop Supply</span>
                  <span className="font-semibold">10,000,000 BIT (0.01% of total)</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-700">
                  <span className="text-gray-400">Claimable Per Wallet</span>
                  <span className="font-semibold">1,000 BIT (One-time claim)</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-700">
                  <span className="text-gray-400">Airdrop Wallet</span>
                  <span className="font-semibold text-sm">Configurable (Initially owner)</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-700">
                  <span className="text-gray-400">Claim Limits</span>
                  <span className="font-semibold text-green-400">Enforced - Can't exceed total, non-reentrant</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Holders & Distribution */}
          <Card className="mb-8 border-yellow-500/20 bg-yellow-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                📊 Holders & Distribution Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-700">
                  <span className="text-gray-400">Top 10 Holders Control</span>
                  <span className="font-semibold text-yellow-400">92% of supply - This is extremely centralized.</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-700">
                  <span className="text-gray-400">Burned Tokens</span>
                  <span className="font-semibold">10% sent to 0x...dead address</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DEX & Liquidity */}
          <Card className="mb-8 border-bitaccess-gold/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                🔄 DEX & Liquidity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between py-3 border-b border-gray-700">
                  <span className="text-gray-400">Router Supported</span>
                  <span className="font-semibold">PancakeSwap (BSC)</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-700">
                  <span className="text-gray-400">Pair Created</span>
                  <span className="font-semibold text-green-400">Yes (WBNB/BIT)</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-700 md:col-span-2">
                  <span className="text-gray-400">Liquidity Lock?</span>
                  <span className="font-semibold text-sm">Not verified in code, may depend on third-party locker (e.g., PinkLock)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risks */}
          <Card className="mb-8 border-red-500/20 bg-red-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                ⚠️ Risks / Considerations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { risk: "Owner Controls Fees", level: "Medium", note: "Tax can be increased within limits (5% max each)" },
                  { risk: "Centralized Holdings", level: "High", note: "Top 5 holders = 70%+" },
                  { risk: "Whitelist Present", level: "Medium", note: "Some addresses may avoid fees" },
                  { risk: "Trading Lock Risk", level: "Low", note: "Owner must manually enable trading" },
                  { risk: "Swap Failure Handling", level: "Safe", note: "Swap errors are caught and logged, not reverted" },
                  { risk: "Mint Functionality", level: "Controlled", note: "Only internal minting, e.g., airdrop" },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col py-3 px-4 bg-bitaccess-black-light rounded-lg border border-red-500/10">
                    <div className="flex justify-between items-start">
                      <span className="text-gray-400">{item.risk}</span>
                      <span className={`font-semibold px-3 py-1 rounded-full text-sm ${
                        item.level === 'High' ? 'bg-red-500/20 text-red-400' :
                        item.level === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        item.level === 'Low' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {item.level}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 mt-2">{item.note}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Verdict */}
          <Card className="border-bitaccess-gold/40 bg-gradient-to-br from-bitaccess-gold/10 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-3xl">
                ✅ Verdict
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="font-semibold text-green-400 mb-2">Security: ✅ Pass</p>
                  <p className="text-sm text-gray-300">Well-structured, secure ERC20 with trading protection and no critical vulnerabilities found.</p>
                </div>
                
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="font-semibold text-green-400 mb-2">Functionality: ✅ Pass</p>
                  <p className="text-sm text-gray-300">Full support for fees, liquidity, and airdrops.</p>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="font-semibold text-yellow-400 mb-2">⚠️ Caution Points:</p>
                  <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                    <li>High token centralization among top holders.</li>
                    <li>Owner can adjust transaction taxes (within limits).</li>
                    <li>Whitelist allows exemptions.</li>
                  </ul>
                </div>

                <div className="p-6 bg-bitaccess-gold/10 border-2 border-bitaccess-gold/40 rounded-lg text-center">
                  <p className="text-2xl font-bold text-bitaccess-gold mb-2">
                    Final Audit Rating: 🟡 Moderate Risk (7/10)
                  </p>
                  <p className="text-sm text-gray-300">
                    While the contract is generally secure and transparent, the extremely high concentration of token supply and whitelist flexibility introduce potential manipulation or dumping risks, especially post-launch. Investors should monitor wallet activity and ensure liquidity is locked before investing.
                  </p>
                </div>
              </div>

              <div className="text-center pt-6">
                <Button 
                  onClick={handleDownloadPDF}
                  size="lg"
                  className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black font-semibold"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Full Audit Report (PDF)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer Note */}
          <div className="text-center mt-8 p-6 bg-bitaccess-black-light rounded-lg border border-bitaccess-gold/20">
            <p className="text-sm text-gray-400">
              This audit was conducted by <span className="text-bitaccess-gold font-semibold">BitX Security Audit</span>.
              <br />
              Running on <span className="font-semibold">BSC Mainnet</span> | 
              <a 
                href="https://binplorer.com/address/0xd3bde17ebd27739cf5505cd58ecf31cb628e469c" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-bitaccess-gold hover:underline ml-1"
              >
                View on Binexplorer
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Audit;