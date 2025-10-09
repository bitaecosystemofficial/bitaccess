import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { CheckCircle, Circle, Clock } from "lucide-react";

const Roadmap = () => {
  const roadmapPhases = [
    {
      quarter: "Q1 2024",
      status: "completed",
      title: "Foundation & Launch",
      items: [
        "Platform development and testing",
        "Smart contract deployment on BSC",
        "Website and documentation launch",
        "Community building initiatives",
        "Initial marketing campaigns"
      ]
    },
    {
      quarter: "Q2 2024",
      status: "completed",
      title: "Ecosystem Expansion",
      items: [
        "Token presale launch",
        "Airdrop campaign activation",
        "Staking platform release",
        "Membership system implementation",
        "Strategic partnerships announcement"
      ]
    },
    {
      quarter: "Q3 2024",
      status: "in-progress",
      title: "Growth & Integration",
      items: [
        "DEX integration and swap functionality",
        "Mobile app development",
        "Community rewards program",
        "Enhanced security audits",
        "Marketing expansion to Asia-Pacific"
      ]
    },
    {
      quarter: "Q4 2024",
      status: "upcoming",
      title: "Advanced Features",
      items: [
        "Cross-chain bridge development",
        "NFT marketplace integration",
        "Advanced trading tools",
        "Institutional partnerships",
        "Global exchange listings"
      ]
    },
    {
      quarter: "Q1 2025",
      status: "upcoming",
      title: "DeFi Expansion",
      items: [
        "Lending and borrowing protocols",
        "Yield farming opportunities",
        "DAO governance implementation",
        "Layer 2 scaling solutions",
        "Enterprise blockchain solutions"
      ]
    },
    {
      quarter: "Q2 2025",
      status: "upcoming",
      title: "Metaverse Integration",
      items: [
        "Virtual world partnerships",
        "Metaverse token utilities",
        "Virtual events and conferences",
        "Gaming integrations",
        "AR/VR experiences"
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "in-progress":
        return <Clock className="h-6 w-6 text-bitaccess-gold" />;
      default:
        return <Circle className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "in-progress":
        return "bg-bitaccess-gold/20 text-bitaccess-gold border-bitaccess-gold/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container px-4 md:px-8 max-w-6xl">
          <SectionHeading
            title="Project Roadmap"
            subtitle="Our journey to building a comprehensive blockchain ecosystem"
            centered
          />

          {/* Vision Statement */}
          <div className="mt-12 mb-16 bg-bitaccess-black-light p-8 rounded-xl border border-bitaccess-gold/20">
            <h2 className="text-2xl font-bold text-bitaccess-gold mb-4 text-center">Our Vision</h2>
            <p className="text-gray-400 leading-relaxed text-center max-w-3xl mx-auto">
              To create the most accessible and comprehensive blockchain ecosystem that empowers individuals and
              businesses worldwide. We're committed to continuous innovation and delivering value to our community
              at every step of our journey.
            </p>
          </div>

          {/* Roadmap Timeline */}
          <div className="space-y-8">
            {roadmapPhases.map((phase, index) => (
              <div
                key={index}
                className={`relative bg-bitaccess-black-light p-6 md:p-8 rounded-xl border-2 transition-all ${
                  phase.status === "completed"
                    ? "border-green-500/30"
                    : phase.status === "in-progress"
                    ? "border-bitaccess-gold/50"
                    : "border-gray-500/20"
                }`}
              >
                {/* Timeline Connector */}
                {index < roadmapPhases.length - 1 && (
                  <div className="hidden md:block absolute left-12 top-full h-8 w-0.5 bg-gradient-to-b from-bitaccess-gold/50 to-transparent" />
                )}

                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Status Icon */}
                  <div className="flex items-center gap-3">
                    {getStatusIcon(phase.status)}
                    <div>
                      <h3 className="text-xl font-bold text-white">{phase.quarter}</h3>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                          phase.status
                        )} mt-1`}
                      >
                        {phase.status === "completed"
                          ? "Completed"
                          : phase.status === "in-progress"
                          ? "In Progress"
                          : "Upcoming"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-bitaccess-gold mb-3">{phase.title}</h4>
                    <ul className="space-y-2">
                      {phase.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2 text-gray-400">
                          <span className="text-bitaccess-gold mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Future Plans */}
          <div className="mt-16 bg-gradient-to-r from-bitaccess-black-light to-bitaccess-black p-8 rounded-xl border border-bitaccess-gold/20">
            <h2 className="text-2xl font-bold text-bitaccess-gold mb-4 text-center">Beyond 2025</h2>
            <p className="text-gray-400 text-center max-w-3xl mx-auto mb-6">
              We're continuously planning for the future, with initiatives focused on:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="text-center p-4 bg-bitaccess-black rounded-lg border border-bitaccess-gold/10">
                <h4 className="text-white font-semibold mb-2">Global Expansion</h4>
                <p className="text-sm text-gray-400">Worldwide partnerships and market penetration</p>
              </div>
              <div className="text-center p-4 bg-bitaccess-black rounded-lg border border-bitaccess-gold/10">
                <h4 className="text-white font-semibold mb-2">Technology Innovation</h4>
                <p className="text-sm text-gray-400">Cutting-edge blockchain solutions and integrations</p>
              </div>
              <div className="text-center p-4 bg-bitaccess-black rounded-lg border border-bitaccess-gold/10">
                <h4 className="text-white font-semibold mb-2">Community Growth</h4>
                <p className="text-sm text-gray-400">Expanding our user base to millions worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Roadmap;
