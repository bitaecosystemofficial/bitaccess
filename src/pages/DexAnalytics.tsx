
import Layout from "@/components/layout/Layout";
import DexChartAnalytics from "@/components/dexanalytics/DexChartAnalytics";
import { Helmet } from "react-helmet-async";

const DexAnalyticsPage = () => {
  return (
    <>
      <Helmet>
        <title>DEX Analytics - Bit Access Token</title>
        <meta name="description" content="Real-time analytics for Bit Access Token including holder distribution, transfer activity, and BSCScan integration. Track 4,605 holders and 11,612 transfers." />
      </Helmet>
      <Layout>
        <DexChartAnalytics />
      </Layout>
    </>
  );
};

export default DexAnalyticsPage;
