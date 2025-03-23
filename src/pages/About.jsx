import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const teams = [
    { 
      name: "Data & Research", 
      description: "Conducts studies across Nigeria to gather menstrual health data for evidence-based interventions."
    },
    { 
      name: "Technical Team", 
      description: "Develops interactive mapping tools to visualize research data and track progress in tackling period poverty."
    },
    { 
      name: "Communications", 
      description: "Raises awareness about menstrual health issues and shares the project's impact with stakeholders."
    },
    { 
      name: "Media", 
      description: "Creates compelling content to highlight menstrual health gaps and showcase intervention efforts."
    },
    { 
      name: "Strategy Team", 
      description: "Plans and coordinates targeted interventions based on research findings to maximize impact."
    },
  ];

  return (
    <div className="bg-custom-white min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative bg-gradient-to-r from-rose-100 to-purple-100 py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              About <span className="text-rose-600">The FlowChart</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            The vision of The FlowChart is to create a society where period poverty in all forms is eradicated and menstrual health is prioritized through informed policies and community engagement.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="content max-w-7xl"
      >
        <div className="content mt-24 lg:grid lg:grid-cols-2 lg:gap-4">
          <div>
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <div className="mt-10 prose prose-rose prose-lg text-gray-500">
              <p>
                The FlowChart is dedicated to addressing period poverty and closing the menstrual health gap in Nigeria through data-driven approaches and targeted interventions.
              </p>
              <p>
                We conduct comprehensive research studies across Nigeria to identify priority areas, measure impact, and guide evidence-based solutions for improved menstrual health.
              </p>
              <p>
                Our interactive mapping tools visualize menstrual health data, helping stakeholders and policymakers understand regional disparities and track progress over time.
              </p>
            </div>
          </div>
          {/* Map Side */}
          <div className="mt-4 lg:mt-0">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="">
                <img 
                  src="/api/placeholder/600/400"
                  alt="Map of Nigeria highlighting research regions"
                  className="object-cover w-full h-64 lg:h-72"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Our Research Regions</h3>
                <p className="text-gray-500">
                  The FlowChart is conducting menstrual health research studies across Nigeria, with a focus on both urban and rural communities to develop targeted interventions.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-rose-500 mr-2"></div>
                    <span className="text-sm text-gray-500">Active Studies</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-sm text-gray-500">Planned Research</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm text-gray-500">Completed Studies</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-gray-500">Partner Locations</span>
                  </div>
                </div>
              </div>
              </div>
              </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="content bg-custom-red mt-10 py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Join Our Mission</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-rose-100">
            Help us close the menstrual health gap in Nigeria through data-driven approaches and targeted interventions.
          </p>
          <motion.div 
            className="mt-8 flex justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="inline-flex rounded-md shadow">
              <NavLink
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-rose-700 bg-white hover:bg-rose-50"
              >
                Get Involved
              </NavLink>
            </div>
            <div className="ml-3 inline-flex">
              <NavLink
                to="/resources"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rose-800 hover:bg-rose-900"
              >
                Learn More
              </NavLink>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="content py-16 px-4 sm:px-6 lg:px-8 bg-custom-white"
      >
        <div className="content max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Impact</h2>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6"
            >
              <dt className="text-sm font-medium text-gray-500 truncate">Research Studies</dt>
              <dd className="mt-1 text-3xl font-semibold text-rose-600">1 Ongoing</dd>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6"
            >
              <dt className="text-sm font-medium text-gray-500 truncate">Women Impacted</dt>
              <dd className="mt-1 text-3xl font-semibold text-rose-600">Growing</dd>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6"
            >
              <dt className="text-sm font-medium text-gray-500 truncate">Team Members</dt>
              <dd className="mt-1 text-3xl font-semibold text-rose-600">35+</dd>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6"
            >
              <dt className="text-sm font-medium text-gray-500 truncate">Regions Covered</dt>
              <dd className="mt-1 text-3xl font-semibold text-rose-600">Nigeria</dd>
            </motion.div>
          </dl>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;