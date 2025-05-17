
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Clock, Video, Lock } from "lucide-react";
import { VideoData } from "@/types/contracts";

interface VideoCardProps {
  video: VideoData;
  isConnected: boolean;
  onConnectWallet: () => void;
}

const VideoCard = ({ video, isConnected, onConnectWallet }: VideoCardProps) => {
  const isLocked = video.requiresMembership && !isConnected;

  return (
    <Card className="overflow-hidden border-bitaccess-gold/20 bg-bitaccess-black-light transition-all hover:border-bitaccess-gold/40">
      <div className="relative">
        <div className="aspect-video w-full bg-bitaccess-black-dark overflow-hidden">
          <img 
            src={video.thumbnail} 
            alt={video.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
            {video.duration && (
              <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{video.duration}</span>
              </div>
            )}
          </div>
          
          {isLocked && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Lock className="h-12 w-12 text-bitaccess-gold/80" />
            </div>
          )}
        </div>
        
        <Link 
          to={isLocked ? "#" : `/video/${video.id}`}
          onClick={(e) => {
            if (isLocked) {
              e.preventDefault();
              onConnectWallet();
            }
          }}
          className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
        >
          <div className="bg-bitaccess-gold rounded-full p-4">
            <Play className="h-8 w-8 text-black" />
          </div>
        </Link>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-full bg-bitaccess-gold/10">
            <Video className="h-4 w-4 text-bitaccess-gold" />
          </div>
          <span className="text-xs text-bitaccess-gold">{video.category}</span>
        </div>
        
        <h3 className="font-bold text-lg line-clamp-2 mb-2">{video.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4">{video.description}</p>
        
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-400">
            <span>{video.views} views</span>
          </div>
          
          {isLocked ? (
            <Button 
              size="sm" 
              onClick={onConnectWallet}
              className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
            >
              Connect to Watch
            </Button>
          ) : (
            <Link to={`/video/${video.id}`}>
              <Button 
                size="sm" 
                className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
              >
                Watch Now
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
