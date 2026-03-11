@echo off
echo ========================================
echo   Deploying to Vercel
echo ========================================
echo.

echo Step 1: Building the project...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed! Fix errors and try again.
    pause
    exit /b 1
)
echo Build successful!
echo.

echo Step 2: Deploying to Vercel...
echo.
echo Please follow the prompts:
echo - Login with your Vercel account
echo - Select 'Create new project'
echo - Project name: ecommerce-store (or your choice)
echo - Framework: Vite
echo.
pause

call vercel

echo.
echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Note your deployment URL from above
echo 2. Test your live site
echo 3. Add Razorpay key to environment variables:
echo    - Go to vercel.com dashboard
echo    - Open your project settings
echo    - Add VITE_RAZORPAY_KEY_ID variable
echo.
pause
