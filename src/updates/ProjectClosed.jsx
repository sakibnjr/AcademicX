import { motion } from "framer-motion";

const ProjectClosed = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Subtle tech grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(50,50,50,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(50,50,50,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
      {/* Neon glow effects */}
      <div className="absolute -left-40 -top-40 h-72 w-72 animate-pulse rounded-full bg-gradient-to-br from-cyan-500 via-cyan-700 to-transparent opacity-20 blur-3xl" />
      <div className="from-magenta-500 via-magenta-700 absolute bottom-0 right-0 h-72 w-72 animate-pulse rounded-full bg-gradient-to-tl to-transparent opacity-20 blur-3xl" />
      <motion.div
        className="relative z-10 w-full max-w-lg rounded-2xl border border-cyan-800/30 bg-[#141414]/80 p-10 shadow-xl backdrop-blur-md"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Information icon for project closure */}
        <motion.div
          className="to-magenta-600 mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600 shadow-lg shadow-cyan-500/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <svg
            className="h-12 w-12 text-white drop-shadow-lg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {/* Information Circle Icon */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </motion.div>
        {/* Headline with tech vibe */}
        <h1 className="to-magenta-400 mb-4 bg-gradient-to-r from-cyan-400 bg-clip-text text-center text-3xl font-extrabold tracking-tight text-transparent md:text-4xl">
          This Project Has Been Closed
        </h1>
        <div className="mb-8 text-center">
          <p className="mb-4 text-lg text-slate-300/90">
            Thank you for your interest in our Result Analyzer! 🎓
          </p>
          <p className="mb-4 text-base text-slate-400/80">
            This project has been officially closed, but don&apos;t worry –
            we&apos;ve got something even better for you!
          </p>
          <p className="text-base text-slate-300/90">
            Please visit our new and improved website below for a better
            experience with enhanced features.
          </p>
        </div>
        <motion.a
          href="https://diu-result-analyzer.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="to-magenta-600 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Visit Our New Website</span>
          <svg
            className="ml-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </motion.a>
      </motion.div>
    </div>
  );
};

export default ProjectClosed;
