
import Layout from "@/components/layout/Layout";
import { useWallet } from "@/contexts/WalletContext";
import { Users, Handshake, Gavel, Megaphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { 
  useCommunityData,
  participateInActivity,
  voteOnProposal,
  claimPromotionReward,
  getReferralLink
} from "@/hooks/useCommunity";

const Community = () => {
  const { isConnected, address, connectWallet } = useWallet();
  const communityData = useCommunityData();
  const { toast } = useToast();

  const handleParticipate = async (activityId: string) => {
    if (!isConnected) {
      connectWallet();
      return;
    }

    try {
      const result = await participateInActivity(activityId, address as string);
      if (result.success) {
        toast({
          title: "Success",
          description: "Activity participation recorded! Rewards will be credited soon.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record participation",
        variant: "destructive",
      });
    }
  };

  const handleVote = async (proposalId: string) => {
    if (!isConnected) {
      connectWallet();
      return;
    }

    try {
      const result = await voteOnProposal(proposalId, address as string);
      if (result.success) {
        toast({
          title: "Success",
          description: "Your vote has been recorded!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record vote",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container px-4 md:px-8">
          <h1 className="text-4xl font-bold text-center mb-12 bg-gold-gradient text-transparent bg-clip-text">
            Join Our Community
          </h1>
          
          <div className="text-center mb-8">
            <Link to="/governance">
              <Button className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black">
                <Gavel className="mr-2 h-4 w-4" />
                Visit Governance Platform
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-bitaccess-black-light border-bitaccess-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="text-bitaccess-gold" />
                  <span>Social-to-Earn</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400 mb-4">
                  Earn rewards by participating in our community activities. Share, engage,
                  and grow with fellow members while earning BIT tokens.
                </p>
                <div className="space-y-3">
                  {communityData.socialActivities.map((activity) => (
                    <div key={activity.id} className="flex justify-between items-center p-3 border border-bitaccess-gold/10 rounded-lg">
                      <div>
                        <p className="text-white">{activity.description}</p>
                        <p className="text-sm text-bitaccess-gold">{activity.reward} BIT tokens</p>
                      </div>
                      <Button 
                        onClick={() => handleParticipate(activity.id)}
                        className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
                      >
                        Participate
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-bitaccess-black-light border-bitaccess-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="text-bitaccess-gold" />
                  <span>Governance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400 mb-4">
                  Have a say in the future of our platform. Vote on proposals and help
                  shape the direction of our ecosystem.
                </p>
                <div className="space-y-3">
                  {communityData.proposals.map((proposal) => (
                    <div key={proposal.id} className="p-3 border border-bitaccess-gold/10 rounded-lg">
                      <h4 className="font-semibold text-white mb-1">{proposal.title}</h4>
                      <p className="text-sm text-gray-400 mb-2">{proposal.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-bitaccess-gold">{proposal.votes} votes</span>
                        <Button 
                          onClick={() => handleVote(proposal.id)}
                          variant="outline"
                          className="border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10"
                        >
                          Vote
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-bitaccess-black-light border-bitaccess-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Megaphone className="text-bitaccess-gold" />
                  <span>Promotions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400 mb-4">
                  Stay updated with the latest promotions, events, and opportunities to
                  earn more rewards within our ecosystem.
                </p>
                <div className="space-y-3">
                  {communityData.promotions.map((promo) => (
                    <div key={promo.id} className="p-3 border border-bitaccess-gold/10 rounded-lg">
                      <h4 className="font-semibold text-white mb-1">{promo.title}</h4>
                      <p className="text-sm text-gray-400 mb-2">{promo.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-bitaccess-gold">{promo.reward}x multiplier</span>
                        <Button 
                          onClick={() => claimPromotionReward(promo.id, address as string)}
                          className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
                        >
                          Claim
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-bitaccess-black-light border-bitaccess-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Handshake className="text-bitaccess-gold" />
                  <span>Affiliate Program</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Earn passive income by referring new members to our platform. Get a
                  share of their earnings and help grow our community.
                </p>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border border-bitaccess-gold/10 rounded-lg">
                      <p className="text-sm text-gray-400">Total Referrals</p>
                      <p className="text-xl font-semibold text-white">{communityData.referralStats.totalReferrals}</p>
                    </div>
                    <div className="p-3 border border-bitaccess-gold/10 rounded-lg">
                      <p className="text-sm text-gray-400">Active Referrals</p>
                      <p className="text-xl font-semibold text-white">{communityData.referralStats.activeReferrals}</p>
                    </div>
                    <div className="p-3 border border-bitaccess-gold/10 rounded-lg">
                      <p className="text-sm text-gray-400">Total Earnings</p>
                      <p className="text-xl font-semibold text-white">{communityData.referralStats.totalEarnings} BIT</p>
                    </div>
                    <div className="p-3 border border-bitaccess-gold/10 rounded-lg">
                      <p className="text-sm text-gray-400">Pending Rewards</p>
                      <p className="text-xl font-semibold text-white">{communityData.referralStats.pendingRewards} BIT</p>
                    </div>
                  </div>
                  {isConnected && (
                    <Button 
                      className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
                      onClick={() => {
                        navigator.clipboard.writeText(getReferralLink(address as string));
                        toast({
                          title: "Success",
                          description: "Referral link copied to clipboard!",
                        });
                      }}
                    >
                      Copy Referral Link
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
