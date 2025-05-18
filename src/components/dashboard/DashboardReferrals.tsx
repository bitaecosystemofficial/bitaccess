
import React, { useState, useEffect } from "react";
import { useMembership } from "@/contexts/MembershipContext";
import { useWallet } from "@/contexts/WalletContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, CheckCircle, ExternalLink, QrCode, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DashboardReferrals = () => {
  const { membershipData, isLoading, getReferrals } = useMembership();
  const { address } = useWallet();
  const [copied, setCopied] = useState(false);
  const [referrals, setReferrals] = useState<string[]>([]);
  const [showQR, setShowQR] = useState(false);
  
  const referralLink = address ? `https://bitaccess.org/ref/${address}` : "";

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

  const generateQRCode = () => {
    setShowQR(!showQR);
  };

  const shareReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join BIT Access Ecosystem',
          text: 'Join BIT Access with my referral link and we both earn rewards!',
          url: referralLink,
        });
        
        toast({
          title: "Link Shared Successfully",
          description: "Thanks for sharing your referral link!",
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyReferralLink();
    }
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
            <li>2.5% commission on fourth through seventh level referrals</li>
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
        <CardContent className="space-y-6">
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
          
          {showQR && address && (
            <div className="flex flex-col items-center p-4 bg-white rounded-lg">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(referralLink)}`} 
                alt="Referral QR Code"
                className="w-48 h-48"
              />
              <p className="mt-2 text-bitaccess-black text-sm font-medium">Scan this QR code to join</p>
            </div>
          )}
          
          <div className="flex gap-3 justify-center">
            <Button 
              variant="outline" 
              className="border-bitaccess-gold text-bitaccess-gold flex items-center gap-2"
              onClick={generateQRCode}
            >
              <QrCode className="h-4 w-4" />
              {showQR ? "Hide QR Code" : "Generate QR Code"}
            </Button>
            
            <Button 
              className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black flex items-center gap-2"
              onClick={shareReferral}
            >
              <Share2 className="h-4 w-4" />
              Share Link
            </Button>
          </div>
          
          <div className="pt-2">
            <h3 className="text-sm font-semibold text-white mb-2">Commission Structure</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="bg-bitaccess-black-light p-2 rounded-md">
                <span className="text-sm text-white">Level 1: <span className="text-bitaccess-gold">15%</span></span>
              </div>
              <div className="bg-bitaccess-black-light p-2 rounded-md">
                <span className="text-sm text-white">Level 2: <span className="text-bitaccess-gold">10%</span></span>
              </div>
              <div className="bg-bitaccess-black-light p-2 rounded-md">
                <span className="text-sm text-white">Level 3: <span className="text-bitaccess-gold">5%</span></span>
              </div>
              <div className="bg-bitaccess-black-light p-2 rounded-md">
                <span className="text-sm text-white">Levels 4-7: <span className="text-bitaccess-gold">2.5%</span></span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border border-gray-700 bg-bitaccess-black">
        <CardHeader>
          <CardTitle>Your Direct Referrals</CardTitle>
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
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {referrals.map((ref, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-bitaccess-black-light rounded-md">
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
        <CardFooter className="flex justify-between text-sm text-gray-400">
          <span>Refer users and earn up to 15% commission</span>
          <span>{referrals.length} referrals</span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DashboardReferrals;
