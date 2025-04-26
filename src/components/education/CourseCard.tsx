
import { Button } from "@/components/ui/button";
import { BookText } from "lucide-react";
import { Course } from "@/utils/contractUtils";
import { Link } from "react-router-dom";

interface CourseCardProps {
  course: Course;
  onEnroll: () => void;
  isConnected: boolean;
}

const CourseCard = ({ course, onEnroll, isConnected }: CourseCardProps) => {
  return (
    <div className="bg-bitaccess-black-light rounded-xl p-6 border border-bitaccess-gold/20 hover:border-bitaccess-gold/40 transition-colors">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-full bg-bitaccess-gold/10">
          <BookText className="h-6 w-6 text-bitaccess-gold" />
        </div>
        <h3 className="text-xl font-bold text-white">{course.title}</h3>
      </div>
      
      <p className="text-gray-400 mb-4">{course.description}</p>
      
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Duration:</span>
          <span className="text-bitaccess-gold">{course.duration}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Level:</span>
          <span className="text-bitaccess-gold">{course.level}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Enrolled:</span>
          <span className="text-bitaccess-gold">{course.enrolledStudents} students</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button 
          className="flex-1 bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
          onClick={onEnroll}
        >
          {isConnected ? "Enroll Now" : "Connect Wallet"}
        </Button>
        <Button 
          variant="outline" 
          className="border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10"
          asChild
        >
          <Link to={`/education/${course.id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
