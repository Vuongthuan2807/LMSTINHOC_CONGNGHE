import { MediaItem } from '../types';

const DB_NAME = 'HocVuiTinHocDB';
const DB_VERSION = 1;
const MEDIA_STORE = 'media_items';

class IndexedDBService {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private getDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        reject(new Error('IndexedDB is not supported on this device'));
        return;
      }

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(MEDIA_STORE)) {
          const store = db.createObjectStore(MEDIA_STORE, { keyPath: 'id' });
          store.createIndex('type', 'type', { unique: false });
          store.createIndex('uploadedAt', 'uploadedAt', { unique: false });
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });

    return this.dbPromise;
  }

  public async saveMedia(item: MediaItem): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(MEDIA_STORE, 'readwrite');
      const store = tx.objectStore(MEDIA_STORE);
      const req = store.put(item);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  public async getAllMedia(): Promise<MediaItem[]> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(MEDIA_STORE, 'readonly');
        const store = tx.objectStore(MEDIA_STORE);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
      });
    } catch {
      return [];
    }
  }

  public async getMediaById(id: string): Promise<MediaItem | null> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(MEDIA_STORE, 'readonly');
        const store = tx.objectStore(MEDIA_STORE);
        const req = store.get(id);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });
    } catch {
      return null;
    }
  }

  public async deleteMedia(id: string): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(MEDIA_STORE, 'readwrite');
      const store = tx.objectStore(MEDIA_STORE);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  public async clearAllMedia(): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(MEDIA_STORE, 'readwrite');
      const store = tx.objectStore(MEDIA_STORE);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }
}

export const dbService = new IndexedDBService();
