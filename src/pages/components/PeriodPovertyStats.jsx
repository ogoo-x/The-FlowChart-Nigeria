import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PeriodPovertyStats = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Create array for menstruating population (20 items)
  const menstruatingPopulation = Array.from({ length: 20 }, (_, i) => i);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.5
      }
    }
  };

  const personVariants = {
    hidden: { 
      scale: 0,
      opacity: 0 
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const waveVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-8 space-y-8">
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-5 gap-4 justify-items-center"
      >
        {menstruatingPopulation.map((index) => (
          <motion.div
            key={index}
            variants={personVariants}
            className="relative"
          >
            <motion.div
              variants={waveVariants}
              animate={isAnimating ? "animate" : "initial"}
              className={`w-12 h-12 rounded-full flex items-center justify-center
                ${index < 12 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <svg 
                viewBox="0 0 24 24" 
                className="w-8 h-8"
                fill="currentColor"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex justify-center gap-8 mt-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span>In period poverty</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
          <span>Has access to products</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="text-center mt-6 p-4 bg-red-50 rounded-lg"
      >
        <p className="text-red-700 font-medium">
          Over 37 million Nigerians struggle to afford or access period products monthly
        </p>
      </motion.div>
    </div>
  );
};

export default PeriodPovertyStats;