import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, TrendingUp, Heart, MapPin, DollarSign, Target, MessageCircle } from 'lucide-react';

const Collaborate = () => {
  const [selectedIntervention, setSelectedIntervention] = useState(null);
  const [activeTab, setActiveTab] = useState('interventions');

  // Sample data - replace with real data
  const upcomingInterventions = [
    {
      id: 1,
      title: "Valentine's Day Outreach - Northern States",
      date: "February 14, 2026",
      location: "Kano, Kaduna, Katsina",
      status: "Planning",
      participants: [
        { name: "Period Pride Initiative", logo: "🌸", color: "bg-custom-red/10" },
        { name: "Girls Health Foundation", logo: "💝", color: "bg-custom-red/10" },
        { name: "Menstrual Equity Network", logo: "🌺", color: "bg-custom-red/10" },
      ],
      fundingGoal: 500000,
      fundingRaised: 325000,
      description: "A multi-state outreach providing period products and education to 5,000 young girls across Northern Nigeria.",
      impact: "5,000 beneficiaries",
      coordinator: "Period Pride Initiative"
    },
    {
      id: 2,
      title: "School Sanitation Project - Lagos",
      date: "March 8, 2026",
      location: "Lagos State",
      status: "Planning",
      participants: [
        { name: "Clean Water Alliance", logo: "💧", color: "bg-blue-100" },
        { name: "Education for All", logo: "📚", color: "bg-green-100" },
      ],
      fundingGoal: 800000,
      fundingRaised: 150000,
      description: "Installing menstrual hygiene facilities in 20 public secondary schools.",
      impact: "20 schools, ~8,000 students",
      coordinator: "Clean Water Alliance"
    },
    {
      id: 3,
      title: "Community Health Workers Training - South East",
      date: "April 15, 2026",
      location: "Enugu, Anambra, Imo",
      status: "Open for Partners",
      participants: [
        { name: "Health Access Network", logo: "🏥", color: "bg-teal-100" },
      ],
      fundingGoal: 300000,
      fundingRaised: 75000,
      description: "Training 100 community health workers on menstrual health education and support.",
      impact: "100 CHWs trained",
      coordinator: "Health Access Network"
    }
  ];

  const advocacyUpdates = [
    {
      id: 1,
      title: "National Period Product Tax Exemption Campaign",
      date: "January 20, 2026",
      status: "Active",
      participants: 12,
      description: "Advocacy push for tax-free menstrual products nationwide. Sign the petition and join coalition meetings.",
      action: "Sign Petition",
      actionLink: "#petition"
    },
    {
      id: 2,
      title: "School MHH Policy Implementation",
      date: "January 10, 2026",
      status: "Progress Update",
      participants: 8,
      description: "Working with state education boards to mandate menstrual health facilities in all schools.",
      action: "Join Working Group",
      actionLink: "#working-group"
    }
  ];

  const InterventionCard = ({ intervention }) => {
    const fundingPercentage = (intervention.fundingRaised / intervention.fundingGoal) * 100;
    
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-xl shadow-lg border-2 border-custom-red/20 p-6 cursor-pointer hover:border-custom-red transition"
        onClick={() => setSelectedIntervention(intervention)}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{intervention.title}</h3>
            <div className="flex items-center text-sm text-gray-600 space-x-4">
              <span className="flex items-center">
                <Calendar size={16} className="mr-1" />
                {intervention.date}
              </span>
              <span className="flex items-center">
                <MapPin size={16} className="mr-1" />
                {intervention.location}
              </span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            intervention.status === '募集中' ? 'bg-green-100 text-green-800' :
            intervention.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {intervention.status}
          </span>
        </div>

        {/* Participants */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Participating Organizations:</p>
          <div className="flex flex-wrap gap-2">
            {intervention.participants.map((org, idx) => (
              <div key={idx} className={`${org.color} px-3 py-2 rounded-lg flex items-center space-x-2`}>
                <span className="text-2xl">{org.logo}</span>
                <span className="text-xs font-medium text-gray-700">{org.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Funding Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Funding Progress</span>
            <span className="text-sm font-bold text-custom-red">
              ₦{intervention.fundingRaised.toLocaleString()} / ₦{intervention.fundingGoal.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${fundingPercentage}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-gradient-to-r from-custom-red to-custom-red h-3 rounded-full"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{fundingPercentage.toFixed(1)}% funded</p>
        </div>

        {/* Impact */}
        <div className="flex items-center text-sm text-gray-600">
          <Target size={16} className="mr-2 text-custom-red" />
          <span className="font-semibold">Expected Impact:</span>
          <span className="ml-2">{intervention.impact}</span>
        </div>

        <p className="text-xs text-custom-red mt-3 font-medium">Click to learn more & contribute →</p>
      </motion.div>
    );
  };

  const InterventionDetailModal = ({ intervention, onClose }) => {
    if (!intervention) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-gradient-to-r from-custom-red to-custom-red text-white p-6 rounded-t-2xl">
            <h2 className="text-2xl font-bold mb-2">{intervention.title}</h2>
            <div className="flex items-center space-x-4 text-sm">
              <span className="flex items-center">
                <Calendar size={16} className="mr-1" />
                {intervention.date}
              </span>
              <span className="flex items-center">
                <MapPin size={16} className="mr-1" />
                {intervention.location}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Description */}
            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-2">About This Intervention</h3>
              <p className="text-gray-700">{intervention.description}</p>
            </section>

            {/* Coordinator */}
            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Lead Coordinator</h3>
              <p className="text-gray-700">{intervention.coordinator}</p>
            </section>

            {/* Partners */}
            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Partner Organizations</h3>
              <div className="flex flex-wrap gap-3">
                {intervention.participants.map((org, idx) => (
                  <div key={idx} className={`${org.color} px-4 py-3 rounded-lg flex items-center space-x-2`}>
                    <span className="text-3xl">{org.logo}</span>
                    <span className="font-medium text-gray-700">{org.name}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Funding */}
            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Collaborative Funding</h3>
              <div className="bg-custom-red/10 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-gray-700">Current Progress</span>
                  <span className="text-xl font-bold text-custom-red">
                    ₦{intervention.fundingRaised.toLocaleString()} / ₦{intervention.fundingGoal.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div
                    style={{ width: `${(intervention.fundingRaised / intervention.fundingGoal) * 100}%` }}
                    className="bg-gradient-to-r from-custom-red to-custom-red h-4 rounded-full"
                  />
                </div>
                <button className="w-full bg-custom-red hover:bg-custom-red/90 text-white font-bold py-3 rounded-lg mt-3 flex items-center justify-center">
                  <DollarSign size={20} className="mr-2" />
                  Contribute to This Intervention
                </button>
              </div>
            </section>

            {/* Impact Metrics */}
            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Expected Impact</h3>
              <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                <TrendingUp size={24} className="text-blue-600 mr-3" />
                <span className="text-gray-700 font-medium">{intervention.impact}</span>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg flex items-center justify-center">
                <MessageCircle size={20} className="mr-2" />
                Contact Coordinator
              </button>
              <button className="flex-1 bg-custom-red/10 hover:bg-custom-red/20 text-custom-red font-semibold py-3 rounded-lg flex items-center justify-center">
                <Users size={20} className="mr-2" />
                Join as Partner
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg mt-2"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const AdvocacyCard = ({ update }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-lg border-l-4 border-rose-500 p-5 shadow-md hover:shadow-lg transition"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{update.title}</h3>
          <p className="text-sm text-gray-500">{update.date}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          update.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {update.status}
        </span>
      </div>
      
      <p className="text-gray-700 mb-4">{update.description}</p>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600 flex items-center">
          <Users size={16} className="mr-1" />
          {update.participants} organizations involved
        </span>
        <button className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-4 py-2 rounded-lg text-sm">
          {update.action}
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="mt-20 min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Unite for <span className="text-custom-red">Impact</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real change happens through collaboration. Join forces, pool resources, and amplify your impact on period equity across Nigeria.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
            <button
              onClick={() => setActiveTab('interventions')}
              className={`px-6 py-3 rounded-md font-semibold transition ${
                activeTab === 'interventions'
                  ? 'bg-custom-red text-white'
                  : 'text-gray-600 hover:text-rose-600'
              }`}
            >
              Upcoming Interventions
            </button>
            <button
              onClick={() => setActiveTab('advocacy')}
              className={`px-6 py-3 rounded-md font-semibold transition ${
                activeTab === 'advocacy'
                  ? 'bg-custom-red text-white'
                  : 'text-gray-600 hover:text-rose-600'
              }`}
            >
              Advocacy Campaigns
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'interventions' && (
            <motion.div
              key="interventions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Upcoming Interventions</h2>
                    <p className="text-gray-600">Join collaborative efforts to maximize impact and share resources</p>
                  </div>
                  <Heart size={48} className="text-rose-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {upcomingInterventions.map(intervention => (
                  <InterventionCard key={intervention.id} intervention={intervention} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'advocacy' && (
            <motion.div
              key="advocacy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Advocacy Campaigns</h2>
                    <p className="text-gray-600">Stronger together - unite your voice for systemic change</p>
                  </div>
                  <TrendingUp size={48} className="text-rose-400" />
                </div>
              </div>

              <div className="space-y-4">
                {advocacyUpdates.map(update => (
                  <AdvocacyCard key={update.id} update={update} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-custom-red to-custom-pink rounded-2xl shadow-xl p-8 text-white text-center"
        >
          <h2 className="text-3xl text-custom-white font-bold mb-4">Have an Intervention Planned?</h2>
          <p className="text-lg mb-6">List it here to find partners and collaborative funding</p>
          <button className="bg-white text-custom-red hover:bg-gray-100 font-bold px-8 py-3 rounded-lg text-lg">
            Submit Your Intervention
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedIntervention && (
          <InterventionDetailModal
            intervention={selectedIntervention}
            onClose={() => setSelectedIntervention(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Collaborate;