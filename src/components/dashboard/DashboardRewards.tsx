
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMembership } from "@/contexts/MembershipContext";
import { BadgeCheck, Gift, Clock, ArrowRight } from "lucide-react";

const DashboardRewards = () => {
  const { membershipData } = useMembership();
  
  const pendingRewards = membershipData?.pendingRewards || [];
  const claimedRewards = membershipData?.claimedRewards || [];
  
  return (
    <div className="space-y-6">
      <Card className="border bg-bitaccess-black-light border-bitaccess-gold/20 shadow-lg">
        <CardHeader className="pb-2">
          <h3 className="text-xl font-bold text-white">Rewards Summary</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-bitaccess-black p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock size={20} className="text-yellow-500" />
                <h4 className="text-lg font-medium text-white">Pending</h4>
              </div>
              <p className="text-2xl font-bold text-white mt-2">{pendingRewards.length}</p>
              <p className="text-sm text-gray-400 mt-1">Rewards awaiting claim</p>
            </div>
            
            <div className="bg-bitaccess-black p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <BadgeCheck size={20} className="text-green-500" />
                <h4 className="text-lg font-medium text-white">Claimed</h4>
              </div>
              <p className="text-2xl font-bold text-white mt-2">{claimedRewards.length}</p>
              <p className="text-sm text-gray-400 mt-1">Rewards already claimed</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border bg-bitaccess-black-light border-bitaccess-gold/20 shadow-lg">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <h3 className="text-xl font-bold text-white">Pending Rewards</h3>
          <Button variant="outline" className="text-bitaccess-gold border-bitaccess-gold hover:bg-bitaccess-gold hover:text-bitaccess-black">
            Claim All
          </Button>
        </CardHeader>
        <CardContent>
          {pendingRewards.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Gift size={48} className="text-gray-600" />
              <p className="text-gray-400 mt-4">No pending rewards to claim</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRewards.map((reward, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-bitaccess-black rounded-lg">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Gift size={18} className="text-bitaccess-gold" />
                      <span className="text-white font-medium">{reward.type}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{reward.description}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-white font-bold mr-4">{reward.amount} BIT</span>
                    <Button size="sm" className="bg-bitaccess-gold text-bitaccess-black hover:bg-bitaccess-gold/80">
                      Claim
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="border bg-bitaccess-black-light border-bitaccess-gold/20 shadow-lg">
        <CardHeader className="pb-2">
          <h3 className="text-xl font-bold text-white">Recent Claims</h3>
        </CardHeader>
        <CardContent>
          {claimedRewards.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <BadgeCheck size={48} className="text-gray-600" />
              <p className="text-gray-400 mt-4">No claimed rewards yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {claimedRewards.slice(0, 5).map((reward, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-bitaccess-black rounded-lg">
                  <div>
                    <div className="flex items-center space-x-2">
                      <BadgeCheck size={18} className="text-green-500" />
                      <span className="text-white font-medium">{reward.type}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">Claimed on {reward.claimedDate}</p>
                  </div>
                  <div className="text-white font-bold">{reward.amount} BIT</div>
                </div>
              ))}
              
              {claimedRewards.length > 5 && (
                <Button variant="link" className="text-bitaccess-gold hover:text-bitaccess-gold/80 w-full">
                  View All Claims <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardRewards;
