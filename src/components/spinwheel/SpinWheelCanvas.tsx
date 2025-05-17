
import { useRef, useEffect } from "react";
import { Prize } from "@/services/SpinWheelService";

interface SpinWheelCanvasProps {
  prizes: Prize[];
  rotationAngle: number;
  isSpinning: boolean;
}

const SpinWheelCanvas = ({ prizes, rotationAngle, isSpinning }: SpinWheelCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Colors for wheel sections
  const colors = [
    "#FFD700", // Gold
    "#1E90FF", // Blue
    "#32CD32", // Green
    "#FF6347", // Red
    "#9370DB", // Purple
    "#FF8C00", // Orange
  ];

  // Draw wheel on canvas
  useEffect(() => {
    if (!canvasRef.current || !prizes || prizes.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw wheel sections
    const numPrizes = prizes.length;
    const anglePerSection = (2 * Math.PI) / numPrizes;
    
    // Apply rotation
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotationAngle * Math.PI) / 180);
    
    for (let i = 0; i < numPrizes; i++) {
      const prize = prizes[i];
      
      // Draw section
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, i * anglePerSection, (i + 1) * anglePerSection);
      ctx.closePath();
      
      // Determine fill color based on prize type
      let fillColor = colors[i % colors.length];
      if (prize.isFreeSpin) {
        fillColor = "#32CD32"; // Green for free spins
      } else if (prize.spinMultiplier > 1) {
        fillColor = "#FFD700"; // Gold for multipliers
      } else if (prize.amount < 0) {
        fillColor = "#FF6347"; // Red for losses
      } else if (prize.amount > 1000) {
        fillColor = "#9370DB"; // Purple for jackpots
      }
      
      ctx.fillStyle = fillColor;
      ctx.fill();
      
      // Add prize text
      ctx.save();
      ctx.rotate(i * anglePerSection + anglePerSection / 2);
      ctx.textAlign = "center";
      ctx.fillStyle = "#000";
      ctx.font = "bold 14px Arial";
      
      // Format text based on prize type
      let prizeText = prize.name;
      if (prizeText.length > 12) {
        prizeText = prizeText.substring(0, 10) + "...";
      }
      ctx.fillText(prizeText, radius / 2, 0);
      ctx.restore();
    }
    
    ctx.restore();
    
    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = "#222";
    ctx.fill();
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw outer border
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 4;
    ctx.stroke();
    
    // Draw pointer
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 15);
    ctx.lineTo(centerX - 15, centerY - radius + 10);
    ctx.lineTo(centerX + 15, centerY - radius + 10);
    ctx.closePath();
    ctx.fillStyle = "#FFD700";
    ctx.fill();
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 2;
    ctx.stroke();
    
  }, [rotationAngle, prizes]);

  return (
    <canvas 
      ref={canvasRef} 
      width={400} 
      height={400} 
      className={`${isSpinning ? "animate-pulse" : ""}`}
    />
  );
};

export default SpinWheelCanvas;
