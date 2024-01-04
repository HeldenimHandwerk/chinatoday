// "use client";

// // src/analytics.js
// import { useEffect } from "react";
// import ReactGA from "react-ga";

// export const initGA = () => {
//   const trackingId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "G-XJPYLQV9V2";
//   ReactGA.initialize(trackingId);
// };

// export const logPageView = () => {
//   ReactGA.set({ page: window.location.pathname });
//   ReactGA.pageview(window.location.pathname + window.location.search);
// };

// export default function GoogleAnalytics() {
//   useEffect(() => {
//     initGA();
//     logPageView();
//   }, []);

//   return null;
// }
