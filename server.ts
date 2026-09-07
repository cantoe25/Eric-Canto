import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { put } from '@vercel/blob';

dotenv.config();

const app = express();
const PORT = 3000;

// Dynamic runtime token fallback in case provided in session
let runtimeBlobToken: string | null = null;

function getBlobToken(): string | null {
  return process.env.BLOB_READ_WRITE_TOKEN || runtimeBlobToken || null;
}

// 1. API: Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 2. API: Check if Vercel Blob is configured
app.get('/api/blob-status', (req, res) => {
  const token = getBlobToken();
  const isConfigured = Boolean(token && token.trim().length > 0);
  res.json({ 
    configured: isConfigured,
    tokenPrefix: isConfigured && token ? `${token.substring(0, 15)}...` : null
  });
});

// 3. API: Set runtime token (if provided in-session)
app.post('/api/set-blob-token', express.json(), (req, res) => {
  const { token } = req.body || {};
  if (!token || typeof token !== 'string' || !token.trim().startsWith('vercel_blob_rw_')) {
    return res.status(400).json({ 
      error: 'Token inválido. El token de Vercel Blob debe comenzar con vercel_blob_rw_' 
    });
  }
  runtimeBlobToken = token.trim();
  res.json({ 
    success: true, 
    message: 'Token de Vercel Blob configurado correctamente para esta sesión.' 
  });
});

// 4. API: Upload video stream directly to Vercel Blob
app.post('/api/upload-blob', async (req, res) => {
  try {
    const headerToken = req.headers['x-blob-token'] as string | undefined;
    const token = headerToken?.trim() || getBlobToken();
    if (!token) {
      return res.status(400).json({
        error: 'BLOB_READ_WRITE_TOKEN no está configurado. Por favor proporciona tu token de Vercel Blob.'
      });
    }

    const rawFilename = (req.query.filename as string) || 'hero-video.mp4';
    const cleanFilename = rawFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const pathname = `videos/${Date.now()}-${cleanFilename}`;
    const contentType = (req.headers['content-type'] as string) || 'video/mp4';

    // Stream the incoming request directly into Vercel Blob
    const blob = await put(pathname, req, {
      access: 'public',
      token,
      contentType,
    });

    return res.json({
      success: true,
      url: blob.url,
      downloadUrl: blob.downloadUrl,
      pathname: blob.pathname,
      contentType: blob.contentType,
    });
  } catch (error: any) {
    console.error('Error uploading to Vercel Blob:', error);
    return res.status(500).json({
      error: error?.message || 'Error al subir el archivo a Vercel Blob'
    });
  }
});

// Mount Vite middleware (development) or serve static files (production)
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
