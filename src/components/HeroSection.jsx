import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaFilter, FaUsers, FaGraduationCap } from 'react-icons/fa';

const HeroSection = ({ studentId, setStudentId, handleFetchResults }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    handleFetchResults();
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDMuMzE0LTIuNjg2IDYtNiA2cy02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNnoiIGZpbGw9IiM2NjYiLz48L2c+PC9zdmc+')] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-blue-50/50 to-indigo-50/50 backdrop-blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 md:mb-8"
          >
            <span className="inline-block px-3 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-3 md:mb-4 border border-blue-200">
              Academic Performance Analyzer
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 md:mb-6 leading-tight">
              Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Academic Journey</span> with Data-Driven Insights
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
              Get comprehensive insights into your academic performance. Track your SGPA, analyze course-wise performance, and identify areas for improvement.
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-xl mx-auto mb-10 md:mb-12"
          >
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter your student ID to analyze results..."
                  className="w-full px-4 py-3 rounded-xl text-slate-900 bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-lg border border-slate-200"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaGraduationCap className="h-5 w-5 text-slate-400" />
                </div>
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
              >
                Analyze Result
              </button>
            </form>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto"
          >
            {[
              {
                icon: <FaChartLine className="h-6 w-6 text-blue-500" />,
                title: "Performance Analytics",
                description: "Track your SGPA and course-wise performance with detailed analytics."
              },
              {
                icon: <FaFilter className="h-6 w-6 text-indigo-500" />,
                title: "Filter Results",
                description: "Filter your results by semester, course, or any other criteria."
              },
              {
                icon: <FaUsers className="h-6 w-6 text-violet-500" />,
                title: "Compare",
                description: "Compare your results with your friends and see how you stack up."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-slate-200 hover:bg-white hover:shadow-lg transition-all flex flex-col items-center justify-center"
              >
                <div className="mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      
      {/* Animated Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-1/4 -right-20 w-72 h-72 bg-indigo-200/30 rounded-full mix-blend-multiply filter blur-xl"
      />
    </div>
  );
};

export default HeroSection; 