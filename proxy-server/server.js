const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Proxy configuration
app.use('/api', createProxyMiddleware({
    target: 'https://api.currentsapi.services/v1',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', // remove /api prefix
    },
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Authorization', 'FHZuyE9GSLLv7i9RSw1ccdz7AEfhXEUv56Y9FkG-D5qPaZA6');
        proxyReq.setHeader('Cache-Control', 'no-cache');
    },
}));

app.listen(PORT, () => {
    console.log(`CORS proxy server running on port ${PORT}`);
});
