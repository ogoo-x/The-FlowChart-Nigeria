import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    submitted: false,
    loading: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, loading: true }));
    
    // Simulate form submission
    setTimeout(() => {
      setFormState(prev => ({ 
        ...prev, 
        loading: false,
        submitted: true,
        name: '',
        email: '',
        subject: '',
        message: ''
      }));
    }, 1500);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const contactMethods = [
    {
      name: 'Email',
      description: 'Reach out directly via email for collaboration inquiries or support.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      link: "mailto:theflowchartnig@gmail.com?subject=Contact%20from%20Website",
      linkText: "Email us"
    },
    {
      name: 'Social Media',
      description: 'Follow our research updates and join the conversation about menstrual health.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      ),
      link: "https://linktr.ee/theflowchart",
      linkText: "View our profiles",
      external: true
    },
    {
      name: 'Research Participation',
      description: 'Interested in participating in our research studies across Nigeria?',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      link: "https://linktr.ee/theflowchart",
      linkText: "Join our research",
      external: true
    }
  ];

  return (
    <div className="bg-white min-h-screen">
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
              Contact <span className="text-rose-600">The FlowChart</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Get in touch to learn more about our research, collaborate, or support our mission.
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

      {/* Contact Methods */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="content py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Ways to Connect</h2>
        <div className="content grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-rose-100 rounded-md p-3">
                    {method.icon}
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-gray-900">{method.name}</h3>
                </div>
                <div className="mt-4">
                  <p className="text-base text-gray-500">{method.description}</p>
                </div>
                <div className="mt-5">
                  <motion.a
                    href={method.link}
                    target={method.external ? "_blank" : "_self"}
                    rel={method.external ? "noopener noreferrer" : ""}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                  >
                    {method.linkText}
                    {method.external && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      {/* FAQ Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
        
        <div className="content space-y-6">
          {[
            { 
              question: "How can I support The FlowChart's mission?", 
              answer: "You can support our mission by volunteering, partnering with us for research, spreading awareness about menstrual health issues, or contributing resources to help us reach more communities across Nigeria." 
            },
            { 
              question: "I'm a researcher interested in collaboration. How can I get involved?", 
              answer: "We welcome research collaborations! Please reach out through our contact form with details about your expertise and how you'd like to contribute to our ongoing studies on menstrual health in Nigeria." 
            },
            { 
              question: "Do you offer educational resources about menstrual health?", 
              answer: "Yes, we develop evidence-based educational materials on menstrual health. Contact us for information about our resources or to request materials for your community or organization." 
            },
            { 
              question: "How is the data from your research studies used?", 
              answer: "The data we collect helps identify areas with the greatest menstrual health needs, design targeted interventions, and track progress. All research is conducted ethically with participant consent and data privacy protection." 
            }
          ].map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                <div className="mt-2 text-base text-gray-500">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="bg-rose-700 py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to collaborate?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-rose-100">
            Join us in our mission to address period poverty and close the menstrual health gap in Nigeria.
          </p>
          <motion.div 
            className="mt-8 flex justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="inline-flex rounded-md shadow">
              <a
                href="mailto:theflowchart@gmail.com?subject=Collaboration%20Inquiry"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-rose-700 bg-white hover:bg-rose-50"
              >
                Contact Us Today
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;