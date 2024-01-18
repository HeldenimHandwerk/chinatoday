import ReactGA from "react-ga4";

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const initializeGA = () => {
  // Replace with your Measurement ID
  // It ideally comes from an environment variable
  if (GA_TRACKING_ID) {
    ReactGA.initialize(GA_TRACKING_ID);
  }
  // Don't forget to remove the console.log() statements
  // when you are done
  console.log("GA INITIALIZED");
};

const trackGAEvent = (
  category: string,
  action: string,
  label: string
): void => {
  console.log("GA event:", category, ":", action, ":", label);
  // Send GA4 Event
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};

export default initializeGA;
export { initializeGA, trackGAEvent };
