
import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Update the state with the matching status
    const updateMatch = () => {
      setMatches(media.matches);
    };
    
    // Set initial value
    updateMatch();
    
    // Add listener for subsequent changes
    media.addEventListener('change', updateMatch);
    
    // Cleanup
    return () => {
      media.removeEventListener('change', updateMatch);
    };
  }, [query]);

  return matches;
};
