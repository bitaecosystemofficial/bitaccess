
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2, Wallet } from "lucide-react";

interface WalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isConnecting: boolean;
  onConnectWallet: () => Promise<void>;
}

const WalletDialog = ({ 
  open, 
  onOpenChange, 
  isConnecting, 
  onConnectWallet 
}: WalletDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-bitaccess-black border border-bitaccess-gold/20">
        <DialogHeader>
          <DialogTitle className="text-bitaccess-gold">Connect Wallet</DialogTitle>
          <DialogDescription>
            You need to connect your wallet to subscribe to an e-commerce store plan.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-4">
          <Button
            onClick={onConnectWallet}
            className="bg-bitaccess-gold text-black hover:bg-bitaccess-gold/90"
            disabled={isConnecting}
          >
            {isConnecting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting...</>
            ) : (
              <><Wallet className="mr-2 h-4 w-4" /> Connect Wallet</>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletDialog;
