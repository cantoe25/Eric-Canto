import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  initializeFirestore,
  getFirestore,
  Firestore,
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  collection, 
  onSnapshot 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App singleton
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const targetDatabaseId = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== ''
  ? firebaseConfig.firestoreDatabaseId 
  : '(default)';

// Initialize Firestore with forced long polling enabled to prevent backend connectivity issues in iframes/proxies
let firestoreInstance: Firestore;
try {
  firestoreInstance = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  }, targetDatabaseId);
} catch {
  firestoreInstance = getFirestore(app, targetDatabaseId);
}

export const db = firestoreInstance;

// Connectivity status helper with safe fallback
export async function testFirebaseConnection(): Promise<boolean> {
  try {
    const snap = await getDoc(doc(db, 'portfolio_settings', 'hero_video'));
    return snap.exists();
  } catch (error) {
    console.debug('Firestore background connectivity status (operating with local cache):', error);
    return false;
  }
}

// 1. Cloud Video Service
export interface CloudVideoData {
  url: string;
  title: string;
  updatedAt: string;
  aspectRatio?: string;
}

const VIDEO_DOC_REF = doc(db, 'portfolio_settings', 'hero_video');

export function subscribeToHeroVideo(
  onData: (data: CloudVideoData | null) => void,
  onError?: (err: Error) => void
) {
  return onSnapshot(
    VIDEO_DOC_REF,
    { includeMetadataChanges: false },
    (snapshot) => {
      if (snapshot.exists()) {
        onData(snapshot.data() as CloudVideoData);
      } else {
        onData(null);
      }
    },
    (err) => {
      console.warn('Hero video subscription note (cache fallback):', err.message);
      if (onError) onError(err);
    }
  );
}

export async function saveHeroVideoToCloud(video: CloudVideoData): Promise<void> {
  await setDoc(VIDEO_DOC_REF, {
    url: video.url,
    title: video.title,
    updatedAt: new Date().toISOString(),
    aspectRatio: '9:16'
  }, { merge: true });
}

export async function removeHeroVideoFromCloud(): Promise<void> {
  await setDoc(VIDEO_DOC_REF, {
    url: '',
    title: '',
    updatedAt: new Date().toISOString(),
    aspectRatio: '9:16'
  });
}

// 2. Contact Message Service
export interface ContactMessageData {
  name: string;
  email: string;
  message: string;
}

export async function sendContactMessageToCloud(data: ContactMessageData): Promise<string> {
  const messagesCol = collection(db, 'contact_messages');
  const docRef = await addDoc(messagesCol, {
    ...data,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
}

// 3. Appointments Service
export interface AppointmentData {
  name: string;
  email: string;
  date: string;
  time: string;
  notes?: string;
}

export async function scheduleAppointmentInCloud(data: AppointmentData): Promise<string> {
  const appointmentsCol = collection(db, 'appointments');
  const docRef = await addDoc(appointmentsCol, {
    ...data,
    notes: data.notes || '',
    createdAt: new Date().toISOString()
  });
  return docRef.id;
}
