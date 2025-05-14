
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Define features globally to fix the TokenSection error
// This is a temporary fix until we can properly refactor TokenSection.tsx
window.features = [
  {
    title: "Rewards System",
    description: "Earn BIT tokens through community participation, staking, and ecosystem activities.",
    icon: "trophy"
  },
  {
    title: "Community Governance",
    description: "Token holders can vote on important ecosystem decisions and proposals.",
    icon: "users"
  },
  {
    title: "Educational Incentives",
    description: "Learn about blockchain and earn rewards through our educational platform.",
    icon: "book-open"
  },
  {
    title: "Cross-Chain Compatibility",
    description: "Utilize BIT tokens across multiple blockchain networks seamlessly.",
    icon: "link"
  },
  {
    title: "Community Engagement",
    description: "Participate in community events, challenges and earn rewards.",
    icon: "message-circle"
  }
];

createRoot(document.getElementById("root")!).render(<App />);
