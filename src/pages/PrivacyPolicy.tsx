
import Layout from "@/components/layout/Layout";

const PrivacyPolicy = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <Layout>
      <div className="min-h-screen bg-bitaccess-black pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="bg-bitaccess-black-light rounded-xl border border-bitaccess-gold/20 p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-bitaccess-gold mb-6">Privacy Policy</h1>
            <p className="text-gray-400 mb-8">Last updated: {currentDate}</p>
            
            <div className="space-y-8 text-gray-300">
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">1. Information We Collect</h2>
                <p>Bit Access Ecosystem collects information you provide directly to us, such as when you create an account, use our services, or contact us for support.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">2. Wallet Information</h2>
                <p>When you connect your cryptocurrency wallet to our platform, we may collect your wallet address and transaction history to provide our services effectively.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">3. Usage Data</h2>
                <p>We automatically collect information about your interactions with our platform, including pages visited, features used, and time spent on our services.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">4. Device Information</h2>
                <p>We may collect information about the device you use to access our services, including IP address, browser type, operating system, and device identifiers.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">5. Cookies and Tracking</h2>
                <p>We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content and advertisements.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">6. Third-Party Services</h2>
                <p>Our platform may integrate with third-party services for analytics, payment processing, and other functionalities. These services have their own privacy policies.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">7. Data Security</h2>
                <p>We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">8. Data Retention</h2>
                <p>We retain your personal information for as long as necessary to provide our services and comply with legal obligations, typically not exceeding 7 years.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">9. Data Sharing</h2>
                <p>We do not sell your personal information. We may share data with service providers, legal authorities when required, or in connection with business transfers.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">10. Your Rights</h2>
                <p>You have the right to access, update, delete, or restrict the processing of your personal information. Contact us to exercise these rights.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">11. International Transfers</h2>
                <p>Your information may be transferred to and processed in countries other than your own, where data protection laws may differ from those in your jurisdiction.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">12. Children's Privacy</h2>
                <p>Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children under 18.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">13. Marketing Communications</h2>
                <p>We may send you promotional emails about our services. You can opt out of these communications at any time by following the unsubscribe instructions.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">14. Blockchain Data</h2>
                <p>Transactions on blockchain networks are public and immutable. We cannot control or delete information recorded on public blockchains.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">15. Analytics and Performance</h2>
                <p>We use analytics tools to understand how our services are used, which helps us improve functionality and user experience.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">16. Legal Compliance</h2>
                <p>We may process your information to comply with legal obligations, respond to legal requests, or protect our rights and the rights of others.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">17. Data Breach Notification</h2>
                <p>In the event of a data breach that may affect your personal information, we will notify you and relevant authorities as required by applicable law.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">18. Updates to Privacy Policy</h2>
                <p>We may update this privacy policy from time to time. We will notify you of significant changes through our platform or via email.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">19. Contact Information</h2>
                <p>If you have questions about this privacy policy or our data practices, please contact us at privacy@bitaccessecosystem.com.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">20. Governing Law</h2>
                <p>This privacy policy is governed by and construed in accordance with applicable data protection laws and regulations in your jurisdiction.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
