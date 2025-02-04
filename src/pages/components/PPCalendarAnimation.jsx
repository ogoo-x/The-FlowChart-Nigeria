import React from 'react';
import { motion } from 'framer-motion';

const PeriodPovertyCalendar = () => {
  // Create a 5x6 grid to represent a month
  const days = Array(17).fill(null);
  const missedDays = [6, 7, 8, 9]; // Days that will be highlighted

  return (
    <div className="flex md:flex-row items-center justify-start md:gap-10 gap-3 w-full max-w-full md:p-4 pb-2">
      <motion.div 
        className="w-40 p-1.5 md:p-2.5 border border-black rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-5 gap-1">
          {days.map((_, index) => (
            <motion.div
              key={index}
              className={`aspect-square border border-black rounded-sm ${
                missedDays.includes(index + 1) ? 'bg-red-300' : 'bg-gray-50'
              }`}
              initial={{ opacity: 1 }}
              animate={missedDays.includes(index + 1) ? {
                opacity: [1, 0.5, 1],
                scale: [1, 0.95, 1],
              } : {}}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2,
                delay: (index % 5) * 0.2
              }}
            />
          ))}
        </div>
      </motion.div>
      
      <div className="">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="md:w-3/5 md:text-left"
        >
          Period poverty steals up to <strong>seven weeks</strong>  of schooling from these females every year.
        </motion.p>
      </div>
    </div>
  );
};

export default PeriodPovertyCalendar;