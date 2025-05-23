
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface FlipCardProps {
  frontSide: React.ReactNode;
  backSide: React.ReactNode;
}

const FlipCard: React.FC<FlipCardProps> = ({ frontSide, backSide }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Effect for 3D tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        setMousePosition({ x, y });
        
        // Only apply tilt effect when not flipped
        if (!isFlipped) {
          const tiltX = (y - 0.5) * 10; // -5 to 5 degrees
          const tiltY = (0.5 - x) * 10; // -5 to 5 degrees
          
          cardRef.current.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        } else {
          cardRef.current.style.transform = 'rotateY(180deg)';
        }
      }
    };
    
    const handleMouseLeave = () => {
      if (cardRef.current) {
        if (!isFlipped) {
          cardRef.current.style.transform = 'rotateX(0) rotateY(0)';
        } else {
          cardRef.current.style.transform = 'rotateY(180deg)';
        }
      }
    };
    
    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [isFlipped]);

  const toggleFlip = () => setIsFlipped(!isFlipped);

  return (
    <>
      <div className="flex justify-center mb-8 animate-fade-in animation-delay-300">
        <Button 
          onClick={toggleFlip} 
          className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black transition-all duration-300 hover:scale-105"
        >
          {isFlipped ? "View Front" : "View Back"}
        </Button>
      </div>

      <div className="perspective-1000 w-full max-w-lg mx-auto h-72 cursor-pointer mb-10 animate-fade-in animation-delay-400">
        <div 
          ref={cardRef}
          className={`relative w-full h-full transition-transform duration-700 transform-style-3d card-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          onClick={toggleFlip}
        >
          {frontSide}
          {backSide}
        </div>
      </div>
    </>
  );
};

export default FlipCard;
