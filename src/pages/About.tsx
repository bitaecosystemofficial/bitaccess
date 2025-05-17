
import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout>
      <div className="container max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="space-y-12">
          {/* Overview Section */}
          <section className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold bg-gold-gradient text-transparent bg-clip-text">About BitAccess</h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              BitAccess is a pioneering ecosystem designed to bridge the gap between blockchain education and merchant adoption.
              Our platform provides innovative solutions for both users learning about blockchain technology and merchants
              looking to integrate cryptocurrency payments into their business models.
            </p>
          </section>
          
          <Separator className="border-bitaccess-gold/20" />

          {/* About Us Section */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-bitaccess-gold">About Us</h2>
            <p className="text-gray-400 leading-relaxed">
              Founded in 2024, BitAccess emerged from a vision to democratize blockchain knowledge and accelerate
              cryptocurrency adoption in everyday commerce. Our team of blockchain experts, educators, and business
              development professionals have combined their expertise to create a comprehensive ecosystem that serves
              both individual users and merchants worldwide.
            </p>
            <p className="text-gray-400 leading-relaxed">
              With a focus on accessibility and practicality, we've developed a suite of tools and resources that make
              blockchain technology approachable for everyone, regardless of their technical background.
            </p>
          </section>
          
          {/* Mission & Vision Section */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3 p-6 bg-bitaccess-black-light rounded-lg">
              <h2 className="text-2xl font-bold text-bitaccess-gold">Our Mission</h2>
              <p className="text-gray-400">
                To empower individuals through accessible blockchain education and enable businesses
                to seamlessly integrate cryptocurrency payment solutions, creating a more inclusive
                and efficient global economy.
              </p>
            </div>
            <div className="space-y-3 p-6 bg-bitaccess-black-light rounded-lg">
              <h2 className="text-2xl font-bold text-bitaccess-gold">Our Vision</h2>
              <p className="text-gray-400">
                A world where blockchain literacy is widespread, cryptocurrency transactions are commonplace,
                and the benefits of decentralized technologies are accessible to people from all walks of life.
              </p>
            </div>
          </section>
          
          {/* Core Values Section */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-bitaccess-gold">Core Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2 p-5 bg-bitaccess-black-light rounded-lg">
                <h3 className="text-xl font-semibold text-bitaccess-gold">Accessibility</h3>
                <p className="text-gray-400">
                  Making complex blockchain concepts understandable to everyone through clear,
                  jargon-free education and intuitive tools.
                </p>
              </div>
              <div className="space-y-2 p-5 bg-bitaccess-black-light rounded-lg">
                <h3 className="text-xl font-semibold text-bitaccess-gold">Innovation</h3>
                <p className="text-gray-400">
                  Continuously improving our platform and services to stay at the forefront
                  of blockchain technology and educational methods.
                </p>
              </div>
              <div className="space-y-2 p-5 bg-bitaccess-black-light rounded-lg">
                <h3 className="text-xl font-semibold text-bitaccess-gold">Integrity</h3>
                <p className="text-gray-400">
                  Operating with transparency and honesty in all our interactions with users,
                  merchants, and partners.
                </p>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-bitaccess-gold">Our Team</h2>
            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-bitaccess-gold">Executive Leadership</h3>
                <p className="text-gray-400">
                  Our executive team brings together decades of combined experience in blockchain development,
                  education, finance, and business strategy. Led by our visionary CEO, who has been at the forefront
                  of cryptocurrency adoption since 2014, our leadership team ensures BitAccess maintains its
                  commitment to excellence and innovation.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-bitaccess-gold">Technical Team</h3>
                <p className="text-gray-400">
                  Our development and technical operations are handled by a skilled team of blockchain engineers,
                  smart contract developers, and security specialists. With backgrounds from leading tech companies
                  and blockchain projects, our technical team ensures the BitAccess platform remains secure,
                  efficient, and cutting-edge.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-bitaccess-gold">Education & Content</h3>
                <p className="text-gray-400">
                  Our educational content is created by a diverse team of blockchain educators, researchers,
                  and content specialists who are passionate about making complex topics accessible.
                  This team includes former academics, professional educators, and blockchain enthusiasts
                  who collaborate to develop our comprehensive learning resources.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-bitaccess-gold">Business Development</h3>
                <p className="text-gray-400">
                  Our merchant relations and business development team works directly with businesses
                  to implement cryptocurrency payment solutions. With expertise in retail, e-commerce,
                  and payment processing, this team helps merchants seamlessly integrate with the
                  BitAccess ecosystem.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="bg-gradient-to-r from-bitaccess-black-light to-bitaccess-black p-8 rounded-lg text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-bitaccess-gold mb-4">Join the BitAccess Ecosystem</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Whether you're looking to learn about blockchain technology, stake your tokens for rewards,
              or integrate cryptocurrency payments into your business, BitAccess has the tools and resources
              you need to succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black">
                <Link to="/airdrop">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" className="border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;
