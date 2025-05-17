
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Network, ChevronDown, ChevronUp, User, ExternalLink } from "lucide-react";

interface ReferralData {
  address: string;
  level: number;
  children?: ReferralData[];
}

interface ReferralTreeProps {
  referrals: string[];
  loading: boolean;
}

const ReferralNode = ({ data, expanded = false }: { data: ReferralData, expanded?: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const hasChildren = data.children && data.children.length > 0;

  return (
    <div className="flex flex-col">
      <div className={`flex items-center p-2 rounded-md ${data.level === 0 ? 'bg-bitaccess-gold/20 text-bitaccess-gold' : 'bg-bitaccess-black-light text-gray-300'}`}>
        <User className="h-4 w-4 mr-2" />
        <span className="text-sm mr-auto truncate">{`${data.address.substring(0, 6)}...${data.address.substring(data.address.length - 4)}`}</span>
        
        {data.level > 0 && (
          <a 
            href={`https://bscscan.com/address/${data.address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bitaccess-gold hover:text-bitaccess-gold-dark mr-2"
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
        
        {hasChildren && (
          <Button
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 hover:bg-bitaccess-gold/10"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </Button>
        )}
      </div>
      
      {isExpanded && hasChildren && (
        <div className="ml-4 mt-1 border-l border-bitaccess-gold/20 pl-4 space-y-1">
          {data.children?.map((child, index) => (
            <ReferralNode key={index} data={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const ReferralTree = ({ referrals, loading }: ReferralTreeProps) => {
  const { address } = useWallet();
  
  if (loading) {
    return (
      <Card className="border border-gray-700 bg-bitaccess-black">
        <CardHeader>
          <CardTitle>Your Referral Network</CardTitle>
          <CardDescription>
            Visualize your referral connections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-11/12" />
            <Skeleton className="h-10 w-10/12" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // For now, we build a simple tree with the current user as root
  const treeData: ReferralData = {
    address: address || "",
    level: 0,
    children: referrals.map(ref => ({
      address: ref,
      level: 1
    }))
  };

  return (
    <Card className="border border-gray-700 bg-bitaccess-black">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Your Referral Network</CardTitle>
            <CardDescription>
              {referrals.length === 0 
                ? "You haven't referred anyone yet" 
                : `You have ${referrals.length} direct ${referrals.length === 1 ? 'referral' : 'referrals'}`}
            </CardDescription>
          </div>
          <Network className="h-5 w-5 text-bitaccess-gold" />
        </div>
      </CardHeader>
      <CardContent>
        {referrals.length === 0 ? (
          <div className="bg-bitaccess-black-light p-4 rounded-md text-center text-gray-400">
            Share your referral link to start building your network
          </div>
        ) : (
          <div className="space-y-1">
            <ReferralNode data={treeData} expanded={true} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReferralTree;
