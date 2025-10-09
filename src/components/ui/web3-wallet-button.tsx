import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useDisconnect, useSwitchChain } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Wallet, Copy, ExternalLink, LogOut, LayoutDashboard, Network } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
import { bsc, bscTestnet } from 'wagmi/chains'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'

export function Web3WalletButton() {
  const { open } = useWeb3Modal()
  const { address, isConnected, chain } = useAccount()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  const navigate = useNavigate()

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  const openInBinexplorer = () => {
    if (address) {
      window.open(`https://binplorer.com/address/${address}`, '_blank')
    }
  }

  const goToDashboard = () => {
    navigate('/settings')
  }

  const handleNetworkSwitch = (chainId: number) => {
    switchChain({ chainId })
    toast({
      title: "Network Switch",
      description: `Switching to ${chainId === bsc.id ? 'BSC Mainnet' : 'BSC Testnet'}`,
    })
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (!isConnected) {
    return (
      <Button 
        onClick={() => open()} 
        className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-bitaccess-black font-semibold"
      >
        <Wallet className="w-4 h-4 mr-2" />
        Connect Wallet
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="border-bitaccess-gold/50 text-bitaccess-gold hover:bg-bitaccess-gold/10"
        >
          <Wallet className="w-4 h-4 mr-2" />
          {formatAddress(address!)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-bitaccess-black-light border-bitaccess-gold/20">
        <DropdownMenuItem onClick={goToDashboard} className="text-white hover:bg-bitaccess-gold/10">
          <LayoutDashboard className="w-4 h-4 mr-2" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-bitaccess-gold/20" />
        <DropdownMenuLabel className="text-gray-400 text-xs">Network</DropdownMenuLabel>
        <DropdownMenuItem 
          onClick={() => handleNetworkSwitch(bsc.id)} 
          className="text-white hover:bg-bitaccess-gold/10"
          disabled={chain?.id === bsc.id}
        >
          <Network className="w-4 h-4 mr-2" />
          BSC Mainnet {chain?.id === bsc.id && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleNetworkSwitch(bscTestnet.id)} 
          className="text-white hover:bg-bitaccess-gold/10"
          disabled={chain?.id === bscTestnet.id}
        >
          <Network className="w-4 h-4 mr-2" />
          BSC Testnet {chain?.id === bscTestnet.id && '✓'}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-bitaccess-gold/20" />
        <DropdownMenuItem onClick={copyAddress} className="text-white hover:bg-bitaccess-gold/10">
          <Copy className="w-4 h-4 mr-2" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openInBinexplorer} className="text-white hover:bg-bitaccess-gold/10">
          <ExternalLink className="w-4 h-4 mr-2" />
          View on Binexplorer
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-bitaccess-gold/20" />
        <DropdownMenuItem onClick={() => disconnect()} className="text-red-400 hover:bg-red-500/10">
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}