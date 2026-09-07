import { handleUpload } from '@vercel/blob/client';

const DEFAULT_BLOB_TOKEN = 'vercel_blob_rw_CDhY9cR23cklkNua_kap0FFkXNSjySxW8uFCvQD4Uc3UnYc';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN || DEFAULT_BLOB_TOKEN;
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const jsonResponse = await handleUpload({
      body,
      request: req,
      token,
      onBeforeGenerateToken: async () => {
        return {
          maximumSizeInBytes: 500 * 1024 * 1024,
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
    console.error('Error in Vercel serverless blob handler:', error);
    return res.status(500).json({ error: error?.message || 'Error generating token' });
  }
}
