
import { Link } from "react-router-dom";
import { Facebook, Twitter, Youtube, Send, Github, Smartphone, TabletSmartphone } from "lucide-react";
import Logo from "@/components/layout/Logo";

const Footer = () => {
  return (
    <footer className="bg-bitaccess-black border-t border-bitaccess-gold/30 relative overflow-hidden">
      {/* Bubble Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-4 h-4 bg-bitaccess-gold/10 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-6 h-6 bg-bitaccess-gold/5 rounded-full animate-float animation-delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-bitaccess-gold/15 rounded-full animate-float animation-delay-300"></div>
        <div className="absolute bottom-40 right-1/3 w-5 h-5 bg-bitaccess-gold/8 rounded-full animate-float animation-delay-200"></div>
      </div>
      
      <div className="container mx-auto py-12 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Logo />
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Empowering blockchain education and merchant adoption through the Bit Access Ecosystem.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-bitaccess-gold hover:text-bitaccess-gold-light transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-bitaccess-gold hover:text-bitaccess-gold-light transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-bitaccess-gold hover:text-bitaccess-gold-light transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-bitaccess-gold hover:text-bitaccess-gold-light transition-colors">
                <Send className="w-5 h-5" />
              </a>
              <a href="#" className="text-bitaccess-gold hover:text-bitaccess-gold-light transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
            
            {/* Supported Wallets Integration */}
            <div className="mt-4 pt-4 border-t border-bitaccess-gold/20">
              <p className="text-sm text-gray-400 mb-2">Supported Wallet</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <img 
                    src="https://metamask.io/favicons/default/apple-touch-icon.png" 
                    alt="MetaMask" 
                    className="w-6 h-6"
                  />
                  <span className="text-sm text-white">MetaMask Wallet</span>
                </div>
                <div className="flex items-center gap-2">
                  <img 
                    src="https://vectorseek.com/wp-content/uploads/2024/07/Trust-Wallet-Shield-Logo-Vector-Logo-Vector.svg-.png" 
                    alt="Trust Wallet" 
                    className="w-6 h-6 rounded"
                  />
                  <span className="text-sm text-white">Trust Wallet</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-bitaccess-gold mb-4">Ecosystem</h3>
            <ul className="space-y-2">
              <li><Link to="/airdrop" className="text-gray-400 hover:text-bitaccess-gold">Airdrop</Link></li>
              <li><Link to="/presale" className="text-gray-400 hover:text-bitaccess-gold">Presale</Link></li>
              <li><Link to="/staking" className="text-gray-400 hover:text-bitaccess-gold">Staking</Link></li>
              <li><Link to="/swap" className="text-gray-400 hover:text-bitaccess-gold">Swap</Link></li>
              <li><Link to="/merchants" className="text-gray-400 hover:text-bitaccess-gold">Merchants</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-bitaccess-gold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/docs" className="text-gray-400 hover:text-bitaccess-gold">Documentation</Link></li>
              <li><Link to="/docs/whitepaper" className="text-gray-400 hover:text-bitaccess-gold">Whitepaper</Link></li>
              <li><Link to="/docs/roadmap" className="text-gray-400 hover:text-bitaccess-gold">Roadmap</Link></li>
              <li><Link to="/docs/faq" className="text-gray-400 hover:text-bitaccess-gold">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-bitaccess-gold">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-bitaccess-gold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for updates</p>
            <form className="flex flex-col sm:flex-row gap-2 mb-6">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-bitaccess-black-light text-white rounded-md border border-bitaccess-gold/30 focus:border-bitaccess-gold focus:outline-none w-full"
              />
              <button
                type="submit"
                className="bg-bitaccess-gold text-bitaccess-black font-medium px-4 py-2 rounded-md hover:bg-bitaccess-gold-dark transition-colors"
              >
                Subscribe
              </button>
            </form>
            
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white">Download App</h4>
              <div className="flex flex-col gap-2">
                <a 
                  href="#" 
                  className="flex items-center gap-2 bg-bitaccess-black-light border border-bitaccess-gold/30 rounded-lg px-3 py-2 hover:border-bitaccess-gold transition-colors"
                >
                  <Smartphone className="w-5 h-5 text-bitaccess-gold" />
                  <div className="text-left">
                    <p className="text-xs text-gray-400">Download on</p>
                    <p className="text-sm text-white font-medium">Google Play</p>
                  </div>
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-2 bg-bitaccess-black-light border border-bitaccess-gold/30 rounded-lg px-3 py-2 hover:border-bitaccess-gold transition-colors"
                >
                  <TabletSmartphone className="w-5 h-5 text-bitaccess-gold" />
                  <div className="text-left">
                    <p className="text-xs text-gray-400">Download on</p>
                    <p className="text-sm text-white font-medium">App Store</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-bitaccess-gold/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            Copyright © {new Date().getFullYear()} Bit Access. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-sm text-gray-400 hover:text-bitaccess-gold">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-sm text-gray-400 hover:text-bitaccess-gold">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
