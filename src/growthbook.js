import { GrowthBook } from "@growthbook/growthbook-react";

export const growthbook = new GrowthBook({
  apiHost: "https://cdn.growthbook.io",
  clientKey: "sdk-MXYXgtqAtv9Ng", // In a real app, use your actual client key
  enableDevMode: true,
  trackingCallback: (experiment, result) => {
    // Send data to Google Analytics 4
    if (window.gtag) {
      window.gtag("event", "experiment_viewed", {
        experiment_id: experiment.key,
        variation_id: result.key,
      });
    }

    // Keep console log for easy debugging
    console.log("GrowthBook Action:", {
      experimentId: experiment.key,
      variationId: result.key,
    });
  },
});

// Configure targeting attributes
const userId = "user-" + Math.floor(Math.random() * 1000000);
const attributes = {
  id: userId,
  user_id: userId,
  device_id: userId,
  url: window.location.href,
};

growthbook.setAttributes(attributes);

// Add support for URL-based experiment overrides (e.g. ?gb_pdp-pricing-test=variant-b)
const urlParams = new URLSearchParams(window.location.search);
const forcedVariations = {};
urlParams.forEach((value, key) => {
  if (key.startsWith("gb_")) {
    const experimentId = key.substring(3); // Remove 'gb_' prefix
    forcedVariations[experimentId] = value;
  }
});

if (Object.keys(forcedVariations).length > 0) {
  growthbook.setForcedVariations(forcedVariations);
  console.log("Forced Variations Applied:", forcedVariations);
}

growthbook.loadFeatures();
