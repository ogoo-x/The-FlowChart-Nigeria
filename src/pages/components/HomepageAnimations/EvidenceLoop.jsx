import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EvidenceLoop = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { name: "Research", color: "#782835", icon: "📊" },
    { name: "Intervention", color: "#B94A75", icon: "🛠️" },
    { name: "Measurement", color: "#3F413C", icon: "📏" },
    { name: "Refinement", color: "#EF4444", icon: "✨" }
  ];

  // Auto-animate through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-12 text-gray-800">Our Evidence-Based Approach</h2>
      
      <div className="relative w-64 h-64">
        {/* Circle path */}
        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            fill="none" 
            stroke="#E5E7EB" 
            strokeWidth="2" 
          />
        </svg>
        
        {/* Step circles */}
        {steps.map((step, index) => {
          // Calculate position on circle
          const angle = (index * (360 / steps.length) - 90) * (Math.PI / 180);
          const x = 50 + 40 * Math.cos(angle);
          const y = 50 + 40 * Math.sin(angle);
          
          return (
            <motion.div
              key={step.name}
              className="absolute flex items-center justify-center w-16 h-16 rounded-full text-white border-2 font-bold"
              style={{
                backgroundColor: step.color,
                left: `calc(${x}% - 2rem)`,
                top: `calc(${y}% - 2rem)`,
                boxShadow: activeStep === index ? '0 0 15px rgba(0,0,0,0.3)' : 'none',
                zIndex: activeStep === index ? 10 : 1
              }}
              animate={{
                scale: activeStep === index ? 1.2 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center">
                <div className="text-lg">{step.icon}</div>
                <div className="text-sm mt-1">{step.name}</div>
              </div>
            </motion.div>
          );
        })}
        
        {/* Animated arrow */}
        <motion.div
          className="absolute w-full h-full"
          animate={{ rotate: activeStep * (360 / steps.length) }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.div 
            className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-6"
            style={{ color: steps[activeStep].color }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L8 6h8L12 2z" />
              <path d="M12 2L12 22" strokeWidth="2" stroke="currentColor" fill="none" />
            </svg>
          </motion.div>
        </motion.div>
        
        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="w-20 h-20 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: steps[activeStep].color }}
            animate={{ 
              backgroundColor: steps[activeStep].color,
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 1 }}
          >
            <span className="text-3xl">{steps[activeStep].icon}</span>
          </motion.div>
        </div>
      </div>
      
      {/* Description */}
      <motion.div 
        className="mt-12 max-w-md text-center px-4"
        key={activeStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-bold mb-2" style={{ color: steps[activeStep].color }}>
          {steps[activeStep].name}
        </h3>
        {activeStep === 0 && (
          <p>We collect comprehensive data on menstrual health challenges across Nigeria to identify needs and priorities.</p>
        )}
        {activeStep === 1 && (
          <p>We partner with NGOs to implement targeted solutions based on our data insights.</p>
        )}
        {activeStep === 2 && (
          <p>We track real-time impact metrics to evaluate the effectiveness of interventions.</p>
        )}
        {activeStep === 3 && (
          <p>We analyze results to improve strategies and maximize program effectiveness.</p>
        )}
      </motion.div>
    </div>
  );
};

export default EvidenceLoop;