import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './styles/index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Condos from './pages/Condos';
import AllProperties from './pages/AllProperties';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

/* Main site layout — Navbar + Footer wrapper */
function MainLayout() {
  return (
    <div className="app">
      <Navbar />
      <FloatingContact />
      <Outlet />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Public site — with Navbar & Footer */}
          <Route element={<MainLayout />}>
            <Route path="/"           element={<Home />} />
            <Route path="/condos"     element={<Condos />} />
            <Route path="/properties" element={<AllProperties />} />
            <Route path="/about"      element={<About />} />
            <Route path="/contact"    element={<Contact />} />
          </Route>

          {/* Standalone pages — no Navbar / Footer */}
          <Route path="/login"     element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

