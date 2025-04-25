
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Users } from "lucide-react";

const Contact = () => {
  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="Contact Us"
            subtitle="Get in touch with our team for support, partnerships, or any questions about the BitAccess ecosystem"
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
                      <p className="text-gray-400">support@bitaccess.com</p>
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
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="#" className="bg-bitaccess-black p-2 rounded-full text-bitaccess-gold hover:bg-bitaccess-gold hover:text-bitaccess-black transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                    <a href="#" className="bg-bitaccess-black p-2 rounded-full text-bitaccess-gold hover:bg-bitaccess-gold hover:text-bitaccess-black transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path>
                      </svg>
                    </a>
                    <a href="#" className="bg-bitaccess-black p-2 rounded-full text-bitaccess-gold hover:bg-bitaccess-gold hover:text-bitaccess-black transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.976 10.072c.56.188 1.022.517 1.372.98.456.592.684 1.307.684 2.146 0 .861-.22 1.58-.66 2.157-.44.577-1.064.956-1.869 1.138l2.263 3.337h-2.646L4.982 16.6H3.83v3.23H1.788V8.395h4.35c.964 0 1.731.215 2.304.646.573.43.934 1.076 1.081 1.937-.002-.308-.015-.62-.039-.936 0-.01-.001-.021-.002-.031.558-.208 1.267-.269 1.645-.27.19 0 .373.026.548.075V8.39h2.111v2.126c.195.134.374.287.537.458.37.39.662.86.876 1.399.214.54.322 1.1.322 1.68 0 .6-.102 1.143-.305 1.68-.203.535-.483 1.003-.84 1.401a3.93 3.93 0 01-1.258.945c-.486.233-1.017.35-1.592.35-.507 0-.983-.09-1.426-.269a3.44 3.44 0 01-1.14-.75 3.465 3.465 0 01-.75-1.146 3.913 3.913 0 01-.274-1.483c0-.45.073-.875.219-1.272l-.17.8.244.851a3.129 3.129 0 00-.341-.483zm8.459 5.568H22V8.391h-5.565zm-3.453-1.874c.235 0 .46-.047.67-.142.21-.095.394-.229.551-.399.158-.17.282-.372.375-.608.092-.236.138-.495.138-.777 0-.282-.046-.54-.138-.777a1.71 1.71 0 00-.369-.608 1.646 1.646 0 00-.551-.405 1.683 1.683 0 00-.676-.142c-.256 0-.489.048-.699.142-.21.094-.394.228-.551.399-.157.17-.281.372-.369.608-.087.236-.131.5-.131.789 0 .292.044.554.131.789.088.236.211.438.37.608.156.17.34.304.55.399.21.095.443.142.699.142zm-9.238-1.825c0-.175-.044-.308-.131-.398a.766.766 0 00-.268-.199 1.267 1.267 0 00-.358-.074 5.42 5.42 0 00-.387-.012h-.608v1.374h.608c.314 0 .57-.063.77-.187.198-.125.299-.297.301-.517l.073.013z"></path>
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
