
// Update the mock data service to ensure it properly provides fallback data for the DEX analytics

interface TokenInfoMock {
  price: number;
  priceChange24h: number;
  priceChange7d: number;
  volume24h: number;
  marketCap: number;
  holders: number;
}

interface MockData {
  tokenInfo: TokenInfoMock;
  transactions: any[];
  holders: any[];
}

// Mock token transactions with realistic data
export const mockTokenTransactions = [
  {
    hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
    timeStamp: (Math.floor(Date.now() / 1000) - 60).toString(), // 1 minute ago
    from: "0x1234567890123456789012345678901234567890",
    to: "0x7a42F1196271B5A68A36FA0D6A61F85A6cFA7E12",
    value: "1000000000000", // 1,000,000 tokens with 9 decimals
    tokenSymbol: "BIT"
  },
  {
    hash: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3",
    timeStamp: (Math.floor(Date.now() / 1000) - 3600).toString(), // 1 hour ago
    from: "0x7a42F1196271B5A68A36FA0D6A61F85A6cFA7E12",
    to: "0x2345678901234567890123456789012345678901",
    value: "2500000000000", // 2,500,000 tokens with 9 decimals
    tokenSymbol: "BIT"
  },
  {
    hash: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4",
    timeStamp: (Math.floor(Date.now() / 1000) - 7200).toString(), // 2 hours ago
    from: "0x3456789012345678901234567890123456789012",
    to: "0x7a42F1196271B5A68A36FA0D6A61F85A6cFA7E12",
    value: "5000000000000", // 5,000,000 tokens with 9 decimals
    tokenSymbol: "BIT"
  },
  {
    hash: "0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5",
    timeStamp: (Math.floor(Date.now() / 1000) - 14400).toString(), // 4 hours ago
    from: "0x4567890123456789012345678901234567890123",
    to: "0x5678901234567890123456789012345678901234",
    value: "7500000000000", // 7,500,000 tokens with 9 decimals
    tokenSymbol: "BIT"
  },
  {
    hash: "0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6",
    timeStamp: (Math.floor(Date.now() / 1000) - 28800).toString(), // 8 hours ago
    from: "0x5678901234567890123456789012345678901234",
    to: "0x6789012345678901234567890123456789012345",
    value: "10000000000000", // 10,000,000 tokens with 9 decimals
    tokenSymbol: "BIT"
  }
];

// Mock holder distribution data
export const mockHolderDistribution = [
  { addressRange: "0-1000", holders: 2519, percentage: 51.7 },
  { addressRange: "1000-10000", holders: 1685, percentage: 34.6 },
  { addressRange: "10000-100000", holders: 421, percentage: 8.6 },
  { addressRange: "100000-1000000", holders: 201, percentage: 4.1 },
  { addressRange: "1000000+", holders: 46, percentage: 0.9 }
];

// Function to get all mock data
export const getMockData = (): MockData => {
  return {
    tokenInfo: {
      price: 0.00000275,
      priceChange24h: 3.21,
      priceChange7d: -1.89,
      volume24h: 156728,
      marketCap: 2750000,
      holders: 4872
    },
    transactions: mockTokenTransactions,
    holders: mockHolderDistribution
  };
};
