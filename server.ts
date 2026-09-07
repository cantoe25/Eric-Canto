import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { Readable } from 'stream';
import { createServer as createViteServer } from 'vite';
import { put, get } from '@vercel/blob';
import { handleUpload } from '@vercel/blob/client';

dotenv.config();

const app = express();
const PORT = 3000;

// Project Vercel Blob Token provided for cloud video storage
const DEFAULT_BLOB_TOKEN = 'vercel_blob_rw_CDhY9cR23cklkNua_kap0FFkXNSjySxW8uFCvQD4Uc3UnYc';
let runtimeBlobToken: string | null = null;

function getBlobToken(): string {
  return process.env.BLOB_READ_WRITE_TOKEN || runtimeBlobToken || DEFAULT_BLOB_TOKEN;
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

// 3.5. API: Direct Client Upload token handler (bypasses reverse proxy size limits)
app.post('/api/blob-upload-handler', express.json(), async (req, res) => {
  try {
    const headerToken = req.headers['x-blob-token'] as string | undefined;
    const token = headerToken?.trim() || getBlobToken();
    if (!token) {
      return res.status(400).json({ error: 'BLOB_READ_WRITE_TOKEN no está configurado.' });
    }

    const body = req.body;
    const jsonResponse = await handleUpload({
      body,
      request: req,
      token,
      onBeforeGenerateToken: async (pathname) => {
        return {
          maximumSizeInBytes: 500 * 1024 * 1024, // 500 MB
          addRandomSuffix: true,
          allowedContentTypes: [
            'video/mp4',
            'video/webm',
            'video/quicktime',
            'video/x-matroska',
            'video/ogg'
          ]
        };
      }
    });

    return res.json(jsonResponse);
  } catch (error: any) {
    console.error('Error in blob-upload-handler:', error);
    return res.status(500).json({ error: error?.message || 'Error al autorizar subida directa' });
  }
});

// 4. API: Upload video stream directly to Vercel Blob (supports large files up to 500 MB)
app.post('/api/upload-blob', async (req, res) => {
  try {
    const headerToken = req.headers['x-blob-token'] as string | undefined;
    const token = headerToken?.trim() || getBlobToken();
    if (!token) {
      return res.status(400).json({
        error: 'BLOB_READ_WRITE_TOKEN no está configurado.'
      });
    }

    const rawFilename = (req.query.filename as string) || 'hero-video.mp4';
    const cleanFilename = rawFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const pathname = `videos/${Date.now()}-${cleanFilename}`;
    const contentType = (req.headers['content-type'] as string) || 'video/mp4';

    // Try private store first (matching the user's store configuration), fallback to public if supported
    let blob;
    try {
      blob = await put(pathname, req, {
        access: 'private',
        token,
        contentType,
        addRandomSuffix: true,
      });
    } catch (privateErr: any) {
      if (privateErr?.message && privateErr.message.includes('public')) {
        blob = await put(pathname, req, {
          access: 'public',
          token,
          contentType,
          addRandomSuffix: true,
        });
      } else {
        throw privateErr;
      }
    }

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

// 5. API: Video proxy endpoint for streaming private store videos smoothly in the browser
app.get('/api/video-proxy', async (req, res) => {
  try {
    const rawUrl = req.query.url as string;
    if (!rawUrl) {
      return res.status(400).send('URL faltante');
    }
    const token = getBlobToken();
    if (!token) {
      return res.status(400).send('Token no configurado');
    }

    const data = await get(rawUrl, { access: 'private', token });
    if (!data || !data.stream) {
      return res.status(404).send('Video no encontrado');
    }

    res.status(data.statusCode || 200);
    // Forward essential media headers for video streaming and seeking
    data.headers.forEach((value, key) => {
      const k = key.toLowerCase();
      if (['content-type', 'content-length', 'accept-ranges', 'cache-control'].includes(k)) {
        res.setHeader(key, value);
      }
    });

    const nodeStream = Readable.fromWeb(data.stream as any);
    nodeStream.pipe(res);
  } catch (error: any) {
    console.error('Error proxying video:', error);
    res.status(500).send(error?.message || 'Error al reproducir video');
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
