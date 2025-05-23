
import React from 'react';
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";

interface ReferrerInputProps {
  referrerAddress: string;
  onChange: (value: string) => void;
}

const ReferrerInput: React.FC<ReferrerInputProps> = ({ referrerAddress, onChange }) => {
  const hasError = referrerAddress && !referrerAddress.startsWith('0x');
  
  return (
    <div className="max-w-md mx-auto mb-8 animate-fade-in">
      <div className="mb-2 text-sm text-gray-400">Enter Referrer Address (Optional)</div>
      <div className="flex gap-2">
        <Input 
          placeholder="0x..." 
          value={referrerAddress}
          onChange={(e) => onChange(e.target.value)}
          className="bg-bitaccess-black border-gray-700 focus:border-bitaccess-gold/50"
        />
      </div>
      {hasError && (
        <div className="flex items-center gap-1 mt-1 text-xs text-red-400">
          <AlertCircle className="h-3 w-3" />
          <span>Address must start with 0x</span>
        </div>
      )}
    </div>
  );
};

export default ReferrerInput;
