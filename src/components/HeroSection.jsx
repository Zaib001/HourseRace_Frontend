import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center text-center p-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white"
    >
      <h1 className="text-4xl font-bold">Register Your Horse on the Blockchain</h1>
      <p className="mt-4 text-lg">Easily register and verify your horses securely.</p>
    </motion.div>
  );
};

export default HeroSection;
