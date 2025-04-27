
export const EducationABI = [
  "function enrollInCourse(uint256 courseId) external returns (bool)",
  "function getCourseStatus(uint256 courseId, address student) view returns (uint8)",
  "function getEnrolledStudents(uint256 courseId) view returns (uint256)",
  "event Enrolled(address indexed student, uint256 indexed courseId)"
];
