"use client";

import { useEffect } from "react";
import { initializeGA } from "@/app/utils/google-anayltics";

declare global {
  interface Window {
    GA_INITIALIZED: boolean;
  }
}

const GoogleAnalytics: React.FC = () => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initializeGA();
      window.GA_INITIALIZED = true;
    }
  }, []);

  return null;
};

export default GoogleAnalytics;
