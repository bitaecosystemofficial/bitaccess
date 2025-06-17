
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
