import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer-new">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">NadiaCagayRealty</div>
              <p className="footer-desc">
                Explore top properties across the Philippines with NadiaCagayRealty.
                Our carefully curated listings help you easily find your dream home.
              </p>
              <div className="footer-social-links">
                <a href="https://web.facebook.com/brokernadiacagay" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://www.youtube.com/@nadiarealestatemegaphone" target="_blank" rel="noopener noreferrer">YouTube</a>
              </div>
            </div>

            <div className="footer-links-col">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/condos">Condos</Link></li>
                <li><Link to="/properties">All Properties</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-contact-col">
              <h4>Let's Take You Home</h4>
              <div className="footer-contacts">
                <a href="tel:+639224956965" className="footer-contact-item">
                  <span>&#x1F4DE;</span>
                  <div><strong>Call / Text</strong><span>+63 922 495 6965</span></div>
                </a>
                <a href="mailto:realtornadiac@gmail.com" className="footer-contact-item">
                  <span>&#x2709;</span>
                  <div><strong>Email</strong><span>realtornadiac@gmail.com</span></div>
                </a>
                <a href="https://www.messenger.com/t/100073887523966" className="footer-contact-item" target="_blank" rel="noopener noreferrer">
                  <span>&#x1F4AC;</span>
                  <div><strong>Messenger</strong><span>brokernadiacagay</span></div>
                </a>
                <a href="https://wa.me/639224956965" className="footer-contact-item" target="_blank" rel="noopener noreferrer">
                  <span>&#x1F4F1;</span>
                  <div><strong>WhatsApp</strong><span>+63 922 495 6965</span></div>
                </a>
                <a href="viber://chat?number=639224956965" className="footer-contact-item">
                  <span>&#x1F535;</span>
                  <div><strong>Viber</strong><span>+63 922 495 6965</span></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-cta-strip">
        <div className="container">
          <h3>Start Your Journey Here</h3>
          <p>Contact us today to learn more</p>
          <a href="https://wa.me/639224956965" className="footer-cta-btn" target="_blank" rel="noopener noreferrer">CHAT WITH US NOW!</a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&#169; 2026 Nadia A. Cagay &#8212; Licensed Real Estate Broker, Appraiser &amp; Professional Teacher. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
