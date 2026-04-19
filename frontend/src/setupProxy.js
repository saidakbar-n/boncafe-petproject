const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Only block placeholder requests that shouldn't reach Django backend
  app.use((req, res, next) => {
    const url = req.url;
    
    // Block placeholder requests that shouldn't reach Django backend
    if (url.includes('/placeholder/')) {
      console.log(`[BLOCKED] Placeholder request: ${url}`);
      return res.status(404).end();
    }
    
    next();
  });

  // Proxy API requests to Django backend
  app.use('/api', createProxyMiddleware({
    target: 'http://localhost:8000',
    changeOrigin: true,
    logLevel: 'silent',
    onError: (err, req, res) => {
      console.log(`API proxy error: ${err.message}`);
      res.status(503).json({ error: 'Backend unavailable' });
    }
  }));

  // Proxy media files to Django backend
  app.use('/media', createProxyMiddleware({
    target: 'http://localhost:8000',
    changeOrigin: true,
    logLevel: 'silent',
    onError: (err, req, res) => {
      console.log(`Media proxy error: ${err.message}`);
      res.status(404).send('Media not found');
    }
  }));

  // Proxy Django admin static files only
  app.use('/static/admin', createProxyMiddleware({
    target: 'http://localhost:8000',
    changeOrigin: true,
    logLevel: 'silent',
    onError: (err, req, res) => {
      console.log(`Static proxy error: ${err.message}`);
      res.status(404).send('Static file not found');
    }
  }));
};