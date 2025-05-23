
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { guidesContent } from "@/data/guidesContent";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";

const GuideDetails = () => {
  const { guideId } = useParams<{ guideId: string }>();
  const navigate = useNavigate();
  
  const guide = guideId ? guidesContent[guideId] : undefined;
  
  useEffect(() => {
    if (guideId && !guide) {
      toast({
        title: "Guide not found",
        description: "The guide you're looking for doesn't exist or is still being created.",
        variant: "destructive",
      });
      navigate("/docs");
    }
  }, [guideId, guide, navigate]);

  if (!guide) {
    return (
      <Layout>
        <div className="py-16 md:py-24 bg-hero-pattern">
          <div className="container px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <Button 
                variant="link" 
                className="text-bitaccess-gold mb-6 p-0"
                onClick={() => navigate("/docs")}
              >
                <ChevronLeft size={16} className="mr-1" /> Back to Documentation
              </Button>
              
              <div className="space-y-6">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="link" 
              className="text-bitaccess-gold mb-6 p-0"
              onClick={() => navigate("/docs")}
            >
              <ChevronLeft size={16} className="mr-1" /> Back to Documentation
            </Button>
            
            <div className="bg-bitaccess-black-light rounded-xl p-6 md:p-8 border border-bitaccess-gold/20">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">{guide.title}</h1>
                <p className="text-gray-400">Last updated: {guide.lastUpdated}</p>
              </div>
              
              <div className="prose prose-invert max-w-none">
                {guide.sections.map((section, index) => (
                  <div key={index} className="mb-10">
                    <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
                    <div className="text-gray-300">{section.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GuideDetails;
