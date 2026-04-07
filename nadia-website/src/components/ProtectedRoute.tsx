import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  console.log('[ProtectedRoute] Render - loading:', loading, 'user:', user?.email || 'null');

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0d1117',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#c9a961',
        fontSize: '1rem',
        letterSpacing: '1px',
      }}>
        Checking access…
      </div>
    );
  }

  if (!user) {
    console.log('[ProtectedRoute] No user, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  console.log('[ProtectedRoute] User authenticated, rendering children');
  return <>{children}</>;
}
