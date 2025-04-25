
const Logo = () => {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="8" fill="url(#paint0_linear)" />
      <path d="M18 6L28 12V24L18 30L8 24V12L18 6Z" fill="#0D0D0D" stroke="url(#paint1_linear)" strokeWidth="2" />
      <path d="M18 12L23 15V21L18 24L13 21V15L18 12Z" fill="url(#paint2_linear)" />
      <defs>
        <linearGradient id="paint0_linear" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#000000" />
          <stop offset="1" stopColor="#1A1A1A" />
        </linearGradient>
        <linearGradient id="paint1_linear" x1="8" y1="6" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700" />
          <stop offset="1" stopColor="#B8860B" />
        </linearGradient>
        <linearGradient id="paint2_linear" x1="13" y1="12" x2="23" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700" />
          <stop offset="1" stopColor="#B8860B" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
