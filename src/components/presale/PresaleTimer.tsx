
import { usePresaleTimer } from "@/utils/presale/presaleHooks";

const PresaleTimer = () => {
  const timeRemaining = usePresaleTimer();

  return (
    <div className="bg-bitaccess-black p-4 rounded-lg border border-bitaccess-gold/10">
      <p className="text-gray-400 text-sm mb-1">Presale Ends In</p>
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-bitaccess-black-dark p-2 text-center rounded">
          <span className="block text-xl font-bold text-bitaccess-gold">
            {String(timeRemaining.days).padStart(2, '0')}
          </span>
          <span className="text-xs text-gray-500">Days</span>
        </div>
        <div className="bg-bitaccess-black-dark p-2 text-center rounded">
          <span className="block text-xl font-bold text-bitaccess-gold">
            {String(timeRemaining.hours).padStart(2, '0')}
          </span>
          <span className="text-xs text-gray-500">Hours</span>
        </div>
        <div className="bg-bitaccess-black-dark p-2 text-center rounded">
          <span className="block text-xl font-bold text-bitaccess-gold">
            {String(timeRemaining.minutes).padStart(2, '0')}
          </span>
          <span className="text-xs text-gray-500">Minutes</span>
        </div>
        <div className="bg-bitaccess-black-dark p-2 text-center rounded">
          <span className="block text-xl font-bold text-bitaccess-gold">
            {String(timeRemaining.seconds).padStart(2, '0')}
          </span>
          <span className="text-xs text-gray-500">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default PresaleTimer;
