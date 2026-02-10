import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import { properties, testimonials } from '../data/properties';

export default function Home() {
  const featuredCondos = properties.filter(p => p.type === 'condo' && p.featured);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Elevate Your Living</h1>
          <p className="hero-subtitle">Discover Your Perfect Property in the Heart of the City</p>
          <div className="hero-buttons">
            <Link to="/condos" className="btn btn-primary">
              View Condo Listings
            </Link>
            <Link to="/properties" className="btn btn-secondary">
              Browse All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Condos Section */}
      <section className="condos-section fade-in-section">
        <div className="container">
          <h2 className="section-title">Featured Condominiums</h2>
          <p className="section-subtitle">Handpicked properties that define modern urban luxury</p>
          
          <div className="condos-grid">
            {featuredCondos.map((condo) => (
              <PropertyCard key={condo.id} property={condo} />
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/condos" className="btn btn-primary">
              View All Condos
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section fade-in-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img src="https://via.placeholder.com/600x800/1a2332/ffffff?text=[Agent+Photo]" alt="Nadia - Real Estate Agent" />
            </div>
            <div className="about-content">
              <h2 className="section-title">Your Real Estate Guide</h2>
              <p className="about-text">
                What makes my work different is simple: I don't sell properties—I guide decisions.
              </p>
              <p className="about-text">
                My approach is rooted in clarity, ethics, and long-term thinking. I specialize in buyer profiling, ensuring that the unit, location, and payment structure align with your lifestyle and risk comfort. My goal is not a one-time transaction—it is a relationship built on trust, informed choices, and confidence.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <div className="stat-number">4</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Transparency</div>
                </div>
                <div className="stat">
                  <div className="stat-number">∞</div>
                  <div className="stat-label">Client Trust</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section fade-in-section">
        <div className="container">
          <h2 className="section-title">What Clients Say</h2>
          <p className="section-subtitle">Trusted by hundreds of satisfied homeowners</p>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section fade-in-section">
        <div className="container">
          <h2 className="section-title">Let's Find Your Dream Condo</h2>
          <p className="section-subtitle">Reach out to Nadia today and start your journey to urban luxury living</p>
          
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h3>Call or Text</h3>
                  <p>09224956965</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div>
                  <h3>Email</h3>
                  <p>realtornadiac@gmail.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">💬</div>
                <div>
                  <h3>Messenger & Viber</h3>
                  <p>Instant messaging available</p>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <input type="text" placeholder="Your Name" className="form-input" />
              <input type="email" placeholder="Your Email" className="form-input" />
              <input type="tel" placeholder="Your Phone" className="form-input" />
              <textarea placeholder="Tell me about your ideal condo..." className="form-textarea" rows={4}></textarea>
              <button className="btn btn-primary btn-full">Send Inquiry</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
