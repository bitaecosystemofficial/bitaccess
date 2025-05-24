
import Layout from "@/components/layout/Layout";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { useState } from "react";
import { useEducationData } from "@/hooks/useEducation";
import VideoCard from "@/components/education/VideoCard";
import SectionHeading from "@/components/ui/section-heading";

const VideoPortal = () => {
  const { isConnected, connectWallet } = useWallet();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const educationData = useEducationData();
  
  const handleConnectWallet = () => {
    if (!isConnected) {
      connectWallet();
    }
  };
  
  const filteredVideos = selectedCategory === "all" 
    ? educationData.videos 
    : educationData.videos.filter(video => video.category === selectedCategory);

  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="Blockchain Video Education"
            subtitle="Watch our curated videos to learn about blockchain technology, cryptocurrencies, and Web3"
            centered
          />
          
          {!isConnected && (
            <Card className="mb-8 border-bitaccess-gold/20 bg-bitaccess-black-light">
              <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center mb-4 sm:mb-0">
                  <GraduationCap className="h-10 w-10 text-bitaccess-gold mr-4" />
                  <div>
                    <h3 className="font-bold text-lg">Connect to Access All Videos</h3>
                    <p className="text-gray-400">Some videos require membership access</p>
                  </div>
                </div>
                <Button 
                  onClick={handleConnectWallet}
                  className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
                >
                  Connect Wallet
                </Button>
              </CardContent>
            </Card>
          )}
          
          <Tabs defaultValue="all" className="w-full mb-8">
            <TabsList className="mb-6 bg-bitaccess-black-light border border-bitaccess-gold/10">
              <TabsTrigger 
                value="all" 
                onClick={() => setSelectedCategory("all")}
                className="data-[state=active]:bg-bitaccess-gold data-[state=active]:text-black"
              >
                All Videos
              </TabsTrigger>
              <TabsTrigger 
                value="beginner" 
                onClick={() => setSelectedCategory("beginner")}
                className="data-[state=active]:bg-bitaccess-gold data-[state=active]:text-black"
              >
                Beginner
              </TabsTrigger>
              <TabsTrigger 
                value="intermediate" 
                onClick={() => setSelectedCategory("intermediate")}
                className="data-[state=active]:bg-bitaccess-gold data-[state=active]:text-black"
              >
                Intermediate
              </TabsTrigger>
              <TabsTrigger 
                value="advanced" 
                onClick={() => setSelectedCategory("advanced")}
                className="data-[state=active]:bg-bitaccess-gold data-[state=active]:text-black"
              >
                Advanced
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    isConnected={isConnected}
                    onConnectWallet={handleConnectWallet}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="beginner" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    isConnected={isConnected}
                    onConnectWallet={handleConnectWallet}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="intermediate" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    isConnected={isConnected}
                    onConnectWallet={handleConnectWallet}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="advanced" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    isConnected={isConnected}
                    onConnectWallet={handleConnectWallet}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default VideoPortal;
