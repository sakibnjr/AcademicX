import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Text = () => {
  const headlines = [
    { text: "Visualize your performance", highlight: "Visualize" },
    { text: "Compare with friends", highlight: "Compare" },
    { text: "Filter and find lackings", highlight: "Filter" },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % headlines.length);
    }, 3000); // Change text every 3 seconds
    return () => clearInterval(interval);
  }, [headlines.length]);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Main Headline */}
      <h1 className="text-text mb-4 text-2xl font-bold tracking-wider md:text-4xl">
        DIU Result Analyzer
      </h1>

      {/* Animated Subtitles */}
      <div className="h-10 overflow-hidden">
        <AnimatePresence mode="wait">
          {headlines.map(
            (headline, index) =>
              index === currentIndex && (
                <motion.div
                  key={headline.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8 }}
                  className="text-subtitle text-center text-sm font-medium md:text-xl"
                >
                  {headline.text.split(" ").map((word, i) => (
                    <span
                      key={i}
                      className={
                        word === headline.highlight
                          ? "text-primaryDark font-bold"
                          : ""
                      }
                    >
                      {word}{" "}
                    </span>
                  ))}
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Text;
