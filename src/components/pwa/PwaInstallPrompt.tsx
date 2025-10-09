import { useEffect, useState } from 'react';
import { X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PwaInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after 3 seconds
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 animate-in slide-in-from-left">
      <div className="bg-bitaccess-black border-2 border-bitaccess-gold rounded-lg p-4 shadow-2xl max-w-xs">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <X size={16} />
        </button>
        
        <div className="flex items-center gap-3 mb-3">
          <img 
            src="/pwa-icon.png" 
            alt="BIT Access" 
            className="w-12 h-12 rounded-lg"
          />
          <div>
            <h3 className="text-white font-semibold">Install BIT Access</h3>
            <p className="text-xs text-gray-400">Quick access from your home screen</p>
          </div>
        </div>

        <Button
          onClick={handleInstall}
          className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-semibold"
        >
          <Download className="w-4 h-4 mr-2" />
          Install App
        </Button>
      </div>
    </div>
  );
};

export default PwaInstallPrompt;
