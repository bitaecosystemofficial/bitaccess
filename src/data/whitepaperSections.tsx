
import { ReactNode } from "react";

// Define proper types for our sections
export interface SubSection {
  title: string;
  content: string | ReactNode;
}

export interface Section {
  title: string;
  id: string;
  content?: string | ReactNode;
  subsections?: SubSection[];
}

export const whitepaperSections: Section[] = [
  {
    id: "section-0",
    title: "The Evolution of Blockchain and the Rise of BIT Access",
    content: (
      <>
        <p className="text-gray-300 mb-4">
          As the blockchain ecosystem continued to evolve, so did the vision of BIT Access. The project set out to bridge the gap between traditional industries and blockchain technology, exploring the advantages of using cryptocurrencies and decentralized applications (DApps) in areas such as:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-300">
          <li>
            <strong>E-commerce:</strong> Revolutionizing online shopping by offering new payment methods, loyalty rewards, and rebate systems based on cryptocurrency.
          </li>
          <li>
            <strong>Business:</strong> Providing businesses with more efficient, secure, and transparent systems for transactions, supply chain management, and customer engagement.
          </li>
          <li>
            <strong>Education:</strong> Enabling educators and learners to interact in decentralized environments, tokenize learning content, and offer incentive-driven rewards using BIT tokens.
          </li>
          <li>
            <strong>Merchant Services:</strong> Empowering merchants to adopt decentralized payment systems, gain access to global markets, and benefit from lower transaction fees.
          </li>
        </ul>
        <p className="text-gray-300 mb-4">
          With the introduction of BIT Access, Dr. Duaso sought to create an ecosystem that provided individuals and businesses with the access and tools needed to thrive in an ever-changing digital landscape. The project aimed to tokenize assets and incentivize participation in the decentralized economy, creating a network of active users, consumers, educators, and merchants all contributing to a robust and dynamic ecosystem.
        </p>
        <h3 className="text-xl font-semibold text-white my-4">The Road Ahead: BIT Access as a Leading Digital Asset</h3>
        <p className="text-gray-300 mb-4">
          The concept of BIT Access goes beyond just cryptocurrency—it represents a shift in how digital assets and blockchain technologies will shape the future. By offering access to information, rewarding participants with tokens, and providing tools to foster innovation, BIT Access is positioned to become a leading force in the cryptocurrency and blockchain space.
        </p>
        <p className="text-gray-300 mb-4">
          BIT Access is not just about the future of decentralized finance (DeFi); it is about a larger vision of the future of digital assets in the next generation. Dr. Duaso and the team at BIT Access believe that BIT tokens will one day be recognized as one of the top digital assets in the cryptocurrency world.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li>
            <strong>Tokenized Assets:</strong> Through its Tokenomics, BIT Access will continue to grow in value as more users and businesses participate in the ecosystem.
          </li>
          <li>
            <strong>Global Expansion:</strong> As blockchain adoption accelerates, BIT Access is expanding into global markets, promoting the token's use in e-commerce, education, business services, and merchant solutions.
          </li>
          <li>
            <strong>Decentralized Economy:</strong> BIT Access envisions a world where traditional intermediaries are replaced by peer-to-peer transactions that ensure more equity, security, and transparency in all sectors.
          </li>
        </ul>
        <p className="text-gray-300 mt-4">
          With its focus on decentralization, transparency, and innovation, BIT Access is set to lead the way in the evolution of digital currencies and blockchain applications.
        </p>
      </>
    )
  },
  {
    id: "section-1",
    title: "1.0 Introduction",
    subsections: [
      { 
        title: "1.1 Overview of BIT Access", 
        content: "The BIT Access Ecosystem is an innovative, decentralized platform designed to bridge the gaps across industries such as e-commerce, education, and merchant services, offering a seamless, tokenized, and efficient way for users to interact with digital content, engage in transactions, and access services. The ecosystem is powered by BIT tokens, the native utility token, and is underpinned by blockchain technology, ensuring that all transactions, interactions, and data exchanges are transparent, secure, and verifiable." 
      },
      { 
        title: "1.2 Industry Challenges and Opportunities", 
        content: "BIT Access addresses key challenges in e-commerce (fragmented payment systems, customer loyalty issues), education (high costs, lack of personalized learning), and merchant services (high operational costs, limited financial inclusion). The ecosystem offers opportunities through tokenized rewards, cross-border low-cost payments, decentralized marketplaces, tokenized learning, and financial inclusion solutions." 
      },
      { 
        title: "1.3 The BIT Access Solution", 
        content: "The BIT Access Ecosystem provides solutions through decentralized finance, tokenized education, and decentralized e-commerce. By eliminating intermediaries and leveraging blockchain technology, BIT Access creates a more efficient, user-centric digital ecosystem that empowers individuals and businesses alike." 
      }
    ]
  },
  {
    id: "section-2",
    title: "2.0 Mission, Vision, and Values",
    subsections: [
      { 
        title: "2.1 Mission Statement", 
        content: "To create a decentralized ecosystem that empowers individuals, businesses, and educators by leveraging blockchain technology to enhance digital transactions and value exchange." 
      },
      { 
        title: "2.2 Vision Statement", 
        content: "To become a global leader in digital transformation across industries, creating a transparent, secure, and decentralized digital economy." 
      },
      { 
        title: "2.3 Core Values", 
        content: "Innovation: Commitment to continuous technological advancements. Decentralization: Empowering users by removing centralized control. Integrity: Maintaining transparency and ethical standards. Empowerment: Supporting users, educators, and businesses with decentralized financial tools. Sustainability: Building solutions that support long-term growth and have a positive social impact." 
      }
    ]
  },
  {
    id: "section-3",
    title: "3.0 The BIT Access Ecosystem",
    subsections: [
      { 
        title: "3.1 Decentralized E-Commerce Integration", 
        content: "BIT Access enables secure, transparent transactions through blockchain, eliminating intermediaries and reducing costs. Merchants benefit from payment systems with lower fees, tokenized loyalty programs that increase customer retention, and the ability to tap into global markets without currency conversion challenges." 
      },
      { 
        title: "3.2 Education and Professional Development", 
        content: "The ecosystem offers decentralized learning platforms where educators can create and sell courses while students access materials without traditional constraints. Blockchain credentialing ensures achievements are verified and secure, while tokenized rewards incentivize both learners and educators to engage and perform at their best." 
      },
      { 
        title: "3.3 Tokenized Incentive and Rewards System", 
        content: "BIT tokens function as the primary incentive within the ecosystem, rewarding consumers for purchases and engagement, educators for quality content, and merchants for driving traffic and transactions. Rebate programs, loyalty rewards, and community incentives promote ecosystem growth and participation." 
      },
      { 
        title: "3.4 Cross-Industry Innovation", 
        content: "The ecosystem facilitates cross-industry collaboration through interoperable blockchain solutions, enabling value exchange across e-commerce, education, healthcare, entertainment, and more. BIT tokens serve as a universal medium for transactions between different sectors, creating new business models and opportunities." 
      }
    ]
  },
  {
    id: "section-4",
    title: "4.0 The BIT Token",
    subsections: [
      { 
        title: "4.1 Overview of BIT Token", 
        content: "BIT token is a BEP-20 standard token on the Binance Smart Chain, with a maximum supply of 100,000,000,000 tokens. The token's smart contract address is 0xd3bde17ebd27739cf5505cd58ecf31cb628e469c, with a 3% tax applied to both buy and sell transactions to support ecosystem sustainability and growth." 
      },
      { 
        title: "4.2 Token Use Cases and Utility", 
        content: "BIT tokens enable e-commerce purchases and access to educational content with lower fees than traditional payment methods. Token holders can participate in staking programs and liquidity provision to earn rewards, while merchants can implement loyalty programs and rebates using BIT tokens to incentivize customer engagement." 
      }
    ]
  },
  {
    id: "section-5",
    title: "5.0 Roadmap and Milestones",
    subsections: [
      { 
        title: "5.1 Phases of Ecosystem Development", 
        content: "The BIT Access Ecosystem will evolve through multiple phases starting with the Foundation & Initial Launch (Dec 2024-Jan 2025), followed by User Base Expansion (Feb-Apr 2025), Platform Feature Refinement (May-Jul 2025), Advanced Technology Integration (Aug-Oct 2025), Global Outreach (Nov-Dec 2025), and Ecosystem Maturity (2026). Each phase focuses on specific aspects of growth and development to ensure sustainable progress." 
      },
      { 
        title: "5.2 Key Partnerships and Strategic Alliances", 
        content: "BIT Access will forge strategic partnerships with blockchain projects for interoperability, financial institutions for merchant adoption, education providers for tokenized learning, and key industry players like global e-commerce platforms and corporations to drive mainstream adoption of BIT tokens across various sectors." 
      }
    ]
  },
  {
    id: "section-6",
    title: "6.0 Technology Infrastructure",
    subsections: [
      { 
        title: "6.1 Blockchain Platform and Security", 
        content: "BIT Access operates on the Smart Chain (BSC) for its speed, low transaction costs, and EVM compatibility. Security measures include end-to-end encryption, multi-signature wallets, cryptographic hashing, decentralized consensus mechanism (DPoS), and regular third-party security audits to ensure user data and transactions remain protected." 
      },
      { 
        title: "6.2 Smart Contracts and Decentralized Applications (DApps)", 
        content: "Smart contracts automate transactions, escrow services, rebate programs, and staking rewards with transparency and security. DApps enable peer-to-peer transactions for e-commerce, tokenized educational content delivery, and decentralized marketplaces where users can trade goods and services directly." 
      },
      { 
        title: "6.3 Scalability and Performance", 
        content: "The platform features layered architecture for modular expansion, with plans to implement sharding and Layer-2 solutions for improved throughput. Cross-chain compatibility ensures interoperability across different blockchains, while performance optimizations include low latency transactions, optimized smart contracts, dynamic fee structures, and redundancy systems." 
      }
    ]
  },
  {
    id: "section-7",
    title: "7.0 Market Strategy and Growth",
    subsections: [
      { 
        title: "7.1 Marketing and User Acquisition", 
        content: "BIT Access employs airdrops, token incentives, referral programs, and influencer partnerships to attract early adopters. Marketing strategies include social media advertising, SEO/PPC campaigns, and content marketing, while conversion is optimized through user education and continuous UX improvements." 
      },
      { 
        title: "7.2 Global Expansion and Strategic Partnerships", 
        content: "The ecosystem will expand internationally through localized marketing campaigns and establishing presence in key blockchain markets. Strategic partnerships with global corporations, educational institutions, and cross-industry collaborations will drive token integration across diverse sectors and use cases." 
      },
      { 
        title: "7.3 Community Engagement and Incentives", 
        content: "Community growth is fostered through tokenized loyalty programs, regular airdrops, bounty campaigns, active social media interaction, community events, and engagement with DeFi communities. User feedback loops ensure the platform evolves based on community needs and preferences." 
      }
    ]
  },
  {
    id: "section-8",
    title: "8.0 Token Distribution and Fund Allocation",
    subsections: [
      { 
        title: "8.1 Token Distribution Overview", 
        content: "BIT tokens are distributed across various allocations: Presale (5%), Staking (1%), P2P (10%), Marketing (10%), Foundation (2%), Emergency Fund (2%), Airdrops & Bounty (1%), Management Team (3%), Company Reserved (15%), Creator Development (1%), DEX Liquidity (5%), CEX Liquidity (10%), and Project Development (35%). This balanced distribution ensures ecosystem sustainability and growth." 
      },
      { 
        title: "8.2 Fund Allocation for Ecosystem Development", 
        content: "Funds from token sales are allocated to Product Development (17%), Marketing (14%), Legal & Regulation (6%), Team (9%), Business Operations (9%), Advisors (4%), Taxes (5%), Contingency (5%), Community Rewards (8%), Partnerships (5%), Charity Works (4%), and Company Funds (10%) to support all aspects of ecosystem growth." 
      },
      { 
        title: "8.3 Governance and Community Participation", 
        content: "BIT Access implements a decentralized governance model where token holders vote on key decisions such as platform upgrades and protocol changes. A DAO-like structure allows users to propose and implement changes, while active community engagement ensures the ecosystem evolves according to user needs." 
      }
    ]
  },
  {
    id: "section-9",
    title: "9.0 Legal Considerations and Regulatory Compliance",
    subsections: [
      { 
        title: "9.1 Legal Framework", 
        content: "BIT Access operates within a robust legal framework that includes a centralized management structure overseeing decentralized components, proper token classification as a utility token, compliance with blockchain laws, adherence to data protection regulations (GDPR/CCPA), AML/KYC procedures, intellectual property protections, and clear dispute resolution mechanisms." 
      },
      { 
        title: "9.2 Regulatory Compliance", 
        content: "The ecosystem maintains regulatory compliance across key markets including the US (SEC/CFTC/FinCEN), EU (MiCA), UK (FCA), Asia-Pacific, and Latin America. It adheres to international standards like FATF guidelines and anti-terrorism financing regulations, with regular audits, a dedicated legal advisory board, and ongoing engagement with regulators." 
      }
    ]
  },
  {
    id: "section-10",
    title: "10.0 Team and Advisors",
    subsections: [
      { title: "10.1 Executive Team", content: "Profiles of the core team leading BIT Access development." },
      { title: "10.2 Advisory Board", content: "Overview of expert advisors guiding strategic decisions." },
      { title: "10.3 Strategic Partners", content: "Key strategic partnerships advancing the BIT Access ecosystem." }
    ]
  },
  {
    id: "section-11",
    title: "11.0 Final Statements",
    subsections: [
      { 
        title: "11.1 Summary of Benefits", 
        content: (
          <>
            <p className="text-gray-300 mb-4">
              BIT Access stands as a pioneering decentralized platform designed to revolutionize e-commerce, education, and financial services through the power of blockchain technology. By offering a secure, transparent, and scalable ecosystem, BIT Access empowers individuals and businesses to engage in peer-to-peer transactions, access educational resources, and take part in DeFi innovations. The key benefits of joining the BIT Access ecosystem include:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-300">
              <li>
                <strong>Decentralization:</strong> A blockchain-based platform that enables secure, trustless transactions without the need for intermediaries.
              </li>
              <li>
                <strong>Incentive Programs:</strong> Tokenized rewards for users engaging with the platform, including staking, loyalty programs, and educational participation.
              </li>
              <li>
                <strong>Scalability:</strong> A platform designed to grow with the market, with a strong focus on performance, low transaction costs, and scalability across multiple industries.
              </li>
              <li>
                <strong>Transparency and Security:</strong> Built on the Smart Chain (BSC) and leveraging cryptographic protocols, BIT Access offers a secure and transparent environment for users to transact.
              </li>
              <li>
                <strong>Governance:</strong> Community-driven governance, enabling token holders to influence platform development and decisions.
              </li>
              <li>
                <strong>Global Reach:</strong> Strategic partnerships across industries to expand the platform's global footprint and bring together merchants, educators, and investors.
              </li>
            </ul>
          </>
        )
      },
      { 
        title: "11.2 Call to Action", 
        content: (
          <>
            <p className="text-gray-300 mb-4">
              BIT Access invites you to be part of this revolutionary ecosystem. Whether you're looking to invest, stake, or become a part of the growing decentralized economy, this is your opportunity to join a transformative platform. Participate in the presale, explore staking programs, and engage with the community to help shape the future of the platform.
            </p>
            <p className="text-gray-300 font-medium">
              Together, we can build a transparent, secure, and inclusive ecosystem for all. Join BIT Access today, and be a part of the future!
            </p>
          </>
        )
      }
    ]
  }
];
