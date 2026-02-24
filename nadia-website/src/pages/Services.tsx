import { useEffect } from 'react';

export default function Services() {
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
      <section className="services-hero">
        <div className="services-hero-overlay"></div>
        <div className="container">
          <div className="services-hero-content">
            <h1 className="services-hero-title">Professional Real Estate Services</h1>
            <p className="services-hero-subtitle">
              Licensed expertise in appraisal, title transfer, and due diligence—
              ensuring clarity, accuracy, and confidence in every transaction.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-section">
        <div className="container">
          <div className="services-grid">
            
            {/* Property Appraisal */}
            <div className="service-card fade-in-section">
              <div className="service-icon">📊</div>
              <h2 className="service-title">Property Appraisal</h2>
              <p className="service-description">
                Professional property valuation services backed by REB and REA licenses. 
                Get accurate, market-based assessments for residential, commercial, and investment properties.
              </p>
              <div className="service-features">
                <h3>What's Included:</h3>
                <ul>
                  <li>✓ Comprehensive market analysis</li>
                  <li>✓ Physical property inspection</li>
                  <li>✓ Comparative market evaluation</li>
                  <li>✓ Detailed appraisal report</li>
                  <li>✓ Legal compliance verification</li>
                </ul>
              </div>
              <div className="service-ideal">
                <strong>Ideal for:</strong> Buyers, sellers, investors, banks, and estate planning
              </div>
            </div>

            {/* Transfer Title */}
            <div className="service-card fade-in-section">
              <div className="service-icon">📜</div>
              <h2 className="service-title">Transfer Title</h2>
              <p className="service-description">
                Navigate the complex process of property title transfer with confidence. 
                I handle documentation, legalities, and coordination to ensure smooth, compliant ownership transfer.
              </p>
              <div className="service-features">
                <h3>What's Included:</h3>
                <ul>
                  <li>✓ Title verification and clearance</li>
                  <li>✓ Document preparation and review</li>
                  <li>✓ Government agency coordination</li>
                  <li>✓ Tax computation assistance</li>
                  <li>✓ End-to-end process management</li>
                </ul>
              </div>
              <div className="service-ideal">
                <strong>Ideal for:</strong> Property buyers, sellers, heirs, and estate transfers
              </div>
            </div>

            {/* Due Diligence */}
            <div className="service-card fade-in-section">
              <div className="service-icon">🔍</div>
              <h2 className="service-title">Due Diligence</h2>
              <p className="service-description">
                Protect your investment with thorough pre-purchase investigation. 
                I uncover risks, verify claims, and provide a complete picture before you commit.
              </p>
              <div className="service-features">
                <h3>What's Included:</h3>
                <ul>
                  <li>✓ Title authenticity verification</li>
                  <li>✓ Encumbrance and lien checks</li>
                  <li>✓ Zoning and land use validation</li>
                  <li>✓ Developer background research</li>
                  <li>✓ Contract and agreement review</li>
                  <li>✓ Risk assessment report</li>
                </ul>
              </div>
              <div className="service-ideal">
                <strong>Ideal for:</strong> First-time buyers, OFWs, investors, and cautious purchasers
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="services-why-section fade-in-section">
        <div className="container">
          <h2 className="section-title">Why Work With a Licensed Professional</h2>
          <div className="services-why-grid">
            <div className="why-card">
              <h3>🎓 Licensed & Qualified</h3>
              <p>REB, REA, LPT credentials ensure adherence to legal standards and professional ethics.</p>
            </div>
            <div className="why-card">
              <h3>🛡️ Transparent Process</h3>
              <p>No hidden fees, no surprises—just clear communication and honest guidance.</p>
            </div>
            <div className="why-card">
              <h3>⚖️ Legal Safeguards</h3>
              <p>Minimize risks with proper documentation, compliance checks, and expert oversight.</p>
            </div>
            <div className="why-card">
              <h3>🕒 Save Time & Money</h3>
              <p>Avoid costly mistakes and delays with efficient, knowledgeable service from start to finish.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta-section fade-in-section">
        <div className="container">
          <h2 className="services-cta-title">Ready to Start?</h2>
          <p className="services-cta-text">
            Book a consultation to discuss your property needs. 
            Whether it's appraisal, title work, or pre-purchase investigation, I'm here to help.
          </p>
          <a href="/contact" className="btn btn-primary btn-large">
            Schedule a Consultation
          </a>
        </div>
      </section>
    </>
  );
}
