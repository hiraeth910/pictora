import colors from "../utils/colors"; // Importing colors from your config
import { motion } from "framer-motion"; // For animations
import { Link } from "react-router-dom"; // If using React Router
import Slider from "react-slick"; // For the slider
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";

const AboutPage = () => {
  const isMobile = window.innerWidth <= 768; // Adjust breakpoint as needed

  const styles = {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: isMobile ? "100%" : "65%",
    backgroundColor: colors.light
  };

  // Custom arrow components for the slider
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ 
          ...style, 
          display: "block", 
          background: colors.primary, 
          borderRadius: "50%",
          right: 10,
          zIndex: 2
        }}
        onClick={onClick}
      />
    );
  };

  NextArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ 
          ...style, 
          display: "block", 
          background: colors.primary, 
          borderRadius: "50%",
          left: 10,
          zIndex: 2
        }}
        onClick={onClick}
      />
    );
  };

  PrevArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
  };

  // Settings for react-slick slider
  const sliderSettings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: false,
  };

  // Steps for the slider cards
  const steps = [
    {
      title: "Register with Us",
      description: "Submit your details and once you get verified, you're good to go!",
    },
    {
      title: "Create a Course",
      description: "Get an instant selling link for your course with our easy-to-use platform.",
    },
    {
      title: "Easy Withdrawals",
      description: "Withdraw your earnings effortlessly with our streamlined process.",
    },
  ];

  return (
    <div style={styles}>
      <div className="bg-white text-gray-800 px-6 py-12 md:py-20">
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
          {/* Optionally add an image or illustration here */}
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

        {/* Slider Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <motion.h2 
            className="text-2xl font-semibold text-gray-900 text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Start Monetizing Your Course in Easy Steps
          </motion.h2>
          <Slider {...sliderSettings}>
            {steps.map((step, index) => (
              <div key={index} className="px-4">
                <motion.div
                  style={{ backgroundColor: "#11999E" }}
                  className="p-8 shadow-2xl rounded-3xl text-center m-4 border border-white transform transition duration-500"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="mt-2 text-white leading-relaxed">{step.description}</p>
                </motion.div>
              </div>
            ))}
          </Slider>
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
              Pictora enables creators to generate a <strong>unique selling link</strong> within seconds.
              No need for complex integrations or third-party payment setups.
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
              Even if you’re just starting out, you can sell your courses effortlessly.
              We handle everything in the backend so you can focus on creating valuable content.
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

        {/* Services Provided Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div 
            className="p-6 border-l-4" 
            style={{ borderColor: colors.primary }}
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-xl font-semibold">Course Creation & Sales</h2>
            <p className="text-gray-600 mt-2">
              PICTORA empowers educators to create and sell courses effortlessly. We charge a 13% transaction fee per course transaction, including our platform fee.
            </p>
          </motion.div>

          <motion.div 
            className="p-6 border-l-4" 
            style={{ borderColor: colors.secondary }}
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-xl font-semibold">Digital Art Sales</h2>
            <p className="text-gray-600 mt-2">
              Artists can showcase and sell their digital art on our platform. We charge up to an 11% fee per sale, ensuring a seamless experience.
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
            You don’t need to worry about anything except <strong>creating amazing content</strong> for your audience.
          </p>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/login">
            <motion.button
              className="px-6 py-3 text-lg font-semibold text-white rounded-lg shadow-lg mr-4"
              style={{ backgroundColor: colors.primary }}
              whileHover={{ scale: 1.1 }}
            >
              Join Us
            </motion.button>
          </Link>
          <Link to="/c/courses/64fee4">
            <motion.button
              className="px-6 py-3 text-lg font-semibold text-white rounded-lg shadow-lg"
              style={{ backgroundColor: colors.primary }}
              whileHover={{ scale: 1.1 }}
            >
              Buy a Course
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
