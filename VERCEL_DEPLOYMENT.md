# 🚀 Vercel Deployment Guide

## Quick Deploy to Vercel

### Method 1: Deploy via Vercel Dashboard (Easiest)

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - E-commerce store"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [https://vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: **Vite**
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Click "Deploy"

3. **Done!** 🎉
   - Your app will be live in ~2 minutes
   - You'll get a URL like: `your-app.vercel.app`

---

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Select project settings
   - Confirm and deploy

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

---

## Environment Variables (After Deployment)

Once deployed, add your Razorpay key as environment variable:

1. Go to your project on Vercel dashboard
2. Click "Settings" → "Environment Variables"
3. Add:
   - **Name**: `VITE_RAZORPAY_KEY_ID`
   - **Value**: `rzp_test_YOUR_KEY_ID` (or live key)
4. Redeploy the project

Then update code to use:
```javascript
const key = import.meta.env.VITE_RAZORPAY_KEY_ID || RAZORPAY_CONFIG.KEY_ID;
```

---

## Post-Deployment Checklist

✅ **Test the deployed app:**
- [ ] Browse products
- [ ] Add items to cart
- [ ] Check wishlist
- [ ] Test filters and search
- [ ] Test cart operations
- [ ] Test payment flow (use test cards)

✅ **Configure Razorpay:**
- [ ] Update Razorpay Key in config or env variables
- [ ] Test payment on live URL
- [ ] Verify payments in Razorpay dashboard

✅ **Optional Improvements:**
- [ ] Add custom domain
- [ ] Enable analytics
- [ ] Set up error monitoring (Sentry)
- [ ] Configure CORS if needed

---

## Troubleshooting

**Build fails:**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Test build locally: `npm run build`

**Routing not working:**
- vercel.json should have rewrite rules (already configured)

**Environment variables not working:**
- Prefix with `VITE_` for Vite apps
- Redeploy after adding env vars

**Payment not working:**
- Check Razorpay key is correct
- Check browser console for errors
- Ensure Razorpay script loads (check Network tab)

---

## Automatic Deployments

Once connected to GitHub:
- Every push to `main` branch = automatic deployment
- Pull requests get preview deployments
- Easy rollback to previous versions

---

## Custom Domain (Optional)

1. Go to project Settings → Domains
2. Add your custom domain
3. Configure DNS settings with your domain provider
4. Wait for SSL certificate (automatic)

---

**Your app will be live at:** `https://your-app.vercel.app`

🎉 **Happy Deploying!**
