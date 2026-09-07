import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Plus, 
  Edit3, 
  Trash2, 
  Link2, 
  Check, 
  X, 
  Smartphone, 
  Sparkles, 
  Cloud, 
  Loader2,
  ExternalLink,
  AlertCircle,
  UploadCloud,
  HardDrive,
  Key,
  ShieldCheck
} from 'lucide-react';
import { 
  subscribeToHeroVideo, 
  saveHeroVideoToCloud, 
  removeHeroVideoFromCloud, 
  CloudVideoData 
} from '../lib/firebase';

const DEFAULT_BLOB_TOKEN = 'vercel_blob_rw_CDhY9cR23cklkNua_kap0FFkXNSjySxW8uFCvQD4Uc3UnYc';

// Direct browser upload to Vercel Blob API (works across all deployed hosts: Vercel, Netlify, Cloud Run, etc.)
async function uploadDirectToVercelBlob(
  file: File,
  token: string,
  onProgress: (pct: number) => void
): Promise<{ url: string; downloadUrl?: string; pathname: string }> {
  const cleanFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const pathname = `videos/${Date.now()}-${cleanFilename}`;
  const apiUrl = `https://blob.vercel-storage.com/${pathname}`;

  const sendRequest = (access: 'private' | 'public'): Promise<{ url: string; downloadUrl?: string; pathname: string }> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', apiUrl, true);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.setRequestHeader('x-api-version', '7');
      xhr.setRequestHeader('x-vercel-blob-access', access);
      xhr.setRequestHeader('x-add-random-suffix', '1');
      if (file.type) {
        xhr.setRequestHeader('Content-Type', file.type);
      }

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const pct = Math.round((e.loaded / e.total) * 100);
          onProgress(pct);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          } catch (e) {
            reject(new Error('Respuesta no válida de Vercel Blob'));
          }
        } else {
          try {
            const errData = JSON.parse(xhr.responseText);
            const msg = errData?.error?.message || `Error ${xhr.status}`;
            const err: any = new Error(msg);
            err.status = xhr.status;
            reject(err);
          } catch {
            reject(new Error(`Error ${xhr.status}: ${xhr.statusText}`));
          }
        }
      };

      xhr.onerror = () => {
        reject(new Error('Fallo de conexión al subir el archivo a Vercel Blob'));
      };

      xhr.send(file);
    });
  };

  try {
    return await sendRequest('private');
  } catch (err: any) {
    if (err.message && (err.message.includes('public') || err.message.includes('Public'))) {
      return await sendRequest('public');
    }
    throw err;
  }
}

export interface ParsedVideo {
  type: 'iframe' | 'html5';
  provider: 'gdrive' | 'youtube' | 'loom' | 'vimeo' | 'streamable' | 'dropbox' | 'vercel' | 'html5';
  providerLabel: string;
  embedUrl: string;
  originalUrl: string;
  directLink: string;
  tips?: string;
}

export function parseVideoUrl(rawUrl?: string): ParsedVideo | null {
  if (!rawUrl || typeof rawUrl !== 'string') return null;
  const url = rawUrl.trim();
  if (!url) return null;

  // 0. Base64 / Data URI uploaded directly to Firestore
  if (url.startsWith('data:video/')) {
    return {
      type: 'html5',
      provider: 'html5',
      providerLabel: 'Firebase Firestore (Directo)',
      embedUrl: url,
      originalUrl: url,
      directLink: '',
      tips: 'Video guardado directamente en Firestore como Base64.'
    };
  }

  // 0.5. Vercel Blob Storage CDN
  if (url.includes('vercel-storage.com')) {
    const isPrivate = url.includes('private.blob.vercel-storage.com');
    const embedUrl = isPrivate 
      ? `/api/video-proxy?url=${encodeURIComponent(url)}` 
      : url;
    return {
      type: 'html5',
      provider: 'vercel',
      providerLabel: 'Vercel Blob',
      embedUrl,
      originalUrl: url,
      directLink: url,
      tips: 'Video alojado en Vercel Blob con CDN de alta velocidad.'
    };
  }

  // 1. Google Drive (file/d/, open?id=, uc?id=)
  const gdriveMatch = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=)([a-zA-Z0-9_-]+)/);
  if (gdriveMatch) {
    const fileId = gdriveMatch[1];
    return {
      type: 'iframe',
      provider: 'gdrive',
      providerLabel: 'Google Drive',
      embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      originalUrl: url,
      directLink: `https://drive.google.com/file/d/${fileId}/view`,
      tips: 'Asegúrate de configurar en Google Drive: "Cualquier persona que tenga el vínculo" para que todos los visitantes puedan verlo sin pedir acceso.'
    };
  }

  // 2. YouTube (Shorts, Watch, Youtu.be, Embed, Mobile)
  const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
  if (ytMatch) {
    const videoId = ytMatch[1];
    return {
      type: 'iframe',
      provider: 'youtube',
      providerLabel: 'YouTube / Shorts',
      embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`,
      originalUrl: url,
      directLink: `https://www.youtube.com/watch?v=${videoId}`,
      tips: 'Video de YouTube listo para reproducción.'
    };
  }

  // 3. Loom
  const loomMatch = url.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9_-]+)/);
  if (loomMatch) {
    const loomId = loomMatch[1];
    return {
      type: 'iframe',
      provider: 'loom',
      providerLabel: 'Loom',
      embedUrl: `https://www.loom.com/embed/${loomId}`,
      originalUrl: url,
      directLink: `https://www.loom.com/share/${loomId}`,
      tips: 'Grabación de Loom lista.'
    };
  }

  // 4. Vimeo
  const vimeoMatch = url.match(/(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+))/);
  if (vimeoMatch) {
    const vimeoId = vimeoMatch[3];
    return {
      type: 'iframe',
      provider: 'vimeo',
      providerLabel: 'Vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoId}?autoplay=0&loop=1`,
      originalUrl: url,
      directLink: `https://vimeo.com/${vimeoId}`,
      tips: 'Video de Vimeo listo.'
    };
  }

  // 5. Dropbox
  if (url.includes('dropbox.com')) {
    const directUrl = url.replace('?dl=0', '').replace('&dl=0', '').concat(url.includes('?') ? '&raw=1' : '?raw=1');
    return {
      type: 'html5',
      provider: 'dropbox',
      providerLabel: 'Dropbox',
      embedUrl: directUrl,
      originalUrl: url,
      directLink: url,
      tips: 'Video de Dropbox adaptado para streaming directo.'
    };
  }

  // 6. Direct Video / Cloud Storage (.mp4, .webm, etc.)
  return {
    type: 'html5',
    provider: 'html5',
    providerLabel: 'Video Directo (MP4 / WebM)',
    embedUrl: url,
    originalUrl: url,
    directLink: url,
    tips: 'Archivo directo compatible con HTML5.'
  };
}

interface HeroVideoCardProps {
  className?: string;
}

export const HeroVideoCard: React.FC<HeroVideoCardProps> = ({ className = '' }) => {
  const [videoData, setVideoData] = useState<CloudVideoData | null>(null);
  const [loadingCloud, setLoadingCloud] = useState<boolean>(true);
  const [savingCloud, setSavingCloud] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // Modal tabs: 'upload' (from PC) or 'url' (by link)
  const [modalTab, setModalTab] = useState<'upload' | 'url'>('upload');
  
  // URL tab state
  const [inputUrl, setInputUrl] = useState<string>('');
  const [inputTitle, setInputTitle] = useState<string>('');
  
  // PC Upload tab state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileSizeMb, setFileSizeMb] = useState<number>(0);
  const [fileDataUrl, setFileDataUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Vercel Blob status and upload state
  const [blobConfigured, setBlobConfigured] = useState<boolean>(true);
  const [userBlobToken, setUserBlobToken] = useState<string>(() => {
    return localStorage.getItem('VERCEL_BLOB_TOKEN') || '';
  });
  const [uploadingToBlob, setUploadingToBlob] = useState<boolean>(false);
  const [uploadProgressMsg, setUploadProgressMsg] = useState<string>('');

  // Video playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [html5Error, setHtml5Error] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check Vercel Blob status from backend
  useEffect(() => {
    fetch('/api/blob-status')
      .then(res => res.json())
      .then(data => {
        setBlobConfigured(Boolean(data.configured));
      })
      .catch(() => {
        setBlobConfigured(false);
      });
  }, []);

  // Subscribe to real-time Cloud updates from Firebase Firestore
  useEffect(() => {
    setLoadingCloud(true);
    const unsubscribe = subscribeToHeroVideo(
      (data) => {
        if (data && data.url && data.url.trim().length > 0) {
          setVideoData(data);
        } else {
          setVideoData(null);
        }
        setLoadingCloud(false);
      },
      (err) => {
        console.warn('Firebase Cloud Video notice:', err);
        setLoadingCloud(false);
      }
    );

    // Safety timeout so UI never hangs in loading if network is negotiating
    const safetyTimeout = setTimeout(() => {
      setLoadingCloud(false);
    }, 2000);

    return () => {
      clearTimeout(safetyTimeout);
      unsubscribe();
    };
  }, []);

  // Reset HTML5 error state on url change
  useEffect(() => {
    setHtml5Error(false);
    setIsPlaying(false);
  }, [videoData?.url]);

  const handleSaveToCloud = async (url: string, title?: string) => {
    try {
      setSavingCloud(true);
      await saveHeroVideoToCloud({
        url: url.trim(),
        title: title?.trim() || 'Pitch Personal (9:16)',
        updatedAt: new Date().toISOString(),
        aspectRatio: '9:16'
      });
      setIsModalOpen(false);
      resetModalState();
    } catch (error) {
      console.error('Error saving to cloud:', error);
    } finally {
      setSavingCloud(false);
    }
  };

  const handleRemoveFromCloud = async () => {
    try {
      setSavingCloud(true);
      await removeHeroVideoFromCloud();
      setIsPlaying(false);
    } catch (error) {
      console.error('Error removing from cloud:', error);
    } finally {
      setSavingCloud(false);
    }
  };

  const resetModalState = () => {
    setInputUrl('');
    setInputTitle('');
    setSelectedFile(null);
    setFileSizeMb(0);
    setFileDataUrl(null);
    setUploadError(null);
    setIsDragging(false);
    setUploadingToBlob(false);
    setUploadProgressMsg('');
  };

  // Handle file selection from local PC
  const processFile = (file: File) => {
    if (!file.type.startsWith('video/')) {
      setUploadError('Por favor selecciona un archivo de video válido (.mp4, .webm o .mov).');
      return;
    }

    const sizeMb = file.size / (1024 * 1024);
    setSelectedFile(file);
    setFileSizeMb(sizeMb);
    setUploadError(null);

    if (!inputTitle) {
      setInputTitle(file.name.replace(/\.[^/.]+$/, ''));
    }

    // Always create local preview for instant feedback
    const localPreview = URL.createObjectURL(file);
    setFileDataUrl(localPreview);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    await handleSaveToCloud(inputUrl.trim(), inputTitle.trim() || 'Pitch Personal (9:16)');
  };

  // Upload file directly to Vercel Blob (supports any size up to 500 MB, independent of backend hosting)
  const handleVercelBlobUpload = async () => {
    if (!selectedFile) return;
    try {
      setUploadingToBlob(true);
      setUploadError(null);
      setUploadProgressMsg(`Conectando con Vercel Blob para subir ${selectedFile.name} (${fileSizeMb.toFixed(1)} MB)...`);

      const tokenToUse = userBlobToken.trim() || DEFAULT_BLOB_TOKEN;

      // Upload directly from browser to Vercel global CDN edge (bypasses proxy and token-handler issues)
      const blob = await uploadDirectToVercelBlob(
        selectedFile,
        tokenToUse,
        (pct) => {
          setUploadProgressMsg(`Subiendo a Vercel Blob: ${pct}% (${fileSizeMb.toFixed(1)} MB)...`);
        }
      );

      if (!blob || !blob.url) {
        throw new Error('No se recibió la URL de Vercel Blob.');
      }

      setUploadProgressMsg('¡Video subido a Vercel Blob! Guardando en Firebase Firestore...');
      await handleSaveToCloud(blob.url, inputTitle.trim() || selectedFile.name);
    } catch (err: any) {
      console.error('Vercel Blob upload error:', err);
      setUploadError(err.message || 'Error al subir el video a Vercel Blob.');
    } finally {
      setUploadingToBlob(false);
      setUploadProgressMsg('');
    }
  };

  // Direct Firestore Base64 upload (for files <= 1.0 MB)
  const handleFirestoreDirectSubmit = async () => {
    if (!selectedFile || fileSizeMb > 1.0) return;
    try {
      setSavingCloud(true);
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        await handleSaveToCloud(base64, inputTitle.trim() || selectedFile.name);
      };
      reader.readAsDataURL(selectedFile);
    } catch (err: any) {
      console.error('Firestore direct save error:', err);
      setUploadError('Error al procesar el archivo para Firestore.');
      setSavingCloud(false);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch((err) => {
        console.warn('Playback error or blocked by browser policy:', err);
        setHtml5Error(true);
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const loadDemoPitch = async () => {
    await handleSaveToCloud(
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 
      'Demo Pitch // En la nube (Firebase)'
    );
  };

  const parsed = parseVideoUrl(videoData?.url);
  const inputParsed = parseVideoUrl(inputUrl);
  const canUseVercelBlob = blobConfigured || userBlobToken.trim().length > 0;

  return (
    <div className={`bg-[#ebedf0] rounded-3xl p-3.5 sm:p-4 shadow-neu-raised border border-white/80 max-w-[280px] sm:max-w-[300px] w-full flex flex-col justify-between mx-auto ${className}`}>
      {/* Top Header inside the Box */}
      <div className="flex items-center justify-between gap-2 mb-2.5 px-1">
        <div className="flex items-center gap-1.5" title="Sincronizado en la nube con Firebase Firestore">
          <Cloud className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
          <span className="font-['JetBrains_Mono'] text-[10px] sm:text-[11px] font-bold text-black uppercase tracking-wider">
            VIDEO // 9:16 CLOUD
          </span>
        </div>

        <div className="flex items-center gap-1">
          {videoData?.url ? (
            <>
              {parsed && parsed.directLink && (
                <a
                  href={parsed.directLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded-lg bg-[#ebedf0] shadow-neu-sm border border-white/80 hover:shadow-neu-inset text-black transition-all cursor-pointer"
                  title={`Abrir en ${parsed.providerLabel} en pestaña nueva`}
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              <button
                onClick={() => {
                  if (videoData.url.startsWith('data:video/') || videoData.url.includes('vercel-storage.com')) {
                    setModalTab('upload');
                  } else {
                    setInputUrl(videoData.url);
                    setModalTab('url');
                  }
                  setInputTitle(videoData.title || '');
                  setIsModalOpen(true);
                }}
                disabled={savingCloud}
                className="p-1 rounded-lg bg-[#ebedf0] shadow-neu-sm border border-white/80 hover:shadow-neu-inset text-black transition-all text-[10px] font-['JetBrains_Mono'] flex items-center gap-1 cursor-pointer"
                title="Cambiar video en la nube"
              >
                <Edit3 className="w-3 h-3" />
                <span>Editar</span>
              </button>
              <button
                onClick={handleRemoveFromCloud}
                disabled={savingCloud}
                className="p-1 rounded-lg bg-[#ebedf0] shadow-neu-sm border border-white/80 hover:shadow-neu-inset text-rose-600 transition-all cursor-pointer"
                title="Quitar video de la nube"
              >
                {savingCloud ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                resetModalState();
                setIsModalOpen(true);
              }}
              disabled={loadingCloud || savingCloud}
              className="px-2 py-0.5 rounded-lg bg-black text-white text-[10px] font-['JetBrains_Mono'] flex items-center gap-1 shadow-neu-dark hover:bg-neutral-800 transition-all cursor-pointer"
              id="btn-open-add-video"
            >
              <Plus className="w-3 h-3" />
              <span>Agregar</span>
            </button>
          )}
        </div>
      </div>

      {/* Video Display Area / Screen in 9:16 aspect ratio */}
      <div className="w-full aspect-[9/16] rounded-2xl bg-[#ebedf0] shadow-neu-inset p-1.5 border border-white/40 overflow-hidden relative flex items-center justify-center group">
        {loadingCloud ? (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <Loader2 className="w-6 h-6 text-black animate-spin mb-2" />
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#5e5e5e]">
              Conectando a la nube...
            </span>
          </div>
        ) : parsed && parsed.type === 'iframe' ? (
          <div className="w-full h-full relative rounded-xl overflow-hidden bg-black flex flex-col justify-between">
            <iframe
              src={parsed.embedUrl}
              title={videoData?.title || 'Video de presentación'}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            {/* Quick floating open button */}
            {parsed.directLink && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <a
                  href={parsed.directLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded-lg bg-black/80 backdrop-blur-sm text-white text-[9px] font-['JetBrains_Mono'] flex items-center gap-1 hover:bg-black transition-colors"
                  title="Abrir en pestaña nueva"
                >
                  <ExternalLink className="w-2.5 h-2.5" />
                  <span>Abrir</span>
                </a>
              </div>
            )}
          </div>
        ) : parsed && parsed.type === 'html5' ? (
          <div className="w-full h-full relative flex items-center justify-center bg-black rounded-xl overflow-hidden">
            <video
              ref={videoRef}
              src={parsed.embedUrl}
              playsInline
              muted={isMuted}
              loop
              preload="metadata"
              onError={() => setHtml5Error(true)}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            />

            {html5Error ? (
              <div className="absolute inset-0 bg-[#ebedf0]/95 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center z-20">
                <AlertCircle className="w-8 h-8 text-amber-600 mb-2" />
                <p className="text-xs font-['Space_Grotesk'] font-bold text-black mb-1">
                  Requiere abrir enlace
                </p>
                <p className="text-[10px] font-['Manrope'] text-[#5e5e5e] mb-3 leading-snug">
                  El servidor del video requiere abrirse directamente en el navegador.
                </p>
                {parsed.directLink && (
                  <a
                    href={parsed.directLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-black text-white text-xs font-['JetBrains_Mono'] flex items-center gap-1.5 shadow-neu-dark hover:bg-neutral-800"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Abrir video</span>
                  </a>
                )}
              </div>
            ) : (
              <>
                {/* Custom Overlay Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-['JetBrains_Mono'] text-white/90 bg-blue-600/80 px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1">
                      <Cloud className="w-2.5 h-2.5" />
                      {parsed.providerLabel}
                    </span>
                    {parsed.directLink ? (
                      <a
                        href={parsed.directLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[9px] font-['JetBrains_Mono'] text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1 hover:bg-black/90"
                      >
                        <ExternalLink className="w-2.5 h-2.5" />
                        <span>Original</span>
                      </a>
                    ) : (
                      <span className="text-[9px] font-['JetBrains_Mono'] text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                        9:16
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={togglePlay}
                        className="w-7 h-7 rounded-lg bg-white/90 hover:bg-white text-black flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
                        title={isPlaying ? 'Pausar' : 'Reproducir'}
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="w-7 h-7 rounded-lg bg-white/90 hover:bg-white text-black flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
                        title={isMuted ? 'Activar sonido' : 'Silenciar'}
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <span className="text-[10px] font-['JetBrains_Mono'] text-white/90 truncate max-w-[120px]">
                      {videoData?.title}
                    </span>
                  </div>
                </div>

                {/* Big center play icon if paused */}
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="absolute w-12 h-12 rounded-full bg-white/90 hover:bg-white text-black flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                    title="Reproducir video"
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>
                )}
              </>
            )}
          </div>
        ) : (
          /* Empty State: 9:16 Vertical Phone Canvas */
          <div className="w-full h-full rounded-xl bg-[#e4e7eb] border border-dashed border-slate-300 flex flex-col items-center justify-between p-4 text-center">
            {/* Top Indicator */}
            <div className="flex items-center gap-1 text-[10px] font-['JetBrains_Mono'] text-blue-700 bg-blue-50/80 px-2 py-0.5 rounded-full shadow-neu-sm border border-blue-200">
              <Cloud className="w-3 h-3 text-blue-600" />
              <span>Base en la Nube Activa</span>
            </div>

            {/* Center Content */}
            <div className="flex flex-col items-center my-auto">
              <div className="w-12 h-12 rounded-2xl bg-[#ebedf0] shadow-neu-flat border border-white flex items-center justify-center text-black mb-3">
                <Smartphone className="w-6 h-6 text-neutral-800" />
              </div>

              <h4 className="font-['Space_Grotesk'] text-xs sm:text-sm font-bold text-black mb-1">
                Video en la Nube
              </h4>
              <p className="font-['Manrope'] text-[10px] text-[#5e5e5e] max-w-[190px] mb-4 leading-snug">
                Sube tu video desde el ordenador (Vercel Blob) o vincula YouTube / Drive.
              </p>

              <button
                onClick={() => {
                  resetModalState();
                  setIsModalOpen(true);
                }}
                disabled={savingCloud}
                className="px-3.5 py-1.5 rounded-xl bg-black text-white text-xs font-['JetBrains_Mono'] font-medium flex items-center gap-1.5 shadow-neu-dark hover:bg-neutral-800 transition-all cursor-pointer mb-2"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Guardar Video en la Nube</span>
              </button>

              <button
                onClick={loadDemoPitch}
                disabled={savingCloud}
                className="px-2.5 py-1 rounded-lg bg-[#ebedf0] text-black text-[10px] font-['JetBrains_Mono'] border border-white/80 shadow-neu-sm hover:shadow-neu-inset transition-all flex items-center gap-1 cursor-pointer"
                title="Cargar video demo directamente en Firebase Firestore"
              >
                {savingCloud ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Sparkles className="w-3 h-3 text-amber-600" />
                )}
                <span>Guardar muestra demo</span>
              </button>
            </div>

            {/* Bottom Info */}
            <div className="w-full text-center border-t border-slate-300/50 pt-2 text-[9px] font-['JetBrains_Mono'] text-neutral-500">
              Vercel Blob · Drive · YouTube · Shorts
            </div>
          </div>
        )}
      </div>

      {/* Footer / Caption */}
      <div className="mt-2.5 flex items-center justify-between text-[10px] font-['JetBrains_Mono'] text-[#5e5e5e] px-1">
        <span className="truncate max-w-[140px] text-neutral-700 font-medium">
          {videoData?.url ? videoData.title : 'Pitch en la Nube'}
        </span>
        <div className="flex items-center gap-1.5">
          {parsed && (
            <span className="text-[9px] bg-slate-200 text-neutral-700 px-1.5 py-0.5 rounded font-medium">
              {parsed.providerLabel}
            </span>
          )}
          <span className="text-[9px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200 flex items-center gap-1">
            <Cloud className="w-2.5 h-2.5" />
            Firestore
          </span>
        </div>
      </div>

      {/* Modal to Add/Edit Cloud Video */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#ebedf0] rounded-3xl p-5 sm:p-6 max-w-lg w-full shadow-2xl border border-white/80 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-300/60">
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-blue-600" />
                <h3 className="font-['Space_Grotesk'] text-base font-bold text-black">
                  Guardar Video en la Nube
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetModalState();
                }}
                className="w-7 h-7 rounded-lg bg-[#ebedf0] shadow-neu-sm border border-white flex items-center justify-center text-black hover:shadow-neu-inset cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Selection Tabs: Subir desde PC vs Por Vínculo */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#dfe2e6] rounded-2xl shadow-neu-inset mb-4 border border-white/40">
              <button
                type="button"
                onClick={() => setModalTab('upload')}
                className={`py-2 px-3 rounded-xl font-['JetBrains_Mono'] text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  modalTab === 'upload' 
                    ? 'bg-black text-white shadow-neu-dark' 
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                <HardDrive className="w-3.5 h-3.5" />
                <span>Desde mi Ordenador</span>
              </button>
              <button
                type="button"
                onClick={() => setModalTab('url')}
                className={`py-2 px-3 rounded-xl font-['JetBrains_Mono'] text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  modalTab === 'url' 
                    ? 'bg-black text-white shadow-neu-dark' 
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>Por Vínculo Web</span>
              </button>
            </div>

            {/* TAB 1: SUBIR DESDE ORDENADOR (Vercel Blob & Firestore) */}
            {modalTab === 'upload' && (
              <div className="space-y-4">
                <div>
                  <label className="block font-['JetBrains_Mono'] text-xs font-semibold text-[#5e5e5e] mb-1.5">
                    1. SELECCIONA EL ARCHIVO DE VIDEO DE TU PC
                  </label>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime"
                    onChange={handleFileChange}
                    className="hidden"
                    id="pc-video-file-input"
                  />

                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[110px] ${
                      isDragging 
                        ? 'border-black bg-white/70 shadow-neu-inset' 
                        : 'border-slate-300 bg-[#e4e7eb] hover:bg-[#e0e3e7] shadow-neu-sm'
                    }`}
                  >
                    <UploadCloud className="w-7 h-7 text-neutral-600 mb-1.5" />
                    <span className="font-['Space_Grotesk'] text-xs font-bold text-black mb-0.5">
                      {selectedFile ? selectedFile.name : 'Haz clic para examinar o arrastra tu video aquí'}
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-neutral-500">
                      Soporta MP4 / WebM sin límite con Vercel Blob (o hasta 1 MB en Firestore directo)
                    </span>
                  </div>

                  {/* File information & status */}
                  {selectedFile && (
                    <div className="mt-2.5 p-3 rounded-xl bg-white/80 border border-white shadow-neu-sm space-y-2">
                      <div className="flex items-center justify-between text-xs font-['JetBrains_Mono']">
                        <span className="truncate max-w-[200px] font-semibold text-black">
                          {selectedFile.name}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900">
                          {fileSizeMb.toFixed(2)} MB
                        </span>
                      </div>

                      {/* Local video preview */}
                      {fileDataUrl && (
                        <div className="mt-2">
                          <span className="font-['JetBrains_Mono'] text-[9px] text-neutral-500 block mb-1">
                            Vista previa local:
                          </span>
                          <div className="max-h-36 aspect-[9/16] mx-auto rounded-xl overflow-hidden bg-black shadow-neu-inset">
                            <video 
                              src={fileDataUrl} 
                              controls 
                              playsInline 
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {uploadError && (
                    <div className="mt-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-['Manrope'] flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{uploadError}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono'] text-xs font-semibold text-[#5e5e5e] mb-1.5">
                    2. TÍTULO O DESCRIPCIÓN DEL VIDEO
                  </label>
                  <input
                    type="text"
                    value={inputTitle}
                    onChange={(e) => setInputTitle(e.target.value)}
                    placeholder="Ej. Elevator Pitch de Eric Canto"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#ebedf0] shadow-neu-inset border border-white/40 text-xs sm:text-sm font-['Manrope'] text-black placeholder:text-[#8A8D93] focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* Vercel Blob Cloud Storage Banner */}
                <div className="p-3 rounded-2xl bg-[#e2e5e9] border border-white/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-['JetBrains_Mono'] text-xs font-bold text-black">
                      <Cloud className="w-3.5 h-3.5 text-blue-600" />
                      <span>Vercel Blob Storage CDN</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-['JetBrains_Mono'] text-[9px] font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Conectado en Servidor
                    </span>
                  </div>

                  <p className="text-[10px] font-['Manrope'] text-neutral-600 leading-tight">
                    Tu almacenamiento en la nube está activo. Puedes subir archivos de video de hasta <strong>500 MB</strong> sin límite de Firestore, y se reproducirán a través de CDN de alta velocidad.
                  </p>
                </div>

                {/* Status indicator during upload */}
                {uploadingToBlob && (
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 text-xs font-['JetBrains_Mono'] flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600 shrink-0" />
                    <span className="truncate">{uploadProgressMsg || 'Subiendo a Vercel Blob...'}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      resetModalState();
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#ebedf0] shadow-neu-sm border border-white font-['JetBrains_Mono'] text-xs text-[#5e5e5e] hover:text-black cursor-pointer"
                  >
                    Cancelar
                  </button>

                  {/* Option 1: Firestore Direct Base64 (only if <= 1MB) */}
                  {fileSizeMb > 0 && fileSizeMb <= 1.0 && (
                    <button
                      type="button"
                      onClick={handleFirestoreDirectSubmit}
                      disabled={savingCloud || uploadingToBlob}
                      className="px-3.5 py-2 rounded-xl bg-[#ebedf0] text-neutral-800 border border-white shadow-neu-sm hover:shadow-neu-inset font-['JetBrains_Mono'] text-xs flex items-center gap-1 cursor-pointer"
                      title="Guardar archivo directo en Firestore (hasta 1 MB)"
                    >
                      {savingCloud ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Cloud className="w-3.5 h-3.5 text-blue-600" />}
                      <span>Guardar en Firestore</span>
                    </button>
                  )}

                  {/* Option 2: Upload to Vercel Blob */}
                  <button
                    type="button"
                    onClick={handleVercelBlobUpload}
                    disabled={uploadingToBlob || savingCloud || !selectedFile}
                    className="px-4 py-2 rounded-xl bg-black text-white font-['JetBrains_Mono'] text-xs font-semibold shadow-neu-dark hover:bg-neutral-800 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploadingToBlob ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <UploadCloud className="w-3.5 h-3.5 text-white" />
                    )}
                    <span>
                      {uploadingToBlob ? 'Subiendo a Vercel Blob...' : 'Subir a Vercel Blob'}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: POR VÍNCULO WEB */}
            {modalTab === 'url' && (
              <form onSubmit={handleUrlSubmit} className="space-y-4">
                <div>
                  <label className="block font-['JetBrains_Mono'] text-xs font-semibold text-[#5e5e5e] mb-1.5">
                    1. VÍNCULO DEL VIDEO (SIN LÍMITE DE TAMAÑO)
                  </label>
                  <div className="relative">
                    <Link2 className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                    <input
                      type="url"
                      required
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder="Google Drive, YouTube Shorts, YouTube, Loom o enlace MP4..."
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#ebedf0] shadow-neu-inset border border-white/40 text-xs sm:text-sm font-['Manrope'] text-black placeholder:text-[#8A8D93] focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>

                  {/* Real-time URL format detection badge & tip */}
                  {inputParsed && (
                    <div className="mt-2 p-2.5 rounded-xl bg-[#e2e5e9] border border-white/60 text-xs font-['Manrope'] space-y-1">
                      <div className="flex items-center gap-1.5 font-['JetBrains_Mono'] font-bold text-blue-800 text-[11px]">
                        <Check className="w-3.5 h-3.5 text-blue-600" />
                        <span>Formato detectado: {inputParsed.providerLabel}</span>
                      </div>
                      {inputParsed.tips && (
                        <p className="text-[11px] text-neutral-700 leading-snug">
                          {inputParsed.tips}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Specific advice for Google Drive links */}
                  {inputParsed?.provider === 'gdrive' && (
                    <div className="mt-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] font-['Manrope'] text-amber-900 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-semibold font-['Space_Grotesk']">
                          Paso clave para enlaces de Google Drive:
                        </p>
                        <p className="leading-snug text-neutral-700">
                          1. Abre tu video en Google Drive.<br />
                          2. Haz clic en <strong>Compartir</strong>.<br />
                          3. En <em>Acceso general</em>, cambia de "Restringido" a <strong>"Cualquier persona que tenga el vínculo"</strong>.<br />
                          ¡Listo! Con eso tus reclutadores y visitantes podrán reproducirlo sin pedir permiso.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono'] text-xs font-semibold text-[#5e5e5e] mb-1.5">
                    2. TÍTULO O DESCRIPCIÓN
                  </label>
                  <input
                    type="text"
                    value={inputTitle}
                    onChange={(e) => setInputTitle(e.target.value)}
                    placeholder="Ej. Elevator Pitch de Eric Canto"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#ebedf0] shadow-neu-inset border border-white/40 text-xs sm:text-sm font-['Manrope'] text-black placeholder:text-[#8A8D93] focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* Supported services badge cloud */}
                <div className="p-3 rounded-xl bg-[#e4e7eb] border border-white/80 space-y-1.5">
                  <span className="font-['JetBrains_Mono'] text-[10px] font-bold text-neutral-600 uppercase tracking-wider block">
                    Plataformas compatibles automáticamente:
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-[10px] font-['JetBrains_Mono'] text-neutral-700">
                    <span className="px-2 py-0.5 rounded bg-white shadow-xs border border-slate-200">Vercel Blob</span>
                    <span className="px-2 py-0.5 rounded bg-white shadow-xs border border-slate-200">Google Drive</span>
                    <span className="px-2 py-0.5 rounded bg-white shadow-xs border border-slate-200">YouTube Shorts</span>
                    <span className="px-2 py-0.5 rounded bg-white shadow-xs border border-slate-200">YouTube</span>
                    <span className="px-2 py-0.5 rounded bg-white shadow-xs border border-slate-200">Loom</span>
                    <span className="px-2 py-0.5 rounded bg-white shadow-xs border border-slate-200">Vimeo</span>
                    <span className="px-2 py-0.5 rounded bg-white shadow-xs border border-slate-200">MP4 / WebM</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-[11px] font-['Manrope'] text-blue-900 flex items-start gap-2">
                  <Cloud className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    Al guardar, este vínculo queda almacenado en tu base de datos en la nube de Firebase Firestore y se actualiza al instante en todos los dispositivos.
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      resetModalState();
                    }}
                    className="px-4 py-2 rounded-xl bg-[#ebedf0] shadow-neu-sm border border-white font-['JetBrains_Mono'] text-xs text-[#5e5e5e] hover:text-black cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={savingCloud || !inputUrl.trim()}
                    className="px-5 py-2 rounded-xl bg-black text-white font-['JetBrains_Mono'] text-xs font-semibold shadow-neu-dark hover:bg-neutral-800 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {savingCloud ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )}
                    <span>{savingCloud ? 'Guardando en la Nube...' : 'Guardar en la Nube'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
