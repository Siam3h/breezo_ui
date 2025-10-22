import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

const AnimatedIcon = ({ animationData, size = 40, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <Lottie animationData={animationData} loop autoplay />
    </motion.div>
  );
};

export default AnimatedIcon;
