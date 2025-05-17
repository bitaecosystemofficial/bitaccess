import { useState, useEffect } from 'react';
import { Course, VideoData, ContractResult } from '@/types/contracts';
import { contractService } from '@/services/ContractService';
import { contractAddresses } from '@/constants/contracts';

export const useEducationData = () => {
  const [educationData, setEducationData] = useState({
    courses: [
      {
        id: "blockchain101",
        title: "Blockchain 101",
        description: "Learn the fundamentals of blockchain technology and its applications",
        duration: "4 weeks",
        level: "Beginner",
        enrolledStudents: 1245,
        modules: [
          {
            title: "Introduction to Blockchain",
            description: "Understanding the basics of distributed ledger technology"
          },
          {
            title: "Consensus Mechanisms",
            description: "Proof of Work, Proof of Stake, and other consensus algorithms"
          },
          {
            title: "Smart Contracts",
            description: "Introduction to programmable blockchain agreements"
          }
        ]
      },
      {
        id: "bitcoin-crypto",
        title: "Bitcoin & Cryptocurrency",
        description: "Master the history, trading, and investment strategies in crypto",
        duration: "6 weeks",
        level: "Intermediate",
        enrolledStudents: 892,
        modules: [
          {
            title: "History of Bitcoin",
            description: "The origins and evolution of the first cryptocurrency"
          },
          {
            title: "Trading Strategies",
            description: "Techniques for successful cryptocurrency trading"
          },
          {
            title: "Investment Strategies",
            description: "Long-term investment approaches in the crypto market"
          }
        ]
      },
      {
        id: "web3-dapps",
        title: "Web3 & DApps",
        description: "Explore smart contracts, DeFi, and NFTs in the Web3 ecosystem",
        duration: "8 weeks",
        level: "Advanced",
        enrolledStudents: 567,
        modules: [
          {
            title: "Smart Contract Development",
            description: "Building decentralized applications with smart contracts"
          },
          {
            title: "Decentralized Finance (DeFi)",
            description: "Exploring lending, borrowing, and yield farming in DeFi"
          },
          {
            title: "Non-Fungible Tokens (NFTs)",
            description: "Creating and trading unique digital assets"
          }
        ]
      },
      {
        id: "evolution-money",
        title: "Evolution of Money & Payments",
        description: "Understand the journey from barter to digital currencies",
        duration: "3 weeks",
        level: "Beginner",
        enrolledStudents: 1023,
        modules: [
          {
            title: "From Barter to Coins",
            description: "The earliest forms of exchange and the invention of coinage"
          },
          {
            title: "Paper Money and Banking",
            description: "The rise of paper currency and modern banking systems"
          },
          {
            title: "Digital Payments",
            description: "The advent of electronic payments and digital currencies"
          }
        ]
      },
      {
        id: "bit-applications",
        title: "Applications of BIT",
        description: "Discover real-world use cases of Bitcoin and blockchain technology",
        duration: "5 weeks",
        level: "Intermediate",
        enrolledStudents: 734,
        modules: [
          {
            title: "Supply Chain Management",
            description: "Using blockchain to track and verify products"
          },
          {
            title: "Healthcare",
            description: "Securing patient data and improving healthcare services"
          },
          {
            title: "Voting Systems",
            description: "Creating transparent and secure voting platforms"
          }
        ]
      },
      {
        id: "future-bit",
        title: "Future of BIT & Digital Payments",
        description: "Explore trends, regulations, and innovations in digital payments",
        duration: "4 weeks",
        level: "Advanced",
        enrolledStudents: 456,
        modules: [
          {
            title: "Central Bank Digital Currencies (CBDCs)",
            description: "The potential impact of government-issued digital currencies"
          },
          {
            title: "Regulatory Landscape",
            description: "Navigating the legal and regulatory challenges of digital payments"
          },
          {
            title: "Innovations in Payment Technology",
            description: "Exploring new technologies like stablecoins and layer-2 solutions"
          }
        ]
      }
    ],
    videos: [
      {
        id: "intro-blockchain",
        title: "Introduction to Blockchain Technology",
        description: "A comprehensive introduction to blockchain technology, its history, and how it's revolutionizing industries worldwide.",
        thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=700&q=60",
        duration: "15:24",
        category: "beginner",
        level: "Beginner",
        instructor: "Dr. Sarah Johnson",
        views: 12453,
        likes: 856,
        requiresMembership: false,
        courseId: "blockchain101"
      },
      {
        id: "consensus-mechanisms",
        title: "Understanding Consensus Mechanisms",
        description: "Dive deep into various consensus mechanisms including Proof of Work, Proof of Stake, and Delegated Proof of Stake.",
        thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=700&q=60",
        duration: "23:15",
        category: "intermediate",
        level: "Intermediate",
        instructor: "Michael Chen",
        views: 8752,
        likes: 723,
        requiresMembership: true,
        courseId: "blockchain101"
      },
      {
        id: "smart-contracts",
        title: "Smart Contracts Explained",
        description: "Learn how smart contracts work, their applications, and how to create your own using Solidity.",
        thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=60",
        duration: "28:42",
        category: "intermediate",
        level: "Intermediate",
        instructor: "Alex Rodriguez",
        views: 7821,
        likes: 645,
        requiresMembership: true,
        courseId: "blockchain101"
      },
      {
        id: "bitcoin-fundamentals",
        title: "Bitcoin Fundamentals",
        description: "Explore the fundamentals of Bitcoin, how it works, and its role in the cryptocurrency ecosystem.",
        thumbnail: "https://images.unsplash.com/photo-1543699565-003b8adda5fc?auto=format&fit=crop&w=700&q=60",
        duration: "19:37",
        category: "beginner",
        level: "Beginner",
        instructor: "Emma Watson",
        views: 15678,
        likes: 1243,
        requiresMembership: false,
        courseId: "bitcoin-crypto"
      },
      {
        id: "crypto-trading",
        title: "Cryptocurrency Trading Strategies",
        description: "Master essential trading strategies to navigate the volatile cryptocurrency markets successfully.",
        thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=700&q=60",
        duration: "32:18",
        category: "intermediate",
        level: "Intermediate",
        instructor: "Robert Kim",
        views: 9876,
        likes: 854,
        requiresMembership: true,
        courseId: "bitcoin-crypto"
      },
      {
        id: "web3-intro",
        title: "Introduction to Web3",
        description: "Understand what Web3 is and how it's creating a decentralized internet powered by blockchain.",
        thumbnail: "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&w=700&q=60",
        duration: "21:45",
        category: "beginner",
        level: "Beginner",
        instructor: "David Miller",
        views: 11234,
        likes: 932,
        requiresMembership: false,
        courseId: "web3-dapps"
      },
      {
        id: "defi-explained",
        title: "DeFi Explained: The Future of Finance",
        description: "An in-depth look at Decentralized Finance, its components, and how it's disrupting traditional finance.",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=60",
        duration: "26:53",
        category: "advanced",
        level: "Advanced",
        instructor: "Sophia Martinez",
        views: 7432,
        likes: 623,
        requiresMembership: true,
        courseId: "web3-dapps"
      },
      {
        id: "nft-revolution",
        title: "The NFT Revolution",
        description: "Explore the world of Non-Fungible Tokens, their applications beyond art, and how to create and sell your own.",
        thumbnail: "https://images.unsplash.com/photo-1646815079055-74f3a78cf945?auto=format&fit=crop&w=700&q=60",
        duration: "24:17",
        category: "advanced",
        level: "Advanced",
        instructor: "James Wilson",
        views: 8965,
        likes: 742,
        requiresMembership: true,
        courseId: "web3-dapps"
      },
      {
        id: "evolution-money",
        title: "The Evolution of Money",
        description: "Trace the evolution of money from barter systems to digital currencies and understand the future of payments.",
        thumbnail: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=700&q=60",
        duration: "18:29",
        category: "beginner",
        level: "Beginner",
        instructor: "Laura Thompson",
        views: 10532,
        likes: 876,
        requiresMembership: false,
        courseId: "evolution-money"
      }
    ]
  });

  useEffect(() => {
    // Fetch education data from the blockchain
    const fetchEducationData = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
          console.log("Fetching education data from contract:", contractAddresses.education);
          
          // This will be replaced with actual contract calls in a production environment
          const educationContract = await contractService.getEducationContract();
          
          // In a real implementation, you would call contract methods like:
          // For each course ID, get the enrollment count
          // const enrollmentForCourse1 = await educationContract.getEnrolledStudents(courseId1);
          
          setEducationData(prev => ({
            ...prev,
            courses: prev.courses.map(course => ({
              ...course,
              enrolledStudents: course.enrolledStudents + Math.floor(Math.random() * 2)
            }))
          }));
        }
      } catch (error) {
        console.error("Error fetching education data:", error);
      }
    };

    fetchEducationData();
    const interval = setInterval(fetchEducationData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return educationData;
};

export const enrollInCourse = async (courseId: string, walletAddress: string): Promise<ContractResult> => {
  try {
    console.log("Enrolling in course:", courseId, "for address:", walletAddress);
    
    const educationContract = await contractService.getEducationContract();
    const tx = await educationContract.enrollInCourse(courseId);
    const receipt = await tx.wait();
    
    return { 
      success: true, 
      hash: receipt.transactionHash 
    };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};
