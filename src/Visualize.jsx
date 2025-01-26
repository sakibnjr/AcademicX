import React, { useState, useCallback } from "react";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai"; // React Icon for the search button
import { motion } from "framer-motion";

import IdInputButton from "./IdInputButton";
import Loader from "./Loader";
// import StudentProfile from "./StudentProfile";
// import ResultSummary from "./ResultSummary";
import SemesterSlider from "./SemesterSlider";
import CgpaChart from "./CgpaChart";
//import ComparisonSummary from "./ComparisonSummary ";
import ProfileAndSummary from "./ProfileAndSummary";
import MarksheetFilter from "./MarksheetFilter";
import SidebarMenu from "./SideMenu";

const SemesterResults = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className=""
      >
        {/* {!profile && <IdInputButton />} */}
        {/* {profile && <SidebarMenu />} */}

        {loading && <Loader />}

        {/* {profile && <ProfileAndSummary />} */}

        {error && (
          <div className="text-red-500 text-center my-4 font-semibold text-lg">
            {error}
          </div>
        )}

        {/* {results.length > 0 && compareResults.length > 0 && (
          <ComparisonSummary
            results={results}
            compareResults={compareResults}
          />
        )} */}

        {results.length === 0 && !loading && !error && (
          <div className="text-gray-500 text-center my-4 font-semibold text-lg">
            No results available.
          </div>
        )}
      </motion.div>

      {results.length > 0 && (
        <div>
          <CgpaChart results={results} compareResults={compareResults} />
          <MarksheetFilter results={results} />
        </div>
      )}
    </div>
  );
};

export default SemesterResults;
