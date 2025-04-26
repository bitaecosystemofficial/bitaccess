
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Info } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import { useEducationData, enrollInCourse } from "@/utils/contractUtils";

const CourseDetails = () => {
  const { courseId } = useParams();
  const { isConnected, address, connectWallet } = useWallet();
  const educationData = useEducationData();
  
  const course = educationData.courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <Layout>
        <div className="container px-4 py-16">
          <h1 className="text-2xl">Course not found</h1>
        </div>
      </Layout>
    );
  }

  const handleEnroll = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }

    try {
      const result = await enrollInCourse(courseId!, address as string);
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
      <div className="container px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4 mb-8">
            <div className="p-3 rounded-full bg-bitaccess-gold/10">
              <Book className="h-8 w-8 text-bitaccess-gold" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <p className="text-gray-400">{course.description}</p>
            </div>
          </div>

          <Card className="bg-bitaccess-black-light border-bitaccess-gold/20 mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Duration</p>
                  <p className="font-medium text-bitaccess-gold">{course.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Level</p>
                  <p className="font-medium text-bitaccess-gold">{course.level}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Enrolled</p>
                  <p className="font-medium text-bitaccess-gold">{course.enrolledStudents} students</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Price</p>
                  <p className="font-medium text-bitaccess-gold">Free</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-start gap-4 mb-8">
            <div className="p-2 rounded-full bg-bitaccess-gold/10">
              <Info className="h-6 w-6 text-bitaccess-gold" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">Course Content</h2>
              <div className="space-y-4">
                {course.modules?.map((module, index) => (
                  <Card key={index} className="bg-bitaccess-black border-bitaccess-gold/10">
                    <CardContent className="p-4">
                      <p className="font-medium">{module.title}</p>
                      <p className="text-sm text-gray-400">{module.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <Button 
            className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
            onClick={handleEnroll}
          >
            {isConnected ? "Enroll Now" : "Connect Wallet to Enroll"}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetails;
