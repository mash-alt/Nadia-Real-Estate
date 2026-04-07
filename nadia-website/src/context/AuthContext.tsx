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
    console.log('[AuthContext] Setting up auth state listener...');
    const unsub = onAuthStateChanged(auth, async (u) => {
      console.log('[AuthContext] onAuthStateChanged fired, user:', u?.email || 'null');
      if (u) {
        const loginAt = parseInt(localStorage.getItem('loginAt') || '0', 10);
        console.log('[AuthContext] User found, loginAt:', loginAt, 'now:', Date.now());
        if (!loginAt || Date.now() - loginAt > SESSION_MS) {
          // session expired or no timestamp — sign out silently
          console.log('[AuthContext] Session expired or no timestamp, signing out...');
          await signOut(auth);
          localStorage.removeItem('loginAt');
          setUser(null);
          setLoading(false);
          return;
        }
        console.log('[AuthContext] Session valid, setting user...');
      } else {
        console.log('[AuthContext] No user, clearing localStorage...');
        localStorage.removeItem('loginAt');
      }
      console.log('[AuthContext] Updating user state and loading...');
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
    console.log('[AuthContext] Auto-logout timer set, remaining ms:', remaining);
    if (remaining <= 0) { 
      console.log('[AuthContext] Session already expired');
      signOut(auth); 
      return; 
    }
    const timer = setTimeout(async () => {
      console.log('[AuthContext] Session timeout reached, signing out...');
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
