import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { bsc, bscTestnet } from 'wagmi/chains'
import { walletConnect, injected, metaMask } from 'wagmi/connectors'

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = 'f7b8c3b8a8b0d4e6f2c1a9b7e5d3c8f4' // Use your actual project ID

// 2. Create wagmiConfig
const metadata = {
  name: 'Bit Access',
  description: 'Bit Access Official Token Platform',
  url: 'https://bitaccess.lovable.app',
  icons: ['https://bitaccess.lovable.app/favicon.ico']
}

const chains = [bsc, bscTestnet] as const

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  connectors: [
    metaMask(),
    injected({
      target: 'trustWallet'
    }),
    walletConnect({ projectId, metadata, showQrModal: false })
  ]
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-color-mix': '#FFD700',
    '--w3m-color-mix-strength': 40,
    '--w3m-accent': '#FFD700',
    '--w3m-border-radius-master': '12px'
  },
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'  // Trust Wallet
  ]
})