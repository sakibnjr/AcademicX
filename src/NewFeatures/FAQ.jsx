import React, { useState } from "react";
import { motion } from "framer-motion";

const faqData = [
  {
    question: "How CGPA is calculated?",
    answer:
      "CGPA is calculated using the formula: (Sum of (Grade Point × Credit)) / (Total Credits). The weighted average is used to calculate the final CGPA.",
  },
  {
    question: "What if student retake a course?",
    answer:
      "The best result point is counted towards the CGPA calculation, ensuring the highest grade is used.",
  },
  {
    question: "Is the information valid?",
    answer: "Yes, all information is 100% valid and accurate.",
  },
  {
    question: "Can I download PDFs or results?",
    answer: "Not yet, but we're actively working on this feature.",
  },
  {
    question: "Can I view semester-wise analysis?",
    answer:
      "Yes, the system provides detailed semester-wise analysis for better understanding of your performance.",
  },
  {
    question: "I am a male/female but getting opposite gender Avatar?",
    answer: "Well, I don't know your gender :v",
  },
  {
    question: "Can I get the source code?",
    answer: "Yes, the source code will be available soon, Stay tuned!",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="mx-auto flex w-4/5 items-center justify-center bg-blue-50 px-6 py-10">
      <div className="">
        <h1 className="mb-8 text-center text-3xl font-bold text-blue-700 md:text-4xl">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border-l-4 border-blue-500 bg-white shadow-md"
            >
              {/* Question */}
              <button
                onClick={() => toggleAnswer(index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left focus:outline-none"
              >
                <h2 className="text-lg font-semibold text-blue-600">
                  {faq.question}
                </h2>
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: activeIndex === index ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xl font-bold text-blue-600"
                >
                  ▶
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
                className="overflow-hidden px-6"
              >
                <p className="py-4 text-gray-700">{faq.answer}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
