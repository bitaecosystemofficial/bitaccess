
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, ExternalLink, Users } from "lucide-react";
import { useMembership } from "@/contexts/MembershipContext";
import { useWallet } from "@/contexts/WalletContext";
import { useToast } from "@/components/ui/use-toast";

const DashboardReferrals = () => {
  const { membershipData } = useMembership();
  const { address } = useWallet();
  const { toast } = useToast();
  
  const referralLink = `${window.location.origin}/?ref=${address}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
      duration: 3000,
    });
  };
  
  const referralData = [
    { level: "Level 1", count: membershipData?.referrals?.length || 0, commission: "10%" },
    { level: "Level 2", count: membershipData?.level2Referrals || 0, commission: "5%" },
    { level: "Level 3", count: membershipData?.level3Referrals || 0, commission: "2.5%" },
    { level: "Level 4", count: membershipData?.level4Referrals || 0, commission: "1.5%" },
    { level: "Level 5", count: membershipData?.level5Referrals || 0, commission: "1%" },
    { level: "Level 6", count: membershipData?.level6Referrals || 0, commission: "0.5%" },
    { level: "Level 7", count: membershipData?.level7Referrals || 0, commission: "0.25%" },
  ];

  return (
    <div className="space-y-6">
      <Card className="border bg-bitaccess-black-light border-bitaccess-gold/20 shadow-lg">
        <CardHeader className="pb-2">
          <h3 className="text-xl font-bold text-white">Your Referral Link</h3>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Input 
                value={referralLink} 
                className="bg-bitaccess-black border border-bitaccess-gold/20"
                readOnly 
              />
              <Button 
                onClick={copyToClipboard}
                className="bg-bitaccess-black-light hover:bg-bitaccess-black"
                size="icon"
              >
                <Copy size={18} />
              </Button>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                className="text-bitaccess-gold border-bitaccess-gold hover:bg-bitaccess-gold hover:text-bitaccess-black"
              >
                <Users className="mr-2 h-4 w-4" />
                Share Link
              </Button>
              
              <Button 
                variant="outline" 
                className="text-bitaccess-gold border-bitaccess-gold hover:bg-bitaccess-gold hover:text-bitaccess-black"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Referral Program Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border bg-bitaccess-black-light border-bitaccess-gold/20 shadow-lg">
        <CardHeader className="pb-2">
          <h3 className="text-xl font-bold text-white">Referral Structure</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-400">
              <div>Level</div>
              <div>Referrals</div>
              <div>Commission</div>
            </div>
            
            {referralData.map((level, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 py-2 border-b border-gray-800">
                <div className="font-medium text-white">{level.level}</div>
                <div className="text-white">{level.count}</div>
                <div className="text-bitaccess-gold">{level.commission}</div>
              </div>
            ))}
            
            <div className="mt-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-400">Total Referrals</p>
                <p className="text-xl font-bold text-white">
                  {referralData.reduce((total, level) => total + level.count, 0)}
                </p>
              </div>
              <Button className="bg-bitaccess-gold text-bitaccess-black hover:bg-bitaccess-gold/80">
                View All Referrals
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardReferrals;
