# BIT Access Smart Contracts

This directory contains all Solidity smart contracts for the BIT Access ecosystem.

## Contracts Overview

### 1. BITToken.sol
Main token contract for BIT Access token with the following features:
- ERC20 standard implementation
- Total supply: 100 Billion tokens
- 18 decimals
- Burnable functionality

### 2. Presale.sol
Token presale contract with:
- Multi-phase presale support
- BNB and USDT payment options
- Tiered bonus system
- Soft cap and hard cap
- Rate configuration

### 3. Staking.sol
Token staking contract with:
- Four staking tiers (Bronze, Silver, Gold, Diamond)
- Different APY rates per tier
- Lock periods
- Rewards claiming
- Auto-compound options

### 4. Airdrop.sol
Airdrop distribution contract with:
- Task-based rewards
- Eligibility verification
- Claim mechanism
- Phase management

### 5. Membership.sol
Membership and referral system:
- Card activation ($5 USDT)
- 1-year membership duration
- Multi-level referral rewards (10%, 5%, 3%)
- Rewards in BIT tokens
- Card management

### 6. Swap.sol
Token swap contract:
- Multi-token support
- Exchange rate management
- Swap fee (0.3%)
- Volume tracking

### 7. Dashboard.sol
User data aggregation:
- Centralized user data storage
- Balance tracking
- Staking info
- Membership status

### 8. Welcome.sol
Visit tracking:
- First visit recording
- Visit count tracking
- Analytics data

## Deployment Instructions

### Prerequisites
- Node.js v16+
- Hardhat or Truffle
- BSC Testnet/Mainnet RPC access
- Private key with BNB for gas

### Deployment Order
1. Deploy BITToken
2. Deploy Presale (pass BITToken address)
3. Deploy Staking (pass BITToken address)
4. Deploy Airdrop (pass BITToken address)
5. Deploy Membership (pass token addresses)
6. Deploy Swap (pass BITToken address)
7. Deploy Dashboard
8. Deploy Welcome

### Network Configuration

**BSC Mainnet:**
- Chain ID: 56
- RPC: https://bsc-dataseed.binance.org/
- Explorer: https://bscscan.com/

**BSC Testnet:**
- Chain ID: 97
- RPC: https://data-seed-prebsc-1-s1.binance.org:8545/
- Explorer: https://testnet.bscscan.com/
- Faucet: https://testnet.binance.org/faucet-smart

## Testing

Run tests with:
```bash
npx hardhat test
```

## Verification

Verify contracts on BSCScan:
```bash
npx hardhat verify --network bscTestnet <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

## Security

- All contracts use OpenZeppelin libraries
- ReentrancyGuard for sensitive functions
- Access control with Ownable
- Tested for common vulnerabilities

## License

MIT License
