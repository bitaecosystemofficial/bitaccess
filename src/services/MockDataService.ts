
import { TokenTransaction } from "./BscscanService";

export const mockTokenInfo = {
  price: 0.00000275,
  priceChange24h: 2.14,
  priceChange7d: -1.27,
  volume24h: 124357,
  marketCap: 2750000,
  holders: 4872,
};

export const mockTokenTransactions: TokenTransaction[] = [
  {
    hash: "0x7c8d3bd5705059a58853f67a571d0350a10a2381a9921e7250a87173b6012f14",
    from: "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE",
    to: "0x28C6c06298d514Db089934071355E5743bf21d60",
    value: "1250000",
    timestamp: new Date().getTime() - 300000, // 5 minutes ago
    isSuccess: true,
  },
  {
    hash: "0x9e8d7b2e28154e3c49b47522d0d8ba9f41a7bb716dae616cd54bb4baa2d63392",
    from: "0x28C6c06298d514Db089934071355E5743bf21d60",
    to: "0x876Eabf441B2EE5B5b0554Fd502a8E0600950cFa",
    value: "750000",
    timestamp: new Date().getTime() - 600000, // 10 minutes ago
    isSuccess: true,
  },
  {
    hash: "0x3c8b2f960654a09ee68f01b9b3a6b24dc30e0954599e88c69ebb129eede242ec",
    from: "0x4B834Dc19bA6Ee92B3cFcCF127E97757C7473F3d",
    to: "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE",
    value: "2500000",
    timestamp: new Date().getTime() - 1800000, // 30 minutes ago
    isSuccess: true,
  },
  {
    hash: "0x1e8d7b2e28154e3c49b47522d0d8ba9f41a7bb716dae616cd54bb4baa2d63392",
    from: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    to: "0x28C6c06298d514Db089934071355E5743bf21d60",
    value: "1000000",
    timestamp: new Date().getTime() - 3600000, // 1 hour ago
    isSuccess: true,
  },
  {
    hash: "0x5c8b2f960654a09ee68f01b9b3a6b24dc30e0954599e88c69ebb129eede242ec",
    from: "0x28C6c06298d514Db089934071355E5743bf21d60",
    to: "0x876Eabf441B2EE5B5b0554Fd502a8E0600950cFa",
    value: "500000",
    timestamp: new Date().getTime() - 7200000, // 2 hours ago
    isSuccess: true,
  },
  {
    hash: "0x6c8d3bd5705059a58853f67a571d0350a10a2381a9921e7250a87173b6012f14",
    from: "0x876Eabf441B2EE5B5b0554Fd502a8E0600950cFa",
    to: "0x4B834Dc19bA6Ee92B3cFcCF127E97757C7473F3d",
    value: "1750000",
    timestamp: new Date().getTime() - 10800000, // 3 hours ago
    isSuccess: true,
  },
];

export const mockHoldersDistribution = [
  { category: "Top 10 holders", percentage: 68.5 },
  { category: "Top 50 holders", percentage: 84.3 },
  { category: "Top 100 holders", percentage: 91.2 },
  { category: "Top 500 holders", percentage: 97.8 },
  { category: "All other holders", percentage: 2.2 },
];

export const mockPriceHistory = [
  { date: new Date().getTime() - 86400000 * 30, price: 0.00000235 }, // 30 days ago
  { date: new Date().getTime() - 86400000 * 25, price: 0.00000242 }, // 25 days ago
  { date: new Date().getTime() - 86400000 * 20, price: 0.00000238 }, // 20 days ago
  { date: new Date().getTime() - 86400000 * 15, price: 0.00000250 }, // 15 days ago
  { date: new Date().getTime() - 86400000 * 10, price: 0.00000260 }, // 10 days ago
  { date: new Date().getTime() - 86400000 * 5, price: 0.00000270 }, // 5 days ago
  { date: new Date().getTime() - 86400000 * 4, price: 0.00000268 }, // 4 days ago
  { date: new Date().getTime() - 86400000 * 3, price: 0.00000272 }, // 3 days ago
  { date: new Date().getTime() - 86400000 * 2, price: 0.00000271 }, // 2 days ago
  { date: new Date().getTime() - 86400000, price: 0.00000269 }, // Yesterday
  { date: new Date().getTime(), price: 0.00000275 }, // Today
];

export const getMockData = () => {
  return {
    tokenInfo: mockTokenInfo,
    transactions: mockTokenTransactions,
    holdersDistribution: mockHoldersDistribution,
    priceHistory: mockPriceHistory
  };
};
