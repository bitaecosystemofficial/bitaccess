
import Layout from "@/components/layout/Layout";
import { Users, Handshake, Gavel, Megaphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Community = () => {
  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container px-4 md:px-8">
          <h1 className="text-4xl font-bold text-center mb-12 bg-gold-gradient text-transparent bg-clip-text">
            Join Our Community
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-bitaccess-black-light border-bitaccess-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="text-bitaccess-gold" />
                  <span>Social-to-Earn</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Earn rewards by participating in our community activities. Share, engage,
                  and grow with fellow members while earning BIT tokens.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-bitaccess-black-light border-bitaccess-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="text-bitaccess-gold" />
                  <span>Governance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Have a say in the future of our platform. Vote on proposals and help
                  shape the direction of our ecosystem.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-bitaccess-black-light border-bitaccess-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Megaphone className="text-bitaccess-gold" />
                  <span>Promotions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Stay updated with the latest promotions, events, and opportunities to
                  earn more rewards within our ecosystem.
                </p>
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
                <p className="text-gray-400">
                  Earn passive income by referring new members to our platform. Get a
                  share of their earnings and help grow our community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
