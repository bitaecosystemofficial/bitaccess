
import React, { useState, useEffect } from "react";
import { useMembership } from "@/contexts/MembershipContext";
import { useWallet } from "@/contexts/WalletContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, CheckCircle, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DashboardReferrals = () => {
  const { membershipData, isLoading, getReferrals } = useMembership();
  const { address } = useWallet();
  const [copied, setCopied] = useState(false);
  const [referrals, setReferrals] = useState<string[]>([]);
  
  const referralLink = address ? `https://bitaccess.com/ref/${address}` : "";

  useEffect(() => {
    const fetchReferrals = async () => {
      if (membershipData?.isActive) {
        const refs = await getReferrals();
        setReferrals(refs);
      }
    };
    
    fetchReferrals();
  }, [membershipData]);

  const copyReferralLink = () => {
    if (!referralLink) return;
    
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    
    toast({
      title: "Referral Link Copied",
      description: "You can now share this link with others",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  if (!membershipData?.isActive) {
    return (
      <Card className="border border-gray-700 bg-bitaccess-black">
        <CardHeader>
          <CardTitle>Referral Program</CardTitle>
          <CardDescription>
            Subscribe to a membership plan to participate in our referral program
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">
            Once you have an active membership, you'll be able to invite others and earn rewards:
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-400">
            <li>15% commission on direct referrals</li>
            <li>10% commission on second level referrals</li>
            <li>5% commission on third level referrals</li>
          </ul>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border border-gray-700 bg-bitaccess-black">
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
          <CardDescription>
            Share this link with others to earn referral commissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input 
              value={referralLink} 
              readOnly 
              className="bg-bitaccess-black-light border-gray-700"
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={copyReferralLink}
              className="border-bitaccess-gold text-bitaccess-gold"
            >
              {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-400">Earn commissions when someone subscribes using your link:</p>
            <ul className="list-disc list-inside mt-2 text-sm text-gray-400">
              <li>15% on direct referrals</li>
              <li>10% on second level referrals</li>
              <li>5% on third level referrals</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border border-gray-700 bg-bitaccess-black">
        <CardHeader>
          <CardTitle>Your Referrals</CardTitle>
          <CardDescription>
            {referrals.length === 0 
              ? "You haven't referred anyone yet" 
              : `You have referred ${referrals.length} ${referrals.length === 1 ? 'user' : 'users'}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {referrals.length === 0 ? (
            <p className="text-gray-400">
              Share your referral link to start earning commissions on subscriptions.
            </p>
          ) : (
            <div className="space-y-2">
              {referrals.map((ref, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-bitaccess-black-light rounded-md">
                  <span className="text-sm text-gray-300">{`${ref.substring(0, 6)}...${ref.substring(ref.length - 4)}`}</span>
                  <a 
                    href={`https://bscscan.com/address/${ref}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bitaccess-gold hover:text-bitaccess-gold-dark"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardReferrals;
