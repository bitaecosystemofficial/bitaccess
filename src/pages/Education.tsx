
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { BookText, Video } from "lucide-react";
import { useEducationData, enrollInCourse } from "@/hooks/useEducation";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import CourseCard from "@/components/education/CourseCard";
import SectionHeading from "@/components/ui/section-heading";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const Education = () => {
  const { isConnected, address, connectWallet } = useWallet();
  const educationData = useEducationData();

  const handleEnroll = async (courseId: string) => {
    if (!isConnected) {
      connectWallet();
      return;
    }

    try {
      const result = await enrollInCourse(courseId, address as string);
      if (result.success) {
        toast({
          title: "Enrollment Successful",
          description: "You have successfully enrolled in the course!",
        });
      } else {
        toast({
          title: "Enrollment Failed",
          description: result.error || "Failed to enroll in course",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="Education Platform"
            subtitle="Learn about blockchain technology, cryptocurrencies, and the future of digital payments"
            centered
          />
          
          <Card className="mb-12 border-bitaccess-gold/20 bg-bitaccess-gold/5">
            <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <Video className="h-10 w-10 text-bitaccess-gold mr-4" />
                <div>
                  <h3 className="font-bold text-lg">Video Learning Portal</h3>
                  <p className="text-gray-400">Access our comprehensive video education content</p>
                </div>
              </div>
              <Link to="/videos">
                <Button className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black">
                  View Videos
                </Button>
              </Link>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {educationData.courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEnroll={() => handleEnroll(course.id)}
                isConnected={isConnected}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Education;
