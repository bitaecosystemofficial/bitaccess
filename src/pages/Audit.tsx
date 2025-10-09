import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  CheckCircle2, 
  AlertTriangle, 
  Download,
  Lock,
  Users,
  TrendingUp,
  FileCheck,
  Coins,
  Activity
} from "lucide-react";
import { toast } from "sonner";

const Audit = () => {
  const handleDownloadPDF = () => {
    toast.info("PDF download will be available soon");
  };

  return (
    <Layout>
      <div className="py-12 md:py-20 min-h-screen">
        <div className="container px-4 md:px-8 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-bitaccess-gold/10 px-6 py-3 rounded-full mb-6">
              <Shield className="h-6 w-6 text-bitaccess-gold" />
              <span className="text-bitaccess-gold font-semibold">Security Audit Report</span>
            </div>
            <SectionHeading
              title="BIT Token Smart Contract Audit"
              subtitle="Comprehensive security analysis by BitX Security - ensuring safety and transparency"
              centered
            />
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-sm px-4 py-1">
                ✓ Verified Safe
              </Badge>
              <Badge className="bg-bitaccess-gold/20 text-bitaccess-gold border-bitaccess-gold/30 text-sm px-4 py-1">
                Professional Audit
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30 text-sm px-4 py-1">
                BSC Verified
              </Badge>
            </div>
          </div>

          {/* Download Button */}
          <div className="flex justify-center mb-12">
            <Button 
              onClick={handleDownloadPDF}
              className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-semibold px-8 py-6 text-lg"
              size="lg"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Full Audit Report (PDF)
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Card className="bg-green-500/10 border-green-500/30">
              <CardContent className="pt-6 text-center">
                <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-500 mb-1">100%</p>
                <p className="text-xs text-gray-400">Security Score</p>
              </CardContent>
            </Card>
            <Card className="bg-bitaccess-gold/10 border-bitaccess-gold/30">
              <CardContent className="pt-6 text-center">
                <FileCheck className="h-8 w-8 text-bitaccess-gold mx-auto mb-2" />
                <p className="text-2xl font-bold text-bitaccess-gold mb-1">0</p>
                <p className="text-xs text-gray-400">Critical Issues</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-500/10 border-blue-500/30">
              <CardContent className="pt-6 text-center">
                <Lock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-500 mb-1">Secure</p>
                <p className="text-xs text-gray-400">Contract Status</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-500/10 border-purple-500/30">
              <CardContent className="pt-6 text-center">
                <Activity className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-500 mb-1">Live</p>
                <p className="text-xs text-gray-400">On BSC Mainnet</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Contract Overview */}
            <Card className="bg-bitaccess-black-light border-bitaccess-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-bitaccess-gold">
                  <Coins className="h-6 w-6" />
                  Token Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Token Name:</span>
                  <span className="text-white font-medium">BIT Access Token</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Symbol:</span>
                  <span className="text-white font-medium">BIT</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Total Supply:</span>
                  <span className="text-white font-medium">100,000,000,000 BIT</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Decimals:</span>
                  <span className="text-white font-medium">9</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">Blockchain:</span>
                  <span className="text-white font-medium">Binance Smart Chain (BEP-20)</span>
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card className="bg-bitaccess-black-light border-bitaccess-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-bitaccess-gold">
                  <Shield className="h-6 w-6" />
                  Security Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  {[
                    "Ownership Renounced - No single point of control",
                    "Liquidity Locked - Ensures long-term stability",
                    "No Mint Function - Fixed supply protection",
                    "Anti-Whale Mechanism - Fair distribution",
                    "Verified Contract - Transparent and auditable"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Tokenomics */}
          <Card className="bg-bitaccess-black-light border-bitaccess-gold/20 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-bitaccess-gold">
                <TrendingUp className="h-6 w-6" />
                Tokenomics & Fee Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-bitaccess-black/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-2">Total Supply</p>
                  <p className="text-2xl font-bold text-white">100B BIT</p>
                  <p className="text-xs text-gray-500 mt-1">Fixed & Immutable</p>
                </div>
                <div className="bg-bitaccess-black/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-2">Transaction Fee</p>
                  <p className="text-2xl font-bold text-bitaccess-gold">2%</p>
                  <p className="text-xs text-gray-500 mt-1">Per Transaction</p>
                </div>
                <div className="bg-bitaccess-black/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-2">Max Transaction</p>
                  <p className="text-2xl font-bold text-blue-500">1%</p>
                  <p className="text-xs text-gray-500 mt-1">Of Total Supply</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Distribution */}
          <Card className="bg-bitaccess-black-light border-bitaccess-gold/20 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-bitaccess-gold">
                <Users className="h-6 w-6" />
                Token Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: "Liquidity Pool", percentage: 40, color: "bg-blue-500" },
                  { label: "Presale", percentage: 25, color: "bg-bitaccess-gold" },
                  { label: "Staking Rewards", percentage: 15, color: "bg-green-500" },
                  { label: "Team & Development", percentage: 10, color: "bg-purple-500" },
                  { label: "Marketing", percentage: 10, color: "bg-pink-500" }
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="text-white font-medium">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className={`${item.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risks & Considerations */}
          <Card className="bg-bitaccess-black-light border-yellow-500/20 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-yellow-500">
                <AlertTriangle className="h-6 w-6" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p className="text-gray-300">
                  All smart contracts carry inherent risks. While BIT Token has been thoroughly audited and implements 
                  industry-standard security measures, users should be aware of:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="text-gray-400">• Market volatility and price fluctuations</li>
                  <li className="text-gray-400">• General cryptocurrency market risks</li>
                  <li className="text-gray-400">• Regulatory changes in different jurisdictions</li>
                  <li className="text-gray-400">• Smart contract interaction dependencies</li>
                </ul>
                <p className="text-green-500 font-medium mt-4">
                  ✓ No critical security vulnerabilities identified
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Final Verdict */}
          <Card className="bg-gradient-to-br from-green-500/10 to-bitaccess-gold/10 border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-green-500 text-xl">
                <CheckCircle2 className="h-7 w-7" />
                Audit Verdict
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-lg font-medium mb-3">
                APPROVED - Safe for Trading and Investment
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                The BIT Access Token smart contract has successfully passed comprehensive security audits. 
                The contract implements robust security measures, follows best practices, and shows no critical 
                vulnerabilities. The tokenomics are transparent, and the distribution model is fair and sustainable.
              </p>
              <div className="bg-bitaccess-black/50 p-4 rounded-lg border border-bitaccess-gold/20 mt-6">
                <p className="text-sm text-gray-400 mb-2">Powered by</p>
                <p className="text-bitaccess-gold font-bold text-lg">BitX Security Audit</p>
                <p className="text-xs text-gray-500 mt-1">Professional Smart Contract Auditing Services</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Audit;
