import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../config';

const SESSION_MS = 2 * 60 * 60 * 1000; // 2 hours

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* ── auth state listener + session age check ── */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        const loginAt = parseInt(localStorage.getItem('loginAt') || '0', 10);
        if (!loginAt || Date.now() - loginAt > SESSION_MS) {
          // session expired or no timestamp — sign out silently
          await signOut(auth);
          localStorage.removeItem('loginAt');
          setUser(null);
          setLoading(false);
          return;
        }
      } else {
        localStorage.removeItem('loginAt');
      }
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  /* ── auto-logout timer fires exactly when session expires ── */
  useEffect(() => {
    if (!user) return;
    const loginAt = parseInt(localStorage.getItem('loginAt') || '0', 10);
    if (!loginAt) return;
    const remaining = SESSION_MS - (Date.now() - loginAt);
    if (remaining <= 0) { signOut(auth); return; }
    const timer = setTimeout(async () => {
      await signOut(auth);
      localStorage.removeItem('loginAt');
    }, remaining);
    return () => clearTimeout(timer);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
