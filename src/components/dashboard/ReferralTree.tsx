
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ReferralTreeProps {
  referrals: string[];
  loading: boolean;
  level: number;
}

const ReferralTree: React.FC<ReferralTreeProps> = ({ referrals, loading, level }) => {
  if (loading) {
    return (
      <Card className="border bg-bitaccess-black-light border-bitaccess-gold/20 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-bitaccess-gold border-t-transparent"></div>
            <p className="text-gray-400 mt-4">Loading referral data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!referrals || referrals.length === 0) {
    return (
      <Card className="border bg-bitaccess-black-light border-bitaccess-gold/20 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-600"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <p className="text-gray-400 mt-4">No referrals found at level {level}</p>
            {level === 1 && (
              <p className="text-sm text-gray-500 mt-2">
                Share your referral link to start building your network
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border bg-bitaccess-black-light border-bitaccess-gold/20 shadow-lg">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {referrals.map((address, index) => (
            <div 
              key={index} 
              className="bg-bitaccess-black p-4 rounded-lg border border-gray-800"
            >
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-bitaccess-gold border-bitaccess-gold">
                  Level {level}
                </Badge>
                <span className="text-xs text-gray-400">#{index + 1}</span>
              </div>
              <div className="text-sm text-gray-400 mb-1">Address</div>
              <div className="text-white font-mono text-sm break-all">
                {address.substring(0, 6)}...{address.substring(address.length - 4)}
              </div>
              <div className="flex justify-between items-center mt-3">
                <div>
                  <div className="text-xs text-gray-400">Joined</div>
                  <div className="text-sm text-white">--/--/----</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Status</div>
                  <div className="text-sm text-green-500">Active</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralTree;
