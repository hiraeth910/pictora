import colors from "../utils/colors"; // Importing colors from your config
import { motion } from "framer-motion"; // For animations
import { Link } from "react-router-dom"; // If using React Router

const AboutPage = () => {
    const isMobile = window.innerWidth <= 768; // Adjust breakpoint as needed

    const styles = {
        marginRight:'auto',
        marginLeft:'auto',
        width: isMobile ? "100%" : "65%",

    }
  return (
    <div style={styles} >
    <div className="bg-white text-gray-800 px-6 py-12 w-65 md:py-20">
      {/* Header Section */}
      <div className="text-center">
        <motion.h1 
          className="text-4xl font-bold text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to <span style={{ color: colors.primary }}>Pictora</span>
        </motion.h1>
        <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
          A platform built for course creators to instantly generate a selling link and monetize their audience.
        </p>
      </div>

      {/* Image Section */}
      <motion.div 
        className="mt-10 flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <img 
          src="https://source.unsplash.com/800x400/?graph,analytics" 
          alt="Analytics graph"
          className="rounded-lg shadow-lg w-full max-w-2xl"
        />
      </motion.div>

      {/* Vision Section */}
      <div className="mt-12 max-w-4xl mx-auto text-center">
        <motion.h2 
          className="text-2xl font-semibold text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Vision
        </motion.h2>
        <p className="text-gray-600 mt-4">
          At Pictora, we believe that knowledge should be accessible, and content creators should have a hassle-free way to monetize their expertise.
          We understand the struggles of setting up platforms, managing payments, and handling sales.
          That’s why we built a simple yet powerful solution that removes all the complexities.
          Our mission is to empower educators, influencers, and industry experts to turn their skills into income without any technical hurdles.
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <motion.div 
          className="p-6 border-l-4" 
          style={{ borderColor: colors.accent }}
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-xl font-semibold">Instant Selling Links</h2>
          <p className="text-gray-600 mt-2">
            Pictora enables creators to generate a **unique selling link** within seconds.
            No need for complex integrations, no need for third-party payment setups.
            Just create your course and share the link with your audience.
          </p>
        </motion.div>

        <motion.div 
          className="p-6 border-l-4" 
          style={{ borderColor: colors.secondary }}
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-xl font-semibold">Designed for Audience-Focused Creators</h2>
          <p className="text-gray-600 mt-2">
            If you have an audience, we have the tools to help you monetize them.
            Pictora is tailored for YouTubers, bloggers, Instagram influencers, and anyone who wants to turn knowledge into revenue.
          </p>
        </motion.div>

        <motion.div 
          className="p-6 border-l-4" 
          style={{ borderColor: colors.primary }}
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-xl font-semibold">Beginner Friendly</h2>
          <p className="text-gray-600 mt-2">
            Even if you`re just starting out, you can sell your courses effortlessly.
            We handle everything in the backend, so you can focus on creating valuable content.
          </p>
        </motion.div>

        <motion.div 
          className="p-6 border-l-4" 
          style={{ borderColor: colors.accent }}
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-xl font-semibold">No Technical Knowledge Needed</h2>
          <p className="text-gray-600 mt-2">
            You don’t need to worry about hosting, domain setup, or payment gateways.
            Pictora takes care of everything while you focus on sharing knowledge.
          </p>
        </motion.div>
      </div>

      {/* Why Choose Pictora Section */}
      <div className="mt-12 max-w-4xl mx-auto text-center">
        <motion.h2 
          className="text-2xl font-semibold text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Pictora?
        </motion.h2>
        <p className="text-gray-600 mt-4">
          We understand that selling courses online can be overwhelming.
          Many platforms demand technical expertise, high fees, and complicated processes.
          With Pictora, we strip away all these barriers and give you a direct way to sell.
          Our platform is lightweight, simple, and efficient.
          You don’t need to worry about anything except **creating amazing content** for your audience.
        </p>
      </div>

      {/* Another Image */}
      <motion.div 
        className="mt-10 flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <img 
          src="https://source.unsplash.com/800x400/?startup,success" 
          alt="Startup success"
          className="rounded-lg shadow-lg w-full max-w-2xl"
        />
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link to="/login">
          <motion.button
            className="px-6 py-3 text-lg font-semibold text-white rounded-lg shadow-lg"
            style={{ backgroundColor: colors.primary }}
            whileHover={{ scale: 1.1 }}
          >
            Join Us
          </motion.button>
        </Link>
      </motion.div>
    </div></div>
  );
};

export default AboutPage;
