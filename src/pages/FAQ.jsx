import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqData = [
  {
    question: "How is CGPA calculated?",
    answer:
      "CGPA is calculated using the formula: (Sum of (Grade Point × Credit)) / (Total Credits). The weighted average determines the final CGPA.",
  },
  {
    question: "What if a student retakes a course?",
    answer: "The highest grade from the attempts is used for CGPA calculation.",
  },
  {
    question: "Is the information valid?",
    answer: "Yes, all data is accurate and reliable.",
  },
  {
    question: "Can I view semester-wise analysis?",
    answer: "Yes, detailed semester-wise breakdowns are available.",
  },
  {
    question: "Wrong gender avatar showing?",
    answer: "Gender isn't detected—avatars are random!",
  },
  {
    question: "Can I get the source code?",
    answer: "Soon! Keep an eye out for updates.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <span className="inline-block px-3 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4 border border-blue-200">
            FAQ
          </span>
         
          <p className="text-lg text-slate-600">
            Find answers to common questions about AcademicX
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden border border-slate-200"
            >
              <button
                onClick={() => toggleAnswer(index)}
                className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              >
                <div className="flex items-center justify-between">
                  <h2
                    className={`text-lg font-medium transition-colors duration-200 ${
                      activeIndex === index ? "text-blue-600" : "text-slate-800"
                    }`}
                  >
                    {faq.question}
                  </h2>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`text-slate-500 ${
                      activeIndex === index ? "text-blue-600" : ""
                    }`}
                  >
                    <FaChevronDown />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        
      </div>
    </div>
  );
};

export default FAQ;
