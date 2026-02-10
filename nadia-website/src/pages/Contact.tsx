export default function Contact() {
  return (
    <section className="contact-section">
      <div className="container">
        <h2 className="section-title">Let's Find Your Dream Home</h2>
        <p className="section-subtitle">Reach out to Nadia today and start your journey to finding the perfect property</p>
        
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
            <textarea placeholder="Tell me about your ideal property..." className="form-textarea" rows={4}></textarea>
            <button className="btn btn-primary btn-full">Send Inquiry</button>
          </div>
        </div>
      </div>
    </section>
  );
}
