
import { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { toast } from '@/hooks/use-toast';

interface CourseProgress {
  courseId: string;
  progress: number;
  completed: boolean;
  lastWatched: Date;
}

interface Certificate {
  id: string;
  courseId: string;
  studentAddress: string;
  issuedAt: Date;
  certificateHash: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  enrolledStudents: number;
  modules?: Array<{
    title: string;
    description: string;
  }>;
}

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  level?: string;
  thumbnail: string;
  requiresMembership: boolean;
  instructor: string;
  likes: number;
  views: number;
}

interface EducationData {
  courses: Course[];
  videos: Video[];
}

export const useEducation = () => {
  const { address, isConnected } = useWallet();
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      loadStudentProgress();
    }
  }, [isConnected, address]);

  const loadStudentProgress = async () => {
    if (!address) return;
    
    setIsLoading(true);
    try {
      // Simulate loading student progress
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for demonstration
      setCourseProgress([
        {
          courseId: "blockchain-basics",
          progress: 75,
          completed: false,
          lastWatched: new Date()
        }
      ]);
      
    } catch (error) {
      console.error('Error loading student progress:', error);
      toast({
        title: "Error",
        description: "Failed to load your progress",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateProgress = async (courseId: string, progress: number) => {
    if (!address) return false;
    
    try {
      setIsLoading(true);
      
      // Simulate progress update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCourseProgress(prev => 
        prev.map(course => 
          course.courseId === courseId 
            ? { ...course, progress, completed: progress >= 100 }
            : course
        )
      );
      
      if (progress >= 100) {
        toast({
          title: "Course Completed!",
          description: "Congratulations on completing the course!",
        });
      }
      
      return true;
    } catch (error) {
      console.error('Error updating progress:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const issueCertificate = async (courseId: string) => {
    if (!address) return null;
    
    try {
      setIsLoading(true);
      
      // Simulate certificate issuance
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const certificate: Certificate = {
        id: `cert_${Date.now()}`,
        courseId,
        studentAddress: address,
        issuedAt: new Date(),
        certificateHash: `0x${Math.random().toString(16).substr(2, 8)}`
      };
      
      setCertificates(prev => [...prev, certificate]);
      
      toast({
        title: "Certificate Issued!",
        description: "Your certificate has been generated and stored on the blockchain",
      });
      
      return certificate;
    } catch (error) {
      console.error('Error issuing certificate:', error);
      toast({
        title: "Error",
        description: "Failed to issue certificate",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    courseProgress,
    certificates,
    isLoading,
    updateProgress,
    issueCertificate,
    loadStudentProgress
  };
};

// Export education data hook
export const useEducationData = (): EducationData => {
  return {
    courses: [
      {
        id: "blockchain-basics",
        title: "Blockchain Fundamentals",
        description: "Learn the basics of blockchain technology and how it works",
        duration: "4 weeks",
        level: "Beginner",
        enrolledStudents: 1250,
        modules: [
          {
            title: "Introduction to Blockchain",
            description: "Understanding the core concepts"
          },
          {
            title: "Cryptography Basics",
            description: "How encryption secures the blockchain"
          }
        ]
      },
      {
        id: "defi-advanced",
        title: "DeFi Advanced Concepts",
        description: "Deep dive into decentralized finance protocols",
        duration: "6 weeks",
        level: "Advanced",
        enrolledStudents: 892
      }
    ],
    videos: [
      {
        id: "video-1",
        title: "Introduction to Cryptocurrency",
        description: "A beginner's guide to understanding digital currencies",
        duration: "15:30",
        category: "beginner",
        thumbnail: "/placeholder.svg",
        requiresMembership: false,
        instructor: "BIT Team",
        likes: 2500,
        views: 15000
      },
      {
        id: "video-2",
        title: "Advanced Trading Strategies",
        description: "Professional trading techniques for experienced users",
        duration: "25:45",
        category: "advanced",
        thumbnail: "/placeholder.svg",
        requiresMembership: true,
        instructor: "BIT Team",
        likes: 1850,
        views: 8500
      }
    ]
  };
};

// Export enrollment function
export const enrollInCourse = async (courseId: string, address: string): Promise<{success: boolean, error?: string}> => {
  try {
    // Simulate enrollment process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log(`Enrolling ${address} in course ${courseId}`);
    
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Enrollment failed' 
    };
  }
};
