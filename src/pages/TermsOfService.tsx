
import Layout from "@/components/layout/Layout";

const TermsOfService = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold text-bitaccess-gold mb-6">Terms of Service</h1>
            <p className="text-gray-400 mb-8">Last updated: {currentDate}</p>
            
            <div className="space-y-8 text-gray-300">
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                <p>By accessing or using the Bit Access Ecosystem platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">2. Description of Service</h2>
                <p>Bit Access Ecosystem provides a comprehensive blockchain platform including educational content, token staking, marketplace, and various DeFi services.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">3. User Eligibility</h2>
                <p>You must be at least 18 years old and legally capable of entering into binding contracts to use our services. Use is prohibited in restricted jurisdictions.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">4. Account Responsibilities</h2>
                <p>You are responsible for maintaining the security of your account credentials and wallet private keys. We are not liable for unauthorized access due to your negligence.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">5. Prohibited Activities</h2>
                <p>Users may not engage in illegal activities, market manipulation, money laundering, terrorism financing, or any activities that violate applicable laws or regulations.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">6. Intellectual Property</h2>
                <p>All content, trademarks, and intellectual property on our platform are owned by Bit Access Ecosystem or our licensors and are protected by applicable laws.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">7. Token Risks</h2>
                <p>Cryptocurrency investments carry significant risks including price volatility, total loss of funds, and regulatory changes. Invest only what you can afford to lose.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">8. No Financial Advice</h2>
                <p>Our platform provides educational content only. We do not provide financial, investment, or legal advice. Consult qualified professionals before making investment decisions.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">9. Platform Availability</h2>
                <p>We strive to maintain platform availability but do not guarantee uninterrupted service. Scheduled maintenance and unforeseen issues may cause temporary outages.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">10. Transaction Fees</h2>
                <p>Network transaction fees (gas fees) are determined by blockchain networks and are separate from any platform fees. Users are responsible for all applicable fees.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">11. Limitation of Liability</h2>
                <p>Our liability is limited to the maximum extent permitted by law. We are not liable for indirect, incidental, or consequential damages arising from platform use.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">12. Indemnification</h2>
                <p>You agree to indemnify and hold harmless Bit Access Ecosystem from any claims, damages, or expenses arising from your use of the platform or violation of these terms.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">13. Privacy and Data</h2>
                <p>Your use of our platform is subject to our Privacy Policy. By using our services, you consent to the collection and use of information as described in our Privacy Policy.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">14. Termination</h2>
                <p>We reserve the right to terminate or suspend your access to our platform at any time, with or without notice, for violation of these terms or other reasons.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">15. Governing Law</h2>
                <p>These terms are governed by applicable laws. Any disputes will be resolved through binding arbitration in accordance with established arbitration rules.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">16. Modifications to Terms</h2>
                <p>We may modify these terms at any time. Continued use of our platform after changes constitutes acceptance of the updated terms.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">17. Third-Party Services</h2>
                <p>Our platform may integrate with third-party services. We are not responsible for the availability, accuracy, or content of these external services.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">18. Compliance Requirements</h2>
                <p>Users must comply with all applicable laws and regulations in their jurisdiction, including tax obligations and anti-money laundering requirements.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">19. Platform Security</h2>
                <p>While we implement security measures, you acknowledge that no system is completely secure. Use strong passwords and enable two-factor authentication when available.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">20. Smart Contract Risks</h2>
                <p>Smart contracts are experimental technology. We are not liable for bugs, vulnerabilities, or unexpected behavior in smart contract code.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">21. User Content</h2>
                <p>You retain ownership of content you submit but grant us a license to use, modify, and display such content in connection with our services.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">22. Marketplace Terms</h2>
                <p>Additional terms apply to marketplace transactions. Sellers are responsible for product quality and delivery. We facilitate transactions but are not a party to sales.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">23. Staking and Rewards</h2>
                <p>Staking rewards are not guaranteed and may vary based on network conditions, participation rates, and other factors beyond our control.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">24. Force Majeure</h2>
                <p>We are not liable for delays or failures in performance due to circumstances beyond our reasonable control, including natural disasters, government actions, or network failures.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">25. Contact Information</h2>
                <p>For questions about these terms, please contact us at legal@bitaccessecosystem.com. These terms constitute the entire agreement between you and Bit Access Ecosystem.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
