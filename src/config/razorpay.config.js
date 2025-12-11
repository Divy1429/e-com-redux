// Razorpay Configuration
// Get your API keys from: https://dashboard.razorpay.com/app/keys

export const RAZORPAY_CONFIG = {
  // Test Mode Keys (for development)
  KEY_ID: "rzp_test_YOUR_KEY_ID", // Replace with your Test Key ID
  KEY_SECRET: "YOUR_KEY_SECRET", // Keep this secret, only use on backend
  
  // Production Mode Keys (for live payments)
  // KEY_ID: "rzp_live_YOUR_LIVE_KEY_ID",
  // KEY_SECRET: "YOUR_LIVE_KEY_SECRET",
  
  CURRENCY: "INR",
  
  // Store Information
  STORE_NAME: "🛍️ Store",
  STORE_LOGO: "https://your-logo-url.com/logo.png", // Optional
  THEME_COLOR: "#2563eb", // Blue theme color
};

// USD to INR conversion rate (approximate)
export const USD_TO_INR_RATE = 83;

/**
 * SETUP INSTRUCTIONS:
 * 
 * 1. Sign up at https://razorpay.com/
 * 2. Go to Dashboard -> Settings -> API Keys
 * 3. Generate Test Keys for development
 * 4. Copy your Key ID and replace "rzp_test_YOUR_KEY_ID" above
 * 5. Keep Key Secret secure (never expose in frontend)
 * 
 * For production:
 * - Complete KYC verification
 * - Generate Live Keys
 * - Replace test keys with live keys
 * - Ensure you have a backend server to verify payments
 * 
 * IMPORTANT SECURITY NOTE:
 * - Never expose Key Secret in frontend code
 * - Always verify payment on backend server
 * - Use webhooks for payment confirmation
 */
