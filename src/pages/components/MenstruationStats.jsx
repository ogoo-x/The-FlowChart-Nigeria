import React from 'react';
import { motion } from 'framer-motion';

const MenstruationStats = () => {
  // Create an array of 30 items to represent the population
  const population = Array.from({ length: 12 }, (_, i) => i);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const dotVariants = {
    hidden: { 
      scale: 0,
      opacity: 0 
    },
    visible: { 
      scale: 1,
      opacity: 1 
    }
  };

  const highlightVariants = {
    initial: {
      backgroundColor: '#e2e8f0'
    },
    highlight: {
      backgroundColor: '#ef4444',
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: 'reverse'
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-wrap gap-4 justify-center mb-8"
      >
        {population.map((index) => (
          <motion.div
            key={index}
            variants={dotVariants}
            custom={index}
            className="relative"
          >
            <motion.div
              className="w-8 h-8 rounded-full"
              variants={highlightVariants}
              initial="initial"
              animate={index < 4 ? "highlight" : "initial"}
            >
              <svg 
                viewBox="0 0 24 24" 
                className="w-full h-full p-1"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="text-center space-y-4">
        <p className="italic">Approximately 1/3 of Nigeria's Population menstruate monthly</p>
      </div>
    </div>
  );
};

export default MenstruationStats;