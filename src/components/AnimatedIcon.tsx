import { motion } from "framer-motion";
import Lottie from "lottie-react";

const AnimatedIcon = ({ animationData, size = 40, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      className="flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <Lottie 
        animationData={animationData} 
        loop 
        autoplay
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice',
          progressiveLoad: true,
          clearCanvas: true,
        }}
        style={{ width: '100%', height: '100%' }}
      />    </motion.div>
  );
};

export default AnimatedIcon;
