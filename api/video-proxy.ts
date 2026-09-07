import { get } from '@vercel/blob';
import { Readable } from 'stream';

const DEFAULT_BLOB_TOKEN = 'vercel_blob_rw_CDhY9cR23cklkNua_kap0FFkXNSjySxW8uFCvQD4Uc3UnYc';

export default async function handler(req: any, res: any) {
  try {
    const rawUrl = (req.query?.url || req.url?.split('url=')?.[1]) as string;
    if (!rawUrl) {
      return res.status(400).send('URL faltante');
    }
    const token = process.env.BLOB_READ_WRITE_TOKEN || DEFAULT_BLOB_TOKEN;
    const decodedUrl = decodeURIComponent(rawUrl);

    const data = await get(decodedUrl, { access: 'private', token });
    if (!data || !data.stream) {
      return res.status(404).send('Video no encontrado');
    }

    res.status(data.statusCode || 200);
    data.headers.forEach((value: string, key: string) => {
      const k = key.toLowerCase();
      if (['content-type', 'content-length', 'accept-ranges', 'cache-control'].includes(k)) {
        res.setHeader(key, value);
      }
    });

    const nodeStream = Readable.fromWeb(data.stream as any);
    nodeStream.pipe(res);
  } catch (error: any) {
    console.error('Error proxying video in Vercel serverless:', error);
    res.status(500).send(error?.message || 'Error al reproducir video');
  }
}
