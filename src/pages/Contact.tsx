
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Users, Facebook, Twitter, Youtube, Send, Github } from "lucide-react";

const Contact = () => {
  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="Contact Us"
            subtitle="Get in touch with our team for support, partnerships, or any questions about the Bit Access Ecosystem"
            centered
          />
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-3 bg-bitaccess-black-light rounded-xl p-8 border border-bitaccess-gold/20">
                <h3 className="text-xl font-bold text-white mb-6">Send Us a Message</h3>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full p-3 bg-bitaccess-black border border-bitaccess-gold/20 rounded text-white focus:border-bitaccess-gold focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full p-3 bg-bitaccess-black border border-bitaccess-gold/20 rounded text-white focus:border-bitaccess-gold focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                    <input
                      type="email"
                      className="w-full p-3 bg-bitaccess-black border border-bitaccess-gold/20 rounded text-white focus:border-bitaccess-gold focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Subject</label>
                    <select className="w-full p-3 bg-bitaccess-black border border-bitaccess-gold/20 rounded text-white focus:border-bitaccess-gold focus:outline-none">
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Partnership Opportunity</option>
                      <option>Merchant Onboarding</option>
                      <option>Press & Media</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Message</label>
                    <textarea
                      rows={5}
                      className="w-full p-3 bg-bitaccess-black border border-bitaccess-gold/20 rounded text-white focus:border-bitaccess-gold focus:outline-none"
                    ></textarea>
                  </div>
                  
                  <Button className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium">
                    Send Message
                  </Button>
                </form>
              </div>
              
              {/* Contact Information */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-bitaccess-black-light rounded-xl p-6 border border-bitaccess-gold/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-bitaccess-gold/10 p-3 rounded-full">
                      <Phone size={24} className="text-bitaccess-gold" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">Call Us</h4>
                      <p className="text-gray-400">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    Our support team is available Monday through Friday, 9am to 5pm EST.
                  </p>
                </div>
                
                <div className="bg-bitaccess-black-light rounded-xl p-6 border border-bitaccess-gold/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-bitaccess-gold/10 p-3 rounded-full">
                      <Mail size={24} className="text-bitaccess-gold" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">Email Us</h4>
                      <p className="text-gray-400">support@bitaecosystem.org</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    For general inquiries, partnership opportunities, or technical support.
                  </p>
                </div>
                
                <div className="bg-bitaccess-black-light rounded-xl p-6 border border-bitaccess-gold/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-bitaccess-gold/10 p-3 rounded-full">
                      <Users size={24} className="text-bitaccess-gold" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">Community</h4>
                      <p className="text-gray-400">Join our community channels</p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <a href="#" className="bg-bitaccess-black p-2 rounded-full text-bitaccess-gold hover:bg-bitaccess-gold hover:text-bitaccess-black transition-colors">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="bg-bitaccess-black p-2 rounded-full text-bitaccess-gold hover:bg-bitaccess-gold hover:text-bitaccess-black transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="bg-bitaccess-black p-2 rounded-full text-bitaccess-gold hover:bg-bitaccess-gold hover:text-bitaccess-black transition-colors">
                      <Youtube className="w-5 h-5" />
                    </a>
                    <a href="#" className="bg-bitaccess-black p-2 rounded-full text-bitaccess-gold hover:bg-bitaccess-gold hover:text-bitaccess-black transition-colors">
                      <Send className="w-5 h-5" />
                    </a>
                    <a href="#" className="bg-bitaccess-black p-2 rounded-full text-bitaccess-gold hover:bg-bitaccess-gold hover:text-bitaccess-black transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="bg-bitaccess-black p-2 rounded-full text-bitaccess-gold hover:bg-bitaccess-gold hover:text-bitaccess-black transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
