
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWallet } from "@/contexts/WalletContext";
import { useEducationData } from "@/hooks/useEducation";
import { Clock, ThumbsUp, User, Video, Book, ChevronLeft, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const VideoDetails = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const { isConnected, connectWallet } = useWallet();
  const educationData = useEducationData();
  
  const video = educationData.videos.find(v => v.id === videoId);
  
  if (!video) {
    return (
      <Layout>
        <div className="container px-4 py-16">
          <h1 className="text-2xl">Video not found</h1>
          <Link to="/videos" className="text-bitaccess-gold hover:underline">
            Back to Video Portal
          </Link>
        </div>
      </Layout>
    );
  }

  if (video.requiresMembership && !isConnected) {
    return (
      <Layout>
        <div className="container px-4 py-16">
          <Card className="max-w-2xl mx-auto border-bitaccess-gold/20 bg-bitaccess-black-light">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Video className="h-16 w-16 text-bitaccess-gold mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Membership Required</h1>
                <p className="text-gray-400">
                  This video requires a membership to watch. Please connect your wallet to continue.
                </p>
              </div>
              
              <Button
                onClick={connectWallet}
                className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black w-full"
              >
                Connect Wallet
              </Button>
              
              <div className="mt-4 text-center">
                <Link to="/videos" className="text-bitaccess-gold hover:underline text-sm">
                  <ChevronLeft className="inline h-4 w-4" /> Back to Video Portal
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 py-16">
        <div className="mb-6">
          <Link to="/videos" className="text-bitaccess-gold hover:underline flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Video Portal
          </Link>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Video Player */}
          <div className="aspect-video bg-black mb-6 rounded-lg overflow-hidden">
            {/* This would be a real video player in production */}
            <div className="h-full w-full flex items-center justify-center bg-bitaccess-black-dark">
              <div className="text-center">
                <Play className="h-16 w-16 text-bitaccess-gold mx-auto mb-2" />
                <p className="text-gray-400">Video Player Placeholder</p>
              </div>
            </div>
          </div>
          
          {/* Video Information */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-bitaccess-gold text-black">{video.category}</Badge>
              {video.level && (
                <Badge variant="outline" className="border-bitaccess-gold/30 text-bitaccess-gold">
                  {video.level}
                </Badge>
              )}
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{video.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{video.duration}</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>{video.likes} likes</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{video.views} views</span>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6">
              {video.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-bitaccess-gold/10 p-2 rounded-full">
                  <User className="h-5 w-5 text-bitaccess-gold" />
                </div>
                <span className="ml-2 text-sm">Instructor: {video.instructor}</span>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-bitaccess-gold/30 text-bitaccess-gold">
                  <ThumbsUp className="h-4 w-4 mr-1" /> Like
                </Button>
                <Button variant="outline" size="sm" className="border-bitaccess-gold/30 text-bitaccess-gold">
                  <Book className="h-4 w-4 mr-1" /> Notes
                </Button>
              </div>
            </div>
          </div>
          
          {/* Related Videos */}
          <div>
            <h2 className="text-xl font-bold mb-4">Related Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {educationData.videos
                .filter(v => v.id !== video.id && v.category === video.category)
                .slice(0, 3)
                .map((relatedVideo) => (
                  <Link key={relatedVideo.id} to={`/video/${relatedVideo.id}`} className="block">
                    <Card className="overflow-hidden border-bitaccess-gold/20 bg-bitaccess-black-light hover:border-bitaccess-gold/40">
                      <div className="relative aspect-video">
                        <img 
                          src={relatedVideo.thumbnail} 
                          alt={relatedVideo.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                          {relatedVideo.duration}
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-medium line-clamp-2 text-sm">{relatedVideo.title}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VideoDetails;
