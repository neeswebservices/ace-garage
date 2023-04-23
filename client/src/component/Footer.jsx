import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="container mx-auto py-10 px-14 md:px-0">
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <div className="mb-8 lg:mb-0">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-6">
              Company
            </p>
            <ul className="flex flex-col space-y-4 font-medium text-[14px] text-gray-500 dark:text-gray-400">
              <li>About us</li>
              <li>Company History</li>
              <li>Our Team</li>
              <li>Our Vision</li>
              <li>Press Release</li>
            </ul>
          </div>
          <div className="mb-8 lg:mb-0">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-6">
              Our Stores
            </p>
            <ul className="flex flex-col space-y-4 font-medium text-[14px] text-gray-500 dark:text-gray-400">
              <li>Washington</li>
              <li>New Hampshire</li>
              <li>Maine</li>
              <li>Texas</li>
              <li>Indiana</li>
            </ul>
          </div>
          <div className="mb-8 lg:mb-0">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-6">
              Services
            </p>
            <ul className="flex flex-col space-y-4 font-medium text-[14px] text-gray-500 dark:text-gray-400">
              <li>UI / UX Design</li>
              <li>App Development</li>
              <li>API reference</li>
              <li>API status</li>
              <li>Documentation</li>
            </ul>
          </div>
          <div className="mb-8 lg:mb-0">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-6">
              Legal
            </p>
            <ul className="flex flex-col space-y-4 font-medium text-[14px] text-gray-500 dark:text-gray-400">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
              <li>Disclaimer</li>
              <li>Media Policy</li>
            </ul>
          </div>
          <div className="mb-8 lg:mb-0">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-6">
              Social Links
            </p>
            <ul className="flex flex-col space-y-4 font-medium text-[14px] text-gray-500 dark:text-gray-400">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>Linkedin</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
