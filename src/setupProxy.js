const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // The path on your client that you want to proxy
    createProxyMiddleware({
      target: 'https://e-commerce-xi-six-54.vercel.app', // The target server for the proxy
      changeOrigin: true,
      pathRewrite: {
        '/api': '/api', // Rewrite the URL path to include /api
      },
      secure: false,
      onProxyReq: (proxyReq, req, res) => {
        if (req.headers.cookie) {
          proxyReq.setHeader('Cookie', req.headers.cookie); // Forward cookies from the client request
        }
      },
      onProxyRes: (proxyRes, req, res) => {
        if (proxyRes.headers['set-cookie']) {
          res.setHeader('Set-Cookie', proxyRes.headers['set-cookie']); // Set cookies in the response
        }
      },
    })
  );
};
