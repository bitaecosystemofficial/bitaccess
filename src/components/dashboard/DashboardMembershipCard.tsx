
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useMembership } from "@/contexts/MembershipContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Award, Check, AlertCircle } from "lucide-react";

const DashboardMembershipCard = () => {
  const { membershipData, isLoading } = useMembership();

  if (isLoading) {
    return (
      <Card className="border bg-bitaccess-black-light border-bitaccess-gold/20 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4 items-center justify-center min-h-[200px]">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-bitaccess-gold border-t-transparent"></div>
            <p className="text-gray-400">Loading membership data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!membershipData || !membershipData.isActive) {
    return (
      <Card className="border bg-bitaccess-black-light border-bitaccess-gold/20 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4 items-center justify-center min-h-[200px]">
            <AlertCircle size={48} className="text-yellow-500" />
            <h3 className="text-xl font-semibold text-white">No Active Membership</h3>
            <p className="text-gray-400 text-center">
              You don't have an active membership yet. Purchase a membership to unlock all features.
            </p>
            <Button className="bg-bitaccess-gold text-bitaccess-black hover:bg-bitaccess-gold/80">
              Get Membership
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border bg-bitaccess-black-light border-bitaccess-gold/20 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
        <h3 className="text-xl font-bold text-white">Your Membership</h3>
        <Badge 
          className={membershipData.status === "Active" 
            ? "bg-green-600 hover:bg-green-700" 
            : "bg-yellow-600 hover:bg-yellow-700"}
        >
          {membershipData.status}
        </Badge>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Type</span>
            <span className="font-semibold text-white">{membershipData.type}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Start Date</span>
            <span className="font-semibold text-white">{membershipData.startDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Expiration Date</span>
            <span className="font-semibold text-white">{membershipData.expiryDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Level</span>
            <div className="flex items-center space-x-2">
              <Award size={18} className="text-bitaccess-gold" />
              <span className="font-semibold text-white">{membershipData.level}</span>
            </div>
          </div>
          <div className="mt-4">
            <Button className="w-full bg-bitaccess-gold text-bitaccess-black hover:bg-bitaccess-gold/80">
              Upgrade Membership
            </Button>
          </div>
          <div className="flex justify-center mt-2">
            <Button variant="link" className="text-bitaccess-gold hover:text-bitaccess-gold/80">
              View Membership Card
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardMembershipCard;
