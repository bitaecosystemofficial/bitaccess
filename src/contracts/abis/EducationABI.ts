
export const EducationABI = [
  // Core education functions
  "function enrollInCourse(uint256 courseId) external returns (bool)",
  "function getCourseStatus(uint256 courseId, address student) view returns (uint8)",
  "function getEnrolledStudents(uint256 courseId) view returns (uint256)",
  "function getCourseDetails(uint256 courseId) view returns (tuple(string title, string description, string duration, string level, uint256 enrolled))",
  "function getAllCourses() view returns (tuple(uint256 id, string title, string description, string duration, string level, uint256 enrolled)[])",
  "function getStudentProgress(address student, uint256 courseId) view returns (uint256)",
  "function completeModule(uint256 courseId, uint256 moduleId) external returns (bool)",
  "function getModules(uint256 courseId) view returns (tuple(string title, string description)[])",
  
  // Events
  "event Enrolled(address indexed student, uint256 indexed courseId, uint256 timestamp)",
  "event ModuleCompleted(address indexed student, uint256 indexed courseId, uint256 moduleId)",
  "event CourseCompleted(address indexed student, uint256 indexed courseId)",
  "event CourseAdded(uint256 indexed courseId, string title, string duration)"
];
