
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useMembership } from "@/contexts/MembershipContext";
import { Users, Gift, CreditCard } from "lucide-react";

const DashboardStats = () => {
  const { membershipData } = useMembership();
  
  const stats = [
    {
      title: "Referrals",
      value: membershipData?.referrals?.length || 0,
      icon: <Users className="h-8 w-8 text-bitaccess-gold" />,
      description: "Total Direct Referrals"
    },
    {
      title: "Rewards",
      value: membershipData?.rewards || 0,
      icon: <Gift className="h-8 w-8 text-green-600" />,
      description: "Total Rewards Earned"
    },
    {
      title: "Earnings",
      value: membershipData?.earnings || "0 BIT",
      icon: <CreditCard className="h-8 w-8 text-blue-500" />,
      description: "Total Earnings Collected"
    }
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index} className="border bg-bitaccess-black-light border-bitaccess-gold/20 shadow-lg">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-2">{stat.description}</p>
              </div>
              <div className="bg-bitaccess-black-light p-2 rounded-lg">
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default DashboardStats;
