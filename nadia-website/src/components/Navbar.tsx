import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const FOR_SALE_ITEMS = [
  { label: 'Condos', to: '/condos' },
  { label: 'House & Lot', to: '/properties?type=house' },
  { label: 'Office Spaces', to: '/properties?type=commercial' },
];

const LOCATION_ITEMS = [
  { label: 'Metro Manila', to: '/properties?location=Metro+Manila' },
  { label: 'Cebu', to: '/properties?location=Cebu' },
  { label: 'Davao', to: '/properties?location=Davao' },
  { label: 'Laguna', to: '/properties?location=Laguna' },
  { label: 'Cavite', to: '/properties?location=Cavite' },
  { label: 'Batangas', to: '/properties?location=Batangas' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  // Close dropdown when clicking anywhere outside the navbar
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const close = () => { setMenuOpen(false); setOpenDropdown(null); };
  const toggleDropdown = (name: string) =>
    setOpenDropdown(prev => (prev === name ? null : name));

  return (
    <header className="site-header" ref={navRef}>
      {/* Top bar */}
      <div className="top-bar">
        <div className="top-bar-inner">
          <a href="mailto:realtornadiac@gmail.com" className="top-bar-email">realtornadiac@gmail.com</a>
          <div className="top-bar-right">
            <a href="https://web.facebook.com/brokernadiacagay" target="_blank" rel="noopener noreferrer" className="top-bar-social">Facebook</a>
            <a href="https://www.youtube.com/@nadiarealestatemegaphone" target="_blank" rel="noopener noreferrer" className="top-bar-social">YouTube</a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="logo" onClick={close}>NadiaCagayRealty</Link>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li className={isActive('/') ? 'active' : ''}>
              <Link to="/" onClick={close}>Home</Link>
            </li>

            {/* For Sale dropdown */}
            <li className={`has-dropdown ${openDropdown === 'forsale' ? 'dd-open' : ''}`}>
              <button className="nav-dropdown-trigger" onClick={() => toggleDropdown('forsale')}>
                For Sale <span className="dd-arrow">&#9660;</span>
              </button>
              <ul className="nav-dropdown-menu">
                {FOR_SALE_ITEMS.map(item => (
                  <li key={item.to}>
                    <Link to={item.to} onClick={close}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* By Location dropdown */}
            <li className={`has-dropdown ${openDropdown === 'bylocation' ? 'dd-open' : ''}`}>
              <button className="nav-dropdown-trigger" onClick={() => toggleDropdown('bylocation')}>
                By Location <span className="dd-arrow">&#9660;</span>
              </button>
              <ul className="nav-dropdown-menu">
                {LOCATION_ITEMS.map(item => (
                  <li key={item.to}>
                    <Link to={item.to} onClick={close}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </li>

            <li className={isActive('/about') ? 'active' : ''}>
              <Link to="/about" onClick={close}>About</Link>
            </li>
            <li className={isActive('/contact') ? 'active' : ''}>
              <Link to="/contact" onClick={close}>Contact</Link>
            </li>
          </ul>

          <a href="tel:+639224956965" className="nav-phone">+63 922 495 6965</a>
        </div>
      </nav>
    </header>
  );
}
