import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Wallet, Copy, ExternalLink, LogOut } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Web3WalletButton() {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  const openInBscscan = () => {
    if (address) {
      window.open(`https://bscscan.com/address/${address}`, '_blank')
    }
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
        <DropdownMenuItem onClick={copyAddress} className="text-white hover:bg-bitaccess-gold/10">
          <Copy className="w-4 h-4 mr-2" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openInBscscan} className="text-white hover:bg-bitaccess-gold/10">
          <ExternalLink className="w-4 h-4 mr-2" />
          View on BSCScan
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