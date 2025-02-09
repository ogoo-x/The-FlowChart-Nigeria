import React from 'react';
import { motion } from 'framer-motion';
import { BsFillPersonFill } from 'react-icons/bs';

const StatComparison = () => {
  // Create arrays for the icons
  const firstGroup = Array(5).fill(null);
  const secondGroup = Array(5).fill(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const iconVariants = {
    hidden: { 
      opacity: 0,
      scale: 1,
      y: 10 
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0
      }
  };

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto p-6 space-y-8 md:space-y-0 md:space-x-12 flex flex-col md:flex-row items-center justify-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* First Statistic */}
      <motion.div 
        className="text-center space-y-4"
        variants={containerVariants}
      >
        <div className="flex justify-center space-x-2">
          {firstGroup.map((_, index) => (
            <motion.div 
              key={index}
              variants={iconVariants}
            >
              <BsFillPersonFill 
                size={48}
                className={index === 0 ? "text-custom-pink" : "text-gray-300"}
              />
            </motion.div>
          ))}
        </div>
        <motion.p 
          className=""
          variants={iconVariants}
        >
          1 in 5 girls in Imo State cannot afford sanitary products
        </motion.p>
      </motion.div>

      {/* Divider - only visible on desktop */}
      <div className="hidden md:block w-px h-28 bg-gray-200" />

      {/* Second Statistic */}
      <motion.div 
        className="text-center space-y-4"
        variants={containerVariants}
      >
        <div className="flex justify-center space-x-2">
          {secondGroup.map((_, index) => (
            <motion.div 
              key={index}
              variants={iconVariants}
            >
              <BsFillPersonFill 
                size={48}
                className={index <= 1 ? "text-custom-pink" : "text-gray-300"}
              />
            </motion.div>
          ))}
        </div>
        <motion.p 
          className=""
          variants={iconVariants}
        >
          2 in 5 girls in Taraba State cannot afford sanitary products
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default StatComparison;