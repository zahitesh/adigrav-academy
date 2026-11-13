import React, { createContext, useContext, useEffect, useState } from 'react';

export interface WaitlistEntry {
  email: string;
  track: string;
  submittedAt: string;
}

export interface CallbackRequest {
  name: string;
  email: string;
  phone: string;
  submittedAt: string;
}

export interface UserSession {
  email: string;
  name: string;
  provider: 'email' | 'google' | 'github';
}

interface AppStateContextValue {
  waitlistEntries: WaitlistEntry[];
  addWaitlistEntry: (email: string, track?: string) => void;
  callbackRequests: CallbackRequest[];
  submitCallbackRequest: (data: Omit<CallbackRequest, 'submittedAt'>) => void;
  isCallbackModalOpen: boolean;
  openCallbackModal: () => void;
  closeCallbackModal: () => void;
  hasSeenAutoModal: boolean;
  markAutoModalSeen: () => void;
  user: UserSession | null;
  signIn: (session: UserSession) => void;
  signOut: () => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

const STORAGE_KEYS = {
  WAITLIST: 'adigrav_waitlist_v1',
  CALLBACKS: 'adigrav_callbacks_v1',
  USER: 'adigrav_user_v1',
} as const;

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>(() =>
    readStorage<WaitlistEntry[]>(STORAGE_KEYS.WAITLIST, [])
  );
  const [callbackRequests, setCallbackRequests] = useState<CallbackRequest[]>(() =>
    readStorage<CallbackRequest[]>(STORAGE_KEYS.CALLBACKS, [])
  );
  const [hasSeenAutoModal, setHasSeenAutoModal] = useState<boolean>(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [user, setUser] = useState<UserSession | null>(() =>
    readStorage<UserSession | null>(STORAGE_KEYS.USER, null)
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WAITLIST, JSON.stringify(waitlistEntries));
    } catch {
      // Ignore storage quota errors
    }
  }, [waitlistEntries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CALLBACKS, JSON.stringify(callbackRequests));
    } catch {
      // Ignore storage quota errors
    }
  }, [callbackRequests]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch {
      // Ignore storage quota errors
    }
  }, [user]);

  const addWaitlistEntry = (email: string, track = 'General Early Access') => {
    const normalized = email.trim().toLowerCase();
    setWaitlistEntries((prev) => {
      const filtered = prev.filter((item) => item.email !== normalized || item.track !== track);
      return [{ email: normalized, track, submittedAt: new Date().toISOString() }, ...filtered];
    });
  };

  const submitCallbackRequest = (data: Omit<CallbackRequest, 'submittedAt'>) => {
    setCallbackRequests((prev) => [
      { ...data, submittedAt: new Date().toISOString() },
      ...prev,
    ]);
  };

  const markAutoModalSeen = () => {
    setHasSeenAutoModal(true);
  };

  const openCallbackModal = () => setIsCallbackModalOpen(true);
  const closeCallbackModal = () => {
    setIsCallbackModalOpen(false);
    markAutoModalSeen();
  };

  const signIn = (session: UserSession) => setUser(session);
  const signOut = () => setUser(null);

  return (
    <AppStateContext.Provider
      value={{
        waitlistEntries,
        addWaitlistEntry,
        callbackRequests,
        submitCallbackRequest,
        isCallbackModalOpen,
        openCallbackModal,
        closeCallbackModal,
        hasSeenAutoModal,
        markAutoModalSeen,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return ctx;
}
