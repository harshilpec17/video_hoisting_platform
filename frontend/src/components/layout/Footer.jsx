import React from "react";
import { useNavigate } from "react-router";

const Footer = () => {
  const year = new Date().getFullYear();
  // Lightweight brand fallback; replace with your header brand if available
  const appName = "Video Platform";
  const navigate = useNavigate();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-neutral-800 dark:text-neutral-200">
              {appName}
            </span>
          </div>

          <p className="text-sm text-center sm:text-left">
            © {year} {appName}. All rights reserved.
          </p>

          <nav className="flex items-center justify-center gap-4 text-sm">
            <button
              onClick={() => navigate("/contact")}
              className="px-3 py-1 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              Contact Us
            </button>
            <button
              onClick={() => navigate("/terms")}
              className="px-3 py-1 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              Terms & Conditions
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
