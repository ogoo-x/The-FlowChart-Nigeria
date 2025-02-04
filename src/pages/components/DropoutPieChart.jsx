import React from 'react';
import { motion } from 'framer-motion';

const DropoutPieChart = () => {
  const percentage = 60;
  
  return (
    <div className="flex md:flex-row items-center justify-end md:gap-8 gap-2 w-full max-w-full md:p-4 pb-2">
      {/* Caption on the left */}
      <div className="md:w-1/2 md:text-left">
        <motion.p 
          className=""
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          60% of all school dropouts in Nigeria are attributed to period poverty.
        </motion.p>
      </div>

      {/* Pie chart on the right */}
      <div className="relative w-36 md:mt-4 mt-12 h-36">
        <svg viewBox="0 0 100 100" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="10"
          />
          
          {/* Animated percentage circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#EF4444"
            strokeWidth="10"
            strokeDasharray={`${percentage * 2.83} 283`}
            initial={{ strokeDashoffset: 283 }}
            animate={{ strokeDashoffset: 283 * (1 - percentage / 62) }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
        
        {/* Percentage text in the middle */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <span className="md:text-2xl text-sm md:mt-0 -mt-12 md:font-semibold font-medium text-gray-800">60%</span>
        </motion.div>
      </div>
    </div>
  );
};

export default DropoutPieChart;