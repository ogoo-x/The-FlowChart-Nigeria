import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Blog data 
const blogPosts = [
  {
    id: 1,
    title: "Implementing Period-Friendly Spaces in Schools",
    category: "MHM Project Tips",
    excerpt: "A practical guide to creating safe, accessible spaces for menstrual health management in Nigerian schools.",
    date: "March 15, 2025",
    readTime: "8 min read",
    image: import.meta.env.BASE_URL + "/PlaceholderImages/PFToilets.jpg"
  },
  {
    id: 2,
    title: "Understanding Your Menstrual Cycle: Beyond the Basics",
    category: "MRH Education",
    excerpt: "An educational guide on the hormonal changes throughout the menstrual cycle and their effects on overall health.",
    date: "March 10, 2025",
    readTime: "12 min read",
    image: import.meta.env.BASE_URL + "/PlaceholderImages/PeriodEdu.jpg"
  },
  {
    id: 3,
    title: "How to Run a Successful Period Product Drive",
    category: "Advocacy",
    excerpt: "Step-by-step instructions for organizing community-based period product collection and distribution.",
    date: "March 5, 2025",
    readTime: "6 min read",
    image: import.meta.env.BASE_URL + "/Placeholder Images"
  },
  {
    id: 4,
    title: "Regional Disparities in Menstrual Health Access: Northern Nigeria",
    category: "Data Insights",
    excerpt: "Analysis of our latest research on period poverty in northern Nigerian states and key intervention opportunities.",
    date: "February 28, 2025",
    readTime: "10 min read",
    image: import.meta.env.BASE_URL + "/Placeholder Images"
  },
  {
    id: 5,
    title: "Inclusive MHM: Supporting Students with Disabilities",
    category: "MHM Project Tips",
    excerpt: "Best practices for ensuring menstrual health management programs address the needs of all students.",
    date: "February 20, 2025",
    readTime: "9 min read",
    image: import.meta.env.BASE_URL + "/Placeholder Images"
  },
  {
    id: 6,
    title: "Breaking Taboos: Effective Menstrual Education Strategies",
    category: "MRH Education",
    excerpt: "Evidence-based approaches to culturally-sensitive menstrual health education in diverse communities.",
    date: "February 15, 2025",
    readTime: "7 min read",
    image: import.meta.env.BASE_URL + "/Placeholder Images"
  },
  {
    id: 7,
    title: "Advocating for Policy Change: A Toolkit",
    category: "Advocacy",
    excerpt: "How to effectively advocate for menstrual equity policies at local and national government levels.",
    date: "February 10, 2025",
    readTime: "11 min read",
    image: import.meta.env.BASE_URL + "/Placeholder Images"
  },
  {
    id: 8,
    title: "Visualizing the Economic Impact of Period Poverty",
    category: "Data Insights",
    excerpt: "Interactive data visualizations showing how period poverty affects economic participation and productivity.",
    date: "February 5, 2025",
    readTime: "8 min read",
    image: import.meta.env.BASE_URL + "/Placeholder Images"
  }
];

// Category data with colors for visual distinction
const categories = [
  { id: "all", name: "All Resources", color: "bg-gray-600" },
  { id: "MHM Project Tips", name: "MHM Project Tips", color: "bg-custom-pink" },
  { id: "MRH Education", name: "Menstrual & Reproductive Health (MRH) Education", color: "bg-custom-red" },
  { id: "Advocacy", name: "Advocacy", color: "bg-custom-black" },
  { id: "Data Insights", name: "Data Insights", color: "bg-red-500" }
];

// Helper function to get category color
const getCategoryColor = (categoryName) => {
  const category = categories.find(cat => cat.id === categoryName);
  return category ? category.color : "bg-gray-600";
};

// Helper function to get background color classes for category buttons
const getCategoryButtonClasses = (categoryName, selectedCategory) => {
  const baseClasses = "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300";
  const category = categories.find(cat => cat.id === categoryName);
  
  if (selectedCategory === categoryName) {
    return `${baseClasses} ${category.color} text-white`;
  }
  return `${baseClasses} bg-gray-100 text-gray-700 hover:bg-gray-200`;
};

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts when category or search query changes
  useEffect(() => {
    let results = blogPosts;
    
    if (selectedCategory !== "all") {
      results = results.filter(post => post.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredPosts(results);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-custom-white min-h-screen">
      {/* Hero Section */}
      <div className="content pt-24">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Resources & Insights
          </motion.h1>
          <motion.p 
            className="text-xl max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Evidence-based knowledge, practical tips, and data insights to help close the menstrual health gap in Nigeria.
          </motion.p>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="content container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          {/* Category Filters */}
          <div className="content flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={getCategoryButtonClasses(category.id, selectedCategory)}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-red"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg 
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        </div>

        {/* Results Counter */}
        <p className="content text-gray-600 mb-6">
          Showing {filteredPosts.length} of {blogPosts.length} resources
        </p>

        {/* Blog Posts Grid */}
        <div className="content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <motion.div
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -5 }}
              >
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded text-white ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                    <span className="ml-auto text-sm text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                    <button className="text-custom-red hover:text-custom-pink font-medium transition-colors duration-300">
                      Read More &rarr;
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <svg 
                className="mx-auto h-12 w-12 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <h3 className="mt-2 text-xl font-medium text-gray-900">No resources found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
              <button 
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-4 px-4 py-2 bg-custom-red text-white rounded-md hover:bg-rose-800 transition-colors duration-300"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-rose-100 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-rose-900 mb-4">Stay Updated</h2>
            <p className="text-rose-800 mb-6">Subscribe to our newsletter for the latest research, resources, and insights on menstrual health in Nigeria.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <button className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;