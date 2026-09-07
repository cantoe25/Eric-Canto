const DEFAULT_BLOB_TOKEN = 'vercel_blob_rw_CDhY9cR23cklkNua_kap0FFkXNSjySxW8uFCvQD4Uc3UnYc';

export default function handler(req: any, res: any) {
  const token = process.env.BLOB_READ_WRITE_TOKEN || DEFAULT_BLOB_TOKEN;
  const isConfigured = Boolean(token && token.trim().length > 0);
  res.json({
    configured: isConfigured,
    tokenPrefix: isConfigured && token ? `${token.substring(0, 15)}...` : null
  });
}
