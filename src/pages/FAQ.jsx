import React, { useState } from "react";
import { motion } from "framer-motion";

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
    question: "Can I download PDFs or results?",
    answer: "Not yet, but this feature is in development.",
  },
  {
    question: "Can I view semester-wise analysis?",
    answer: "Yes, detailed semester-wise breakdowns are available.",
  },
  {
    question: "Wrong gender avatar showing?",
    answer: "Gender isn’t detected—avatars are random!",
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
    <div className="mx-auto w-4/5 px-4 py-12 sm:px-6">
      <h1 className="mb-10 text-3xl font-bold text-gray-900 sm:text-4xl">
        FAQ
      </h1>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 bg-white">
            {/* Question */}
            <button
              onClick={() => toggleAnswer(index)}
              className="flex w-full items-center justify-between py-4 text-left focus:outline-none"
            >
              <h2
                className={`text-lg font-medium transition-colors ${
                  activeIndex === index ? "text-primary" : "text-gray-900"
                }`}
              >
                {faq.question}
              </h2>
              <motion.span
                initial={{ rotate: 0 }}
                animate={{ rotate: activeIndex === index ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className={`text-gray-500 ${
                  activeIndex === index ? "text-primary" : ""
                }`}
              >
                +
              </motion.span>
            </button>

            {/* Answer */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={
                activeIndex === index
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="pb-4 text-gray-600">{faq.answer}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
