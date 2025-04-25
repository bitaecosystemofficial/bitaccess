
import { Button } from "@/components/ui/button";

const CommunitySection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(245,204,127,0.1)_0%,rgba(13,13,13,1)_70%)]"></div>
      </div>
      
      <div className="container px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gold-gradient text-transparent bg-clip-text">
            Join Our Growing Community
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Connect with like-minded individuals, access exclusive content, participate in governance decisions, and stay updated on the latest developments.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
              <p className="text-3xl font-bold text-bitaccess-gold mb-2">45K+</p>
              <p className="text-sm text-gray-400">Telegram Members</p>
            </div>
            <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
              <p className="text-3xl font-bold text-bitaccess-gold mb-2">28K+</p>
              <p className="text-sm text-gray-400">Twitter Followers</p>
            </div>
            <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
              <p className="text-3xl font-bold text-bitaccess-gold mb-2">15K+</p>
              <p className="text-sm text-gray-400">Discord Members</p>
            </div>
            <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
              <p className="text-3xl font-bold text-bitaccess-gold mb-2">8K+</p>
              <p className="text-sm text-gray-400">Reddit Members</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium">
              Join Telegram
            </Button>
            <Button size="lg" variant="outline" className="border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10">
              Follow on Twitter
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
