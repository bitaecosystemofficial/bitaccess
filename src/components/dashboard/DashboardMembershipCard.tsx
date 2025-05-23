
import React from "react";
import { useMembership, MembershipType } from "@/contexts/MembershipContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Calendar, Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const DashboardMembershipCard = () => {
  const { membershipData, isLoading } = useMembership();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-gray-700 bg-bitaccess-black">
          <CardHeader>
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-32 w-full" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!membershipData || !membershipData.isActive) {
    return (
      <Card className="border border-gray-700 bg-bitaccess-black">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-red-400">No Active Membership</CardTitle>
            <CardDescription>
              You don't have an active membership. Subscribe to access exclusive benefits.
            </CardDescription>
          </div>
          <Badge variant="destructive" className="ml-2">Not Subscribed</Badge>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">
            Subscribe to our membership plans to access special features, rewards, and benefits!
          </p>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Membership Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-bitaccess-black-light p-4 rounded-md">
                <h4 className="text-bitaccess-gold font-medium mb-2">Regular Membership</h4>
                <p className="text-gray-300 text-sm mb-2">20 USDT for 365 days</p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                  <li>Access to Blockchain Education</li>
                  <li>Token Rewards (BTCB, USDT, BNB, BIT)</li>
                  <li>Access to exclusive resources</li>
                  <li>Three-level referral commissions</li>
                </ul>
              </div>
              
              <div className="bg-bitaccess-black-light p-4 rounded-md border border-bitaccess-gold/30">
                <h4 className="text-bitaccess-gold font-medium mb-2">Merchant Membership</h4>
                <p className="text-gray-300 text-sm mb-2">100 USDT for 365 days</p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                  <li>All Regular membership benefits</li>
                  <li>5× more BIT token rewards</li>
                  <li>Promotion on BIT Community platform</li>
                  <li>Merchant stickers and marketing tools</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black"
            onClick={() => navigate("/")}
          >
            Subscribe Now
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const membershipTypeText = membershipData.type === MembershipType.Regular ? "Regular Membership" : "Merchant Membership";
  const membershipPrice = membershipData.type === MembershipType.Regular ? "20 USDT" : "100 USDT";
  const endDateFormatted = format(membershipData.endDate, "MMM dd, yyyy");
  const startDateFormatted = format(membershipData.startDate, "MMM dd, yyyy");
  const daysLeft = Math.ceil((membershipData.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="border border-bitaccess-gold bg-bitaccess-black">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-bitaccess-gold">{membershipTypeText}</CardTitle>
          <CardDescription>
            Your membership is active - {membershipPrice} for 365 days
          </CardDescription>
        </div>
        <Badge className="bg-green-600 hover:bg-green-700 ml-2">Subscribed</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-bitaccess-gold mt-0.5" />
          <div>
            <p className="text-gray-300">Subscription Period</p>
            <p className="text-sm text-white">From: <span className="text-bitaccess-gold">{startDateFormatted}</span></p>
            <p className="text-sm text-white">To: <span className="text-bitaccess-gold">{endDateFormatted}</span></p>
            <p className="text-sm text-bitaccess-gold-light mt-1">{daysLeft} days remaining</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          {membershipData.claimedRewards ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="text-gray-300">Rewards Claimed</p>
                <p className="text-sm text-green-500">You've already claimed your membership rewards</p>
              </div>
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="text-gray-300">Rewards Available</p>
                <p className="text-sm text-yellow-500">You have unclaimed rewards</p>
              </div>
            </>
          )}
        </div>
        
        <div className="flex items-start gap-3">
          <Coins className="h-5 w-5 text-bitaccess-gold mt-0.5" />
          <div>
            <p className="text-gray-300">Membership Rewards</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-1">
              <p className="text-sm text-gray-400">• $1 USDT worth of BTCB</p>
              <p className="text-sm text-gray-400">• $1 USDT worth of USDT</p>
              <p className="text-sm text-gray-400">• $1 USDT worth of BNB</p>
              <p className="text-sm text-gray-400">• ${membershipData.type === MembershipType.Regular ? "2" : "10"} USDT worth of BIT</p>
            </div>
          </div>
        </div>
        
        {membershipData.type === MembershipType.Merchant && (
          <div className="mt-4 p-3 bg-bitaccess-gold/10 rounded-md">
            <p className="text-bitaccess-gold text-sm">
              As a Merchant, you have access to additional benefits including promotions on the BIT Community platform.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardMembershipCard;
