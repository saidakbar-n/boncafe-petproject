# Placeholder URLs Fixed

## Problem
The frontend was making requests to `/placeholder/500/600` and `/placeholder/600/700` which were reaching the Django backend and causing 404 errors:
```
Not Found: /placeholder/500/600
[02/Nov/2025 12:54:41] "GET /placeholder/500/600 HTTP/1.1" 404 2710
Not Found: /placeholder/600/700
[02/Nov/2025 12:54:42] "GET /placeholder/600/700 HTTP/1.1" 404 2710
```

## Root Cause
The frontend components were using external placeholder URLs from `via.placeholder.com` but somehow these were being treated as relative URLs and proxied to the Django backend.

## Solution
1. **Created local SVG placeholder images** in `frontend/public/images/`:
   - `placeholder-hero.svg` (600x700) - For hero section
   - `placeholder-about.svg` (500x600) - For about section
   - `placeholder-menu.svg` (400x300) - For menu items
   - `placeholder-branch.svg` (400x300) - For branch images
   - `placeholder-team.svg` (200x200) - For team member photos
   - `placeholder-seo.svg` (1200x630) - For SEO meta images

2. **Updated all components** to use local placeholder images:
   - `Hero.js` - Hero section image
   - `About.js` - About section image and team member photos
   - `MenuCard.js` - Menu item fallback images
   - `Menu.js` - Menu page item images
   - `Branches.js` - Branch photo fallbacks
   - `OptimizedImage.js` - Default fallback image
   - `ResponsiveImage.js` - Default fallback image
   - `SEO.js` - Default meta image
   - `performance.js` - Preload critical images

3. **Enhanced setupProxy.js** to block any remaining placeholder requests:
   ```javascript
   // Block placeholder requests that shouldn't reach Django backend
   if (url.includes('/placeholder/')) {
     console.log(`[BLOCKED] Placeholder request: ${url}`);
     return res.status(404).end();
   }
   ```

## Benefits
- ✅ No more 404 errors for placeholder URLs in Django logs
- ✅ Faster loading (local images vs external requests)
- ✅ No dependency on external placeholder services
- ✅ Consistent branding with custom SVG placeholders
- ✅ Better offline experience
- ✅ Reduced network requests

## Files Modified
- `frontend/src/components/Hero/Hero.js`
- `frontend/src/components/About/About.js`
- `frontend/src/components/MenuCard/MenuCard.js`
- `frontend/src/pages/Menu/Menu.js`
- `frontend/src/pages/Branches/Branches.js`
- `frontend/src/components/OptimizedImage/OptimizedImage.js`
- `frontend/src/components/ResponsiveImage/ResponsiveImage.js`
- `frontend/src/components/SEO/SEO.js`
- `frontend/src/utils/performance.js`
- `frontend/src/setupProxy.js`

## Files Created
- `frontend/public/images/placeholder-hero.svg`
- `frontend/public/images/placeholder-about.svg`
- `frontend/public/images/placeholder-menu.svg`
- `frontend/public/images/placeholder-branch.svg`
- `frontend/public/images/placeholder-team.svg`
- `frontend/public/images/placeholder-seo.svg`

## Verification
Run this command to verify no external placeholder URLs remain:
```bash
cd frontend
grep -r "via.placeholder.com" src/ || echo "All placeholder URLs fixed!"
```

The Django backend logs should now be clean of placeholder-related 404 errors.