# 🛍️ E-Commerce Store - Razorpay Payment Integration

## 💳 Payment Setup Guide

### Step 1: Get Razorpay Account & API Keys

1. **Sign Up for Razorpay**
   - Go to [https://razorpay.com/](https://razorpay.com/)
   - Click "Sign Up" and create an account
   - Complete the registration process

2. **Access Dashboard**
   - Log in to [https://dashboard.razorpay.com/](https://dashboard.razorpay.com/)
   - You'll start in **Test Mode** (perfect for development)

3. **Generate API Keys**
   - Go to **Settings** → **API Keys**
   - Click **Generate Test Keys**
   - You'll get:
     - **Key ID**: `rzp_test_xxxxxxxxxxxxx` (use in frontend)
     - **Key Secret**: `xxxxxxxxxxxxx` (keep secret, use in backend)

### Step 2: Configure Your Application

1. **Update Configuration File**
   - Open `src/config/razorpay.config.js`
   - Replace `rzp_test_YOUR_KEY_ID` with your actual Test Key ID
   
   ```javascript
   KEY_ID: "rzp_test_xxxxxxxxxxxxx", // Your Test Key ID here
   ```

2. **Customize Store Details** (Optional)
   - Update store name, logo, and theme color in the config file

### Step 3: Test the Payment

1. **Start Your App**
   ```bash
   npm run dev
   ```

2. **Add Items to Cart**
   - Browse products and add them to cart
   - Go to Cart page

3. **Test Payment**
   - Click "Proceed to Payment" button
   - Razorpay payment modal will open
   - Use these **test card details**:

   #### ✅ Test Cards (Successful Payment)
   ```
   Card Number: 4111 1111 1111 1111
   CVV: Any 3 digits
   Expiry: Any future date
   ```

   ```
   Card Number: 5555 5555 5555 4444
   CVV: Any 3 digits
   Expiry: Any future date
   ```

   #### ❌ Test Cards (Failed Payment)
   ```
   Card Number: 4111 1111 1111 1234
   ```

   #### 🔄 Test UPI
   ```
   UPI ID: success@razorpay
   ```

4. **Verify Payment**
   - Check Razorpay Dashboard → Payments
   - You'll see the test payment listed

### Step 4: Going Live (Production)

⚠️ **Before going live:**

1. **Complete KYC Verification**
   - Submit business documents
   - Bank account details
   - Identity verification

2. **Activate Live Mode**
   - Go to Dashboard → Settings → API Keys
   - Generate **Live Keys**
   - Switch the configuration:
   
   ```javascript
   // In razorpay.config.js
   KEY_ID: "rzp_live_xxxxxxxxxxxxx", // Your Live Key
   ```

3. **Set Up Backend Server**
   - **IMPORTANT**: For production, you MUST verify payments on backend
   - Create backend API endpoint to verify payment signature
   - Use Razorpay webhooks for payment confirmation

4. **Enable Webhooks**
   - Go to Dashboard → Settings → Webhooks
   - Add your backend webhook URL
   - Subscribe to payment events

### Payment Flow

```
User clicks "Proceed to Payment"
        ↓
Razorpay SDK loads
        ↓
Payment modal opens
        ↓
User enters payment details
        ↓
Payment processed
        ↓
Success handler called
        ↓
Cart cleared & user redirected
```

### Security Best Practices

✅ **DO:**
- Keep Key Secret secure (never in frontend)
- Verify payments on backend server
- Use webhooks for payment confirmation
- Implement proper error handling
- Use HTTPS in production

❌ **DON'T:**
- Expose Key Secret in frontend code
- Trust frontend payment confirmation alone
- Skip backend verification
- Use test keys in production

### Features Implemented

✨ **Current Features:**
- Dynamic Razorpay script loading
- Currency conversion (USD to INR)
- Loading states
- Payment success/failure handling
- Cart clearing after payment
- Responsive payment button
- Order details in payment notes

### Troubleshooting

**Issue: "Razorpay SDK failed to load"**
- Check internet connection
- Check browser console for errors
- Ensure no ad blockers are blocking the script

**Issue: "Invalid Key ID"**
- Verify Key ID is correct in config file
- Ensure you're using the right mode (Test/Live)

**Issue: Payment not processing**
- Check if amount is valid (> 0)
- Verify currency code
- Check browser console for errors

### Next Steps (Recommended)

1. **Backend Integration**
   - Create Node.js/Express backend
   - Add payment verification endpoint
   - Implement order management

2. **Order History**
   - Store completed orders
   - Show order history to users
   - Generate order receipts

3. **User Authentication**
   - Add login/signup
   - Save user payment details
   - Prefill customer information

4. **Email Notifications**
   - Send order confirmation emails
   - Payment receipts
   - Order status updates

### Support

- **Razorpay Docs**: [https://razorpay.com/docs/](https://razorpay.com/docs/)
- **Test Cards**: [https://razorpay.com/docs/payments/payments/test-card-details/](https://razorpay.com/docs/payments/payments/test-card-details/)
- **Support**: [https://razorpay.com/support/](https://razorpay.com/support/)

---

**Happy Selling! 🎉**
