@echo off
echo ========================================
echo  Deploying to Convex Production
echo ========================================
cd "C:\Dev\Cascade\merecruits"
echo yes | npx convex deploy --env-file .env.production
echo.
echo ========================================
echo  Deployment Complete!
echo ========================================
echo.
echo Remember to set in your hosting platform:
echo NEXT_PUBLIC_CONVEX_URL=https://blessed-ibis-400.convex.cloud
echo.
pause