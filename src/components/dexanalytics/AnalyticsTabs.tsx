
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PriceChart from "./PriceChart";
import HoldersDistribution from "./HoldersDistribution";
import TransactionAnalytics from "./TransactionAnalytics";
import { TokenTransaction } from "@/services/BscscanService";

interface AnalyticsTabsProps {
  transactions: TokenTransaction[];
}

const AnalyticsTabs = ({ transactions }: AnalyticsTabsProps) => {
  return (
    <Tabs defaultValue="price" className="mt-8">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="price">Price History</TabsTrigger>
        <TabsTrigger value="holders">Holders Distribution</TabsTrigger>
        <TabsTrigger value="transactions">Transaction Analytics</TabsTrigger>
      </TabsList>
      <TabsContent value="price">
        <PriceChart />
      </TabsContent>
      <TabsContent value="holders">
        <HoldersDistribution />
      </TabsContent>
      <TabsContent value="transactions">
        <TransactionAnalytics transactions={transactions} />
      </TabsContent>
    </Tabs>
  );
};

export default AnalyticsTabs;
