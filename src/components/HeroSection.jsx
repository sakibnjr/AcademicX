import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaFilter, FaUsers, FaGraduationCap } from 'react-icons/fa';

// Memoized feature data to prevent re-renders
const features = [
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
];

// Optimized animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const HeroSection = ({ studentId, setStudentId, handleFetchResults, isLoading = false }) => {
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    handleFetchResults();
  }, [handleFetchResults]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Simplified Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-blue-50/50 to-indigo-50/50"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div 
          className="text-center mt-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 md:mb-8"
          >
            <span className="inline-block px-3 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-3 md:mb-4 border border-blue-200">
              DIU Result Analyzer
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 md:mb-6 leading-tight">
              Analyze Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Academic Results</span> with Ease
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
              Track your SGPA, analyze performance, and identify areas for improvement.
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.div
            variants={itemVariants}
            className="max-w-xl mx-auto mb-10 md:mb-12"
          >
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <label htmlFor="student-id-input" className="sr-only">
                  Student ID
                </label>
                <input
                  id="student-id-input"
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter your student ID to analyze results..."
                  className="w-full px-4 py-3 pr-12 rounded-xl text-slate-900 bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-lg border border-slate-200 relative z-10"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none z-20">
                  <FaGraduationCap className="h-5 w-5 text-slate-400" />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Analyzing...' : 'Analyze Result'}
              </button>
            </form>
          </motion.div>

          {/* Features */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto"
          >
            {features.map((feature, index) => (
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
        </motion.div>
      </div>

      {/* Simplified Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      
      {/* Simplified Static Blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-xl opacity-60" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-indigo-200/20 rounded-full mix-blend-multiply filter blur-xl opacity-60" />
    </div>
  );
};

export default React.memo(HeroSection); 