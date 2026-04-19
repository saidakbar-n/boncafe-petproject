#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting production build optimization...');

// 1. Clean previous builds
console.log('🧹 Cleaning previous builds...');
if (fs.existsSync('build')) {
  fs.rmSync('build', { recursive: true, force: true });
}

// 2. Set production environment
process.env.NODE_ENV = 'production';
process.env.GENERATE_SOURCEMAP = 'false';
process.env.INLINE_RUNTIME_CHUNK = 'false';

// 3. Build the project
console.log('📦 Building React app...');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// 4. Optimize images (if imagemin is available)
console.log('🖼️ Optimizing images...');
try {
  const buildDir = path.join(__dirname, '../build');
  const staticDir = path.join(buildDir, 'static');
  
  if (fs.existsSync(staticDir)) {
    // This would require imagemin packages to be installed
    console.log('📸 Image optimization would run here (install imagemin packages)');
  }
} catch (error) {
  console.log('⚠️ Image optimization skipped:', error.message);
}

// 5. Generate service worker
console.log('⚙️ Generating service worker...');
const swContent = `
const CACHE_NAME = 'bon-cafe-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
`;

fs.writeFileSync(path.join(__dirname, '../build/sw.js'), swContent);

// 6. Generate robots.txt
console.log('🤖 Generating robots.txt...');
const robotsContent = `User-agent: *
Allow: /

Sitemap: https://boncafe.uz/sitemap.xml
`;

fs.writeFileSync(path.join(__dirname, '../build/robots.txt'), robotsContent);

// 7. Generate sitemap.xml
console.log('🗺️ Generating sitemap.xml...');
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://boncafe.uz/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://boncafe.uz/menu</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://boncafe.uz/branches</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://boncafe.uz/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://boncafe.uz/contact</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
`;

fs.writeFileSync(path.join(__dirname, '../build/sitemap.xml'), sitemapContent);

// 8. Analyze bundle size
console.log('📊 Analyzing bundle size...');
try {
  execSync('npx webpack-bundle-analyzer build/static/js/*.js --mode static --report build/bundle-report.html --no-open', { stdio: 'inherit' });
  console.log('📈 Bundle analysis saved to build/bundle-report.html');
} catch (error) {
  console.log('⚠️ Bundle analysis skipped (webpack-bundle-analyzer not installed)');
}

// 9. Display build summary
console.log('\n✅ Build optimization complete!');
console.log('📁 Build files are ready in the build/ directory');
console.log('🌐 Deploy the build/ directory to your web server');
console.log('📊 Check build/bundle-report.html for bundle analysis');

// 10. Performance recommendations
console.log('\n🚀 Performance recommendations:');
console.log('• Enable gzip compression on your server');
console.log('• Set proper cache headers for static assets');
console.log('• Use a CDN for global content delivery');
console.log('• Monitor Core Web Vitals in production');
console.log('• Consider implementing HTTP/2 server push');

console.log('\n🎉 Your Bon Cafe app is ready for production!');