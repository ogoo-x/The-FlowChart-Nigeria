import React from 'react';
import { motion } from 'framer-motion';

//Assets
import Alternatives from "../../../assets/HomepageIllustrations/Alternatives.png";
import Stigma from "../../../assets/HomepageIllustrations/Stigma.png"

const PeriodPovertyCalendar = () => {
  // Create a 5x6 grid to represent a month
  const days = Array(17).fill(null);
  const missedDays = [6, 7, 8, 9]; // Days that will be highlighted

  const percentage = 60;

  return (
  <div> 
    {/* Calendar animation and caption */}
    <div className="flex md:flex-row items-center justify-start md:gap-10 gap-3 w-full max-w-full md:pb-px pb-6"> 
     
      <motion.div 
        className="w-40 p-1.5 md:p-2.5 border border-black rounded-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
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
              whileInView={missedDays.includes(index + 1) ? {
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
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="md:w-3/5 md:text-left"
        >
          Period poverty steals up to <strong>seven weeks</strong>  of schooling from its victims every school year.
        </motion.p>
      </div>
    </div>
    
    {/* Pie chart animation and caption */}
    <div className="flex md:flex-row items-center justify-end md:gap-8 gap-2 w-full max-w-full md:pb-px pb-4">
      {/* Caption on the left */}
      <div className="md:w-1/2 md:text-left">
        <motion.p 
          className=""
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          More so, it is reponsible for up to <strong> 60% </strong> of all school dropouts in Nigeria.
        </motion.p>
      </div>

      {/* Pie chart on the right */}
      <div className="relative w-28 md:w-36">
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
            whileInView={{ strokeDashoffset: 283 * (1 - percentage / 62) }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
        
        {/* Percentage text in the middle */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <span className="text-sm md:text-2xl hidden md:block md:mt-0 md:font-semibold font-medium text-gray-800">60%</span>
        </motion.div>
      </div>
    </div>

    {/* Socioeconomic impact */}
    <div className='mt-3 md:mt-10 md:w-3/4 flex flex-row justify-center items-center text-center content-center pb-6'>
      <p>This leads to limited educational opportunities which cost countries up to $15-30 trillion in lifetime earnings</p>
    </div>

    {/* Effects of alternate products */}
    <div className='flex md:flex-row items-center justify-start md:gap-10 gap-px w-full max-w-full md:pb-px pb-6'>
        {/* Illustration on the left */}
          <img src={Alternatives} 
               alt="Collage of alternative menstrual products"
               className='w-32 md:w-60' />

        {/* Caption on the right */}
        <motion.p 
          className=""
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          As an alternative to manage their periods, many females make use of unhygienic products which reduces their quality of lifein many ways.
        </motion.p>
    </div>

    {/* Stigmatisation */}
    <div className='flex md:flex-row items-center justify-end md:gap-10 gap-px w-full max-w-full md:pb-px pb-2'>
        {/* Caption on the left */}
        <motion.p 
          className=""
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Period poverty is worsened by stigma and lack of support, trapping our society in a cycle of poverty and gender inequality.
        </motion.p>

        {/* Illustration on the right */}
          <img src={Stigma} 
               alt="An African female in traditional tribal clothing, her mouth blocked by two interlaced hands from behind, in a parched desert landscape under a scorching sun, representing the denial of voice in harsh conditions."
               className='w-24 md:w-36' />
    </div>
</div>
  );
};

export default PeriodPovertyCalendar;