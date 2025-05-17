
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowRight } from "lucide-react";
import SpinWheelCanvas from "./SpinWheelCanvas";
import { Prize } from "@/services/SpinWheelService";

interface SpinWheelContainerProps {
  prizes: Prize[];
  spinMultiplier: number;
  freeSpins: number;
  spinCost: string;
  userCanSpin: boolean;
  isSpinning: boolean;
  spinResult: string | null;
  onSpin: () => Promise<void>;
}

const SpinWheelContainer = ({
  prizes,
  spinMultiplier,
  freeSpins,
  spinCost,
  userCanSpin,
  isSpinning,
  spinResult,
  onSpin
}: SpinWheelContainerProps) => {
  const [rotationAngle, setRotationAngle] = useState(0);

  // This function will be called from the parent to update the rotation angle
  // We expose this so that the parent can animate the wheel when spinning
  const updateRotation = (angle: number) => {
    setRotationAngle(angle);
  };

  return (
    <div className="md:col-span-2">
      {/* Premium Wheel Design */}
      <div className="relative flex justify-center mb-10">
        <div className="relative">
          <SpinWheelCanvas
            prizes={prizes}
            rotationAngle={rotationAngle}
            isSpinning={isSpinning}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-bitaccess-black rounded-full w-16 h-16 flex items-center justify-center border-2 border-bitaccess-gold">
              <span className="text-bitaccess-gold font-bold">SPIN</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        {spinResult && (
          <div className="mb-4 p-4 bg-bitaccess-gold/10 border border-bitaccess-gold rounded-lg animate-fade-in">
            <h4 className="text-2xl font-bold text-bitaccess-gold">Congratulations!</h4>
            <p className="text-white text-lg">You won: {spinResult}</p>
          </div>
        )}

        <Button
          onClick={onSpin}
          disabled={isSpinning || !userCanSpin}
          size="lg"
          className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium"
        >
          {isSpinning ? (
            <>
              Spinning... <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              Spin the Wheel <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        <p className="mt-3 text-sm text-gray-400">
          {freeSpins > 0 ? (
            <span>Using free spin ({freeSpins} remaining)</span>
          ) : (
            <span>Cost: {spinCost} BIT per spin</span>
          )}
        </p>

        {spinMultiplier > 1 && (
          <Badge className="mt-2 bg-bitaccess-gold text-black">
            x{spinMultiplier} Multiplier Active!
          </Badge>
        )}
      </div>
    </div>
  );
};

export default SpinWheelContainer;
