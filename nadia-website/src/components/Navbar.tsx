import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === '/';

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${!isHomePage ? 'solid' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">NADIA</Link>
        <ul className="nav-links">
          <li className={isActive('/') ? 'active' : ''}>
            <Link to="/">Home</Link>
          </li>
          <li className={isActive('/condos') ? 'active' : ''}>
            <Link to="/condos">Condos</Link>
          </li>
          <li className={isActive('/properties') ? 'active' : ''}>
            <Link to="/properties">All Properties</Link>
          </li>
          <li className={isActive('/about') ? 'active' : ''}>
            <Link to="/about">About</Link>
          </li>
          <li className={isActive('/testimonials') ? 'active' : ''}>
            <Link to="/testimonials">Reviews</Link>
          </li>
          <li className={isActive('/contact') ? 'active' : ''}>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
