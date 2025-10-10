
export const contractAddresses = {
  presale: '0x1234567890123456789012345678901234567890',
  airdrop: '0x0987654321098765432109876543210987654321',
  staking: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
  swap: '0xfedcbafedcbafedcbafedcbafedcbafedcbafedc',
  merchants: '0x123abc123abc123abc123abc123abc123abc123a',
  spinWheel: '0xabcd1234abcd1234abcd1234abcd1234abcd1234',
  token: '0xd3bde17ebd27739cf5505cd58ecf31cb628e469c',
  education: '0x9999888877776666555544443333222211110000',
  membership: '0xd3bde17ebd27739cf5505cd58ecf31cb628e469c', // Using BIT token contract for membership
  marketplace: '0x4567890123456789012345678901234567890123',
  governance: '0x7890123456789012345678901234567890123456',
  dashboard: '0x1111222233334444555566667777888899990000', // Dashboard contract
  welcome: '0x0000999988887777666655554444333322221111'   // Welcome contract
};

export const networkInfo = {
  name: "BSC Mainnet",
  chainId: 56, // BSC Mainnet chain ID
  currency: "BNB",
  rpcUrl: "https://bsc-dataseed.binance.org/",
  blockExplorerUrl: "https://binplorer.com/",
  testnet: false
};

// Token addresses for membership rewards - Real BSC Mainnet addresses
export const tokenAddresses = {
  usdt: '0x55d398326f99059fF775485246999027B3197955', // Real USDT on BSC Mainnet
  usdc: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', // Real USDC on BSC Mainnet
  btcb: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', // Real BTCB on BSC Mainnet
  bnb: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // Real WBNB on BSC Mainnet
  bit: '0xd3bde17ebd27739cf5505cd58ecf31cb628e469c' // BIT Token
};
