import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config';
import { useToast } from '../components/Toast';

export default function Login() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const { showToast, Toast } = useToast();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('[Login] handleSubmit called', { email });
    setLoading(true);
    try {
      console.log('[Login] Attempting signInWithEmailAndPassword...');
      // Store loginAt BEFORE sign-in so it's ready when onAuthStateChanged fires
      const now = Date.now().toString();
      localStorage.setItem('loginAt', now);
      console.log('[Login] loginAt pre-stored:', now);
      await signInWithEmailAndPassword(auth, email, password);
      console.log('[Login] Sign-in successful!');
      showToast('Login successful. Redirecting to dashboard...', 'success');
      console.log('[Login] Toast shown, waiting for auth state update...');
      // Fallback: manually redirect after 1.5 seconds if auth state doesn't trigger it
      setTimeout(() => {
        console.log('[Login] Fallback redirect triggered');
        navigate('/dashboard', { replace: true });
      }, 1500);
    } catch (err: unknown) {
      console.log('[Login] Sign-in failed:', err);
      localStorage.removeItem('loginAt');
      setLoading(false);
      const firebaseCode = typeof err === 'object' && err !== null && 'code' in err
        ? String((err as { code?: string }).code)
        : '';

      if (firebaseCode.includes('wrong-password')) {
        showToast('Wrong password. Please try again.', 'error');
      } else if (firebaseCode.includes('invalid-credential') || firebaseCode.includes('user-not-found')) {
        showToast('Invalid email or password.', 'error');
      } else {
        showToast('Login failed. Please try again.', 'error');
      }
    }
  }

  return (
    <div className="login-page">
      {Toast && <Toast />}
      <div className="login-card">
        <div className="login-logo">NadiaCagayRealty</div>
        <p className="login-subtitle">Admin Access</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="login-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
