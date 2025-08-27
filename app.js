import express from 'express';
import path from 'path';
import compression from 'compression';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression
app.use(compression());

// Serve static files from dist directory
app.use(
  express.static(path.join(__dirname, 'dist'), {
    maxAge: '1y', // Cache static assets for 1 year
    etag: false,
  })
);

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Handle React Router - serve index.html for all non-static routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error('Server error:', err);
  res.status(500).send('Internal Server Error');
});

// Start server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`TicketPro Enterprise server running on port ${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  // eslint-disable-next-line no-console
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  // eslint-disable-next-line no-console
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});