import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock, Rocket } from "lucide-react";

const Roadmap = () => {
  const roadmapPhases = [
    {
      quarter: "Q4 2024",
      status: "completed",
      title: "Foundation & Launch",
      items: [
        "Smart contract development and deployment",
        "Website and platform launch",
        "Initial community building",
        "Security audit completion",
        "Whitepaper release"
      ]
    },
    {
      quarter: "Q1 2025",
      status: "completed",
      title: "Ecosystem Expansion",
      items: [
        "Airdrop campaign launch",
        "Staking platform activation",
        "Community governance implementation",
        "Partnership announcements",
        "Marketing campaign rollout"
      ]
    },
    {
      quarter: "Q2 2025",
      status: "completed",
      title: "Platform Enhancement",
      items: [
        "Mobile app development",
        "Enhanced wallet integration",
        "Referral program launch",
        "Community rewards system",
        "Trading volume milestones"
      ]
    },
    {
      quarter: "Q3 2025",
      status: "completed",
      title: "Growth & Integration",
      items: [
        "Cross-chain bridge development",
        "Strategic partnerships expansion",
        "NFT marketplace integration",
        "Advanced analytics dashboard",
        "Community voting mechanisms"
      ]
    },
    {
      quarter: "Q4 2025",
      status: "in-progress",
      title: "Pre-Exchange Preparation",
      items: [
        "DEX listing preparations and documentation",
        "Enhanced liquidity pool management",
        "Advanced security audits",
        "Market maker partnerships",
        "Global marketing campaign intensification"
      ],
      progress: "Currently finalizing DEX listing requirements and expanding market maker network"
    },
    {
      quarter: "Q1 2026",
      status: "upcoming",
      title: "DEX Exchange Launch 🚀",
      items: [
        "Official DEX listing on major platforms",
        "PancakeSwap and Uniswap integration",
        "Liquidity provision programs",
        "Trading competitions and incentives",
        "Mass adoption marketing campaign"
      ]
    },
    {
      quarter: "Q2 2026",
      status: "upcoming",
      title: "Post-DEX Growth",
      items: [
        "Additional DEX listings",
        "Enhanced trading features",
        "Institutional partnerships",
        "Advanced DeFi integrations",
        "Community expansion initiatives"
      ]
    },
    {
      quarter: "Q3 2026",
      status: "upcoming",
      title: "CEX Exchange Launch 🎯",
      items: [
        "Centralized exchange listings (Binance, KuCoin, etc.)",
        "Fiat on-ramp integrations",
        "Global payment partnerships",
        "Enterprise solutions launch",
        "Mainstream media coverage"
      ]
    },
    {
      quarter: "Q4 2026",
      status: "upcoming",
      title: "Ecosystem Maturity",
      items: [
        "Multi-chain expansion",
        "Advanced governance features",
        "Enterprise API launch",
        "Global merchant adoption",
        "Sustainable growth initiatives"
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case "in-progress":
        return <Clock className="h-6 w-6 text-bitaccess-gold" />;
      case "upcoming":
        return <Circle className="h-6 w-6 text-gray-500" />;
      default:
        return <Circle className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-500 border-green-500/30";
      case "in-progress":
        return "bg-bitaccess-gold/20 text-bitaccess-gold border-bitaccess-gold/30";
      case "upcoming":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container px-4 md:px-8 max-w-6xl">
          <SectionHeading
            title="BIT Access Roadmap"
            subtitle="Our journey from launch to global adoption - tracking progress and future milestones"
            centered
          />

          {/* Vision Statement */}
          <div className="mt-12 mb-16 bg-bitaccess-black-light p-8 rounded-xl border border-bitaccess-gold/20">
            <h2 className="text-2xl font-bold text-bitaccess-gold mb-4 flex items-center gap-3">
              <Rocket className="h-6 w-6" />
              Our Vision
            </h2>
            <p className="text-gray-400 leading-relaxed">
              BIT Access is committed to creating a comprehensive blockchain ecosystem that bridges traditional 
              finance with decentralized technologies. Our roadmap reflects our dedication to innovation, security, 
              and community-driven growth. From our successful launch in Q4 2024 to our upcoming DEX listing in 
              Q1 2026 and CEX expansion in Q3 2026, we're building a sustainable platform for the future of finance.
            </p>
          </div>

          {/* Roadmap Timeline */}
          <div className="space-y-8">
            {roadmapPhases.map((phase, index) => (
              <Card 
                key={index} 
                className={`bg-bitaccess-black-light border transition-all ${
                  phase.status === "in-progress" 
                    ? "border-bitaccess-gold shadow-lg shadow-bitaccess-gold/20" 
                    : "border-bitaccess-gold/20 hover:border-bitaccess-gold/40"
                }`}
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(phase.status)}
                      <div>
                        <CardTitle className="text-white text-xl md:text-2xl">
                          {phase.quarter}
                        </CardTitle>
                        <p className="text-bitaccess-gold font-semibold mt-1">{phase.title}</p>
                      </div>
                    </div>
                    <Badge className={`${getStatusBadge(phase.status)} uppercase text-xs font-semibold`}>
                      {phase.status === "in-progress" ? "Current Phase" : phase.status.replace("-", " ")}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {phase.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-400">
                        <div className={`mt-1 ${
                          phase.status === "completed" 
                            ? "text-green-500" 
                            : phase.status === "in-progress"
                            ? "text-bitaccess-gold"
                            : "text-gray-500"
                        }`}>
                          {phase.status === "completed" ? "✓" : "•"}
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {phase.progress && (
                    <div className="mt-4 pt-4 border-t border-bitaccess-gold/20">
                      <p className="text-sm text-bitaccess-gold font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Current Progress
                      </p>
                      <p className="text-sm text-gray-400 mt-2">{phase.progress}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Beyond 2026 */}
          <div className="mt-16 bg-gradient-to-br from-bitaccess-gold/10 to-bitaccess-black-light p-8 rounded-xl border border-bitaccess-gold/30">
            <h2 className="text-2xl font-bold text-bitaccess-gold mb-6">Beyond 2026</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Our long-term vision extends beyond 2026 as we continue to innovate and expand the BIT Access ecosystem:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Technology Innovation</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• Layer 2 scaling solutions</li>
                  <li>• AI-powered trading tools</li>
                  <li>• Quantum-resistant security</li>
                  <li>• Advanced DeFi protocols</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Global Expansion</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• Worldwide merchant network</li>
                  <li>• Regional payment systems</li>
                  <li>• International partnerships</li>
                  <li>• Multi-language platform support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Roadmap;
