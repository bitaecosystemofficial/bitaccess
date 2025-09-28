import { useAccount, useBalance, useChainId } from 'wagmi'
import { bsc } from 'wagmi/chains'
import { formatEther } from 'viem'

export const useWeb3Wallet = () => {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  
  const { data: balance } = useBalance({
    address: address,
  })

  const { data: tokenBalance } = useBalance({
    address: address,
    token: '0xd3bde17ebd27739cf5505cd58ecf31cb628e469c' as `0x${string}`, // BIT token address
  })

  return {
    address,
    isConnected,
    chainId,
    isCorrectNetwork: chainId === bsc.id,
    balance: balance ? parseFloat(formatEther(balance.value)) : 0,
    tokenBalance: tokenBalance ? parseFloat(formatEther(tokenBalance.value)) : 0,
  }
}