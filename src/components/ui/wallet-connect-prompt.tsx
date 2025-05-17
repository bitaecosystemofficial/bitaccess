
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";

const WalletConnectPrompt: React.FC<{
  title?: string;
  description?: string;
}> = ({ 
  title = "Connect Your Wallet", 
  description = "Please connect your wallet to access this feature" 
}) => {
  const { connectWallet } = useWallet();
  
  return (
    <div className="container px-4 py-16 mt-16">
      <Card className="max-w-md mx-auto bg-bitaccess-black-light border border-bitaccess-gold/20">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button 
            onClick={connectWallet} 
            className="mt-4 bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black">
            Connect Wallet
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletConnectPrompt;
