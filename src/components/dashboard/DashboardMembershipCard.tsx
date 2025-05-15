
import React from "react";
import { useMembership, MembershipType } from "@/contexts/MembershipContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Calendar } from "lucide-react";

const DashboardMembershipCard = () => {
  const { membershipData, isLoading } = useMembership();

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
        <CardHeader>
          <CardTitle className="text-red-400">No Active Membership</CardTitle>
          <CardDescription>
            You don't have an active membership. Subscribe to access exclusive benefits.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">
            Subscribe to our membership plans to access special features, rewards, and benefits!
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => toast({
            title: "Available on Home Page",
            description: "Visit the home page to subscribe to our membership plans.",
          })}>
            Check Membership Plans
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const membershipTypeText = membershipData.type === MembershipType.Regular ? "Regular Membership" : "Merchant Membership";
  const endDateFormatted = format(membershipData.endDate, "MMM dd, yyyy");
  const daysLeft = Math.ceil((membershipData.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="border border-bitaccess-gold bg-bitaccess-black">
      <CardHeader>
        <CardTitle className="text-bitaccess-gold">{membershipTypeText}</CardTitle>
        <CardDescription>
          Your membership is active
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-bitaccess-gold mt-0.5" />
          <div>
            <p className="text-gray-300">Expires on {endDateFormatted}</p>
            <p className="text-sm text-bitaccess-gold-light">{daysLeft} days remaining</p>
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
