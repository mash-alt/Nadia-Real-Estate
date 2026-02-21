import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PropertyDetailModal from '../components/PropertyDetailModal';
import { useProperties } from '../hooks/useProperties';
import type { Property } from '../types';

const LOCATIONS = [
  { name: 'Metro Manila', img: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=600', desc: "Live or invest in the country's business capital, with properties near top schools, malls, and CBDs." },
  { name: 'Cebu', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600', desc: 'A dynamic mix of city convenience and island charm, perfect for homebuyers and investors.' },
  { name: 'Davao', img: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600', desc: "One of the country's cleanest and safest cities, with diverse real estate options." },
  { name: 'Laguna', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600', desc: 'Suburban living with easy access to major cities and lifestyle hubs.' },
  { name: 'Cavite', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600', desc: 'Affordable homes in growing communities near the metro.' },
  { name: 'Batangas', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600', desc: 'Beach resort living meets residential comfort in this beautiful province.' },
];

export default function Home() {
  const { properties } = useProperties();
  const featuredProperties = properties.filter(p => p.featured).slice(0, 3);
  const [selected, setSelected] = useState<Property | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('fade-in-visible'); } }),
      { threshold: 0.08, rootMargin: '0px 0px -80px 0px' }
    );
    document.querySelectorAll('.fade-in-section').forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-inner">
            <div className="hero-text-col">
              <span className="hero-eyebrow">EXPLORE TOP LISTINGS</span>
              <h1 className="hero-headline">Find Your Dream Home with <span className="hero-name-accent">NadiaCagayRealty</span></h1>
              <p className="hero-description">Here at NadiaCagayRealty, finding your ideal property is simple. Discover residential real estate options tailored to your lifestyle and budget.</p>
              <div className="hero-cta-group">
                <a href="https://www.messenger.com/t/100073887523966" className="hero-btn hero-btn-messenger" target="_blank" rel="noopener noreferrer">Messenger</a>
                <a href="https://wa.me/639224956965" className="hero-btn hero-btn-whatsapp" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </div>
            </div>
            <div className="hero-photo-col">
              <div className="hero-agent-card">
                <img src="https://res.cloudinary.com/dtsoyzdfu/image/upload/q_auto,f_auto,c_limit,w_1200/home/nadia-realestate/nadia-profile" alt="Nadia A. Cagay" className="hero-agent-img" />
                <div className="hero-agent-badge"><strong>Nadia A. Cagay</strong><span>REB  REA  LPT</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="trust-section fade-in-section">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-badge"><div className="trust-icon">&#x1F91D;</div><h3>Client-First Approach</h3><p>We prioritize your goals and guide you with care, so every decision feels right and fully supported.</p></div>
            <div className="trust-badge"><div className="trust-icon">&#x1F3C5;</div><h3>Top Rated Agent</h3><p>Recognized for trusted service with hundreds of successful buyers across the Philippines.</p></div>
            <div className="trust-badge"><div className="trust-icon">&#x1F4DC;</div><h3>Licensed Expertise</h3><p>A licensed real estate broker and appraiser equipped to help you make smart, confident decisions.</p></div>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="featured-section fade-in-section">
        <div className="container">
          <span className="section-eyebrow">SMART PICKS</span>
          <h2 className="section-title">Featured Properties</h2>
          <p className="section-subtitle">Handpicked for its location, value, and potential. A great find for homebuyers or investors.</p>
          <div className="featured-grid">
            {featuredProperties.map((prop) => (
              <div key={prop.id} className="featured-card">
                <div className="featured-card-img-wrap">
                  <img src={prop.image} alt={prop.title} className="featured-card-img" />
                  <span className="featured-badge">FEATURED</span>
                </div>
                <div className="featured-card-body">
                  <h3 className="featured-card-title">{prop.title}</h3>
                  <p className="featured-card-location">&#x1F4CD; {prop.location}</p>
                  <div className="featured-card-details">
                    <div className="featured-detail-row"><span className="featured-detail-label">Price</span><span className="featured-detail-value">{prop.price}</span></div>
                    <div className="featured-detail-row"><span className="featured-detail-label">Type</span><span className="featured-detail-value">{prop.type.charAt(0).toUpperCase() + prop.type.slice(1)}</span></div>
                    <div className="featured-detail-row"><span className="featured-detail-label">Beds / Baths</span><span className="featured-detail-value">{prop.beds}BR  {prop.baths}BA</span></div>
                    <div className="featured-detail-row"><span className="featured-detail-label">Size</span><span className="featured-detail-value">{prop.size}</span></div>
                    <div className="featured-detail-row"><span className="featured-detail-label">Status</span><span className={'featured-status-tag ' + prop.status}>{prop.status === 'for-sale' ? 'For Sale' : 'For Rent'}</span></div>
                  </div>
                  <button className="featured-card-btn" onClick={() => setSelected(prop)}>SEE FULL DETAILS</button>
                </div>
              </div>
            ))}
          </div>
          <div className="view-more-center"><Link to="/properties" className="btn-view-more">VIEW MORE PROPERTIES</Link></div>
        </div>
      </section>

      {/* PROPERTY TYPES */}
      <section className="property-types-section fade-in-section">
        <div className="container">
          <span className="section-eyebrow">PROPERTY TYPES</span>
          <h2 className="section-title">Find Your Perfect Property</h2>
          <p className="section-subtitle">From modern condos and spacious homes to investment properties, we help you find the right match.</p>
          <div className="property-types-grid">
            <div className="property-type-card"><div className="property-type-img-wrap"><img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700" alt="Condominiums" /><div className="property-type-overlay"><h3>Condominiums</h3><p>Smart layouts in prime city locations, ideal for living or rental income.</p><Link to="/properties?type=condo" className="property-type-btn">VIEW CONDOS FOR SALE</Link></div></div></div>
            <div className="property-type-card"><div className="property-type-img-wrap"><img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=700" alt="House and Lot" /><div className="property-type-overlay"><h3>House and Lot</h3><p>Spacious homes in secure communities, perfect for families.</p><Link to="/properties?type=house" className="property-type-btn">EXPLORE HOUSE LISTINGS</Link></div></div></div>
            <div className="property-type-card"><div className="property-type-img-wrap"><img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=700" alt="Commercial" /><div className="property-type-overlay"><h3>Commercial</h3><p>Business-ready units in prime locations, perfect for investors.</p><Link to="/properties?type=commercial" className="property-type-btn">SEE AVAILABLE LISTINGS</Link></div></div></div>
          </div>
        </div>
      </section>
      {/* CTA BANNER */}
      <section className="cta-banner-section fade-in-section">
        <div className="container">
          <div className="cta-banner-inner">
            <div className="cta-banner-text"><h2>Find Your Dream Home Today!</h2><p>Contact us today to start your inquiry. We are here to guide you every step of the way!</p></div>
            <div className="cta-banner-btns">
              <a href="https://www.messenger.com/t/100073887523966" className="cta-banner-btn cta-messenger-btn" target="_blank" rel="noopener noreferrer">MESSENGER</a>
              <a href="https://wa.me/639224956965" className="cta-banner-btn cta-whatsapp-btn" target="_blank" rel="noopener noreferrer">WHATSAPP</a>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="locations-section fade-in-section">
        <div className="container">
          <span className="section-eyebrow">PRIME LOCATIONS</span>
          <h2 className="section-title">Find Properties Across the Philippines</h2>
          <p className="section-subtitle">Explore available condos, houses, and investment properties in top locations, from major cities to emerging hotspots.</p>
          <div className="locations-grid">
            {LOCATIONS.map((loc) => (
              <div key={loc.name} className="location-card">
                <div className="location-img-wrap">
                  <img src={loc.img} alt={loc.name} />
                  <div className="location-overlay"><h3>{loc.name}</h3><p>{loc.desc}</p><Link to="/properties" className="location-btn">VIEW PROPERTIES</Link></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && <PropertyDetailModal property={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      {/* CONTACT CHANNELS */}
      <section className="contact-channels-section fade-in-section">
        <div className="container">
          <h2 className="section-title white">Let's Take You Home</h2>
          <p className="section-subtitle light-sub">Feel free to contact us anytime, day or night, with any questions you may have!</p>
          <div className="contact-channels-grid">
            <a href="tel:+639224956965" className="channel-card"><span className="channel-card-icon">&#x1F4DE;</span><strong>Call / Text</strong><span>+63 922 495 6965</span></a>
            <a href="mailto:realtornadiac@gmail.com" className="channel-card"><span className="channel-card-icon">&#x2709;</span><strong>Email</strong><span>realtornadiac@gmail.com</span></a>
            <a href="https://www.messenger.com/t/100073887523966" target="_blank" rel="noopener noreferrer" className="channel-card"><span className="channel-card-icon">&#x1F4AC;</span><strong>Messenger</strong><span>brokernadiacagay</span></a>
            <a href="https://wa.me/639224956965" target="_blank" rel="noopener noreferrer" className="channel-card"><span className="channel-card-icon">&#x1F4F1;</span><strong>WhatsApp</strong><span>+63 922 495 6965</span></a>
            <a href="viber://chat?number=639224956965" className="channel-card"><span className="channel-card-icon">&#x1F535;</span><strong>Viber</strong><span>+63 922 495 6965</span></a>
          </div>
        </div>
      </section>
    </>
  );
}
