import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdEmail, MdLocationOn } from "react-icons/md";

const ContactPage = () => {
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
            Contact
          </span>
         
          <p className="text-lg text-slate-600">
            Have questions? We're here to help.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-8 border border-slate-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <MdEmail className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-800">Email</h3>
                    <a
                      href="mailto:sakibnjr@proton.me"
                      className="text-slate-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      sakibnjr@proton.me
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <MdLocationOn className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-800">Location</h3>
                    <p className="text-slate-600">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                Need Help?
              </h2>
              <div className="space-y-4">
                <p className="text-slate-600">
                  For any inquiries or support, please reach out to us via email. We typically respond to all inquiries within 24-48 hours.
                </p>
                <div className="pt-4">
                  <Link
                    to="/faq"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
                  >
                    Visit FAQ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
